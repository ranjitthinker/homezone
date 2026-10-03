'use client';
import React from 'react';

import AdvanceFilterModal from '@/components/common/advance-filter';
import HeroContent from './HeroContent';
import { useSettings } from '@/context/SettingsProvider';
import Image from 'next/image';

const Hero = () => {
  const settings = useSettings();

  const heroBanner =
    settings?.data?.find((item) => item.key === 'Hero_banner')?.value || '/images/home/home-1.jpg';

  const heroTitle =
    settings?.data?.find((item) => item.key === 'Hero_banner_title')?.value ||
    'Find Your Dream Home with Home Zone';

  const heroSubtitle =
    settings?.data?.find((item) => item.key === 'Hero_banner_subtitle')?.value ||
    'Discover a wide range of verified properties tailored to your needs and lifestyle.';

  return (
    <>
      <section
        id="hero-x"
        className="home-banner-style1 p0"
        style={{
          backgroundImage: heroBanner ? `url(${heroBanner})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh',
          paddingTop: '80px',
        }}
      >
        <div className="home-style1">
          <div className="container">
            <div className="row">
              <div className="col-xl-11 mx-auto">
                <div className="inner-banner-style1 text-center">
                  <h6 className="hero-sub-title animate-up-1">Trusted Real Estate Platform</h6>

                  <h1 className="hero-title animate-up-2 text-white fz45">{heroTitle}</h1>

                  <p className="hero-text fz15 animate-up-3">{heroSubtitle}</p>

                  <HeroContent heroBanner={heroBanner} />
                </div>
              </div>
            </div>
            <a href="#explore-property">
              <div className="mouse_scroll animate-up-4">
                <Image width={20} height={105} src="/images/about/home-scroll.png" alt="scroll image" />
              </div>
            </a>
          </div>
        </div>

        {/* Advance Modal */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
