import crypto from "crypto";

const DEMO_USERS = [
  { username: "julio", password: "passwordJulio" },
  { username: "ana", password: "passwordAna" },
  { username: "luis", password: "passwordLuis" },
  { username: "maria", password: "passwordMaria" },
  { username: "carlos", password: "passwordCarlos" },
  { username: "sofia", password: "passwordSofia" },
  { username: "pedro", password: "passwordPedro" },
  { username: "jameskelley", password: "passwordJames" },
  { username: "richardlewis", password: "passwordRichard" },
  { username: "carlosalonso", password: "passwordCarlos" },
  { username: "juliocesar", password: "passwordJulio" },
];

const DEFAULT_ITERATIONS = 100000;
const HASH_BYTES = 64;
const DIGEST = "sha512";

const normalizeUsername = (username = "") => username.trim().toLowerCase();
const normalizeEmail = (email = "") => email.trim().toLowerCase();

const hashPassword = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, DEFAULT_ITERATIONS, HASH_BYTES, DIGEST)
    .toString("hex");
};

const createSalt = () => crypto.randomBytes(16).toString("hex");

const createSessionToken = (username) => {
  const payload = `${username}:${Date.now()}:${crypto.randomBytes(8).toString("hex")}`;
  return Buffer.from(payload).toString("base64url");
};

const canUseVercelKV =
  Boolean(process.env.KV_REST_API_URL) && Boolean(process.env.KV_REST_API_TOKEN);

const getKV = async () => {
  if (!canUseVercelKV) return null;
  const module = await import("@vercel/kv");
  return module.kv;
};

const getMemoryStore = () => {
  if (!globalThis.__LEXER_AUTH_STORE__) {
    globalThis.__LEXER_AUTH_STORE__ = new Map();
  }
  return globalThis.__LEXER_AUTH_STORE__;
};

const withStore = async (handler) => {
  const kv = await getKV();
  if (kv) return handler(kv);
  return handler(getMemoryStore());
};

const getFromStore = async (key) => {
  return withStore(async (store) => {
    if (typeof store.get === "function") return store.get(key);
    return store.get(key);
  });
};

const setInStore = async (key, value) => {
  return withStore(async (store) => {
    if (typeof store.set === "function") return store.set(key, value);
    store.set(key, value);
    return value;
  });
};

const getUserKey = (username) => `lexer:auth:user:${normalizeUsername(username)}`;
const getEmailKey = (email) => `lexer:auth:email:${normalizeEmail(email)}`;
const getSeedKey = () => "lexer:auth:seeded";

const seedDemoUsers = async () => {
  const alreadySeeded = await getFromStore(getSeedKey());
  if (alreadySeeded) return;

  for (const demoUser of DEMO_USERS) {
    const username = normalizeUsername(demoUser.username);
    const email = `${username}@local.test`;
    const salt = createSalt();

    const user = {
      username,
      email,
      fullName: username,
      passwordHash: hashPassword(demoUser.password, salt),
      salt,
      createdAt: new Date().toISOString(),
    };

    await setInStore(getUserKey(username), user);
    await setInStore(getEmailKey(email), username);
  }

  await setInStore(getSeedKey(), true);
};

const getUserByUsername = async (username) => {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) return null;
  return getFromStore(getUserKey(normalizedUsername));
};

const getUserByEmail = async (email) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  const username = await getFromStore(getEmailKey(normalizedEmail));
  if (!username) return null;

  return getUserByUsername(username);
};

export const registerUser = async ({ fullName, username, email, password }) => {
  await seedDemoUsers();

  const normalizedUsername = normalizeUsername(username);
  const normalizedEmail = normalizeEmail(email);

  const usernameTaken = await getUserByUsername(normalizedUsername);
  const emailTaken = await getUserByEmail(normalizedEmail);

  if (usernameTaken || emailTaken) {
    const error = new Error("USER_ALREADY_EXISTS");
    error.code = "USER_ALREADY_EXISTS";
    throw error;
  }

  const salt = createSalt();
  const user = {
    username: normalizedUsername,
    email: normalizedEmail,
    fullName: fullName?.trim() || normalizedUsername,
    passwordHash: hashPassword(password, salt),
    salt,
    createdAt: new Date().toISOString(),
  };

  await setInStore(getUserKey(normalizedUsername), user);
  await setInStore(getEmailKey(normalizedEmail), normalizedUsername);

  return {
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  };
};

export const loginUser = async ({ identifier, password }) => {
  await seedDemoUsers();

  const normalizedIdentifier = identifier?.trim()?.toLowerCase() || "";
  if (!normalizedIdentifier) return null;

  const user = normalizedIdentifier.includes("@")
    ? await getUserByEmail(normalizedIdentifier)
    : await getUserByUsername(normalizedIdentifier);

  if (!user) return null;

  const incomingHash = hashPassword(password, user.salt);
  if (incomingHash !== user.passwordHash) return null;

  return {
    token: createSessionToken(user.username),
    user: {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    },
  };
};
