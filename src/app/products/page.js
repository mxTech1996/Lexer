'use client';

import { Typography } from 'ecommerce-mxtech';
import { useRouter } from 'next/navigation';
import Footer from '@/components/organisms/Footer';
import Navbar from '@/components/organisms/Navbar';
import { dataSite } from '@/data';
import ProductsSection from '@/components/organisms/Products';



export default function ProductsPage() {
  const router = useRouter();

  return (
    <main
      style={{
        backgroundColor: '#DEF6F8FF',
      }}
    >
      <Navbar />
      <ProductsSection />
      <Footer />
    </main>
  );
}
