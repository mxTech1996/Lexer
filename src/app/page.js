'use client';
import { useEffect, useState } from 'react';
import {
  Missions,
  References,
  Typography,
  Hero,
  Features,
} from 'ecommerce-mxtech';
import Footer from '@/components/organisms/Footer';
import Navbar from '@/components/organisms/Navbar';
import { dataSite } from '@/data';
import LoginPage from './access';
import ProductsSection from '@/components/organisms/Products';
import { useLanguage } from '@/i18n/language-provider';
import { getHomeDataByLanguage } from '@/i18n/home-content';

export default function Home() {
  const { t, lang } = useLanguage();
  const homeData = getHomeDataByLanguage(lang, dataSite);

  const [isAccessSite, setIsAccessSite] = useState(() => {
    if (typeof window === 'undefined') return null;
    return window.location.host?.startsWith('access.');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsAccessSite(window.location.host?.startsWith('access.'));
  }, []);

  if (isAccessSite === null) return null;
  if (isAccessSite) return <LoginPage />;
  return (
    <main
      style={{
        backgroundColor: '#DEF6F8FF',
      }}
    >
      <Navbar />
      <div className='relative'>
        <Hero
          variant='background-img'
          src={dataSite.image_hero}
          colorText='#FCFCFCFF'
          title={homeData.subtitle}
          description={homeData.description}
          srcSecondary={dataSite.image_hero2}
          withSubView
          images={[dataSite.image_hero, dataSite.image_hero2]}
          styleTextSecondSection={{
            color: 'black',
          }}
          withShadowText
          contentThirdSection={
            <div
              style={{ zIndex: 2 }}
              className='flex flex-col px-48'
              id='know-us'
            >
              <Typography.Title
                level={3}
                className='font-medium mb-10 text-center text-white'
              >
                {t('home.knowUs')}
              </Typography.Title>
              <Missions
                textColor='#fff'
                data={homeData.info}
                gridColumns={1}
                variant='text'
              />
            </div>
          }
        />
      </div>
      <div className='container mx-auto flex flex-col gap-20 my-24'>
        <div className='flex flex-col' id='our-services'>
          <Typography.Title level={3} className='font-medium mb-10 text-center'>
            {t('home.ourServices')}
          </Typography.Title>
          <Features
            gridColumns={2}
            variant='card'
            features={homeData.services}
          />
        </div>
        {/* <div id='services'>
          {dataSite.products.length > 1 && (
            <ProductSection
              withCategoryFilter={false}
              title='All Services'
              gridColumns={2}
              variant='grid'
              productItemVariant='vertical'
              onClickImage={(id) => {
                router.push(`/product/${id}`);
              }}
              productVersion='1'
              carouselOptions={{
                arrowColor: 'black',
                fade: true,
                autoPlay: false,
                direction: 'horizontal',
              }}
              backgroundItemColor='#FBFBFB'
              stylesItem={{
                borderRadius: 12,
              }}
            />
          )}
        </div> */}
        <ProductsSection />

        <div className='flex flex-col' id='references'>
          <Typography.Title level={3} className='font-medium mb-10 text-center'>
            {t('home.references')}
          </Typography.Title>
          <References
            carouselOptions={{
              arrowColor: 'black',
              fade: true,
              autoPlay: false,
              direction: 'horizontal',
            }}
            variantItem='card'
            variant='grid'
            backgroundColor='#BADEE5FF'
            references={homeData.references}
            gridColumns={2}
            titleAlign='center'
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
