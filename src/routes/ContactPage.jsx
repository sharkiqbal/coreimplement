import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Calendar,
  FileText,
  MessageSquare,
  Paperclip,
  X,
  Plus,
} from "lucide-react";

import { addContactSubmission } from "../service/contactService";
import { addRFPSubmission, uploadRFPAttachment } from "../service/rfpService";
import { HONEYPOT_FIELD, isLikelySpam } from "../utils/spamGuard";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import SEO from "../component/SEO";
import { useCookieConsent } from "../context/CookieConsentContext";

// Calendly sets its own third-party cookies, so the embed only loads after cookie consent
function CalendlyConsentGate({ children }) {
  const { consent, acceptAll } = useCookieConsent();

  if (consent === "accepted") {
    return children;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-200 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-gray-900 font-bold text-lg mb-2">
          Scheduling Widget Requires Cookies
        </p>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Our calendar is powered by Calendly, which uses cookies to work.
          Accept cookies to book a time directly, or reach us at{" "}
          <a
            href="mailto:hello@coreimplement.com"
            className="text-brand-600 font-semibold"
          >
            hello@coreimplement.com
          </a>{" "}
          or{" "}
          <a href="tel:+12484534597" className="text-brand-600 font-semibold">
            (248) 453-4597
          </a>
          .
        </p>
        <button
          onClick={acceptAll}
          className="w-full px-5 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl text-sm font-bold hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg"
        >
          Accept Cookies to Continue
        </button>
      </div>
    </div>
  );
}

function CalendlyWidget45min() {
  const { consent } = useCookieConsent();
  const calendlyAllowed = consent === "accepted";

  useEffect(() => {
    if (!calendlyAllowed) return;

    // Load Calendly script (only after cookie consent, since it sets its own cookies)
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, [calendlyAllowed]);

  return (
    <CalendlyConsentGate>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-200 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-6 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Schedule a Meeting
              </h1>
              <p className="text-brand-100">
                Choose a time that works best for you
              </p>
            </div>

            {/* Calendly Widget */}
            <div className="p-4 md:p-8">
              <div
                className="calendly-inline-widget rounded-lg overflow-hidden shadow-inner"
                data-url={import.meta.env.VITE_CALENDLY_45MIN_URL}
                style={{ minWidth: "320px", height: "800px" }}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Powered by{" "}
                <span className="font-semibold text-brand-600">Calendly</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CalendlyConsentGate>
  );
}

function CalendlyWidget20min() {
  const { consent } = useCookieConsent();
  const calendlyAllowed = consent === "accepted";

  useEffect(() => {
    if (!calendlyAllowed) return;

    // Load Calendly script (only after cookie consent, since it sets its own cookies)
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, [calendlyAllowed]);

  return (
    <CalendlyConsentGate>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-200 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-6 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Schedule a Meeting
              </h1>
              <p className="text-brand-100">
                Choose a time that works best for you
              </p>
            </div>

            {/* Calendly Widget */}
            <div className="p-4 md:p-8">
              <div
                className="calendly-inline-widget rounded-lg overflow-hidden shadow-inner"
                data-url={import.meta.env.VITE_CALENDLY_20MIN_URL}
                style={{ minWidth: "320px", height: "800px" }}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Powered by{" "}
                <span className="font-semibold text-brand-600">Calendly</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CalendlyConsentGate>
  );
}

const VALID_TABS = ["contact", "appointment", "rfp"];

const EnhancedContactPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(requestedTab) ? requestedTab : "contact";
  const setActiveTab = (tab) => setSearchParams({ tab });
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
    painPoints: [""],
    timeline: "",
    budgetBand: "",
    additionalDetails: "",
  });

  const [rfpAttachment, setRfpAttachment] = useState(null);
  const [attachmentError, setAttachmentError] = useState("");
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);

  const updatePainPoint = (index, value) => {
    const next = [...rfpForm.painPoints];
    next[index] = value;
    setRFPForm({ ...rfpForm, painPoints: next });
  };

  const addPainPoint = () => {
    setRFPForm({ ...rfpForm, painPoints: [...rfpForm.painPoints, ""] });
  };

  const removePainPoint = (index) => {
    setRFPForm({
      ...rfpForm,
      painPoints: rfpForm.painPoints.filter((_, i) => i !== index),
    });
  };

  const contactFormRef = useRef(null);

  // Track when each form was rendered, and a honeypot field only bots fill in
  const contactFormLoadedAt = useRef(Date.now());
  const rfpFormLoadedAt = useRef(Date.now());
  const [contactHoneypot, setContactHoneypot] = useState("");
  const [rfpHoneypot, setRfpHoneypot] = useState("");

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Jump straight to the tab section when a specific tab was requested
  // (e.g. via the nav dropdown), rather than leaving the visitor at the
  // hero with no indication their tab was selected.
  useEffect(() => {
    if (requestedTab) {
      scrollToContactForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedTab]);

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

      // Bots trip the honeypot or submit faster than a human could; fake a
      // normal success so they don't retry with a different approach.
      if (
        !isLikelySpam({
          honeypotValue: contactHoneypot,
          formLoadedAt: contactFormLoadedAt.current,
        })
      ) {
        await addContactSubmission(contactForm);
      }

      setSubmitSuccess(true);
      setContactForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
      setContactHoneypot("");
      contactFormLoadedAt.current = Date.now();

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
    setAttachmentError("");

    try {
      const cleanedPainPoints = rfpForm.painPoints
        .map((p) => p.trim())
        .filter(Boolean);

      if (
        !rfpForm.name.trim() ||
        !rfpForm.email.trim() ||
        cleanedPainPoints.length === 0
      ) {
        alert("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      if (
        !isLikelySpam({
          honeypotValue: rfpHoneypot,
          formLoadedAt: rfpFormLoadedAt.current,
        })
      ) {
        let attachment = null;
        if (rfpAttachment) {
          setIsUploadingAttachment(true);
          try {
            attachment = await uploadRFPAttachment(rfpAttachment);
          } catch (uploadError) {
            setAttachmentError(uploadError.message);
            setIsSubmitting(false);
            setIsUploadingAttachment(false);
            return;
          }
          setIsUploadingAttachment(false);
        }

        await addRFPSubmission({
          ...rfpForm,
          painPoints: cleanedPainPoints,
          ...(attachment && {
            attachmentPath: attachment.path,
            attachmentName: attachment.name,
          }),
        });
      }

      setSubmitSuccess(true);
      setRFPForm({
        name: "",
        email: "",
        company: "",
        companySize: "",
        systemsInUse: "",
        painPoints: [""],
        timeline: "",
        budgetBand: "",
        additionalDetails: "",
      });
      setRfpAttachment(null);
      setRfpHoneypot("");
      rfpFormLoadedAt.current = Date.now();

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
      <SEO
        title="Contact Us"
        description="Book a free consultation with Core Implement. Tell us about your business and we'll show you what AI automation can do for you."
        path="/contact"
      />
      <Navigation />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-100 via-brand-200 to-purple-50 pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-emerald-200 mb-4 sm:mb-6">
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Tell Us What's{" "}
            <span className="bg-gradient-to-r from-brand-600 via-brand-700 to-purple-600 bg-clip-text text-transparent">
              Slowing You Down
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal px-4">
            Send a quick message, grab time on our calendar, or submit a full
            project brief. Whatever fits how you like to work.
          </p>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section ref={contactFormRef} className="py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 mb-6 sm:mb-8">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex items-center justify-center gap-2 px-3 py-3 sm:px-6 sm:py-4 rounded-xl font-bold transition-all ${
                  activeTab === "contact"
                    ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="hidden sm:inline">Quick Contact</span>
                <span className="sm:hidden">Contact</span>
              </button>

              <button
                onClick={() => setActiveTab("appointment")}
                className={`flex items-center justify-center gap-2 px-3 py-3 sm:px-6 sm:py-4 rounded-xl font-bold transition-all ${
                  activeTab === "appointment"
                    ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Book Meeting</span>
                <span className="sm:hidden">Meeting</span>
              </button>

              <button
                onClick={() => setActiveTab("rfp")}
                className={`flex items-center justify-center gap-2 px-3 py-3 sm:px-6 sm:py-4 rounded-xl font-bold transition-all ${
                  activeTab === "rfp"
                    ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg"
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
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-1 space-y-5 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">
                  {activeTab === "contact" && "Let's Talk"}
                  {activeTab === "appointment" && "Schedule Time"}
                  {activeTab === "rfp" && "Submit Your RFP"}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-5 sm:mb-8">
                  {activeTab === "contact" &&
                    "Quick questions? Drop us a message and we'll respond within 24 hours."}
                  {activeTab === "appointment" &&
                    "Book a consultation that fits your needs - from quick discovery calls to deep technical discussions."}
                  {activeTab === "rfp" &&
                    "Planning a major project? Submit a detailed RFP and receive a comprehensive proposal."}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-brand-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Phone</div>
                    <div className="text-gray-600 text-sm sm:text-base">(248) 453-4597</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Email</div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      hello@coreimplement.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      Business Hours
                    </div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      Monday - Friday: 9AM - 6PM CST
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-orange-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Location</div>
                    <div className="text-gray-600 text-sm sm:text-base">Houston, Texas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Forms/Calendly */}
            <div className="lg:col-span-2">
              {/* Quick Contact Form */}
              {activeTab === "contact" && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-lg">
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
                    {/* Honeypot - hidden from real users, bots that auto-fill every field will trip it */}
                    <div
                      style={{ position: "absolute", left: "-9999px" }}
                      aria-hidden="true"
                    >
                      <label htmlFor={HONEYPOT_FIELD}>
                        Leave this field blank
                      </label>
                      <input
                        type="text"
                        id={HONEYPOT_FIELD}
                        name={HONEYPOT_FIELD}
                        tabIndex={-1}
                        autoComplete="off"
                        value={contactHoneypot}
                        onChange={(e) => setContactHoneypot(e.target.value)}
                      />
                    </div>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                          placeholder="(248) 453-4597"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What Can We Help With?
                      </label>
                      <select
                        value={contactForm.projectType}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            projectType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      >
                        <option value="">Select a topic...</option>
                        <option value="Business Process Automation">
                          Business Process Automation
                        </option>
                        <option value="AI-Powered Customer Communication">
                          AI-Powered Customer Communication
                        </option>
                        <option value="Custom AI Software & Integrations">
                          Custom AI Software & Integrations
                        </option>
                        <option value="AI-Powered Marketing & Growth">
                          AI-Powered Marketing & Growth
                        </option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                        placeholder="Tell us about your needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}

              {/* Calendly Embed */}
              {activeTab === "appointment" && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Choose Your Meeting Type
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Both options are completely free, no commitment required.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Not sure which one? If you're just exploring what's
                    possible, start with the Discovery Call. If you already
                    have specific systems or technical questions in mind, go
                    straight to the Technical Deep Dive.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div
                      className={`border-2 rounded-xl p-6 transition-all cursor-pointer hover:scale-105 ${
                        selectedMeetingType === "20min"
                          ? "border-brand-500 bg-brand-50"
                          : "border-brand-200 hover:border-brand-400"
                      }`}
                      onClick={() => setSelectedMeetingType("20min")}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          Discovery Call
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Free
                          </span>
                          <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold">
                            20 min
                          </span>
                        </div>
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
                            ✓ Selected. Pick a time below.
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
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Free
                          </span>
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                            45 min
                          </span>
                        </div>
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
                            ✓ Selected. Pick a time below.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calendly Widget Component */}
                  {selectedMeetingType === "20min" && <CalendlyWidget20min />}
                  {selectedMeetingType === "45min" && <CalendlyWidget45min />}
                </div>
              )}

              {/* RFP Form */}
              {activeTab === "rfp" && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-lg">
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
                    {/* Honeypot - hidden from real users, bots that auto-fill every field will trip it */}
                    <div
                      style={{ position: "absolute", left: "-9999px" }}
                      aria-hidden="true"
                    >
                      <label htmlFor={`rfp-${HONEYPOT_FIELD}`}>
                        Leave this field blank
                      </label>
                      <input
                        type="text"
                        id={`rfp-${HONEYPOT_FIELD}`}
                        name={HONEYPOT_FIELD}
                        tabIndex={-1}
                        autoComplete="off"
                        value={rfpHoneypot}
                        onChange={(e) => setRfpHoneypot(e.target.value)}
                      />
                    </div>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                        placeholder="e.g., Salesforce, SAP, custom CRM..."
                      />
                    </div>

                    {/* Pain Points */}
                    <div className="space-y-4">
                      {rfpForm.painPoints.map((point, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Pain Point #{index + 1}
                              {index === 0 ? " *" : ""}
                            </label>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removePainPoint(index)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                aria-label={`Remove pain point ${index + 1}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <textarea
                            required={index === 0}
                            rows={3}
                            value={point}
                            onChange={(e) => updatePainPoint(index, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                            placeholder={
                              index === 0
                                ? "Describe your biggest challenge..."
                                : "Another key challenge..."
                            }
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addPainPoint}
                        className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add another pain point
                      </button>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                        >
                          <option value="">Select timeline...</option>
                          <option value="30days">Within 30 days</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6-12months">6-12 months</option>
                          <option value="no-timeline">No specific timeline</option>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                        >
                          <option value="">Select budget...</option>
                          <option value="under5k">Under $5,000</option>
                          <option value="5k-15k">$5,000 - $15,000</option>
                          <option value="15k-30k">$15,000 - $30,000</option>
                          <option value="30k-50k">$30,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                          <option value="tbd">Not sure yet</option>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                        placeholder="Any additional context, requirements, or specific questions..."
                      />
                    </div>

                    {/* Attachment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attach Your RFP Document (optional)
                      </label>
                      {rfpAttachment ? (
                        <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                          <span className="flex items-center gap-2 text-sm text-gray-800 truncate">
                            <Paperclip className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="truncate">{rfpAttachment.name}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setRfpAttachment(null);
                              setAttachmentError("");
                            }}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
                            aria-label="Remove attachment"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-brand-400 hover:text-brand-600 cursor-pointer transition-colors">
                          <Paperclip className="w-4 h-4" />
                          Choose a file (PDF, Word, Excel, or image, up to 10MB)
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              setAttachmentError("");
                              if (file) setRfpAttachment(file);
                            }}
                          />
                        </label>
                      )}
                      {attachmentError && (
                        <p className="mt-2 text-sm text-red-600">
                          {attachmentError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploadingAttachment
                        ? "Uploading attachment..."
                        : isSubmitting
                        ? "Submitting..."
                        : "Submit RFP"}
                    </button>

                    <div className="mt-6 p-4 bg-brand-50 rounded-lg">
                      <p className="text-sm text-brand-800">
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
      <Footer />
    </div>
  );
};

export default EnhancedContactPage;
