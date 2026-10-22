'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import ListingSidebar from '../../sidebar'
import AdvanceFilterModal from '@/components/common/advance-filter-two'
import TopFilterBar from './TopFilterBar'
import FeaturedListings from './FeatuerdListings'
import PaginationTwo from "../../PaginationTwo"
import apiService from '@/utils/api/apiService'
import { API_URLS } from '@/utils/api/apiUrls'

export default function ProperteyFiltering() {
  const router       = useRouter();
  const searchParams = useSearchParams();                         // ✅ read URL params
  const cityFromUrl  = searchParams.get('city') || searchParams.get('city_id') || ''; // ✅ get ?city=7 or ?city_id=7
  const searchQuery  = searchParams.get('q') || '';              // ✅ get ?q=Luxury

  // ✅ Read category / listed_in from URL params
  const categoryParam = searchParams.get('category') || searchParams.get('property_category_id') || '';
  const listedInParam = searchParams.get('listed_in') || '';
  const isCategoryInListedIn = ['commercial', 'residential'].includes((listedInParam || '').toLowerCase());
  const effectiveCategory = (categoryParam || (isCategoryInListedIn ? listedInParam : '')).toLowerCase();
  const effectiveListedIn = !isCategoryInListedIn && ['sale', 'rent'].includes((listedInParam || '').toLowerCase()) ? listedInParam.toLowerCase() : '';

  const [listings, setListings]         = useState([]);
  const [apiLoading, setApiLoading]     = useState(true);
  const [apiError, setApiError]         = useState(null);
  const [pageNumber, setPageNumber]     = useState(1);
  const [totalItems, setTotalItems]     = useState(0);
  const [colstyle, setColstyle]         = useState(false);
  const [currentSortingOption, setCurrentSortingOption] = useState('');

  const [listingStatus, setListingStatus] = useState(effectiveListedIn || '');
  const [propertyTypes, setPropertyTypes] = useState(effectiveCategory ? [effectiveCategory] : []);
  const [priceRange, setPriceRange]       = useState([0, 100000]);
  const [bedrooms, setBedrooms]           = useState(0);
  const [bathroms, setBathroms]           = useState(0);
  const [location, setLocation]           = useState(cityFromUrl); // ✅ init from URL
  const [squirefeet, setSquirefeet]       = useState([]);
  const [yearBuild, setyearBuild]         = useState([]);
  const [categories, setCategories]       = useState([]);
  const [keyword, setKeyword]             = useState(searchQuery); // ✅ init from URL

  // ✅ Sync URL params if user navigates with new params
  useEffect(() => {
    if (cityFromUrl) setLocation(cityFromUrl);
    if (searchQuery) setKeyword(searchQuery);
    if (effectiveCategory) {
      setPropertyTypes([effectiveCategory]);
    } else {
      setPropertyTypes([]);
    }
    if (effectiveListedIn) {
      setListingStatus(effectiveListedIn);
    }
  }, [cityFromUrl, searchQuery, effectiveCategory, effectiveListedIn]);

  const buildParams = useCallback(() => {
    const params = {};

    if (keyword)                          params.q            = keyword;      // ✅ search keyword
    if (location)                         params.city_id      = location;     // ✅ city from URL or filter
    if (listingStatus && listingStatus !== 'All') params.listed_in = listingStatus.toLowerCase();
    if (priceRange[0] > 0)                params.min_price    = priceRange[0];
    if (priceRange[1] < 100000)           params.max_price    = priceRange[1];
    if (bedrooms > 0)                     params.bedrooms     = bedrooms;
    if (bathroms > 0)                     params.bathrooms    = bathroms;
    if (propertyTypes.length > 0) {
      params.property_category_id = propertyTypes.join(',');
    } else if (effectiveCategory) {
      params.property_category_id = effectiveCategory;
    }
    if (squirefeet[0])                    params.min_size_ft  = squirefeet[0];
    if (squirefeet[1])                    params.max_size_ft  = squirefeet[1];
    if (categories.length > 0)           params.amenity_ids  = categories.join(',');
    if (currentSortingOption === 'Price Low')  params.sort = 'price_asc';
    if (currentSortingOption === 'Price High') params.sort = 'price_desc';
    if (currentSortingOption === 'Newest')     params.sort = 'newest';

    params.page     = pageNumber;
    params.per_page = 9;

    return params;
  }, [keyword, location, listingStatus, priceRange, bedrooms, bathroms,
      propertyTypes, effectiveCategory, squirefeet, categories, currentSortingOption, pageNumber]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setApiLoading(true);
        const res = await apiService.get(`${API_URLS.PROPERTY}`, { params: buildParams() });
        setListings(res.data?.data ?? []);
        setTotalItems(res.data?.meta?.total ?? 0);
      } catch (err) {
        
        setApiError('Failed to load properties.');
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
    setLocation('');          // ✅ reset city
    setKeyword('');           // ✅ reset keyword
    setSquirefeet([]);
    setyearBuild([]);
    setCategories([]);
    setCurrentSortingOption('');
    setPageNumber(1);
    router.replace('/properties');
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
    resetFilter,
    priceRange, listingStatus, propertyTypes,
    bedrooms, bathroms, location,
    squirefeet, yearBuild, categories,
  };

  // Client-side strict category isolation guard
  const displayListings = listings.filter((item) => {
    const activeCat = (propertyTypes.length > 0 ? propertyTypes[0] : effectiveCategory).toLowerCase();
    if (!activeCat || activeCat === 'all') return true;

    const catSlug = (item.category?.slug || '').toLowerCase();
    const catName = (item.category?.name || '').toLowerCase();
    const parentName = (item.category?.is_child_of || '').toLowerCase();

    if (activeCat === 'residential') {
      return (
        catSlug === 'residential' ||
        catName === 'residential' ||
        parentName === 'residential' ||
        ['apartment', 'villa', 'builder-floor'].includes(catSlug)
      );
    }
    if (activeCat === 'commercial') {
      return (
        catSlug === 'commercial' ||
        catName === 'commercial' ||
        parentName === 'commercial' ||
        ['office-space', 'shop', 'showroom', 'commercial-spaces'].includes(catSlug)
      );
    }
    return catSlug === activeCat || catName === activeCat;
  });

  const effectiveTotal = displayListings.length > 0
    ? (displayListings.length < listings.length ? displayListings.length : totalItems)
    : 0;

  const currentCategoryTitle =
    effectiveCategory === 'residential'
      ? 'Residential Properties'
      : effectiveCategory === 'commercial'
      ? 'Commercial Properties'
      : 'Explore Properties';

  const currentCategoryDesc =
    effectiveCategory === 'residential'
      ? 'Discover premium verified apartments, villas, and residential developments.'
      : effectiveCategory === 'commercial'
      ? 'Explore prime commercial offices, showrooms, and retail spaces.'
      : 'Find your dream property and commercial investment opportunities.';

  const pageContentTrac = [
    (pageNumber - 1) * 9 + 1,
    Math.min(pageNumber * 9, effectiveTotal),
    effectiveTotal,
  ];

  return (
    <section className="pb90 bgc-f7" style={{ paddingTop: '100px' }}>
      <div className="container">

        {/* Clean Header Bar with Title & Mobile Filter Trigger */}
        <div className="row align-items-center justify-content-between mb25 pt10">
          <div className="col-md-9 col-12">
            <h2 className="title fz28 fw700 mb-1" style={{ color: '#181a20' }}>
              {currentCategoryTitle}
            </h2>
            <p className="paragraph fz14 text-muted mb-0">{currentCategoryDesc}</p>
          </div>
          <div className="col-md-3 col-12 text-md-end mt-2 mt-md-0 d-block d-lg-none">
            <a
              className="filter-btn-left mobile-filter-btn ud-btn btn-white"
              data-bs-toggle="offcanvas"
              href="#listingSidebarFilter"
              role="button"
              aria-controls="listingSidebarFilter"
              style={{
                borderRadius: '30px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1px solid #ddd',
                background: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span className="flaticon-settings" /> Filter Options
            </a>
          </div>
        </div>

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

        <div className="advance-feature-modal">
          <div className="modal fade" id="advanceSeachModalTwo" tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel" aria-hidden="true">
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>

        <div className="row">
          <TopFilterBar
            pageContentTrac={pageContentTrac}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={(opt) => { setPageNumber(1); setCurrentSortingOption(opt); }}
          />
        </div>

        <div className="row">
          {apiLoading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border" role="status" style={{ color: '#eb6753' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="mt-2 text-muted fz14">Loading properties...</div>
            </div>
          ) : apiError ? (
            <div className="col-12 text-center py-5">
              <div className="text-danger mb-3 fz16">{apiError}</div>
              <button type="button" onClick={resetFilter} className="ud-btn btn-thm">
                Reset Filters
              </button>
            </div>
          ) : displayListings.length === 0 ? (
            <div className="col-12 text-center py-5">
              <div
                style={{
                  maxWidth: '560px',
                  margin: '0 auto',
                  padding: '48px 24px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #ebebeb',
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    background: '#fff3ee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#eb6753',
                    fontSize: '32px',
                  }}
                >
                  <i className="flaticon-search" />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#181a20', marginBottom: '10px' }}>
                  No Properties Found
                </h3>
                <p style={{ color: '#717171', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  {keyword
                    ? `We couldn't find any properties matching "${keyword}".`
                    : `We couldn't find any ${effectiveCategory ? effectiveCategory + ' ' : ''}properties matching your current filter criteria.`}
                  <br />
                  Try adjusting your search terms or clearing your filters to see all available properties.
                </p>
                <button
                  type="button"
                  onClick={resetFilter}
                  className="ud-btn btn-thm"
                  style={{
                    padding: '12px 30px',
                    borderRadius: '30px',
                    fontWeight: '600',
                    fontSize: '14px',
                    boxShadow: '0 4px 15px rgba(235, 103, 83, 0.35)',
                  }}
                >
                  Clear All Filters <i className="fal fa-arrow-right-long ms-2" />
                </button>
              </div>
            </div>
          ) : (
            <FeaturedListings colstyle={colstyle} data={displayListings} />
          )}
        </div>

        {effectiveTotal > 0 && displayListings.length > 0 && (
          <div className="row">
            <PaginationTwo
              pageCapacity={9}
              data={{ total: effectiveTotal }}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
        )}

      </div>
    </section>
  );
}