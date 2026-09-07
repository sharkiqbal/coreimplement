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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <CookieConsentBanner />
          </CookieConsentProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>
);
