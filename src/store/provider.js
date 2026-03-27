'use client';
import { MainProvider } from 'ecommerce-mxtech';
import { dataSite, primaryColor } from '@/data';
import { useLanguage } from '@/i18n/language-provider';
import { getLocalizedProducts } from '@/i18n/product-content';

const Provider = ({ children }) => {
  const { lang } = useLanguage();
  const localizedProducts = getLocalizedProducts(lang, dataSite.products);

  const products = localizedProducts.map((product) => {
    return {
      ...product,
      content: product.content.split(', '),
      product_type: product.product_type?.toLowerCase(),
    };
  });

  return (
    <MainProvider
      pageName={dataSite.name}
      products={products}
      address={dataSite.address}
      email={dataSite.email}
      phoneNumber={dataSite.telephone}
      locale={lang}
      colorPrimary={primaryColor}
    >
      {children}
    </MainProvider>
  );
};

export default Provider;
