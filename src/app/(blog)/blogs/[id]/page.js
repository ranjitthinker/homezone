import Details from '@/components/blog/blog-single/Details';
import Blog from '@/components/common/Blog';
import DefaultHeader from '@/components/common/DefaultHeader';
import Footer from '@/components/common/default-footer';
import MobileMenu from '@/components/common/mobile-menu';
import { allblogs } from '@/data/blogs';

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params?.id ? decodeURIComponent(params.id.toString()) : '';
  const blog = allblogs.find(
    (b) => b.id.toString() === slug || b.slug === slug || b.slug === slug.toLowerCase()
  );

  return {
    title: blog ? `${blog.title} || Home Zone Real Estate` : 'Blog || Home Zone Real Estate',
    description: blog?.excerpt || 'Read the latest real estate news, investment guides, and architectural design insights on Home Zone.',
  };
}

const BlogSingle = async (props) => {
  const params = await props.params;

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Blog Section Area */}
      <section className="our-blog pt60 pb60">
        <Details id={params.id} />
      </section>
      {/* End Blog Details */}

      {/* Related Blog Posts */}
      <section className="pb90 pb40-md pt60 bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up" data-aos-delay="0">
              <div className="main-title text-center mb40">
                <h2 className="title">Related Articles</h2>
                <p className="paragraph">Explore more real estate trends and market updates</p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" data-aos="fade-up" data-aos-delay="200">
            <Blog />
          </div>
        </div>
      </section>
      {/* End Related Blog Posts */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default BlogSingle;
