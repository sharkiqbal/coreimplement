import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Menu, X, ChevronDown, MessageSquare, Calendar, FileText } from "lucide-react";
import { getCompanyProfile } from "../service/companyProfileService";

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [companyName, setCompanyName] = useState("Core Implementations");
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", to: "/" },
    { id: "about", label: "About", to: "/about" },
    { id: "services", label: "Services", to: "/services" },
    { id: "case-studies", label: "Case Studies", to: "/case-studies" },
    { id: "resources", label: "Resources", to: "/resources" },
  ];

  const contactOptions = [
    {
      id: "contact",
      label: "Quick Contact",
      description: "Send us a message",
      icon: MessageSquare,
      to: "/contact?tab=contact",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "appointment",
      label: "Book Meeting",
      description: "Schedule a consultation",
      icon: Calendar,
      to: "/contact?tab=appointment",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "rfp",
      label: "Submit RFP",
      description: "Request for proposal",
      icon: FileText,
      to: "/contact?tab=rfp",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const handleContactClick = (to) => {
    setShowContactDropdown(false);
    setIsMenuOpen(false);
    navigate(to);
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setShowContactDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowContactDropdown(false);
    }, 200);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-2 transform group-hover:scale-110 transition-transform duration-300">
                <BrainCircuit
                  className="w-8 h-8 text-white"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {companyName}
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                AI Solutions for SMBs
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg group ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <span className="absolute inset-0 bg-blue-50 rounded-lg"></span>
                      )}
                      <span className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    </>
                  )}
                </NavLink>
              ))}

              {/* Contact Dropdown - Desktop */}
              <div
                className="relative"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button className="relative px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-all duration-200 rounded-lg group flex items-center gap-1">
                  <span className="relative z-10">Contact</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showContactDropdown ? 'rotate-180' : ''}`} />
                  <span className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                </button>

                {/* Dropdown Menu */}
                {showContactDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-fadeIn">
                    {contactOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleContactClick(option.to)}
                          className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 text-left group"
                        >
                          <div className={`${option.bgColor} p-2 rounded-lg ${option.color} group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-semibold ${option.color} group-hover:text-opacity-80`}>
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {option.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop CTA Button */}
            <button
              onClick={() => handleContactClick("/contact?tab=appointment")}
              className="ml-4 relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Consultation
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-2xl shadow-xl">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-base font-semibold transition-all duration-200 w-full text-left rounded-xl ${
                      isActive
                        ? "text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Contact Options - Mobile */}
              <div className="pt-2 space-y-2">
                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                  Get in Touch
                </div>
                {contactOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleContactClick(option.to)}
                      className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 text-left rounded-xl"
                      style={{
                        animationDelay: `${(navItems.length + index) * 50}ms`,
                      }}
                    >
                      <div className={`${option.bgColor} p-2 rounded-lg ${option.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${option.color}`}>
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {option.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleContactClick("/contact?tab=appointment")}
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 rounded-xl text-center font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    Book Consultation
                    <svg
                      className="w-4 h-4"
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
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add fadeIn animation to your global CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;