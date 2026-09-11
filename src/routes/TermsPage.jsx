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

const TermsPage = () => {
  return (
    <div className="pt-16 sm:pt-20">
      <SEO
        title="Terms of Service"
        description="The terms governing your use of the Core Implement website."
        path="/terms"
      />
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Last updated: September 6, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section title="Acceptance of Terms">
            <p>
              By accessing or using coreimplement.com (the "Site"), you
              agree to be bound by these Terms of Service ("Terms"). If you
              do not agree, please do not use the Site.
            </p>
          </Section>

          <Section title="Use of the Site">
            <p>
              You agree to use the Site only for lawful purposes. You may
              not use the Site in any way that could damage, disable, or
              impair the Site, or interfere with anyone else's use of it.
            </p>
          </Section>

          <Section title="Our Services">
            <p>
              Core Implement provides AI automation consulting and
              implementation services. Information on this Site, including
              service descriptions, case studies, and any pricing
              indications, is provided for general informational purposes
              and does not constitute a binding offer. Specific engagements
              are governed by a separate signed agreement between Core
              Implementations and the client.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on this Site, including text, graphics, logos,
              and design, is the property of Core Implement unless
              otherwise noted, and may not be copied, reproduced, or
              distributed without our written permission.
            </p>
          </Section>

          <Section title="Third-Party Links and Services">
            <p>
              The Site may include links to or integrations with
              third-party services, such as Calendly. We are not
              responsible for the content, accuracy, or practices of any
              third-party service.
            </p>
          </Section>

          <Section title="No Warranty">
            <p>
              The Site and its content are provided "as is" without
              warranties of any kind, express or implied. We do not
              guarantee that the Site will be error-free, secure, or
              uninterrupted.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Core Implement
              shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of the Site.
            </p>
          </Section>

          <Section title="Changes to These Terms">
            <p>
              We may update these Terms from time to time. Continued use of
              the Site after changes are posted constitutes acceptance of
              the updated Terms.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms are governed by the laws of the State of Texas,
              without regard to its conflict of law principles.
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

export default TermsPage;
