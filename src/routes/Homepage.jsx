import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Brain,
  Sparkles,
  Target,
  Rocket,
  Lightbulb,
  Zap,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";
import { getAllServices } from "../service/serviceService";
import { getAllReviews } from "../service/reviewService";
import { getCompanyProfile } from "../service/companyProfileService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";

// Homepage Component
const Homepage = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    { bg: "bg-blue-100", hoverBg: "bg-blue-200", icon: "text-blue-600" },
    { bg: "bg-green-100", hoverBg: "bg-green-200", icon: "text-green-600" },
    { bg: "bg-purple-100", hoverBg: "bg-purple-200", icon: "text-purple-600" },
    { bg: "bg-orange-100", hoverBg: "bg-orange-200", icon: "text-orange-600" },
  ];

  // Avatar colors for reviews
  const avatarColors = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-orange-500 to-orange-600",
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [servicesData, reviewsData, profileData] = await Promise.all([
        getAllServices(),
        getAllReviews(),
        getCompanyProfile(),
      ]);

      setServices(servicesData.slice(0, 4)); // First 4 services
      setReviews(reviewsData.slice(0, 2)); // First 2 reviews
      setCompanyProfile(profileData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (logoId) => {
    return iconMap[logoId] || Target;
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="pt-16">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50 flex items-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col items-center justify-center w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {companyProfile?.headline ||
                    "Streamline Your Business with AI"}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-normal">
                  {companyProfile?.description ||
                    "We help Texas SMBs unlock AI automation for efficiency and growth."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center"
                >
                  Book a Free Consultation
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
                <button
                  onClick={scrollToServices}
                  className="bg-white/90 backdrop-blur-sm border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-xl text-lg font-bold hover:border-indigo-600 hover:text-indigo-600 hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">
                    Free Consultation
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">
                    No Long-Term Contracts
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">
                    Texas-Based Support
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard continues... */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"
                style={{ animationDelay: "0.7s" }}
              ></div>

              <div className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      <span className="text-white font-bold text-lg">
                        AI Systems Active
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-white text-sm font-semibold">
                        Live
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Process Efficiency",
                        value: "+73%",
                        color: "green",
                        width: "75%",
                      },
                      {
                        label: "Cost Reduction",
                        value: "+45%",
                        color: "blue",
                        width: "50%",
                      },
                      {
                        label: "Time Saved",
                        value: "+62%",
                        color: "purple",
                        width: "66%",
                      },
                    ].map((metric, idx) => (
                      <div
                        key={idx}
                        className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-lg hover:bg-white/25 transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white font-semibold">
                            {metric.label}
                          </span>
                          <span
                            className={`text-${metric.color}-200 text-xl font-bold`}
                          >
                            {metric.value}
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div
                            className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-300 h-3 rounded-full shadow-lg`}
                            style={{ width: metric.width }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Snapshot - Dynamic */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Core{" "}
              </span>{" "}
              Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI solutions tailored for small and medium
              businesses ready to embrace the future.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.logoId);
                const colors = colorSchemes[index % colorSchemes.length];

                return (
                  <div
                    key={service.id}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div
                      className={`${colors.bg} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:${colors.hoverBg} transition-colors shadow-md`}
                    >
                      <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.solution}
                    </p>
                    <a
                      href="#"
                      className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors"
                    >
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trust Builders Section - Dynamic */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-blue-100 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">
                Proven Track Record
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Growing Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl text-center mx-auto">
              See why Texas SMBs choose{" "}
              {companyProfile?.companyName || "Core Implementations"} for their
              AI transformation
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {companyProfile?.completeProjects || "50+"}
              </div>
              <div className="text-gray-600">Complete Projects</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">73%</div>
              <div className="text-gray-600">Average Efficiency Gain</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>

          {/* Testimonials - Dynamic */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {reviews.map((review, index) => {
                const avatarColor = avatarColors[index % avatarColors.length];

                return (
                  <div
                    key={review.id}
                    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="absolute top-6 right-6 text-blue-100 text-6xl font-serif opacity-50">
                      "
                    </div>

                    <div className="relative">
                      <div className="flex items-center mb-6">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 text-yellow-400 fill-current drop-shadow-sm"
                          />
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                        "{review.description}"
                      </blockquote>
                      <div className="flex items-center">
                        <div
                          className={`relative w-16 h-16 bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center mr-4 shadow-lg`}
                        >
                          <span className="text-white font-bold text-xl">
                            {getInitials(review.name)}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">
                            {review.name}
                          </div>
                          <div className="text-gray-600 font-medium">
                            {review.designation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Action />
      <Footer />
    </div>
  );
};

export default Homepage;
