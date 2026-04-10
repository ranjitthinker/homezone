import DefaultHeader from '@/components/common/DefaultHeader';
import MobileMenu from '@/components/common/mobile-menu';
import MapV3Client from './MapV3Client';

export const metadata = {
  title: 'Map V3 || Homez - Real Estate NextJS Template',
};

const MapV3 = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* start  filter sidebar */}
      <MapV3Client />

      {/* Property Filtering */}
    </>
  );
};

export default MapV3;
