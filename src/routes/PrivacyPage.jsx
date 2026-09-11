import React from "react";
import Footer from "../component/Footer";
import Navigation from "../component/Navigation";
import SEO from "../component/SEO";

const Section = ({ title, children }) => (
  <div className="mb-8 sm:mb-10">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
      {title}
    </h2>
    <div className="text-gray-600 leading-relaxed space-y-3 text-sm sm:text-base">
      {children}
    </div>
  </div>
);

const PrivacyPage = () => {
  return (
    <div className="pt-16 sm:pt-20">
      <SEO
        title="Privacy Policy"
        description="How Core Implement collects, uses, and protects your information."
        path="/privacy"
      />
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Last updated: September 6, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section title="Introduction">
            <p>
              Core Implement ("we," "us," or "our") operates
              coreimplement.com (the "Site"). This Privacy Policy explains
              what information we collect, how we use it, and the choices
              you have. By using the Site, you agree to the practices
              described here.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              <strong>Information you provide directly:</strong> your name,
              email address, phone number, company name, and any details you
              share when you contact us, request a meeting, or submit a
              Request for Proposal (RFP) through our forms.
            </p>
            <p>
              <strong>Information collected automatically:</strong> standard
              technical information such as browser type, device type, and
              pages visited, collected through normal web server operation.
            </p>
            <p>
              <strong>Scheduling information:</strong> if you book a meeting
              through our Calendly integration, Calendly collects and
              processes information according to its own privacy policy.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your inquiries and provide requested information</li>
              <li>Schedule and manage consultations</li>
              <li>Evaluate and respond to RFP submissions</li>
              <li>Improve our website and services</li>
              <li>Communicate with you about our services, when relevant</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </Section>

          <Section title="How We Store and Protect Information">
            <p>
              Information submitted through our forms is stored using
              Google Firebase, a secure third-party cloud platform. We take
              reasonable measures to protect the information we collect, but
              no method of transmission or storage is completely secure.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>
              We use the following third-party services, each governed by
              its own privacy policy:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Google Firebase (data storage)</li>
              <li>Calendly (meeting scheduling)</li>
            </ul>
          </Section>

          <Section title="Cookies and Local Storage">
            <p>
              Our Site uses browser local storage for essential functionality,
              such as remembering your cookie preference and keeping an
              authorized administrator signed in. When you accept cookies,
              our Calendly scheduling widget may also set its own cookies to
              enable booking. We do not use cookies or local storage for
              advertising or cross-site tracking, and non-essential
              third-party embeds like Calendly only load after you accept
              cookies via the banner shown on your first visit. You can
              change your preference at any time by clearing your browser's
              site data for this Site.
            </p>
          </Section>

          <Section title="Your Rights and Choices">
            <p>
              You may contact us at hello@coreimplement.com to request
              access to, correction of, or deletion of the personal
              information you've provided to us. We will respond to
              reasonable requests within a reasonable timeframe.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              Our Site is intended for business use and is not directed to
              individuals under 18. We do not knowingly collect personal
              information from children.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes
              will be posted on this page with an updated "Last updated"
              date.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              Core Implement
              <br />
              Houston, Texas
              <br />
              Email:{" "}
              <a
                href="mailto:hello@coreimplement.com"
                className="text-brand-600 hover:text-brand-700"
              >
                hello@coreimplement.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+12484534597"
                className="text-brand-600 hover:text-brand-700"
              >
                (248) 453-4597
              </a>
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
