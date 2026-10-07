"use client";
import React from "react";

const PaginationTwo = ({
  pageNumber = 1,
  setPageNumber,
  data,
  pageCapacity = 9,
}) => {
  const capacity = Number(pageCapacity) || 9;
  const total =
    typeof data === 'number'
      ? data
      : (typeof data?.total === 'number'
          ? data.total
          : (Array.isArray(data) ? data.length : 0));

  if (!total || total <= 0) {
    return null;
  }

  const totalPages = Math.ceil(total / capacity);

  const handlePrevious = () => {
    if (pageNumber > 1 && setPageNumber) {
      setPageNumber((pre) => pre - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages && setPageNumber) {
      setPageNumber((pre) => pre + 1);
    }
  };

  const startItem = (pageNumber - 1) * capacity + 1;
  const endItem = Math.min(pageNumber * capacity, total);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    if (pageNumber <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (pageNumber >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', pageNumber, '...', totalPages];
  };

  return (
    <div className="mbp_pagination text-center">
      {totalPages > 1 && (
        <ul className="page_navigation">
          <li className={`page-item pointer ${pageNumber <= 1 ? 'disabled' : ''}`}>
            <span
              className="page-link"
              onClick={handlePrevious}
              style={{ cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer' }}
            >
              <span className="fas fa-angle-left" />
            </span>
          </li>

          {getPageNumbers().map((p, idx) =>
            p === '...' ? (
              <li key={`ellipsis-${idx}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            ) : (
              <li
                key={`page-${p}`}
                onClick={() => setPageNumber && setPageNumber(p)}
                className={pageNumber === p ? "active page-item pointer" : "page-item pointer"}
              >
                <span className="page-link">{p}</span>
              </li>
            )
          )}

          <li className={`page-item pointer ${pageNumber >= totalPages ? 'disabled' : ''}`}>
            <span
              className="page-link"
              onClick={handleNext}
              style={{ cursor: pageNumber >= totalPages ? 'not-allowed' : 'pointer' }}
            >
              <span className="fas fa-angle-right" />
            </span>
          </li>
        </ul>
      )}
      <p className="mt10 pagination_page_count text-center">
        Showing {startItem}-{endItem} of {total} {total === 1 ? 'property' : 'properties'} available
      </p>
    </div>
  );
};

export default PaginationTwo;
