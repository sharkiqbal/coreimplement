import React from "react";
import { useNavigate } from "react-router-dom";

const Action = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Bottom CTA */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Ready to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Transform</span>
              <span className="absolute bottom-[-5px] left-0 w-full h-3 bg-yellow-400/40 -rotate-1"></span>
            </span>{" "}
            Your Business?
          </h2>

          <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed font-medium">
            Join dozens of Texas SMBs that have already streamlined their
            operations with AI. Book your free consultation today and discover
            what's possible for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={() => navigate("/contact")}
              className="group relative overflow-hidden bg-white text-blue-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Free Consultation
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </span>
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>

            <button
              onClick={() => navigate("/services")}
              className="group border-2 border-white/80 text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-white/10 hover:border-white backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              View Our Services
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 justify-center items-center text-sm mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-semibold">Free 30-min Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-semibold">No Commitment Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-semibold">Local Texas Expertise</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Action;
