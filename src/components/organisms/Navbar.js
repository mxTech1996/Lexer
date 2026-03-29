"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { dataSite } from "@/data";
import { useLanguage } from "@/i18n/language-provider";
import { CartContext } from "ecommerce-mxtech";
import {
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, lang, setLanguage } = useLanguage();
  const { products } = useContext(CartContext) || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isProducts = true;
  const isAccess = pathname === "/access";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncUser = () => {
      const storedUser = window.localStorage.getItem("lexer:auth-user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    syncUser();
    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const cartCount = products.length;

  const links = [
    {
      href: "/#services",
      label: t("nav.allServices"),
    },
    {
      href: "/#our-services",
      label: t("nav.ourServices"),
    },
    {
      href: "/#references",
      label: t("nav.references"),
    },
    {
      href: "/#know-us",
      label: t("nav.knowUs"),
    },
    {
      href: "/more-information",
      label: t("nav.contactUs"),
    },
  ];

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("lexer:auth-user");
    }

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch {}

    setUser(null);
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-black/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <img
              src={dataSite.iconImage}
              alt={dataSite.name}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {!isAccess && (
            <nav className="hidden lg:flex items-center gap-6">
              {links.map((link) => {
                const isCurrent =
                  link.href === "/more-information"
                    ? pathname === "/more-information"
                    : pathname === "/";

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors ${
                      isCurrent ? "text-black" : "text-black/70 hover:text-black"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-md border border-black/15">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 text-xs rounded ${
                  lang === "es" ? "bg-black text-white" : "text-black"
                }`}
              >
                {t("language.es")}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-xs rounded ${
                  lang === "en" ? "bg-black text-white" : "text-black"
                }`}
              >
                {t("language.en")}
              </button>
            </div>

            {!isAccess && (
              <button
                type="button"
                onClick={() => router.push(isProducts ? "/my-cart" : "/more-information")}
                className="px-3 py-2 text-sm font-semibold rounded-md border border-black/20 hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2"
              >
                {isProducts ? (
                  <>
                    <FiShoppingCart className="text-base" />
                    {cartCount > 0 && (
                      <span className="min-w-5 h-5 px-1 rounded-full bg-black text-white text-xs flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </>
                ) : (
                  t("nav.contactUs")
                )}
              </button>
            )}

            {!isAccess && (
              <button
                type="button"
                onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
                aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-black/20 hover:bg-black hover:text-white transition-colors"
              >
                {isMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {!isAccess && (
        <div
          className={`fixed inset-0 z-[90] transition-all duration-300 ${
            isMenuOpen
              ? "pointer-events-auto bg-black/35 opacity-100"
              : "pointer-events-none bg-black/0 opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <aside
            className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              <div className="px-5 h-20 border-b border-black/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={dataSite.iconImage}
                    alt={dataSite.name}
                    className="h-9 w-auto object-contain"
                  />
                  <span className="text-sm font-semibold text-black truncate">
                    {dataSite.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={t("nav.closeMenu")}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-black/20 hover:bg-black hover:text-white transition-colors shrink-0"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
                <div className="sm:hidden flex items-center gap-1 p-1 rounded-md border border-black/15 w-fit">
                  <button
                    type="button"
                    onClick={() => setLanguage("es")}
                    className={`px-2 py-1 text-xs rounded ${
                      lang === "es" ? "bg-black text-white" : "text-black"
                    }`}
                  >
                    {t("language.es")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-2 py-1 text-xs rounded ${
                      lang === "en" ? "bg-black text-white" : "text-black"
                    }`}
                  >
                    {t("language.en")}
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-3 py-3 rounded-lg text-sm font-semibold text-black/80 hover:text-black hover:bg-black/[0.04] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="border-t border-black/10 pt-5 flex flex-col gap-3 mt-auto">
                  {user ? (
                    <>
                      <div className="flex items-start gap-3 rounded-xl border border-black/10 bg-black/[0.03] px-3 py-3">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                          <FiUser />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-black truncate">
                            {user.fullName || user.username}
                          </p>
                          <p className="text-xs text-black/65 truncate">@{user.username}</p>
                          <p className="text-xs text-black/65 truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-semibold rounded-lg border border-black/20 hover:bg-black hover:text-white transition-colors"
                      >
                        <FiLogOut />
                        <span>{t("nav.signOut")}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/access");
                      }}
                      className="inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-semibold rounded-lg border border-black/20 hover:bg-black hover:text-white transition-colors"
                    >
                      <FiLogIn />
                      <span>{t("nav.signIn")}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
