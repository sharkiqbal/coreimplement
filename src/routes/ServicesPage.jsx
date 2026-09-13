import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Brain,
  Sparkles,
  Target,
  Rocket,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  PlugZap,
  TrendingUp,
} from "lucide-react";
import { getAllServices, slugifyServiceName } from "../service/serviceService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";
import SEO from "../component/SEO";

// Services Page Component
const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!loading && services.length > 0 && location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, [loading, services, location.hash]);

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

  // Distinct illustrative "screenshot" mockup per service, keyed by logoId
  const renderServiceVisual = (service) => {
    switch (service.logoId) {
      case "target":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">
                Automated Workflow
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-green-700">
                  Live
                </span>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Invoice received", done: true },
                { label: "Data extracted by AI", done: true },
                { label: "Synced to QuickBooks", done: true },
                { label: "Approval sent", done: false },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    step.done
                      ? "bg-blue-50/60 border-blue-100"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  {step.done ? (
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin flex-shrink-0"></div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">
                Hours saved this week
              </span>
              <span className="text-2xl font-bold text-blue-600">14</span>
            </div>
          </div>
        );
      case "zap":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">
                AI Communication Hub
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-green-700">
                  Live
                </span>
              </div>
            </div>
            <div className="bg-green-50/60 border border-green-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Incoming Call
                  </p>
                  <p className="text-xs text-green-700 font-medium">
                    AI Agent Answering...
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    New Lead Inquiry
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    "Do you have availability this week?"
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pl-12">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-green-700">
                  AI draft reply ready
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">
                Avg. response time
              </span>
              <span className="text-2xl font-bold text-green-600">8 sec</span>
            </div>
          </div>
        );
      case "sparkles":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">
                Your Custom Dashboard
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-green-700">
                  Synced
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-24 bg-purple-50/60 border border-purple-100 rounded-xl p-4">
              {[40, 65, 45, 80, 60, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-md"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["QuickBooks", "Salesforce", "Slack", "Sheets"].map(
                (tool, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <PlugZap className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-xs font-semibold text-gray-700">
                      {tool}
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">
                Systems connected
              </span>
              <span className="text-2xl font-bold text-purple-600">4</span>
            </div>
          </div>
        );
      case "rocket":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">
                Campaign Performance
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">
                  Trending Up
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-24 bg-orange-50/60 border border-orange-100 rounded-xl p-4">
              {[30, 45, 40, 60, 70, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-md"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-3.5 border border-orange-100">
                <div className="text-xl font-bold text-orange-600">+128%</div>
                <div className="text-xs text-gray-600">Leads Generated</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3.5 border border-green-100">
                <div className="text-xl font-bold text-green-600">-34%</div>
                <div className="text-xs text-gray-600">Cost Per Lead</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-16 sm:pt-20">
      <SEO
        title="AI Automation Services"
        description="Business process automation, AI customer communication, custom AI software, and AI-powered marketing, built around the tools your business already uses."
        path="/services"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50 flex items-center overflow-hidden">
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
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-indigo-200 mb-4 sm:mb-8">
            <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-800">
              Tailored for Growing Businesses
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight drop-shadow-sm">
            Comprehensive <span className="text-blue-600">AI Solutions</span>{" "}
            for Every Business
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal mb-6 sm:mb-8 px-4">
            From strategy to implementation, we provide end-to-end AI and
            automation services designed to fit however your business
            already operates.
          </p>

          {/* Hero CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl text-base sm:text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center"
            >
              Book a Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Jump Nav - sticks below main nav for orientation while scrolling */}
      {!loading && services.length > 0 && (
        <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-nowrap justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 sm:py-2.5">
              {services.map((service) => {
                const IconComponent = getIconComponent(service.logoId);
                return (
                  <a
                    key={service.id}
                    href={`#${slugifyServiceName(service.name)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-full transition-colors group flex-shrink-0"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-gray-500 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                      {service.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
              id={slugifyServiceName(service.name)}
              className={`py-10 sm:py-20 scroll-mt-32 sm:scroll-mt-36 ${colorScheme.section}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Side */}
                  <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                    <div className="flex items-center gap-3 sm:block mb-4 sm:mb-6">
                      <div
                        className={`${colorScheme.bg} w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center sm:mb-6 shadow-lg transform hover:scale-110 transition-transform flex-shrink-0`}
                      >
                        <IconComponent
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${colorScheme.text}`}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                        {service.name}
                      </h2>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                          The Problem
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                          {service.problem}
                        </p>
                      </div>
                      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          Our Solution
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                          {service.solution}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                          What You Get
                        </h3>
                        <ul className="space-y-2 sm:space-y-3 text-gray-600">
                          {service.points.map((point, idx) => (
                            <li key={idx} className="flex items-start group">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              <span className="leading-relaxed text-sm sm:text-base">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Per-service CTA */}
                      <button
                        onClick={() => navigate("/contact")}
                        className={`inline-flex items-center gap-2 font-bold ${colorScheme.text} hover:gap-3 transition-all group`}
                      >
                        Get Started With {service.name}
                        <ArrowRight className="w-4 h-4 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Visual Side - distinct mockup per service */}
                  <div
                    className={`hidden lg:block ${
                      isEven ? "order-2" : "order-2 lg:order-1"
                    } relative`}
                  >
                    <div className="relative h-full min-h-[400px] lg:min-h-[520px]">
                      {/* Decorative Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl transform rotate-3"></div>

                      {/* Main Card */}
                      <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                        {/* Window Chrome */}
                        <div className="flex items-center gap-1.5 mb-5">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>

                        {renderServiceVisual(service)}
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

      <Action
        headingBefore="Ready to "
        headingHighlight="Automate"
        headingAfter=" Your Business?"
        subtext="Tell us what's slowing your team down, and we'll show you exactly how automation could help."
        secondaryLabel="See Case Studies"
        secondaryTo="/case-studies"
        markerColor="bg-cyan-400/40"
      />
      <Footer />
    </div>
  );
};

export default ServicesPage;
