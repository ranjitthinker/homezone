'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import { allblogs } from '@/data/blogs';
import Social from './Social';

export default function BlogDetails({ id: propId }) {
  const params = useParams();
  const rawId = propId || params?.id;
  const slug = rawId ? decodeURIComponent(rawId.toString()) : '';

  const [blog, setBlog] = useState(() => {
    return (
      allblogs.find(
        (b) =>
          b.id.toString() === slug ||
          b.slug === slug ||
          b.slug === slug.toLowerCase()
      ) || null
    );
  });
  const [loading, setLoading] = useState(!blog);

  useEffect(() => {
    // If already found in local static articles, use it
    const localMatch = allblogs.find(
      (b) =>
        b.id.toString() === slug ||
        b.slug === slug ||
        b.slug === slug.toLowerCase()
    );

    if (localMatch) {
      setBlog(localMatch);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(`${API_URLS.BLOG}/${slug}`);
        if (res?.data?.blog) {
          const apiBlog = res.data.blog;
          // Normalize API blog to match our display schema
          setBlog({
            id: apiBlog.id,
            slug: apiBlog.slug || apiBlog.id.toString(),
            title: apiBlog.title,
            image: apiBlog.featured_image || '/images/blog/blog-1.jpg',
            category: apiBlog.category?.name || 'Real Estate',
            tag: apiBlog.category?.name || 'Market Trends',
            readTime: '5 min read',
            date: {
              month: apiBlog.published_at
                ? new Date(apiBlog.published_at).toLocaleString('default', { month: 'long' })
                : 'October',
              day: apiBlog.published_at
                ? new Date(apiBlog.published_at).getDate().toString().padStart(2, '0')
                : '01',
              year: apiBlog.published_at
                ? new Date(apiBlog.published_at).getFullYear()
                : 2026,
            },
            author: {
              name: apiBlog.author_name || 'Home Zone Editorial',
              role: 'Real Estate Research Specialist',
              avatar: '/images/blog/author-1.png',
            },
            intro: apiBlog.excerpt || '',
            contentHtml: apiBlog.content || '',
            tags: [apiBlog.category?.name || 'Real Estate', 'Property Guide', 'Investment'],
          });
        } else {
          // Fallback to first blog if nothing returned
          setBlog(allblogs[0]);
        }
      } catch (error) {
        // Fallback to first blog so user never sees a broken page
        setBlog(allblogs[0]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading article...</span>
        </div>
        <p className="mt-3 text-muted">Loading article details...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h3>Article Not Found</h3>
        <p className="text-muted">The blog post you are looking for is currently unavailable.</p>
        <Link href="/blog" className="ud-btn btn-thm mt20">
          Back to Blog List <i className="fal fa-arrow-right-long ml10" />
        </Link>
      </div>
    );
  }

  // Find previous and next articles for bottom navigation
  const currentIndex = allblogs.findIndex(
    (b) => b.id.toString() === blog.id?.toString() || b.slug === blog.slug
  );
  const prevBlog =
    currentIndex > 0
      ? allblogs[currentIndex - 1]
      : allblogs[allblogs.length - 1];
  const nextBlog =
    currentIndex >= 0 && currentIndex < allblogs.length - 1
      ? allblogs[currentIndex + 1]
      : allblogs[0];

  const publishDateStr = blog.date
    ? `${blog.date.month} ${blog.date.day}, ${blog.date.year}`
    : 'October 2026';

  return (
    <>
      {/* Blog Header & Title */}
      <div className="container">
        <div className="row">
          <div className="col-xl-10 offset-xl-1">
            {/* Breadcrumb */}
            <div className="breadcumb-style1 mb20">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {blog.category || 'Article'}
                </li>
              </ol>
            </div>

            {/* Category badge */}
            <div className="mb15">
              <span className="badge bg-primary px-3 py-2 rounded-pill text-white fw500 fz13">
                {blog.category || 'Market Trends'}
              </span>
              <span className="text-muted ml15 fz14">
                <i className="far fa-clock mr5" /> {blog.readTime || '5 min read'}
              </span>
            </div>

            {/* Title */}
            <h1 className="blog-title mb25 text-dark fw600" style={{ fontSize: '2.4rem', lineHeight: '1.25' }}>
              {blog.title}
            </h1>

            {/* Author Meta Row */}
            <div className="blog-single-meta pb30 bdrb1">
              <div className="post-author d-sm-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center mb10-sm">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-circle mr15 border"
                    src={blog.author?.avatar || '/images/blog/author-1.png'}
                    alt={blog.author?.name || 'Author'}
                  />
                  <div>
                    <h6 className="mb-0 fw600 fz15">{blog.author?.name || 'Home Zone Advisory'}</h6>
                    <span className="text-muted fz13">{blog.author?.role || 'Real Estate Specialist'}</span>
                  </div>
                </div>

                <div className="d-flex align-items-center text-muted fz14">
                  <span className="mr20">
                    <i className="far fa-calendar-alt mr5" /> {publishDateStr}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Featured Image */}
      <div className="container mt40">
        <div className="row">
          <div className="col-xl-10 offset-xl-1">
            <div
              className="large-thumb position-relative rounded-3 overflow-hidden shadow-sm"
              style={{ minHeight: '380px', maxHeight: '540px' }}
            >
              <Image
                width={1200}
                height={620}
                priority
                className="w-100 h-100 cover"
                src={blog.image || '/images/blog/blog-1.jpg'}
                alt={blog.title || 'Blog featured image'}
                style={{ objectFit: 'cover', maxHeight: '540px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Article Content */}
      <div className="container mt50">
        <div className="row">
          <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            {/* Intro Lead */}
            {blog.intro && (
              <p
                className="ff-heading fz18 fw500 text-dark mb35"
                style={{ lineHeight: '1.7', borderLeft: '3px solid #eb6753', paddingLeft: '18px' }}
              >
                {blog.intro}
              </p>
            )}

            {/* Render Rich Sections if available */}
            {Array.isArray(blog.sections) && blog.sections.length > 0 ? (
              blog.sections.map((sec, idx) => (
                <div className="ui-content mb40" key={idx}>
                  <h3 className="mb15 fw600 text-dark fz22">{sec.heading}</h3>
                  <p className="mb20 ff-heading fz16 text-secondary" style={{ lineHeight: '1.75' }}>
                    {sec.content}
                  </p>

                  {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                    <div className="list-style1 mb25 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                      <ul className="mb-0">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="d-flex align-items-start mb-2 fz15">
                            <i className="fas fa-check-circle text-success mr10 mt-1 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : blog.contentHtml ? (
              <div
                className="blog-content-body ui-content fz16 text-secondary"
                style={{ lineHeight: '1.75' }}
                dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
              />
            ) : blog.content ? (
              <p className="ff-heading fz16 text-secondary" style={{ lineHeight: '1.75' }}>
                {blog.content}
              </p>
            ) : null}

            {/* Blockquote Quote */}
            {blog.quote && (
              <div
                className="blockquote-style1 mb45 mt40 p-4 rounded-3"
                style={{ background: '#fafaf9', borderLeft: '4px solid #eb6753' }}
              >
                <blockquote className="blockquote mb-0">
                  <p className="fst-italic fz16 fw500 ff-heading text-dark mb-2" style={{ lineHeight: '1.6' }}>
                    "{blog.quote}"
                  </p>
                  <h6 className="quote-title fz14 text-muted mb-0">
                    — {blog.author?.name || 'Home Zone Research & Advisory'}
                  </h6>
                </blockquote>
              </div>
            )}

            {/* Pro Tip Box */}
            {blog.proTip && (
              <div
                className="pro-tip-box p-4 mb45 rounded-3 shadow-xs"
                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
              >
                <div className="d-flex align-items-start">
                  <i className="fas fa-lightbulb text-success fz22 mr15 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="fw600 text-success mb-1 fz16">Home Zone Advisory Pro-Tip</h6>
                    <p className="mb-0 fz14 text-dark" style={{ lineHeight: '1.6' }}>
                      {blog.proTip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Author Profile Bio Card */}
            <div
              className="author-card p-4 rounded-3 mb50"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                <Image
                  width={68}
                  height={68}
                  className="rounded-circle mr20 mb-3 mb-sm-0 border"
                  src={blog.author?.avatar || '/images/blog/author-1.png'}
                  alt={blog.author?.name || 'Author'}
                />
                <div>
                  <h6 className="mb-1 fw600 fz17">{blog.author?.name || 'Home Zone Editorial'}</h6>
                  <p className="text-primary fz13 mb-1 fw500">
                    {blog.author?.role || 'Real Estate Advisory Specialist'}
                  </p>
                  <p className="fz13 text-secondary mb-0">
                    Senior consultant analyzing verified property documentation, high-growth investment
                    corridors, and luxury residential trends for Home Zone.
                  </p>
                </div>
              </div>
            </div>

            {/* Share and Tags */}
            <div className="bdrt1 bdrb1 d-block d-sm-flex justify-content-between align-items-center pt30 pb30 mb50">
              <div className="blog_post_share d-flex align-items-center mb15-sm">
                <span className="mr20 fw600 fz14 text-dark">Share Article:</span>
                <Social />
              </div>
              <div className="bsp_tags d-flex align-items-center flex-wrap">
                <span className="mr15 fw600 fz14 text-dark">Tags:</span>
                {(blog.tags || ['Real Estate', 'Investment', 'Housing']).map((t, idx) => (
                  <Link
                    key={idx}
                    href="/blog"
                    className="badge bg-light text-dark border px-3 py-2 rounded-pill mr10 mb-1 fz12 hover-bg-thm hover-text-white transition"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Previous and Next Post Navigation */}
            <div className="mbp_pagination_tab bdrb1 pb40 mb40">
              <div className="row justify-content-between">
                {prevBlog && (
                  <div className="col-md-6 mb20-sm">
                    <div className="pag_prev">
                      <Link href={`/blogs/${prevBlog.slug || prevBlog.id}`} className="text-decoration-none">
                        <span className="fz12 text-muted text-uppercase fw600 d-block mb-1">
                          <i className="fas fa-arrow-left mr5" /> Previous Article
                        </span>
                        <h6 className="fz15 text-dark hover-color mb-0 line-clamp-1">
                          {prevBlog.title}
                        </h6>
                      </Link>
                    </div>
                  </div>
                )}

                {nextBlog && (
                  <div className="col-md-6 text-md-end">
                    <div className="pag_next">
                      <Link href={`/blogs/${nextBlog.slug || nextBlog.id}`} className="text-decoration-none">
                        <span className="fz12 text-muted text-uppercase fw600 d-block mb-1">
                          Next Article <i className="fas fa-arrow-right ml5" />
                        </span>
                        <h6 className="fz15 text-dark hover-color mb-0 line-clamp-1">
                          {nextBlog.title}
                        </h6>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
