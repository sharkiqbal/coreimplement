import React, { useState, useEffect, useRef } from "react";
import {
  Target,
  Users,
  Award,
  Shield,
  Lightbulb,
  Heart,
  LinkedinIcon,
} from "lucide-react";
import { getCompanyProfile } from "../service/companyProfileService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";

// About Us Page Component
const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const valuesRef = useRef(null);

  const scrollToValues = () => {
    if (valuesRef.current) {
      const element = valuesRef.current;
      const offset = 80; // Account for navigation height and some padding
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Gradient colors for team avatars
  const avatarColors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-orange-400 to-orange-600",
    "from-pink-400 to-pink-600",
    "from-indigo-400 to-indigo-600",
  ];

  // Role colors
  const roleColors = [
    "text-blue-600",
    "text-green-600",
    "text-purple-600",
    "text-orange-600",
    "text-pink-600",
    "text-indigo-600",
  ];

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const profileData = await getCompanyProfile();
      setTeamMembers(profileData.teamMembers || []);
    } catch (error) {
      console.error("Error loading team data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="pt-16">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50 flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
          <div
            className="absolute top-40 right-10 sm:right-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-20 w-36 h-36 sm:w-54 sm:h-54 lg:w-72 lg:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-200 mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-800">
              Empowering Small Businesses
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            Why Core Implementations{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Exists
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal mb-8 px-4">
            Bridging the gap between enterprise AI capabilities and small
            business accessibility
          </p>

          {/* Optional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center px-4">
            <button
              onClick={scrollToValues}
              className="group w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center mx-auto"
            >
              Learn More
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

      {/* Values */}
      <section ref={valuesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Transparency
              </h3>
              <p className="text-gray-600">
                Clear communication about costs, timelines, and realistic
                outcomes. No technical jargon, no overselling.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Local Partnership
              </h3>
              <p className="text-gray-600">
                We're not just vendors—we're Texas neighbors invested in the
                success of local businesses and communities.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                Delivering solutions that exceed expectations while maintaining
                the highest standards of quality and reliability.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Human-Centered
              </h3>
              <p className="text-gray-600">
                AI should enhance human capabilities, not replace them. We
                design solutions that empower your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize AI for small and medium businesses across Texas,
                providing enterprise-level automation and intelligence tools
                that are accessible, affordable, and immediately practical. We
                believe every business deserves the competitive advantage that
                AI provides.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <Lightbulb className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A future where Texas SMBs lead their industries through
                intelligent automation, where local businesses compete globally
                while staying true to their roots, and where AI amplifies human
                creativity rather than replacing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Dynamic from Firebase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The experts dedicated to your AI transformation
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No team members found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => {
                const avatarColor = avatarColors[index % avatarColors.length];
                const roleColor = roleColors[index % roleColors.length];

                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
                  >
                    <div
                      className={`w-32 h-32 bg-gradient-to-br ${avatarColor} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-white text-3xl font-bold">
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className={`${roleColor} font-medium mb-4`}>
                      {member.role}
                    </p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {member.description}
                    </p>
                    <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer mx-auto transition-colors" />
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

export default AboutPage;
