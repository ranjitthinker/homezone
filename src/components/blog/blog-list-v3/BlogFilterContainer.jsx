'use client';

import React from 'react';
import BlogFilter from './BlogFilter';

export default function BlogFilterContainer() {
  return (
    <section className="our-blog pt-0">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-delay="200">
          <div className="col-xl-12 navpill-style1">
            <BlogFilter />
          </div>
        </div>
      </div>
    </section>
  );
}
