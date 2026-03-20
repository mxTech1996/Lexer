"use client";

import { CartContext, Typography } from "ecommerce-mxtech";
import { usePathname, useRouter } from "next/navigation";
import { dataSite } from "@/data";
import { useContext } from "react";

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

const clampText = (text, maxLength) => {
  const safeText = String(text || "").trim();
  if (!safeText) return "";
  if (safeText.length <= maxLength) return safeText;
  return `${safeText.slice(0, maxLength - 1)}…`;
};

export default function ProductsSection() {
  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);
  const router = useRouter();

  const pathname = usePathname();
  const isProducts = pathname === "/products";
  const productsOver50 = dataSite.products.filter(
    (product) => parseFloat(product.price) > 50,
  );
  const additionalsProduts = dataSite.products.filter(
    (product) => parseFloat(product.price) <= 50,
  );
  return (
    <div className="container mx-auto flex flex-col gap-20 my-24">
      <div id="services">
        <Typography.Title level={3} className="font-medium mb-10 text-center">
          All Products
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
                        {formatUSD(product.price)}
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
                        {isInCart ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full py-2 px-4 bg-black text-white rounded-md"
                        onClick={() => router.push("/more-information")}
                      >
                        Contact Us
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
        Our additional products
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
                      {formatUSD(product.price)}
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
                      {isInCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-black text-white rounded-md"
                      onClick={() => router.push("/more-information")}
                    >
                      Contact Us
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
