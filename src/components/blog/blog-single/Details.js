'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';

export default function BlogDetails() {
  const slug = useParams().id;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiService.get(`${API_URLS.BLOG}/${slug}`);
        setBlog(res?.data?.blog ?? null);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="blog-title">{blog.title}</h2>

            <div className="blog-single-meta">
              <div className="post-author d-sm-flex align-items-center">
                <Image width={40} height={40} className="mr10" src="/images/blog/author-1.png" alt="author" />
                <span className="pr15 bdrr1">{blog.author_name}</span>
                <span className="ml15 pr15 bdrr1">{blog.category?.name}</span>
                <span className="ml15">{blog.published_at ? new Date(blog.published_at).toDateString() : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto maxw1600 mt60">
        <div className="row">
          <div className="col-lg-12">
            <div className="large-thumb">
              <Image
                width={1200}
                height={600}
                priority
                className="w-100 h-100 cover"
                src={`${blog.featured_image}`}
                alt={blog.title || 'blog'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt40">
        <div className="row">
          <div className="col-lg-12">
            <p>{blog.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
