'use client';
import React, { useState, useEffect, useRef } from 'react';

import AdvanceFilterModal from '@/components/common/advance-filter';
import HeroContent from './HeroContent';
import Image from 'next/image';
import Category from './Category';
import VideoBox from './VideoBox';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import SelectDropdown from '@/components/home/home-v2/hero/SelectDropdown';
import { useSettings } from '@/context/SettingsProvider';

const Hero = () => {
  const settings = useSettings();
  const heroBanner = settings?.data?.find((item) => item.key === 'Hero_banner')?.value || '';
  const heroTitle = settings?.data?.find((item) => item.key === 'Hero_banner_title')?.value || '';
  const heroText = settings?.data?.find((item) => item.key === 'Hero_banner_subtitle')?.value || '';

  return (
    <>
      <div
        className="home-style4 maxw1600 bdrs24 position-relative mx-auto mx20-lg"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              <div className="inner-banner-style4">
                <h2 className="hero-title white-text animate-up-1">{heroTitle}</h2>
                <p className="hero-text fz15 animate-up-2">{heroText}</p>

                <div className="home4-floatin-img">
                  <img src="/images/about/element-10.png" alt="image" />
                  <Image
                    width={140}
                    height={120}
                    className="img-1 spin-left d-none d-xl-block contain"
                    src="/images/about/element-10.png"
                    alt="image"
                  />

                  <VideoBox />
                </div>
              </div>
              <HeroContent heroBanner={heroBanner} />
              {/* End Hero content */}

              {/* <!-- Advance Feature Modal Start --> */}
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
              {/* <!-- Advance Feature Modal End --> */}
              <Category />
              {/* End .container */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
