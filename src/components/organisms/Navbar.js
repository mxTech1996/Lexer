"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { dataSite } from "@/data";
import { useLanguage } from "@/i18n/language-provider";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, lang, setLanguage } = useLanguage();
  const isProducts = pathname === "/products";
  const isAccess = pathname === "/access";

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

  return (
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
          <div className="flex items-center gap-1 p-1 rounded-md border border-black/15">
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
              className="px-3 py-2 text-sm font-semibold rounded-md border border-black/20 hover:bg-black hover:text-white transition-colors"
            >
              {isProducts ? t("nav.cart") : t("nav.contactUs")}
            </button>
          )}
        </div>
      </div>

      {!isAccess && (
        <div className="lg:hidden border-t border-black/10">
          <nav className="container mx-auto px-4 py-3 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-black/80 hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
