import React, { useState, useEffect, useRef } from "react";
import {
  Target,
  Users,
  Award,
  Shield,
  Lightbulb,
  Heart,
  LinkedinIcon,
  MapPin,
} from "lucide-react";
import { getCompanyProfile } from "../service/companyProfileService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";
import SEO from "../component/SEO";

// About Us Page Component
const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const teamRef = useRef(null);

  const scrollToTeam = () => {
    if (teamRef.current) {
      const element = teamRef.current;
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
    <div className="pt-16 sm:pt-20">
      <SEO
        title="About Us"
        description="Meet the team behind Core Implementations, spanning client strategy, operations, engineering, and data science across Houston, Pakistan, and Chicago."
        path="/about"
      />
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
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-200 mb-4 sm:mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-800">
              Empowering Small Businesses
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight drop-shadow-sm">
            Why Core Implementations{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Exists
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal mb-5 sm:mb-8 px-4">
            We help growing businesses automate the manual, repetitive work
            slowing them down, using the same caliber of AI and automation
            that enterprises rely on.
          </p>

          {/* Optional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center px-4">
            <button
              onClick={scrollToTeam}
              className="group w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center mx-auto"
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

      {/* Team Section - Dynamic from Firebase */}
      <section ref={teamRef} className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              The experts dedicated to your AI transformation
            </p>
            <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-2xl mx-auto">
              A small team spanning client strategy, operations, engineering,
              and data science, based in Houston, Pakistan, and Chicago.
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
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => {
                const avatarColor = avatarColors[index % avatarColors.length];
                const roleColor = roleColors[index % roleColors.length];

                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
                  >
                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}
                      >
                        <span className="text-white text-lg sm:text-2xl font-bold">
                          {getInitials(member.name)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className={`${roleColor} font-medium text-sm sm:text-base`}>
                          {member.role}
                        </p>
                        {member.location && (
                          <p className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm mt-1">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            {member.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                      {member.description}
                    </p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="inline-block"
                      >
                        <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
            <div className="bg-white rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 sm:block mb-3 sm:mb-6">
                <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center sm:mb-6 shadow-md flex-shrink-0">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To take the manual, repetitive work slowing businesses down
                (data entry, quoting, reporting, customer follow-ups) and
                automate it with the same caliber of AI enterprises rely on.
                We believe every business deserves that advantage, not just
                the ones with in-house engineering teams.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 sm:block mb-3 sm:mb-6">
                <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center sm:mb-6 shadow-md flex-shrink-0">
                  <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                A future where SMBs of every kind lead their industries through
                intelligent automation, where businesses compete at a whole
                new level while staying true to their roots, and where AI
                amplifies human creativity rather than replacing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Core Values
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            <div className="group">
              <div className="flex items-center gap-3 sm:block mb-2 sm:mb-4">
                <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center sm:mx-auto shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 sm:text-center sm:mt-4 sm:mb-3">
                  Transparency
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base sm:text-center">
                Clear communication about costs, timelines, and realistic
                outcomes. No technical jargon, no overselling.
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-3 sm:block mb-2 sm:mb-4">
                <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center sm:mx-auto shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 sm:text-center sm:mt-4 sm:mb-3">
                  Genuine Partnership
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base sm:text-center">
                We're proud of our Texas roots, but we bring that same
                neighbor-like partnership to every business we work with,
                wherever they're located.
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-3 sm:block mb-2 sm:mb-4">
                <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center sm:mx-auto shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 sm:text-center sm:mt-4 sm:mb-3">
                  Excellence
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base sm:text-center">
                Delivering solutions that exceed expectations while maintaining
                the highest standards of quality and reliability.
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-3 sm:block mb-2 sm:mb-4">
                <div className="bg-orange-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center sm:mx-auto shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 sm:text-center sm:mt-4 sm:mb-3">
                  Human-Centered
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base sm:text-center">
                AI should enhance human capabilities, not replace them. We
                design solutions that empower your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Action
        headingBefore="Ready to Work "
        headingHighlight="Together"
        headingAfter="?"
        subtext="You've met the team behind Core Implementations. Let's talk about what AI automation could look like inside your business."
        secondaryLabel="See Case Studies"
        secondaryTo="/case-studies"
      />
      <Footer />
    </div>
  );
};

export default AboutPage;
