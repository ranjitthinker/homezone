"use client";
import { blogsThree } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const BlogFilter = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const categories = [
    "All",
    "Home Improvement",
    "Life & Style",
    "Finance",
    "Selling a Home",
    "Renting a Home",
    "Buying a Home",
  ];

  const filteredBlogs =
    activeCategory === "All"
      ? blogsThree
      : blogsThree.filter((blog) => blog.category === activeCategory);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <ul className="nav nav-pills mb30 flex-wrap">
        {categories.map((category, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link mb-2 mb-lg-0 fw500 dark-color ${
                category === activeCategory ? "active" : ""
              }`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      {/* End nav */}

      <div className="row">
        {paginatedBlogs.map((blog) => (
          <div className="col-sm-6 col-lg-4 mb30" key={blog.id}>
            <div className="blog-style1 h-100 d-flex flex-column">
              <div className="blog-img">
                <Link href={`/blogs/${blog.slug || blog.id}`}>
                  <Image
                    width={386}
                    height={271}
                    className="w-100 h-100 cover rounded-3"
                    src={blog.image}
                    alt={blog.title}
                  />
                </Link>
              </div>
              <div className="blog-content flex-grow-1 d-flex flex-column">
                <div className="date">
                  <span className="month">
                    {blog.date?.month ? blog.date.month.slice(0, 3) : "Oct"}
                  </span>
                  <span className="day">{blog.date?.day || "01"}</span>
                </div>
                <div>
                  <button
                    type="button"
                    className="tag border-0 bg-transparent p-0 text-start"
                    onClick={() => handleFilter(blog.category)}
                    title={`Filter by ${blog.category}`}
                  >
                    {blog.tag || blog.category}
                  </button>
                </div>
                <h6 className="title mt-2 flex-grow-1">
                  <Link href={`/blogs/${blog.slug || blog.id}`} className="hover-color">
                    {blog.title}
                  </Link>
                </h6>
                <p className="fz13 text-muted mt-2 mb-0 line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Pagination when more than 1 page */}
      {totalPages > 1 && (
        <div className="row mt20 mb30">
          <div className="col-12">
            <ul className="page_navigation d-flex justify-content-center align-items-center list-unstyled gap-2 m-0 p-0">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <span className="fas fa-angle-left" />
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                  key={page}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <span className="fas fa-angle-right" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogFilter;
