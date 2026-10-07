'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import { blogsThree } from '@/data/blogs';

const Blog = () => {
  const [blogs, setBlogs] = useState(blogsThree.slice(0, 3));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const res = await apiService.get(`${API_URLS.BLOG}`);
        if (res?.status && Array.isArray(res.data?.data) && res.data.data.length > 0) {
          if (isMounted) {
            setBlogs(res.data.data.slice(0, 3));
          }
        }
      } catch (error) {
        // Fallback to local high quality blogs
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {blogs.map((blog, idx) => {
        const blogImage = blog.featured_image || blog.image || `/images/blog/blog-${(idx % 12) + 1}.jpg`;
        const blogTitle = blog.title || 'Real Estate Trends & Analysis';
        const blogLink = `/blogs/${blog.slug || blog.id}`;
        const categoryName = blog.category?.name || blog.category || blog.tag || 'Market Insights';

        let monthStr = 'Oct';
        let dayStr = '04';
        if (blog.published_at) {
          try {
            const d = new Date(blog.published_at);
            monthStr = d.toLocaleString('default', { month: 'short' });
            dayStr = d.getDate().toString();
          } catch (e) {}
        } else if (blog.date) {
          monthStr = blog.date.month ? blog.date.month.slice(0, 3) : 'Oct';
          dayStr = blog.date.day || '01';
        }

        return (
          <div className="col-sm-6 col-lg-4" key={blog.id || idx}>
            <div className="blog-style1">
              {/* IMAGE */}
              <div className="blog-img">
                <Link href={blogLink}>
                  <Image
                    width={386}
                    height={271}
                    className="w-100 h-100 cover"
                    src={blogImage}
                    alt={blogTitle}
                  />
                </Link>
              </div>

              {/* CONTENT */}
              <div className="blog-content">
                {/* DATE */}
                <div className="date">
                  <span className="month">{monthStr}</span>
                  <span className="day">{dayStr}</span>
                </div>

                {/* CATEGORY */}
                <span className="tag">{categoryName}</span>

                {/* TITLE */}
                <h6 className="title mt-1">
                  <Link href={blogLink}>{blogTitle}</Link>
                </h6>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Blog;
