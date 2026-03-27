'use client';
import { Footer as FooterComponent } from 'ecommerce-mxtech';
import { useLanguage } from '@/i18n/language-provider';

const Footer = () => {
  const { t } = useLanguage();
  const footerData = [
    {
      href: '/pdf/AP.pdf',
      label: t('footer.privacy'),
    },
    {
      href: '/pdf/TYC.pdf',
      label: t('footer.terms'),
    },
  ];

  return (
    <FooterComponent
      backgroundColor='transparent'
      legal={footerData}
      onRedirect={(path) => {
        window.open(path, '_blank');
      }}
      visaImage='/images/visaMaster.png'
      masterImage='/images/openpay.jpg'
    />
  );
};

export default Footer;
