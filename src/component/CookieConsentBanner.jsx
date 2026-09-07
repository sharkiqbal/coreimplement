import React from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "../context/CookieConsentContext";

const CookieConsentBanner = () => {
  const { consent, acceptAll, essentialOnly } = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Cookie className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies from third-party tools, like our scheduling
              widget, to make the site work. Choose "Accept All" for the full
              experience, or "Essential Only" to skip non-essential cookies.
              See our{" "}
              <Link
                to="/privacy"
                className="text-blue-600 font-semibold hover:text-blue-700 underline"
              >
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={essentialOnly}
              className="flex-1 sm:flex-none px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
