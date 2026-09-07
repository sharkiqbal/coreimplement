import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import SEO from "../component/SEO";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 sm:pt-20">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have moved."
        path="/404"
        noindex
      />
      <Navigation />
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Back to Homepage
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
