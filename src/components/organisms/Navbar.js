"use client";
import { usePathname, useRouter } from "next/navigation";
import { dataSite, navData } from "@/data";
import { Navbar as NavbarV2, theme } from "ecommerce-mxtech";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isProducts = pathname === "/products";

  return (
    <NavbarV2
      withSearch={false}
      linksProps={{
        variant: "underline",
        align: "right",
      }}
      textColor="black"
      withLogo={true}
      imageProps={{
        src: dataSite.iconImage,
        style: {
          height: 40,
        },
      }}
      styleTitle={{
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
      }}
      links={navData}
      onClickProduct={(product) => {
        console.log("product", product);
        router.push(`/product/${product.id}`);
      }}
      buttonCartProps={{
        // show only when is in path products
        style: {
          display: isProducts ? "block" : "none",
        },
        onClick: () => {
          if (!isProducts) {
            router.push("/more-information");
            return;
          }
          router.push("/my-cart");
        },
      }}
      buttonContactProps={{
        onClick: () => router.push("/more-information"),
      }}
      onRedirect={(path) => {
        console.log("path", path);
        router.push(path);
      }}
      styleHeader={{
        height: 100,
        color: "black",
      }}
    />
  );
};

export default Navbar;
