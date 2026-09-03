import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Brain,
  Sparkles,
  Target,
  Rocket,
  Lightbulb,
  Zap,
  Calendar,
  Clock,
  Cog,
  X,
} from "lucide-react";
import { getAllServices } from "../service/serviceService";
import { getAllBlogs } from "../service/blogService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";

// Blog Modal Component
const BlogModal = ({ blog, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      "Getting Started": "bg-blue-100 text-blue-800",
      Strategy: "bg-green-100 text-green-800",
      Implementation: "bg-purple-100 text-purple-800",
      "Case Study": "bg-orange-100 text-orange-800",
      "Industry Insights": "bg-pink-100 text-pink-800",
      "Best Practices": "bg-indigo-100 text-indigo-800",
      Technology: "bg-cyan-100 text-cyan-800",
      Automation: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center space-x-3">
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
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {blog.blogName}
              </h1>

              <div className="flex items-center text-sm text-gray-500 mb-8">
                <Calendar className="w-4 h-4 mr-1" />
                {blog.publishDate
                  ? new Date(blog.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Recent"}
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {blog.description}
                </p>

                {blog.content && (
                  <div
                    className="text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                )}

                {!blog.content && (
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    <p>{blog.description}</p>
                    <p className="italic text-gray-500">
                      Full content coming soon...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Resources Page Component
const ResourcesPage = () => {
  const [services, setServices] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Icon mapping
  const iconMap = {
    brain: Brain,
    sparkles: Sparkles,
    target: Target,
    rocket: Rocket,
    lightbulb: Lightbulb,
    zap: Zap,
  };

  // Color schemes for services
  const colorSchemes = [
    { bg: "bg-blue-100", text: "text-blue-600" },
    { bg: "bg-green-100", text: "text-green-600" },
    { bg: "bg-purple-100", text: "text-purple-600" },
    { bg: "bg-orange-100", text: "text-orange-600" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [servicesData, blogsData] = await Promise.all([
        getAllServices(),
        getAllBlogs(),
      ]);

      // Get first 4 services for resource categories
      setServices(servicesData.slice(0, 4));
      setBlogPosts(blogsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (logoId) => {
    return iconMap[logoId] || Target;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Getting Started": "bg-blue-100 text-blue-800",
      Strategy: "bg-green-100 text-green-800",
      Implementation: "bg-purple-100 text-purple-800",
      "Case Study": "bg-orange-100 text-orange-800",
      "Industry Insights": "bg-pink-100 text-pink-800",
      "Best Practices": "bg-indigo-100 text-indigo-800",
      Technology: "bg-cyan-100 text-cyan-800",
      Automation: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="pt-16">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50 flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-36 h-36 sm:w-54 sm:h-54 lg:w-72 lg:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16 flex flex-col items-center justify-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-amber-200 mb-8">
            <svg
              className="w-4 h-4 text-amber-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">
              Knowledge Hub
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            AI Resources &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal mb-8 px-4">
            Expert guidance, tools, and resources to help you succeed with AI
            implementation
          </p>

          {/* Resource Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center items-center px-4">
            <div className="group px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                📚 Guides
              </span>
            </div>
            <div className="group px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                🛠️ Tools
              </span>
            </div>
            <div className="group px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                💡 Best Practices
              </span>
            </div>
            <div className="group px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-600 transition-colors">
                📊 Case Studies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Getting Started
              </h3>
              <p className="text-gray-600">
                Beginner-friendly content to help you understand AI
                opportunities for your business
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cog className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Implementation
              </h3>
              <p className="text-gray-600">
                Technical guides and best practices for successful AI project
                execution
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Strategy
              </h3>
              <p className="text-gray-600">
                Business planning resources and strategic frameworks for AI
                adoption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section - Dynamic */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600">
              Expert articles on AI implementation for small and medium
              businesses
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No blog posts available yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${getCategoryColor(
                        post.blogType
                      )}`}
                    >
                      {post.blogType}
                    </span>
                    {post.readTime && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
                    {post.blogName}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.publishDate
                        ? new Date(post.publishDate).toLocaleDateString()
                        : "Recent"}
                    </span>
                    <button
                      onClick={() => handleReadMore(post)}
                      className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors group"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Action />
      <Footer />

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ResourcesPage;
