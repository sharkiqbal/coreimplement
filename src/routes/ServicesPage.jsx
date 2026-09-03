import React, { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  Target,
  Rocket,
  Lightbulb,
  Zap,
  CheckCircle,
} from "lucide-react";
import { getAllServices } from "../service/serviceService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";

// Services Page Component
const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping
  const iconMap = {
    brain: Brain,
    sparkles: Sparkles,
    target: Target,
    rocket: Rocket,
    lightbulb: Lightbulb,
    zap: Zap,
  };

  // Color schemes for different services
  const colorSchemes = [
    { bg: "bg-blue-100", text: "text-blue-600", section: "" },
    { bg: "bg-green-100", text: "text-green-600", section: "bg-gray-50" },
    { bg: "bg-purple-100", text: "text-purple-600", section: "" },
    { bg: "bg-orange-100", text: "text-orange-600", section: "bg-gray-50" },
    { bg: "bg-indigo-100", text: "text-indigo-600", section: "" },
    { bg: "bg-pink-100", text: "text-pink-600", section: "bg-gray-50" },
  ];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const servicesData = await getAllServices();
      setServices(servicesData);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (logoId) => {
    return iconMap[logoId] || Target;
  };

  return (
    <div className="pt-16">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50 flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
          <div
            className="absolute bottom-10 left-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16 flex flex-col items-center justify-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-indigo-200 mb-8">
            <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-800">
              Tailored for SMBs
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Solutions
            </span>{" "}
            for SMBs
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal mb-8 px-4">
            From strategy to implementation, we provide end-to-end AI services
            designed specifically for growing businesses
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center items-center px-4">
            <span className="px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-md border border-gray-200">
              Strategy
            </span>
            <span className="px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-md border border-gray-200">
              Implementation
            </span>
            <span className="px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-md border border-gray-200">
              Support
            </span>
          </div>
        </div>
      </section>

      {/* Dynamic Services Sections */}
      {loading ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </section>
      ) : services.length === 0 ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-lg">
              No services available at the moment.
            </p>
          </div>
        </section>
      ) : (
        services.map((service, index) => {
          const IconComponent = getIconComponent(service.logoId);
          const colorScheme = colorSchemes[index % colorSchemes.length];
          const isEven = index % 2 === 0;

          return (
            <section
              key={service.id}
              className={`py-20 ${colorScheme.section}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Side */}
                  <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                    <div
                      className={`${colorScheme.bg} w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${colorScheme.text}`}
                      />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {service.name}
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          The Problem
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.problem}
                        </p>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Our Solution
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.solution}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          What You Get
                        </h3>
                        <ul className="space-y-3 text-gray-600">
                          {service.points.map((point, idx) => (
                            <li key={idx} className="flex items-start group">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div
                    className={`${
                      isEven ? "order-2" : "order-2 lg:order-1"
                    } relative`}
                  >
                    <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
                      {/* Decorative Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl transform rotate-3"></div>

                      {/* Main Card */}
                      <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                        <div className="space-y-6">
                          {/* Large Icon Display */}
                          <div
                            className={`${colorScheme.bg} w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                          >
                            <IconComponent
                              className={`w-16 h-16 ${colorScheme.text}`}
                            />
                          </div>

                          {/* Stats Cards */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                              <div className="text-3xl font-bold text-blue-600 mb-1">
                                Fast
                              </div>
                              <div className="text-xs text-gray-600">
                                Implementation
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                              <div className="text-3xl font-bold text-green-600 mb-1">
                                ROI
                              </div>
                              <div className="text-xs text-gray-600">
                                Focused
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                              <div className="text-3xl font-bold text-purple-600 mb-1">
                                24/7
                              </div>
                              <div className="text-xs text-gray-600">
                                Support
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100">
                              <div className="text-3xl font-bold text-orange-600 mb-1">
                                100%
                              </div>
                              <div className="text-xs text-gray-600">
                                Custom
                              </div>
                            </div>
                          </div>

                          {/* Feature Highlights */}
                          <div className="space-y-3 pt-4">
                            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              <span className="text-sm font-medium text-gray-700">
                                Scalable Solutions
                              </span>
                            </div>
                            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              <span className="text-sm font-medium text-gray-700">
                                Expert Team
                              </span>
                            </div>
                            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className="text-sm font-medium text-gray-700">
                                Proven Results
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Accent Elements */}
                      <div
                        className={`absolute -top-4 -right-4 ${colorScheme.bg} w-20 h-20 rounded-2xl opacity-50 blur-sm`}
                      ></div>
                      <div
                        className={`absolute -bottom-4 -left-4 ${colorScheme.bg} w-16 h-16 rounded-2xl opacity-50 blur-sm`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      )}

      <Action />
      <Footer />
    </div>
  );
};

export default ServicesPage;
