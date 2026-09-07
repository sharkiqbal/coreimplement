import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Calendar,
  Search,
  CheckCircle2,
  Database,
  FileText,
  Mail,
  BarChart3,
  PlugZap,
} from "lucide-react";
import { getAllServices, slugifyServiceName } from "../service/serviceService";
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

  // How It Works steps
  const howItWorksSteps = [
    {
      icon: Calendar,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Schedule a Free Discovery Call",
      description:
        "We start with a no-cost conversation to learn how your business actually runs day to day, your workflows, your tools, and where things slow you down.",
      bullets: [
        "30-minute call at a time that works for you",
        "We ask about your current processes and pain points",
        "No sales pitch, just listening",
      ],
    },
    {
      icon: Search,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "We Analyze & Send a Free Proposal",
      description:
        "Our team digs into what we learned and maps out exactly where AI and automation can realistically save you time and money.",
      bullets: [
        "Free, no-obligation process analysis",
        "We prioritize the highest-impact opportunities first",
        "You receive a clear proposal with scope, timeline, and cost",
      ],
    },
    {
      icon: Rocket,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      title: "We Implement What You Choose",
      description:
        "You decide what to move forward with. We build, test, and roll out the automations and process improvements, tailored to your team and your goals.",
      bullets: [
        "You approve only what fits your budget and priorities",
        "We handle setup, integration, and training",
        "Ongoing support to keep everything running smoothly",
      ],
    },
  ];

  // Manual work categories we automate, across any industry
  const manualWorkCategories = [
    {
      icon: Database,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Manual Data Entry & Reconciliation",
      description:
        "Copying numbers between spreadsheets, systems, and software eats hours every week.",
      examples: "Common in accounting, bookkeeping, retail, logistics",
    },
    {
      icon: FileText,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Manual Quoting & Proposals",
      description:
        "Building custom quotes or proposals by hand slows your sales cycle and caps how many you can send.",
      examples: "Common in insurance, contracting, consulting",
    },
    {
      icon: Mail,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Repetitive Customer Communication",
      description:
        "Answering the same questions, following up on leads, and sorting emails by hand.",
      examples: "Common in service businesses, real estate, support teams",
    },
    {
      icon: BarChart3,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Manual Reporting & Analysis",
      description:
        "Pulling data together into reports or dashboards by hand, every week or month.",
      examples: "Common in finance, operations, agencies",
    },
  ];

  // Tools we commonly integrate with
  const integrationTools = [
    "QuickBooks",
    "HubSpot",
    "Salesforce",
    "Gmail & Outlook",
    "Google Sheets & Excel",
    "Calendly",
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
    <div className="pt-16 sm:pt-20">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center justify-center w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl">
            {/* Left Content */}
            <div className="space-y-5 sm:space-y-8">
              <div className="space-y-3 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {companyProfile?.headline ||
                    "Streamline Your Business with AI"}
                </h1>
                <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal">
                  {companyProfile?.description ||
                    "We help growing businesses automate the manual, repetitive work slowing them down using AI, so teams spend less time on data entry, quotes, and reports, and more time on what matters."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl text-base sm:text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center"
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
                  className="bg-white/90 backdrop-blur-sm border-2 border-gray-300 text-gray-700 px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl text-base sm:text-lg font-bold hover:border-indigo-600 hover:text-indigo-600 hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-6 pt-1 sm:pt-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-1.5 sm:mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    Free Consultation
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-1.5 sm:mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    No Long-Term Contracts
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-1.5 sm:mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    Hands-On, Personal Support
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard continues... */}
            <div className="hidden lg:block relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"
                style={{ animationDelay: "0.7s" }}
              ></div>

              <div className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-5 sm:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-3 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      <span className="text-white font-bold text-base sm:text-lg">
                        AI Systems Active
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-white text-sm font-semibold">
                        Live
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 sm:space-y-4">
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
                        className="bg-white/20 backdrop-blur-md rounded-xl p-3.5 sm:p-5 border border-white/30 shadow-lg hover:bg-white/25 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            {metric.label}
                          </span>
                          <span
                            className={`text-${metric.color}-200 text-lg sm:text-xl font-bold`}
                          >
                            {metric.value}
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2.5 sm:h-3">
                          <div
                            className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-300 h-2.5 sm:h-3 rounded-full shadow-lg`}
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

      {/* Who We Help - Pain Points, Any Industry */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                Built For Every Industry
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-3 sm:mb-4 leading-tight">
                If It's{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Repetitive
                </span>
                , We Can Probably Automate It
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                We're not limited to one industry. If your team is buried in
                manual data entry, back-and-forth emails, quotes, or reports,
                there's a good chance AI can take it off their plate,
                whatever business you're in.
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Don't see your exact process listed? That's the point, if
                it's manual and repetitive, we'll take a look.
              </p>
            </div>

            {/* Right: Compact category grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {manualWorkCategories.map((category, index) => {
                const CategoryIcon = category.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2 sm:mb-4">
                      <div
                        className={`${category.bg} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}
                      >
                        <CategoryIcon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${category.iconColor}`}
                        />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2 sm:mb-3">
                      {category.description}
                    </p>
                    <p className="text-xs font-medium text-gray-400">
                      {category.examples}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Snapshot - Dynamic */}
      <section ref={servicesRef} className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Core{" "}
              </span>{" "}
              Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.logoId);
                const colors = colorSchemes[index % colorSchemes.length];

                return (
                  <div
                    key={service.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="flex items-center gap-3 sm:block mb-3 sm:mb-6">
                      <div
                        className={`${colors.bg} w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center sm:mb-6 group-hover:${colors.hoverBg} transition-colors shadow-md flex-shrink-0`}
                      >
                        <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${colors.icon}`} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                      {service.solution}
                    </p>
                    <Link
                      to={`/services#${slugifyServiceName(service.name)}`}
                      className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors"
                    >
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full shadow-sm border border-blue-100 mb-3">
              <span className="text-sm font-semibold text-blue-600">
                Simple, Transparent Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              How It{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From first conversation to fully implemented automation, here's
              exactly what it looks like to work with{" "}
              {companyProfile?.companyName || "Core Implementations"}.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-20 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200"></div>

            {howItWorksSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div
                      className={`${step.bg} w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <StepIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${step.iconColor}`} />
                    </div>
                    <span className="text-4xl sm:text-5xl font-extrabold text-gray-100">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3 sm:mb-5 text-sm sm:text-base">
                    {step.description}
                  </p>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {step.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 sm:mt-14">
            <button
              onClick={() => navigate("/contact")}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl text-base sm:text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl inline-flex items-center justify-center"
            >
              Start With a Free Discovery Call
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
          </div>
        </div>
      </section>

      {/* Trust Builders Section - Dynamic */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-blue-100 mb-3">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">
                Proven Track Record
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Growing Businesses
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl text-center mx-auto">
              See why growing businesses choose{" "}
              {companyProfile?.companyName || "Core Implementations"} for their
              AI transformation
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center">
              <div className="bg-blue-100 w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                <Users className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="text-lg sm:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-2">
                {companyProfile?.completeProjects || "50+"}
              </div>
              <div className="text-[11px] sm:text-base text-gray-600 leading-tight">
                Complete Projects
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                <TrendingUp className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div className="text-lg sm:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-2">
                73%
              </div>
              <div className="text-[11px] sm:text-base text-gray-600 leading-tight">
                Average Efficiency Gain
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                <Star className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <div className="text-lg sm:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-2">
                4.9/5
              </div>
              <div className="text-[11px] sm:text-base text-gray-600 leading-tight">
                Client Satisfaction
              </div>
            </div>
          </div>

          {/* Works With Your Stack + Testimonials */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-start">
            {/* Left: Tools & AI */}
            <div className="bg-white/60 backdrop-blur-sm border border-white rounded-2xl p-5 sm:p-8 shadow-lg h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Built To Fit Your Existing Stack
              </h3>
              <p className="text-gray-600 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                We don't ask you to abandon the software you already rely
                on. We build automations that connect to it, and use
                industry-leading AI models under the hood.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
                {integrationTools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
                  >
                    <PlugZap className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Powered By Leading AI
                </p>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  Claude (Anthropic) & ChatGPT (OpenAI)
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  We match the right model to the job, so your automations
                  are accurate, reliable, and built to last.
                </p>
              </div>
            </div>

            {/* Right: Testimonials - Dynamic */}
            <div className="space-y-5 sm:space-y-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">
                    Loading testimonials...
                  </p>
                </div>
              ) : (
                reviews.map((review, index) => {
                  const avatarColor =
                    avatarColors[index % avatarColors.length];

                  return (
                    <div
                      key={review.id}
                      className="group relative bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-blue-100 text-4xl sm:text-6xl font-serif opacity-50">
                        "
                      </div>

                      <div className="relative">
                        <div className="flex items-center mb-4 sm:mb-6">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current drop-shadow-sm"
                            />
                          ))}
                        </div>
                        <blockquote className="text-base sm:text-lg text-gray-700 mb-5 sm:mb-8 leading-relaxed font-medium">
                          "{review.description}"
                        </blockquote>
                        <div className="flex items-center">
                          <div
                            className={`relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg flex-shrink-0`}
                          >
                            <span className="text-white font-bold text-base sm:text-xl">
                              {getInitials(review.name)}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-base sm:text-lg">
                              {review.name}
                            </div>
                            <div className="text-gray-600 font-medium text-sm sm:text-base">
                              {review.designation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
      <Action />
      <Footer />
    </div>
  );
};

export default Homepage;
