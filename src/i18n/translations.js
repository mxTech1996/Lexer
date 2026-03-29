export const SUPPORTED_LANGUAGES = ["es", "en"];
export const DEFAULT_LANGUAGE = "es";

export const translations = {
  es: {
    language: {
      label: "Idioma",
      es: "ES",
      en: "EN",
    },
    nav: {
      allServices: "Todos los servicios",
      ourServices: "Nuestros servicios",
      references: "Referencias",
      knowUs: "Conocenos",
      contactUs: "Contactanos",
      cart: "Carrito",
    },
    footer: {
      privacy: "Privacidad",
      terms: "Terminos",
    },
    home: {
      knowUs: "Conocenos",
      ourServices: "Nuestros servicios",
      references: "Referencias",
    },
    products: {
      allProducts: "Todos los productos",
      additionalProducts: "Productos adicionales",
      removeFromCart: "Quitar del carrito",
      addToCart: "Agregar al carrito",
      contactUs: "Contactanos",
    },
    cart: {
      back: "Atras",
      goToPay: "Ir a pagar",
      buyMore: "Comprar mas",
      goHome: "Ir al inicio",
      authRequired: "Necesitas iniciar sesion o registrarte para pagar.",
    },
    access: {
      signInTab: "Iniciar sesion",
      signUpTab: "Crear cuenta",
      loginTitle: "Bienvenido de nuevo",
      loginSubtitle: "Inicia sesion para acceder a tu cuenta",
      registerTitle: "Crea tu cuenta",
      registerSubtitle: "Registrate para empezar a comprar",
      fullName: "Nombre completo",
      username: "Usuario",
      email: "Correo",
      password: "Contrasena",
      confirmPassword: "Confirmar contrasena",
      identifier: "Usuario o correo",
      signIn: "Entrar",
      signUp: "Registrarme",
      signingIn: "Entrando...",
      signingUp: "Registrando...",
      passwordsMismatch: "Las contrasenas no coinciden",
      invalidCredentials: "Usuario/correo o contrasena incorrectos",
      duplicatedUser: "El usuario o correo ya esta registrado",
      genericError: "No fue posible completar la operacion",
      registerSuccess: "Registro exitoso. Ahora inicia sesion.",
    },
  },
  en: {
    language: {
      label: "Language",
      es: "ES",
      en: "EN",
    },
    nav: {
      allServices: "All services",
      ourServices: "Our Services",
      references: "References",
      knowUs: "Know Us",
      contactUs: "Contact Us",
      cart: "Cart",
    },
    footer: {
      privacy: "Privacy",
      terms: "Terms",
    },
    home: {
      knowUs: "Know Us",
      ourServices: "Our Services",
      references: "References",
    },
    products: {
      allProducts: "All Products",
      additionalProducts: "Our additional products",
      removeFromCart: "Remove from Cart",
      addToCart: "Add to Cart",
      contactUs: "Contact Us",
    },
    cart: {
      back: "Back",
      goToPay: "Go to pay",
      buyMore: "Buy more",
      goHome: "Go home",
      authRequired: "You need to sign in or sign up before checkout.",
    },
    access: {
      signInTab: "Sign in",
      signUpTab: "Create account",
      loginTitle: "Welcome Back",
      loginSubtitle: "Please sign in to access your account",
      registerTitle: "Create your account",
      registerSubtitle: "Sign up to start shopping",
      fullName: "Full name",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      identifier: "Username or email",
      signIn: "Sign In",
      signUp: "Sign Up",
      signingIn: "Signing in...",
      signingUp: "Creating account...",
      passwordsMismatch: "Passwords do not match",
      invalidCredentials: "Invalid username/email or password",
      duplicatedUser: "That username or email is already in use",
      genericError: "Could not complete the operation",
      registerSuccess: "Account created. You can sign in now.",
    },
  },
};

export const getTranslation = (lang, key, fallback = "") => {
  const selectedLang = SUPPORTED_LANGUAGES.includes(lang)
    ? lang
    : DEFAULT_LANGUAGE;

  const value = key
    .split(".")
    .reduce((accumulator, currentKey) => accumulator?.[currentKey], translations[selectedLang]);

  return typeof value === "string" ? value : fallback;
};
