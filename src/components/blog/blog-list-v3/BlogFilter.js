"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const BlogFilter = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(API_URLS.BLOG, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        });
        
        let blogItems = [];
        if (res?.data && Array.isArray(res.data.data)) {
          blogItems = res.data.data;
        } else if (Array.isArray(res?.data)) {
          blogItems = res.data;
        }

        // Filter out any dummy placeholder blogs (id 1 or dummy test slug)
        const realBlogs = blogItems.filter(
          (b) =>
            b.status === "published" &&
            b.id !== 1 &&
            b.slug !== "quis-maiores-eiusmod"
        );

        if (isMounted) {
          setBlogs(realBlogs);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Derive dynamic categories from the real published blogs
  const dynamicCategories = [
    "All",
    ...Array.from(
      new Set(
        blogs
          .map((b) => b.category?.name || b.category)
          .filter(Boolean)
      )
    ),
  ];

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            (blog.category?.name || blog.category) === activeCategory
        );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* Category Filter Pills */}
      {dynamicCategories.length > 1 && (
        <ul className="nav nav-pills mb30 flex-wrap">
          {dynamicCategories.map((category, index) => (
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
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="row">
          {[1, 2].map((n) => (
            <div className="col-sm-6 col-lg-4 mb30" key={n}>
              <div className="card border-0 shadow-sm rounded-3 p-3 placeholder-glow">
                <div
                  className="placeholder col-12 rounded-3 mb-3"
                  style={{ height: "220px", background: "#e2e8f0" }}
                />
                <span className="placeholder col-4 mb-2" />
                <h5 className="placeholder col-10 mb-2" />
                <p className="placeholder col-8" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-5 my-4 bg-light rounded-3">
          <i className="far fa-newspaper fz45 text-muted mb-3 d-block" />
          <h4 className="fw600 text-dark">No Articles Available</h4>
          <p className="text-muted mb-0">
            {activeCategory === "All"
              ? "New blog articles will be published shortly. Stay tuned!"
              : `No articles found in category "${activeCategory}".`}
          </p>
        </div>
      ) : (
        <div className="row">
          {paginatedBlogs.map((blog, idx) => {
            const blogImage =
              blog.featured_image ||
              blog.image ||
              `/images/blog/blog-${(idx % 6) + 1}.jpg`;
            const blogTitle = blog.title || "Real Estate Insights";
            const blogSlug = blog.slug || blog.id;
            const categoryName =
              blog.category?.name || blog.category || "Buying a Home";

            let monthStr = "Oct";
            let dayStr = "15";
            if (blog.published_at) {
              try {
                const d = new Date(blog.published_at);
                monthStr = d.toLocaleString("default", { month: "short" });
                dayStr = d.getDate().toString().padStart(2, "0");
              } catch (e) {}
            } else if (blog.date) {
              monthStr = blog.date.month ? blog.date.month.slice(0, 3) : "Oct";
              dayStr = blog.date.day || "15";
            }

            return (
              <div className="col-sm-6 col-lg-4 mb30" key={blog.id}>
                <div className="blog-style1 h-100 d-flex flex-column shadow-xs rounded-3 overflow-hidden bg-white">
                  <div className="blog-img position-relative">
                    <Link href={`/blogs/${blogSlug}`}>
                      <Image
                        width={386}
                        height={260}
                        unoptimized={Boolean(blogImage?.startsWith("http"))}
                        className="w-100 cover rounded-top-3"
                        style={{ height: "240px", objectFit: "cover" }}
                        src={blogImage}
                        alt={blogTitle}
                      />
                    </Link>
                  </div>
                  <div className="blog-content flex-grow-1 d-flex flex-column p-4">
                    <div className="date">
                      <span className="month">{monthStr}</span>
                      <span className="day">{dayStr}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="tag border-0 bg-transparent p-0 text-start text-primary fw500"
                        onClick={() => handleFilter(categoryName)}
                        title={`Filter by ${categoryName}`}
                      >
                        {categoryName}
                      </button>
                    </div>
                    <h6 className="title mt-2 flex-grow-1 fw600 fz17" style={{ lineHeight: "1.4" }}>
                      <Link href={`/blogs/${blogSlug}`} className="hover-color text-dark text-decoration-none">
                        {blogTitle}
                      </Link>
                    </h6>
                    {blog.excerpt && (
                      <p className="fz14 text-muted mt-2 mb-0 line-clamp-2" style={{ lineHeight: "1.6" }}>
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="mt-3 pt-3 border-top d-flex align-items-center justify-content-between">
                      <span className="fz13 text-muted">
                        <i className="far fa-user mr5" /> {blog.author_name || "Home Zone Editorial"}
                      </span>
                      <Link href={`/blogs/${blogSlug}`} className="fz13 fw600 text-thm hover-color">
                        Read More <i className="fas fa-arrow-right ml5 fz11" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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

