import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  LinkedinIcon,
  Instagram,
  Twitter,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCompanyProfile } from "../service/companyProfileService";

const Footer = () => {
  const [companyName, setCompanyName] = useState("Core Implementations");

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-2">
                  <BrainCircuit
                    className="w-8 h-8 text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold">{companyName}</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI made simple for SMBs. Transforming Texas businesses with
              intelligent automation and data-driven insights.
            </p>
            <div className="flex items-center text-gray-400 mb-6 group cursor-pointer">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Based in</p>
                <span className="font-semibold text-white">Houston, Texas</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group"
              >
                <LinkedinIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-400 hover:scale-110 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <div className="space-y-3">
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
                  className="group flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <a
                href="tel:7135550123"
                className="group flex items-start hover:text-blue-400 transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600/20 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Call us</p>
                  <span className="text-gray-300 font-medium">
                    (713) 555-0123
                  </span>
                </div>
              </a>
              <a
                href="mailto:hello@coreimplementations.com"
                className="group flex items-start hover:text-blue-400 transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600/20 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email us</p>
                  <span className="text-gray-300 font-medium break-all">
                    hello@coreimplementations.com
                  </span>
                </div>
              </a>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Business hours</p>
                  <span className="text-gray-300 font-medium">
                    Mon-Fri 9AM-6PM CST
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} {companyName}. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
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
