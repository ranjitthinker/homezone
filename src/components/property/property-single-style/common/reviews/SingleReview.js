'use client';

import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import Image from 'next/image';
import React from 'react';

const SingleReview = ({ review }) => {
  return (
    <div className="col-md-12">
      <div className="d-flex mt30 mb30-sm">
        <Image width={60} height={60} src="/images/blog/comments-2.png" alt="user" />

        <div className="ml20">
          <h6>{review.name}</h6>
          <span>{review.created_at}</span>

          <div>
            {[...Array(review.rating)].map((_, i) => (
              <i key={i} className="fas fa-star review-color2 fz10" />
            ))}
          </div>
        </div>
      </div>

      <p>{review.review}</p>
    </div>
  );
};

export default SingleReview;
