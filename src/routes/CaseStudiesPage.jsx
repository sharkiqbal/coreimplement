import React, { useState, useEffect } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { getAllCaseStudies } from "../service/caseStudyService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";

// Case Studies Page Component
const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Industry color schemes
  const industryColors = {
    Manufacturing: { bg: "bg-blue-100", text: "text-blue-800" },
    Retail: { bg: "bg-green-100", text: "text-green-800" },
    Healthcare: { bg: "bg-purple-100", text: "text-purple-800" },
    Finance: { bg: "bg-orange-100", text: "text-orange-800" },
    "Real Estate": { bg: "bg-pink-100", text: "text-pink-800" },
    Legal: { bg: "bg-indigo-100", text: "text-indigo-800" },
    "Professional Services": { bg: "bg-teal-100", text: "text-teal-800" },
    Technology: { bg: "bg-cyan-100", text: "text-cyan-800" },
    Hospitality: { bg: "bg-yellow-100", text: "text-yellow-800" },
    Education: { bg: "bg-red-100", text: "text-red-800" },
  };

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    try {
      setLoading(true);
      const data = await getAllCaseStudies();
      setCaseStudies(data);
    } catch (error) {
      console.error("Error loading case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIndustryColors = (industry) => {
    return (
      industryColors[industry] || { bg: "bg-gray-100", text: "text-gray-800" }
    );
  };

  return (
    <div className="pt-16">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50 flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16 flex flex-col items-center justify-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-green-200 mb-8">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 text-green-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-gray-800">
                Proven Success Stories
              </span>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Real Results
            </span>{" "}
            for Real Businesses
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal mb-8 px-4">
            See how Texas SMBs have transformed their operations with our AI
            solutions
          </p>

          {/* Stats Pills */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <div className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                34+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Success Stories
              </div>
            </div>
            <div className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                85%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Efficiency Gain
              </div>
            </div>
            <div className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                $2M+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Cost Savings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading case studies...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No case studies available at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-20">
              {caseStudies.map((study, index) => {
                const industryColor = getIndustryColors(study.industryType);
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={study.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      !isEven ? "lg:grid-flow-col-dense" : ""
                    }`}
                  >
                    {/* Content Side */}
                    <div className={!isEven ? "lg:col-start-2" : ""}>
                      <div
                        className={`${industryColor.bg} text-sm font-medium px-4 py-2 rounded-full inline-block mb-4 shadow-sm`}
                      >
                        <span className={industryColor.text}>
                          {study.industryType}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {study.projectName}
                      </h2>
                      <p className="text-lg text-gray-600 mb-6 font-medium">
                        {study.companyName}
                      </p>

                      <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            Challenge
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Solution
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {study.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Results Side */}
                    <div
                      className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}
                    >
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                          Results Achieved
                        </h3>
                        <div className="space-y-4 mb-8">
                          {study.results.map((result, resultIndex) => (
                            <div
                              key={resultIndex}
                              className="flex items-start space-x-3 bg-white/70 backdrop-blur-sm p-4 rounded-lg hover:bg-white transition-colors group"
                            >
                              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              <span className="text-gray-700 font-medium leading-relaxed">
                                {result}
                              </span>
                            </div>
                          ))}
                        </div>
                        {study.timeline && (
                          <div className="p-5 bg-white rounded-xl shadow-md border border-gray-100">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Clock className="w-4 h-4 mr-2" />
                              Project Timeline
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {study.timeline}
                            </div>
                          </div>
                        )}
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

export default CaseStudiesPage;
