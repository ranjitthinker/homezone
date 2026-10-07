'use client'
import React, { useState, useEffect, useCallback } from 'react'
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import ListingMap1 from "../ListingMap1";
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';

export default function PropertyFilteringMapFour() {
  const [listings, setListings]       = useState([]);
  const [apiLoading, setApiLoading]   = useState(true);
  const [pageNumber, setPageNumber]   = useState(1);
  const [totalItems, setTotalItems]   = useState(0);
  const [colstyle, setColstyle]       = useState(false);
  const [currentSortingOption, setCurrentSortingOption] = useState('');

  // ✅ Filter state
  const [listingStatus, setListingStatus] = useState('');
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange]       = useState([0, 100000]);
  const [bedrooms, setBedrooms]           = useState(0);
  const [bathroms, setBathroms]           = useState(0);
  const [location, setLocation]           = useState('');
  const [squirefeet, setSquirefeet]       = useState([]);
  const [yearBuild, setyearBuild]         = useState([]);
  const [categories, setCategories]       = useState([]);
  const [searchQuery, setSearchQuery]     = useState('');

  const buildParams = useCallback(() => {
    const params = {};
    if (searchQuery)                              params.q            = searchQuery;
    if (listingStatus && listingStatus !== 'All') params.listed_in   = listingStatus.toLowerCase();
    if (priceRange[0] > 0)                        params.min_price   = priceRange[0];
    if (priceRange[1] < 100000)                   params.max_price   = priceRange[1];
    if (bedrooms > 0)                             params.bedrooms    = bedrooms;
    if (bathroms > 0)                             params.bathrooms   = bathroms;
    if (propertyTypes.length > 0)                 params.property_category_id = propertyTypes.join(',');
    if (squirefeet[0])                            params.min_size_ft = squirefeet[0];
    if (squirefeet[1])                            params.max_size_ft = squirefeet[1];
    if (categories.length > 0)                   params.amenity_ids = categories.join(',');
    if (location)                                 params.city_id     = location;
    if (currentSortingOption === 'Price Low')     params.sort        = 'price_asc';
    if (currentSortingOption === 'Price High')    params.sort        = 'price_desc';
    if (currentSortingOption === 'Newest')        params.sort        = 'newest';
    params.page     = pageNumber;
    params.per_page = 4;
    return params;
  }, [searchQuery, listingStatus, priceRange, bedrooms, bathroms,
      propertyTypes, squirefeet, categories, location, currentSortingOption, pageNumber]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setApiLoading(true);
        const res = await apiService.get(`${API_URLS.PROPERTY}`, { params: buildParams() });
        setListings(res.data?.data ?? []);
        setTotalItems(res.data?.meta?.total ?? 0);
      } catch (err) {
        
      } finally {
        setApiLoading(false);
      }
    };
    fetchProperties();
  }, [buildParams]);

  const resetFilter = () => {
    setListingStatus('');
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation('');
    setSquirefeet([]);
    setyearBuild([]);
    setCategories([]);
    setSearchQuery('');
    setCurrentSortingOption('');
    setPageNumber(1);
  };

  const filterFunctions = {
    handlelistingStatus: (elm) => { setPageNumber(1); setListingStatus(pre => pre === elm ? '' : elm); },
    handlepropertyTypes: (elm) => {
      setPageNumber(1);
      if (elm === 'All') { setPropertyTypes([]); }
      else { setPropertyTypes(pre => pre.includes(elm) ? pre.filter(el => el !== elm) : [...pre, elm]); }
    },
    handlepriceRange:  (elm) => { setPageNumber(1); setPriceRange(elm); },
    handlebedrooms:    (elm) => { setPageNumber(1); setBedrooms(elm); },
    handlebathroms:    (elm) => { setPageNumber(1); setBathroms(elm); },
    handlelocation:    (elm) => { setPageNumber(1); setLocation(elm); },
    handlesquirefeet:  (elm) => { setPageNumber(1); setSquirefeet(elm); },
    handleyearBuild:   (elm) => { setPageNumber(1); setyearBuild(elm); },
    handlecategories:  (elm) => {
      setPageNumber(1);
      if (elm === 'All') { setCategories([]); }
      else { setCategories(pre => pre.includes(elm) ? pre.filter(el => el !== elm) : [...pre, elm]); }
    },
    setPropertyTypes,
    setSearchQuery,
    resetFilter,
    priceRange, listingStatus, propertyTypes,
    bedrooms, bathroms, location,
    squirefeet, yearBuild, categories,
  };

  const pageContentTrac = [
    (pageNumber - 1) * 4 + 1,
    Math.min(pageNumber * 4, totalItems),
    totalItems,
  ];

  return (
    <>
      <div className="offcanvas offcanvas-start p-0" tabIndex="-1"
        id="listingSidebarFilter" aria-labelledby="listingSidebarFilterLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Listing Filter</h5>
          <button type="button" className="btn-close text-reset"
            data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body p-0">
          <ListingSidebar filterFunctions={filterFunctions} />
        </div>
      </div>

      <section className="p-0 bgc-f7">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="200">

            {/* Left — listings */}
            <div className="col-xl-5">
              <div className="half_map_area_content mt30">
                <h4 className="mb-1">Properties</h4>
                <div className="row align-items-center mb10">
                  <TopFilterBar
                    pageContentTrac={pageContentTrac}
                    colstyle={colstyle}
                    setColstyle={setColstyle}
                    setCurrentSortingOption={(opt) => { setPageNumber(1); setCurrentSortingOption(opt); }}
                  />
                </div>

                <div className="row">
                  {apiLoading ? (
                    <div className="text-center py-5">Loading...</div>
                  ) : listings.length === 0 ? (
                    <div className="col-12 text-center py-5">
                      <div className="p-4 bg-white bdrs12 default-box-shadow1">
                        <i className="flaticon-search text-thm fz30 mb-2 d-block" style={{ color: '#eb6753' }} />
                        <h5 className="mb-2">No Properties Found</h5>
                        <p className="text-muted fz14 mb-0">Try adjusting your filters or search terms.</p>
                      </div>
                    </div>
                  ) : (
                    <FeaturedListings colstyle={colstyle} data={listings} />
                  )}
                </div>

                {totalItems > 0 && listings.length > 0 && (
                  <div className="row text-center">
                    <PaginationTwo
                      pageCapacity={4}
                      data={totalItems}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right — map */}
            <div className="col-xl-7 overflow-hidden position-relative">
              <div className="half_map_area">
                  <a
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                  className="filter-btn-left mobile-filter-btn map-page bgc-dark text-white d-block">
                  <span className="flaticon-settings" /> Show Filter
                </a>
                <div className="map-canvas half_style">
                  {/* ✅ Pass listings to map for multiple markers */}
                  <ListingMap1 properties={listings} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}