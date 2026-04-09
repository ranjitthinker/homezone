'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HeroContent = () => {
  const router = useRouter();

  return (
    <div className="advance-search-tab mt60 mt30-lg mx-auto animate-up-3">
      <div className="advance-content-style1">
        <div className="row">
          <div className="col-md-8 col-lg-9">
            <div className="advance-search-field position-relative text-start">
              <form className="form-search position-relative">
                <div className="box-search">
                  <span className="icon flaticon-home-1" />
                  <input
                    className="form-control bgc-f7 bdrs12"
                    type="text"
                    name="search"
                    placeholder="Search Properties..."
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
              <button
                className="advance-search-btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#advanceSeachModal"
              >
                <span className="flaticon-settings" /> Advanced
              </button>
              <button
                className="advance-search-icon ud-btn btn-dark ms-4"
                type="button"
                onClick={() => router.push('/grid-full-3-col')}
              >
                <span className="flaticon-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
