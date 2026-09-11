import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCompanyProfile } from "../service/companyProfileService";
import { LogoMark } from "./Logo";

const Footer = () => {
  const [companyName, setCompanyName] = useState("Core Implement");

  // Load company name from Firebase
  useEffect(() => {
    const loadCompanyName = async () => {
      try {
        const profileData = await getCompanyProfile();
        if (profileData?.companyName) {
          setCompanyName(profileData.companyName);
        }
      } catch (error) {
        console.error("Error loading company name:", error);
      }
    };
    loadCompanyName();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 mb-6 sm:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="relative p-2">
                <LogoMark className="w-7 h-7 sm:w-8 sm:h-8" dark />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{companyName}</h3>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              AI made simple for SMBs. Automating the manual, repetitive work
              that slows growing businesses down, wherever they're located.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium">
                Based in Houston, Texas
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-6 text-white">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 sm:gap-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: "About Us", to: "/about" },
                { label: "Case Studies", to: "/case-studies" },
                { label: "Resources", to: "/resources" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  <ArrowRight className="hidden sm:block w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-6 text-white">
              Contact
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="tel:+12484534597"
                className="group flex items-center gap-3 hover:text-blue-400 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <p className="hidden sm:block text-xs text-gray-500 mb-1">
                    Call us
                  </p>
                  <span className="text-gray-300 font-medium text-sm sm:text-base">
                    (248) 453-4597
                  </span>
                </div>
              </a>
              <a
                href="mailto:hello@coreimplement.com"
                className="group flex items-center gap-3 hover:text-blue-400 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <p className="hidden sm:block text-xs text-gray-500 mb-1">
                    Email us
                  </p>
                  <span className="text-gray-300 font-medium break-all text-sm sm:text-base">
                    hello@coreimplement.com
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
                <div>
                  <p className="hidden sm:block text-xs text-gray-500 mb-1">
                    Business hours
                  </p>
                  <span className="text-gray-300 font-medium text-sm sm:text-base">
                    Mon-Fri 9AM-6PM CST
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-5 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4">
              <p className="text-gray-400 text-xs sm:text-sm">
                © {currentYear} {companyName}. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <span className="text-gray-700">•</span>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms
                </Link>
                <span className="text-gray-700">•</span>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
