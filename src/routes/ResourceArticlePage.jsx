import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogBySlug, getBlogSlug } from "../service/blogService";
import { slugify } from "../utils/slugify";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";
import SEO from "../component/SEO";

const getCategoryColor = (category) => {
  const colors = {
    "Getting Started": "bg-brand-100 text-brand-800",
    Strategy: "bg-green-100 text-green-800",
    Implementation: "bg-purple-100 text-purple-800",
    "Case Study": "bg-orange-100 text-orange-800",
    "Industry Insights": "bg-pink-100 text-pink-800",
    "Best Practices": "bg-brand-200 text-brand-900",
    Technology: "bg-cyan-100 text-cyan-800",
    Automation: "bg-yellow-100 text-yellow-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

const ResourceArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);

    getBlogBySlug(slug)
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setBlog(data);
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => {
        console.error("Error loading article:", error);
        if (isMounted) setNotFound(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-16 sm:pt-20">
        <Navigation />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="pt-16 sm:pt-20">
        <SEO
          title="Article Not Found"
          description="The article you're looking for doesn't exist or may have moved."
          path={`/resources/${slug}`}
          noindex
        />
        <Navigation />
        <section className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-brand-50 via-brand-100 to-purple-50 py-16">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              This article doesn't exist or may have been moved.
            </p>
            <button
              onClick={() => navigate("/resources")}
              className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-6 py-3 rounded-xl font-bold hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg"
            >
              Back to Resources
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const publishedDate = blog.publishDate
    ? new Date(blog.publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.blogName,
    description: blog.description,
    datePublished: blog.publishDate || undefined,
    author: {
      "@type": "Organization",
      name: "Core Implement",
    },
    publisher: {
      "@type": "Organization",
      name: "Core Implement",
      url: "https://coreimplement.com/",
    },
  };

  return (
    <div className="pt-16 sm:pt-20">
      <SEO
        title={blog.blogName}
        description={blog.description}
        path={`/resources/${getBlogSlug(blog)}`}
        type="article"
        structuredData={structuredData}
      />
      <Navigation />

      <section className="bg-gradient-to-br from-brand-50 via-brand-100 to-purple-50 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-brand-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${getCategoryColor(
                blog.blogType
              )}`}
            >
              {blog.blogType}
            </span>
            {blog.readTime && (
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {blog.readTime}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {blog.blogName}
          </h1>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1.5" />
            {publishedDate}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 font-medium">
            {blog.description}
          </p>

          {blog.content ? (
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="italic text-gray-500">Full content coming soon...</p>
          )}

          {blog.relatedService && (
            <div className="mt-10 bg-gradient-to-br from-brand-50 via-brand-100 to-purple-50 border border-brand-200 rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Related Service
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {blog.relatedService}
              </p>
              <Link
                to={`/services#${slugify(blog.relatedService)}`}
                className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:gap-3 transition-all"
              >
                See how it works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Action
        headingBefore="Enjoyed This "
        headingHighlight="Article"
        headingAfter="?"
        subtext="Let's talk about how this applies to your business, and what automation could realistically save you."
        secondaryLabel="Read More Articles"
        secondaryTo="/resources"
      />
      <Footer />
    </div>
  );
};

export default ResourceArticlePage;
