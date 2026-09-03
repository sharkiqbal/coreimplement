import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SignInPage from "./screens/SignInPage";
import AdminDashboard from "./routes/Dashborad";
import AboutPage from "./routes/AboutUsPage";
import CaseStudiesPage from "./routes/CaseStudiesPage";
import ContactPage from "./routes/ContactPage";
import Homepage from "./routes/Homepage";
import ResourcesPage from "./routes/ResourcesPage";
import ServicesPage from "./routes/ServicesPage";
import ScrollToTop from "./component/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
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
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
