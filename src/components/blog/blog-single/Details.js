'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import Social from './Social';

/**
 * Strips accidental transparent/white/inherited background colors inserted when
 * pasting from Google Docs, MS Word, or other rich-text sources.
 */
function sanitizeBlogContent(html) {
  if (!html) return '';
  return html
    .replace(/background-color:\s*(transparent|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|#ffffff|#fff|inherit|initial);?/gi, '')
    .replace(/style="\s*"/gi, '');
}

/**
 * Intelligent formatter that turns raw/plain database text into high-quality,
 * editorial HTML with headings, checklists, callouts, and tip boxes matching the PDF layout.
 * If the content already contains rich HTML (e.g. from Summernote), it preserves it directly.
 */
function formatBlogTextToHtml(rawText) {
  if (!rawText) return '';

  const cleaned = sanitizeBlogContent(rawText);

  // Check if content is already formatted HTML (e.g. from Summernote)
  const hasHtml = /<[a-z][\s\S]*>/i.test(cleaned);
  if (hasHtml) {
    return cleaned;
  }

  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const elements = [];
  let inList = false;
  let listItems = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        `<ul class="blog-checklist">${listItems
          .map((item) => `<li>${item}</li>`)
          .join('')}</ul>`
      );
      listItems = [];
      inList = false;
    }
  };

  const isHeading = (text) => {
    // Numbered headings like "1. Choose...", "2. Set..."
    if (/^\d+\.\s+[A-Za-z]/.test(text)) return true;
    
    // Explicit known section titles from the publications
    const knownTitles = [
      'Why Choosing the Right Home Matters',
      'Exploring Residential Property in Patiala',
      'Radiance Home: Start with the Right Questions',
      'What Should You Look for Before Buying a Home?',
      'Why Choose Home Zone for Your Property Search?',
      'Take the Next Step Towards Your New Home',
      'Why the Right Real Estate Guidance Matters',
      'Final Thoughts: Make Your Property Decision with Confidence',
      'Looking to Buy Property in Chandigarh Tricity?',
    ];
    if (knownTitles.some((kt) => text.toLowerCase() === kt.toLowerCase() || text.toLowerCase().startsWith(kt.toLowerCase()))) {
      return true;
    }

    // Title heuristic: Short line, starts capitalized, no period at end, not a sentence
    if (text.length < 75 && !text.endsWith('.') && !text.endsWith(',') && !text.includes(';') && /^[A-Z]/.test(text)) {
      if (text.endsWith('?') || /^(What|Why|How|When|Where|Final|Take|Looking)\b/i.test(text)) {
        return true;
      }
    }

    return false;
  };

  const isTip = (text) => {
    return /^home zone tip\s*:/i.test(text) || /^pro tip\s*:/i.test(text);
  };

  const isBulletItem = (text) => {
    if (/^[•\-\*]\s+/.test(text)) return true;
    // Known bullet points from text
    const bulletPrefixes = [
      'Verification of',
      'Review of',
      'Checks for',
      'Confirmation of',
      'Everyday convenience:',
      'Budget and affordability:',
      'Property suitability:',
      'Documentation and approvals:',
      'Long-term considerations:',
    ];
    return bulletPrefixes.some((prefix) => text.startsWith(prefix));
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. Tip Callout Box
    if (isTip(line)) {
      flushList();
      const tipText = line.replace(/^(home zone tip|pro tip)\s*:\s*/i, '');
      elements.push(
        `<div class="blog-tip-callout">
          <div class="tip-icon"><i class="fas fa-lightbulb"></i></div>
          <div class="tip-content">
            <span class="tip-badge">Home Zone Tip</span>
            <p>${tipText}</p>
          </div>
        </div>`
      );
      continue;
    }

    // 2. Headings & CTA Section
    if (isHeading(line)) {
      flushList();

      if (line.toLowerCase().includes('looking to buy') || line.toLowerCase().includes('take the next step')) {
        // Collect following lines until next heading/tip for CTA Box
        const ctaLines = [];
        let j = i + 1;
        while (j < lines.length && !isHeading(lines[j]) && !isTip(lines[j])) {
          ctaLines.push(lines[j]);
          j++;
        }
        i = j - 1;
        elements.push(
          `<div class="blog-cta-box">
            <h4>${line}</h4>
            ${ctaLines.map((cl) => `<p>${cl}</p>`).join('')}
            <div class="mt-3">
              <a href="/contact" class="ud-btn btn-white fw600 text-dark px-4 py-2 rounded-2 text-decoration-none">
                Connect with Home Zone <i class="fal fa-arrow-right-long ml10"></i>
              </a>
            </div>
          </div>`
        );
        continue;
      }

      elements.push(`<h3 class="blog-heading-h3">${line}</h3>`);
      continue;
    }

    // 3. Bullet points / Checklists
    if (isBulletItem(line)) {
      inList = true;
      let cleanBullet = line.replace(/^[•\-\*]\s+/, '');
      // If line has "Title: Description", bold the title
      if (/^([A-Za-z\s]+):\s*(.*)/.test(cleanBullet)) {
        cleanBullet = cleanBullet.replace(/^([A-Za-z\s]+):\s*(.*)/, '<strong>$1:</strong> $2');
      }
      listItems.push(cleanBullet);
      continue;
    }

    // 4. Normal Paragraph
    flushList();
    elements.push(`<p class="blog-paragraph">${line}</p>`);
  }

  flushList();
  return elements.join('\n');
}

export default function BlogDetails({ id: propId }) {
  const params = useParams();
  const rawId = propId || params?.id;
  const slug = rawId ? decodeURIComponent(rawId.toString()) : '';

  const [blog, setBlog] = useState(null);
  const [allRealBlogs, setAllRealBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogAndList = async () => {
      try {
        setLoading(true);

        // Fetch current blog and full list in parallel
        const [blogRes, listRes] = await Promise.all([
          apiService.get(`${API_URLS.BLOG}/${slug}`, {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
            },
          }),
          apiService.get(`${API_URLS.BLOG}`, {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
            },
          }).catch(() => null),
        ]);

        if (blogRes?.data?.blog && isMounted) {
          const apiBlog = blogRes.data.blog;

          setBlog({
            id: apiBlog.id,
            slug: apiBlog.slug || apiBlog.id.toString(),
            title: apiBlog.title,
            image: apiBlog.featured_image || '/images/blog/blog-1.jpg',
            category: apiBlog.category?.name || 'Buying a Home',
            tag: apiBlog.category?.name || 'Property Guide',
            readTime: '6 min read',
            date: {
              month: apiBlog.published_at
                ? new Date(apiBlog.published_at).toLocaleString('default', { month: 'long' })
                : 'October',
              day: apiBlog.published_at
                ? new Date(apiBlog.published_at).getDate().toString().padStart(2, '0')
                : '15',
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
            content: apiBlog.content || '',
            tags: [apiBlog.category?.name || 'Real Estate', 'Property Guide', 'Tricity Living'],
          });
        }

        if (listRes?.data && isMounted) {
          let items = [];
          if (Array.isArray(listRes.data.data)) {
            items = listRes.data.data;
          } else if (Array.isArray(listRes.data)) {
            items = listRes.data;
          }
          const validBlogs = items.filter(
            (b) => b.status === 'published' && b.id !== 1 && b.slug !== 'quis-maiores-eiusmod'
          );
          setAllRealBlogs(validBlogs);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchBlogAndList();
    }

    return () => {
      isMounted = false;
    };
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
        <div className="my-5">
          <i className="far fa-newspaper fz45 text-muted mb-3 d-block" />
          <h3 className="fw600 text-dark">Article Not Found</h3>
          <p className="text-muted">The blog article you are looking for is currently unavailable or has been moved.</p>
          <Link href="/blog" className="ud-btn btn-thm mt20">
            Back to Blog List <i className="fal fa-arrow-right-long ml10" />
          </Link>
        </div>
      </div>
    );
  }

  // Previous & Next navigation using real published blogs
  const currentIndex = allRealBlogs.findIndex(
    (b) => b.id.toString() === blog.id?.toString() || b.slug === blog.slug
  );
  const prevBlog =
    currentIndex > 0 ? allRealBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex >= 0 && currentIndex < allRealBlogs.length - 1
      ? allRealBlogs[currentIndex + 1]
      : null;

  const publishDateStr = blog.date
    ? `${blog.date.month} ${blog.date.day}, ${blog.date.year}`
    : 'October 15, 2026';

  const formattedContentHtml = formatBlogTextToHtml(blog.content);

  return (
    <>
      <style jsx global>{`
        /* Blog Rich Content Styling */
        .blog-content-body {
          font-family: inherit;
          color: #374151;
          font-size: 1.05rem;
          line-height: 1.85;
        }

        .blog-content-body p,
        .blog-content-body .blog-paragraph {
          margin-bottom: 1.35rem;
          line-height: 1.85;
          color: #374151;
        }

        .blog-content-body h2,
        .blog-content-body h3,
        .blog-content-body .blog-heading-h3 {
          color: #0f172a !important;
          font-weight: 700 !important;
          font-size: 1.45rem !important;
          margin-top: 2.3rem !important;
          margin-bottom: 0.9rem !important;
          line-height: 1.35 !important;
          letter-spacing: -0.01em;
        }

        .blog-content-body h4 {
          color: #0f172a !important;
          font-weight: 600 !important;
          font-size: 1.25rem !important;
          margin-top: 1.6rem !important;
          margin-bottom: 0.7rem !important;
        }

        .blog-content-body strong,
        .blog-content-body b {
          color: #0f172a !important;
          font-weight: 700 !important;
        }

        /* Highlighting and Mark text */
        .blog-content-body mark,
        .blog-content-body .highlight {
          background-color: #fef08a !important;
          color: #713f12 !important;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }

        /* Prevent unwanted background color from pasted spans (Google Docs / MS Word) */
        .blog-content-body span[style*="background-color: transparent"],
        .blog-content-body span[style*="background-color:transparent"],
        .blog-content-body span[style*="background-color: #fff"],
        .blog-content-body span[style*="background-color:#fff"],
        .blog-content-body span[style*="background-color: rgb(255, 255, 255)"],
        .blog-content-body span[style*="background-color:rgb(255,255,255)"] {
          background-color: transparent !important;
          color: inherit !important;
          padding: 0 !important;
        }

        /* Checklist Bullets */
        .blog-content-body ul.blog-checklist {
          list-style: none !important;
          padding-left: 0 !important;
          margin: 1.3rem 0 1.7rem !important;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 16px 20px !important;
        }

        .blog-content-body ul.blog-checklist li {
          position: relative !important;
          padding-left: 30px !important;
          margin-bottom: 10px !important;
          line-height: 1.65 !important;
          color: #1e293b !important;
          font-size: 1.01rem !important;
        }

        .blog-content-body ul.blog-checklist li:last-child {
          margin-bottom: 0 !important;
        }

        .blog-content-body ul.blog-checklist li::before {
          content: "✓";
          position: absolute;
          left: 6px;
          top: 0px;
          color: #16a34a;
          font-size: 15px;
          font-weight: 900;
        }

        .blog-content-body ul:not(.blog-checklist) {
          padding-left: 1.6rem;
          margin-bottom: 1.4rem;
          list-style-type: disc;
        }

        .blog-content-body ol {
          padding-left: 1.6rem;
          margin-bottom: 1.4rem;
          list-style-type: decimal;
        }

        .blog-content-body li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
          color: #374151;
        }

        /* Pro Tip Callout Box */
        .blog-tip-callout {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-left: 4px solid #16a34a;
          border-radius: 8px;
          padding: 18px 22px;
          margin: 1.8rem 0 2rem;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.05);
        }

        .blog-tip-callout .tip-icon {
          color: #16a34a;
          font-size: 1.3rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .blog-tip-callout .tip-badge {
          display: inline-block;
          background: #dcfce7;
          color: #15803d;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 6px;
        }

        .blog-tip-callout p {
          color: #14532d !important;
          font-size: 0.98rem;
          line-height: 1.65;
          margin-bottom: 0 !important;
        }

        /* CTA Box */
        .blog-cta-box {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          border-radius: 12px;
          padding: 32px 30px;
          margin: 2.8rem 0 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15);
        }

        .blog-cta-box h4 {
          color: #ffffff !important;
          font-size: 1.45rem !important;
          font-weight: 700 !important;
          margin-top: 0 !important;
          margin-bottom: 12px !important;
        }

        .blog-cta-box p {
          color: #cbd5e1 !important;
          font-size: 1.02rem !important;
          line-height: 1.7 !important;
          margin-bottom: 12px !important;
        }
      `}</style>

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
                {blog.category || 'Buying a Home'}
              </span>
              <span className="text-muted ml15 fz14">
                <i className="far fa-clock mr5" /> {blog.readTime || '6 min read'}
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
                    <h6 className="mb-0 fw600 fz15">{blog.author?.name || 'Home Zone Editorial'}</h6>
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
                unoptimized={Boolean(blog.image?.startsWith('http'))}
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

            {/* Render Formatted Content */}
            <div
              className="blog-content-body ui-content"
              dangerouslySetInnerHTML={{ __html: formattedContentHtml }}
            />

            {/* Author Profile Bio Card */}
            <div
              className="author-card p-4 rounded-3 mt50 mb50"
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
            {(prevBlog || nextBlog) && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
