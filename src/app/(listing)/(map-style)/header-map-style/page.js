import DefaultHeader from '@/components/common/DefaultHeader';
import Footer from '@/components/common/default-footer';
import MobileMenu from '@/components/common/mobile-menu';
import dynamic from 'next/dynamic';
import React from 'react';

export const metadata = {
  title: 'Header Map Style || Homez - Real Estate NextJS Template',
};

// ✅ Only THIS is client-side
const PropertyFilteringMap = dynamic(
  () => import('@/components/listing/map-style/header-map-style/PropertyFilteringMap'),
  { ssr: false }
);

const HeaderMapStyle = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      {/* ✅ Safe now */}
      <PropertyFilteringMap />

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default HeaderMapStyle;
