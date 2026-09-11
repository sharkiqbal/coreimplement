import React, { useState, useEffect } from "react";
import {
  BookOpen,
  BarChart3,
  Inbox,
  FileText,
  Menu,
  Star,
  MapPin,
  Building2,
  Briefcase,
} from "lucide-react";
import { getCompanyProfile } from "../service/companyProfileService";
import { getAllContactSubmissions } from "../service/contactService";
import { getAllRFPSubmissions } from "../service/rfpService";
import { ToastProvider } from "../context/ToastContext";
import LogoutButton from "../component/LogoutButton";
import { LogoMark } from "../component/Logo";

import OverviewTab from "../DashboradPages/Overview";
import CompanyProfileTab from "../DashboradPages/CompanyProfile";
import LeadsTab from "../DashboradPages/Leads";
import ServicesTab from "../DashboradPages/Services";
import BlogTab from "../DashboradPages/Blog";
import CaseStudiesTab from "../DashboradPages/CaseStudies";
import ReviewsTab from "../DashboradPages/Reviews";

const AdminDashboardInner = () => {
  const [companyName, setCompanyName] = useState("Core Implement");
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const [leadsSourceFilter, setLeadsSourceFilter] = useState("all");

  const navigateToTab = (tabId, leadsFilter = "all") => {
    if (tabId === "leads") setLeadsSourceFilter(leadsFilter);
    setActiveTab(tabId);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const loadNewLeadsCount = async () => {
    try {
      const [contacts, rfps] = await Promise.all([
        getAllContactSubmissions(),
        getAllRFPSubmissions(),
      ]);
      const newCount =
        contacts.filter((c) => c.status === "new").length +
        rfps.filter((r) => r.status === "new").length;
      setNewLeadsCount(newCount);
    } catch (error) {
      console.error("Error loading new leads count:", error);
    }
  };

  useEffect(() => {
    loadNewLeadsCount();
  }, []);

  const Sidebar = () => (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-full z-30 shadow-xl`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative p-2 transform group-hover:scale-110 transition-transform duration-300">
                <LogoMark className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  {companyName}
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Admin Dashboard
                </p>
              </div>
            </div>
          ) : (
            <div className="relative group cursor-pointer mx-auto p-2 transform group-hover:scale-110 transition-transform duration-300">
              <LogoMark className="w-8 h-8" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {[
          { id: "overview", icon: BarChart3, label: "Overview" },
          {
            id: "company",
            icon: Building2,
            label: "Company Profile",
          },
          {
            id: "leads",
            icon: Inbox,
            label: "Leads",
            badge: newLeadsCount > 0 ? newLeadsCount : null,
          },
          { id: "services", icon: Briefcase, label: "Services" },
          { id: "blog", icon: BookOpen, label: "Blog Posts" },
          {
            id: "case-studies",
            icon: FileText,
            label: "Case Studies",
          },
          { id: "reviews", icon: Star, label: "Reviews" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-gray-100 hover:scale-102"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <item.icon className="w-5 h-5" strokeWidth={2} />
                {!isSidebarOpen && item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              {isSidebarOpen && (
                <span className="font-semibold">{item.label}</span>
              )}
            </div>
            {isSidebarOpen && item.badge && (
              <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <LogoutButton isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700 md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {activeTab.charAt(0).toUpperCase() +
                    activeTab.slice(1).replace("-", " ")}
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Welcome back, Admin
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Houston, TX</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          {activeTab === "overview" && (
            <OverviewTab onNavigate={navigateToTab} />
          )}
          {activeTab === "leads" && (
            <LeadsTab
              onLeadsChanged={loadNewLeadsCount}
              initialSourceFilter={leadsSourceFilter}
            />
          )}
          {activeTab === "services" && <ServicesTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "case-studies" && <CaseStudiesTab />}
          {activeTab === "company" && <CompanyProfileTab />}
          {activeTab === "reviews" && <ReviewsTab />}
        </main>
      </div>
    </div>
  );
};

const AdminDashboard = () => (
  <ToastProvider>
    <AdminDashboardInner />
  </ToastProvider>
);

export default AdminDashboard;
