import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Calendar,
  FileText,
  MessageSquare,
} from "lucide-react";

import { addContactSubmission } from "../service/contactService";
import { addRFPSubmission } from "../service/rfpService";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import Action from "../component/Action";

function CalendlyWidget45min() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Schedule a Meeting
            </h1>
            <p className="text-blue-100">
              Choose a time that works best for you
            </p>
          </div>

          {/* Calendly Widget */}
          <div className="p-4 md:p-8">
            <div
              className="calendly-inline-widget rounded-lg overflow-hidden shadow-inner"
              data-url="https://calendly.com/ataulrehmangee994/level-meet?month=2025-10&hide_gdpr_banner=1"
              style={{ minWidth: "320px", height: "800px" }}
            />
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Powered by{" "}
              <span className="font-semibold text-blue-600">Calendly</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendlyWidget20min() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Schedule a Meeting
            </h1>
            <p className="text-blue-100">
              Choose a time that works best for you
            </p>
          </div>

          {/* Calendly Widget */}
          <div className="p-4 md:p-8">
            <div
              className="calendly-inline-widget rounded-lg overflow-hidden shadow-inner"
              data-url="https://calendly.com/ataulrehmangee994/20-minute-meeting?month=2025-10&hide_gdpr_banner=1"
              style={{ minWidth: "320px", height: "800px" }}
            />
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Powered by{" "}
              <span className="font-semibold text-blue-600">Calendly</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const EnhancedContactPage = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedMeetingType, setSelectedMeetingType] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  // RFP Form State
  const [rfpForm, setRFPForm] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    systemsInUse: "",
    topPain1: "",
    topPain2: "",
    timeline: "",
    budgetBand: "",
    additionalDetails: "",
  });

  const contactFormRef = useRef(null);

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (
        !contactForm.name.trim() ||
        !contactForm.email.trim() ||
        !contactForm.message.trim()
      ) {
        alert("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      await addContactSubmission(contactForm);
      setSubmitSuccess(true);
      setContactForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRFPSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (
        !rfpForm.name.trim() ||
        !rfpForm.email.trim() ||
        !rfpForm.topPain1.trim()
      ) {
        alert("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      await addRFPSubmission(rfpForm);
      setSubmitSuccess(true);
      setRFPForm({
        name: "",
        email: "",
        company: "",
        companySize: "",
        systemsInUse: "",
        topPain1: "",
        topPain2: "",
        timeline: "",
        budgetBand: "",
        additionalDetails: "",
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting RFP:", error);
      alert("Failed to submit RFP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[100vh] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50 py-12 sm:py-16 lg:py-24 overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16 flex flex-col items-center justify-center w-full">
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-emerald-200 mb-8">
            <svg
              className="w-4 h-4 text-emerald-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-gray-800">
              Multiple Ways to Connect
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Get Started{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Today
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal mb-8 px-4">
            Choose the best way to connect: quick contact, schedule a meeting,
            or submit a detailed RFP
          </p>

          <button
            onClick={scrollToContactForm}
            className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center mx-auto"
          >
            Choose Your Path
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
      </section>

      {/* Main Content with Tabs */}
      <section ref={contactFormRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 mb-8">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${
                  activeTab === "contact"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="hidden sm:inline">Quick Contact</span>
                <span className="sm:hidden">Contact</span>
              </button>

              <button
                onClick={() => setActiveTab("appointment")}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${
                  activeTab === "appointment"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Book Meeting</span>
                <span className="sm:hidden">Meeting</span>
              </button>

              <button
                onClick={() => setActiveTab("rfp")}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${
                  activeTab === "rfp"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">Submit RFP</span>
                <span className="sm:hidden">RFP</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {activeTab === "contact" && "Let's Talk"}
                  {activeTab === "appointment" && "Schedule Time"}
                  {activeTab === "rfp" && "Submit Your RFP"}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {activeTab === "contact" &&
                    "Quick questions? Drop us a message and we'll respond within 24 hours."}
                  {activeTab === "appointment" &&
                    "Book a consultation that fits your needs - from quick discovery calls to deep technical discussions."}
                  {activeTab === "rfp" &&
                    "Planning a major project? Submit a detailed RFP and receive a comprehensive proposal."}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">(713) 555-0123</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">
                      hello@coreimplementations.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Business Hours
                    </div>
                    <div className="text-gray-600">
                      Monday - Friday: 9AM - 6PM CST
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div className="text-gray-600">Houston, Texas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Forms/Calendly */}
            <div className="lg:col-span-2">
              {/* Quick Contact Form */}
              {activeTab === "contact" && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h3>

                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center text-green-800">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <p className="font-semibold">
                          Message sent successfully!
                        </p>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={contactForm.company}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="(713) 555-0123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about your needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}

              {/* Calendly Embed */}
              {activeTab === "appointment" && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Choose Your Meeting Type
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select the consultation that best fits your needs
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div
                      className={`border-2 rounded-xl p-6 transition-all cursor-pointer hover:scale-105 ${
                        selectedMeetingType === "20min"
                          ? "border-blue-500 bg-blue-50"
                          : "border-blue-200 hover:border-blue-400"
                      }`}
                      onClick={() => setSelectedMeetingType("20min")}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          Discovery Call
                        </h4>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          20 min
                        </span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Quick assessment of AI opportunities</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>High-level roadmap discussion</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Perfect for initial exploration</span>
                        </li>
                      </ul>
                      {selectedMeetingType === "20min" && (
                        <div className="mt-4 p-3 bg-green-100 rounded-lg">
                          <p className="text-sm text-green-800 font-semibold">
                            ✓ Selected - Click to schedule
                          </p>
                        </div>
                      )}
                    </div>

                    <div
                      className={`border-2 rounded-xl p-6 transition-all cursor-pointer hover:scale-105 ${
                        selectedMeetingType === "45min"
                          ? "border-purple-500 bg-purple-50"
                          : "border-purple-200 hover:border-purple-400"
                      }`}
                      onClick={() => setSelectedMeetingType("45min")}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          Technical Deep Dive
                        </h4>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                          45 min
                        </span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Detailed technical requirements review</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>System architecture discussion</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Custom solution planning</span>
                        </li>
                      </ul>
                      {selectedMeetingType === "45min" && (
                        <div className="mt-4 p-3 bg-green-100 rounded-lg">
                          <p className="text-sm text-green-800 font-semibold">
                            ✓ Selected - Click to schedule
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calendly Widget Component */}
                  {selectedMeetingType === "20min" && <CalendlyWidget20min />}
                  {selectedMeetingType === "45min" && <CalendlyWidget45min />}
                  {selectedMeetingType && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 text-center">
                        <strong>Ready to schedule?</strong> Select your
                        preferred time slot above to book your meeting.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* RFP Form */}
              {activeTab === "rfp" && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Submit Your RFP
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Provide detailed information about your project requirements
                    and we'll respond with a comprehensive proposal.
                  </p>

                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center text-green-800">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <p className="font-semibold">
                          RFP submitted successfully!
                        </p>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        We'll review your requirements and respond within 48
                        hours.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleRFPSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={rfpForm.name}
                          onChange={(e) =>
                            setRFPForm({ ...rfpForm, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={rfpForm.email}
                          onChange={(e) =>
                            setRFPForm({ ...rfpForm, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={rfpForm.company}
                          onChange={(e) =>
                            setRFPForm({ ...rfpForm, company: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Size
                        </label>
                        <select
                          value={rfpForm.companySize}
                          onChange={(e) =>
                            setRFPForm({
                              ...rfpForm,
                              companySize: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select size...</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>
                    </div>

                    {/* Systems in Use */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Systems in Use
                      </label>
                      <input
                        type="text"
                        value={rfpForm.systemsInUse}
                        onChange={(e) =>
                          setRFPForm({
                            ...rfpForm,
                            systemsInUse: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Salesforce, SAP, custom CRM..."
                      />
                    </div>

                    {/* Pain Points */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Top Pain Point #1 *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={rfpForm.topPain1}
                        onChange={(e) =>
                          setRFPForm({ ...rfpForm, topPain1: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your biggest challenge..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Top Pain Point #2
                      </label>
                      <textarea
                        rows={3}
                        value={rfpForm.topPain2}
                        onChange={(e) =>
                          setRFPForm({ ...rfpForm, topPain2: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Another key challenge (optional)..."
                      />
                    </div>

                    {/* Timeline & Budget */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desired Timeline
                        </label>
                        <select
                          value={rfpForm.timeline}
                          onChange={(e) =>
                            setRFPForm({ ...rfpForm, timeline: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select timeline...</option>
                          <option value="asap">ASAP (1-2 months)</option>
                          <option value="quarter">This Quarter</option>
                          <option value="6months">Next 6 months</option>
                          <option value="year">Within a year</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <select
                          value={rfpForm.budgetBand}
                          onChange={(e) =>
                            setRFPForm({
                              ...rfpForm,
                              budgetBand: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select budget...</option>
                          <option value="under25k">Under $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k-250k">$100,000 - $250,000</option>
                          <option value="250k+">$250,000+</option>
                          <option value="tbd">To Be Determined</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Project Details
                      </label>
                      <textarea
                        rows={5}
                        value={rfpForm.additionalDetails}
                        onChange={(e) =>
                          setRFPForm({
                            ...rfpForm,
                            additionalDetails: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any additional context, requirements, or specific questions..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit RFP"}
                    </button>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>What happens next?</strong> We'll review your
                        RFP and respond with a detailed proposal within 48
                        hours, including timelines, pricing, and our recommended
                        approach.
                      </p>
                    </div>
                  </form>
                </div>
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

export default EnhancedContactPage;
