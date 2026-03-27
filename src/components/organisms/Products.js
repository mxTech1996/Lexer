"use client";

import { CartContext, Typography } from "ecommerce-mxtech";
import { useRouter } from "next/navigation";
import { dataSite } from "@/data";
import { useContext } from "react";
import { useLanguage } from "@/i18n/language-provider";
import { getLocalizedProducts } from "@/i18n/product-content";

const USD_TO_MXN_RATE = 17;

const formatUSD = (value) => {
  const numberValue =
    typeof value === "number" ? value : Number.parseFloat(String(value));
  if (Number.isNaN(numberValue)) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
};

const formatMXN = (value) => {
  const numberValue =
    typeof value === "number" ? value : Number.parseFloat(String(value));
  if (Number.isNaN(numberValue)) return "$0";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
};

const toMXN = (usdValue) => {
  const numberValue =
    typeof usdValue === "number"
      ? usdValue
      : Number.parseFloat(String(usdValue));
  if (Number.isNaN(numberValue)) return 0;
  return numberValue * USD_TO_MXN_RATE;
};

const clampText = (text, maxLength) => {
  const safeText = String(text || "").trim();
  if (!safeText) return "";
  if (safeText.length <= maxLength) return safeText;
  return `${safeText.slice(0, maxLength - 1)}…`;
};

export default function ProductsSection() {
  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);
  const { t, lang } = useLanguage();
  const router = useRouter();

  const isProducts = true;
  const isSpanish = lang === "es";
  const splitThreshold = isSpanish ? toMXN(50) : 50;
  const localizedProducts = getLocalizedProducts(lang, dataSite.products);

  const productsOver50 = localizedProducts.filter(
    (product) => {
      const productValue = isSpanish ? toMXN(product.price) : parseFloat(product.price);
      return productValue > splitThreshold;
    },
  );

  const additionalsProduts = localizedProducts.filter(
    (product) => {
      const productValue = isSpanish ? toMXN(product.price) : parseFloat(product.price);
      return productValue <= splitThreshold;
    },
  );

  const formatPrice = (price) => {
    if (isSpanish) {
      return `${formatMXN(toMXN(price))} MXN`;
    }
    return `${formatUSD(price)} USD`;
  };

  return (
    <div className="container mx-auto flex flex-col gap-20 my-24">
      <div id="services">
        <Typography.Title level={3} className="font-medium mb-10 text-center">
          {t("products.allProducts")}
        </Typography.Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {productsOver50.map((product) => {
            const isInCart = validateProductInCart(product.id);
            return (
              <div
                key={product.id}
                className="bg-[#FBFBFB] rounded-xl overflow-hidden border border-black/5"
              >
                <div type="button" className="w-full text-left">
                  <div className="w-full aspect-[4/3] bg-black/5 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-base font-semibold whitespace-nowrap">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-sm text-black/70">
                      {clampText(product.description, 160)}
                    </p>

                    {isProducts ? (
                      <button
                        type="button"
                        className="w-full py-2 px-4 bg-black text-white rounded-md"
                        onClick={() => handleAddOrRemoveProduct(product.id)}
                      >
                        {isInCart
                          ? t("products.removeFromCart")
                          : t("products.addToCart")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full py-2 px-4 bg-black text-white rounded-md"
                        onClick={() => router.push("/more-information")}
                      >
                        {t("products.contactUs")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* additionals products */}
      <Typography.Title level={3} className="font-medium mb-10 text-center">
        {t("products.additionalProducts")}
      </Typography.Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {additionalsProduts.map((product) => {
          const isInCart = validateProductInCart(product.id);
          return (
            <div
              key={product.id}
              className="bg-[#FBFBFB] rounded-xl overflow-hidden border border-black/5"
            >
              <div type="button" className="w-full text-left">
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-tight">
                      {product.name}
                    </h3>
                    <span className="text-base font-semibold whitespace-nowrap">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-sm text-black/70">
                    {clampText(product.description, 160)}
                  </p>

                  {isProducts ? (
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-black text-white rounded-md"
                      onClick={() => handleAddOrRemoveProduct(product.id)}
                    >
                      {isInCart
                        ? t("products.removeFromCart")
                        : t("products.addToCart")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-black text-white rounded-md"
                      onClick={() => router.push("/more-information")}
                    >
                      {t("products.contactUs")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
