"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/i18n/language-provider";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const redirectPath = searchParams.get("redirect") || "/products";

  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getErrorByCode = (code) => {
    if (code === "INVALID_CREDENTIALS") return t("access.invalidCredentials");
    if (code === "USER_ALREADY_EXISTS") return t("access.duplicatedUser");
    return t("access.genericError");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password: loginPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(getErrorByCode(data?.error));
        return;
      }

      window.localStorage.setItem("lexer:auth-user", JSON.stringify(data.user));
      router.push(redirectPath);
    } catch (requestError) {
      setError(t("access.genericError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (registerPassword !== confirmPassword) {
      setError(t("access.passwordsMismatch"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(getErrorByCode(data?.error));
        return;
      }

      setSuccess(t("access.registerSuccess"));
      setMode("login");
      setIdentifier(registerUsername || registerEmail);
      setRegisterPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(t("access.genericError"));
    } finally {
      setIsLoading(false);
    }
  };

  const isLoginMode = mode === "login";

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground rounded-lg shadow-lg">
        <div className="flex gap-2 p-1 rounded-lg bg-black/5">
          <button
            type="button"
            className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
              isLoginMode ? "bg-black text-white" : "text-black"
            }`}
            onClick={() => {
              setMode("login");
              setError("");
              setSuccess("");
            }}
          >
            {t("access.signInTab")}
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
              !isLoginMode ? "bg-black text-white" : "text-black"
            }`}
            onClick={() => {
              setMode("register");
              setError("");
              setSuccess("");
            }}
          >
            {t("access.signUpTab")}
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            {isLoginMode ? t("access.loginTitle") : t("access.registerTitle")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isLoginMode
              ? t("access.loginSubtitle")
              : t("access.registerSubtitle")}
          </p>
        </div>

        {isLoginMode ? (
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block mb-2 text-sm font-medium text-foreground"
              >
                {t("access.identifier")}
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block mb-2 text-sm font-medium text-foreground"
              >
                {t("access.password")}
              </label>
              <input
                id="login-password"
                name="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="********"
              />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-300 disabled:opacity-70"
              >
                {isLoading ? t("access.signingIn") : t("access.signIn")}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="full-name"
                className="block mb-2 text-sm font-medium text-foreground"
              >
                {t("access.fullName")}
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="register-username"
                className="block mb-2 text-sm font-medium text-foreground"
              >
                {t("access.username")}
              </label>
              <input
                id="register-username"
                name="register-username"
                type="text"
                required
                minLength={3}
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="julio"
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block mb-2 text-sm font-medium text-foreground"
              >
                {t("access.email")}
              </label>
              <input
                id="register-email"
                name="register-email"
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block mb-2 text-sm font-medium text-foreground"
              >
                {t("access.password")}
              </label>
              <input
                id="register-password"
                name="register-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="********"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-foreground"
              >
                {t("access.confirmPassword")}
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="********"
              />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-300 disabled:opacity-70"
              >
                {isLoading ? t("access.signingUp") : t("access.signUp")}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
