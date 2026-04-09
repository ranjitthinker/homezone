'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await apiService.get(`${API_URLS.BLOG}`); 

      if (res?.status) {
        setBlogs(res.data.data);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    } 
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <>
      {blogs.map((blog) => (
        <div className="col-sm-6 col-lg-4" key={blog.id}>
          <div className="blog-style1">
            {/* IMAGE */}
            <div className="blog-img">
              <Image
                width={386}
                height={271}
                className="w-100 h-100 cover"
                src={`${blog.featured_image}`}
                alt={blog.title}
              />  
            </div>

            {/* CONTENT */}
            <div className="blog-content">
              {/* DATE */}
              <div className="date">
                <span className="month">
                  {new Date(blog.published_at).toLocaleString('default', { month: 'short' })}
                </span>
                <span className="day">{new Date(blog.published_at).getDate()}</span>
              </div>

              {/* CATEGORY */}
              <span className="tag">{blog.category?.name}</span>

              {/* TITLE */}
              <h6 className="title mt-1">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
