import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import SignInPage from "./screens/SignInPage";
import AdminDashboard from "./routes/Dashborad";
import AboutPage from "./routes/AboutUsPage";
import CaseStudiesPage from "./routes/CaseStudiesPage";
import ContactPage from "./routes/ContactPage";
import Homepage from "./routes/Homepage";
import ResourcesPage from "./routes/ResourcesPage";
import ResourceArticlePage from "./routes/ResourceArticlePage";
import ServicesPage from "./routes/ServicesPage";
import PrivacyPage from "./routes/PrivacyPage";
import TermsPage from "./routes/TermsPage";
import NotFoundPage from "./routes/NotFoundPage";
import PersonaPicker from "./routes/platformPreview/PersonaPicker";
import PlatformPreviewLayout from "./routes/platformPreview/PlatformPreviewLayout";
import PersonaOverview from "./routes/platformPreview/PersonaOverview";
import PersonaWorkspace from "./routes/platformPreview/PersonaWorkspace";
import PersonaAutomations from "./routes/platformPreview/PersonaAutomations";
import PersonaIntegrations from "./routes/platformPreview/PersonaIntegrations";
import PersonaCommunications from "./routes/platformPreview/PersonaCommunications";
import PersonaReports from "./routes/platformPreview/PersonaReports";
import ScrollToTop from "./component/ScrollToTop";
import CookieConsentBanner from "./component/CookieConsentBanner";
import { AuthProvider } from "./context/AuthContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import ProtectedRoute from "./component/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <CookieConsentProvider>
            <ScrollToTop />
            <Routes>
              {/* Public route - anyone can access */}
              <Route path="/admin-core-0004" element={<SignInPage />} />

              {/* Protected route - only authenticated users can access */}
              <Route
                path="/admindashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:slug" element={<ResourceArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Hidden platform demo - unlisted, no nav link, excluded from sitemap/robots */}
              <Route path="/platform-preview" element={<PersonaPicker />} />
              <Route
                path="/platform-preview/:industrySlug"
                element={<PlatformPreviewLayout />}
              >
                <Route index element={<PersonaOverview />} />
                <Route path="workspace" element={<PersonaWorkspace />} />
                <Route path="automations" element={<PersonaAutomations />} />
                <Route path="integrations" element={<PersonaIntegrations />} />
                <Route
                  path="communications"
                  element={<PersonaCommunications />}
                />
                <Route path="reports" element={<PersonaReports />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <CookieConsentBanner />
          </CookieConsentProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>
);
