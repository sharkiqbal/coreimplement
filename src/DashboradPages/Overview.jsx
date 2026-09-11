import React, { useState, useEffect } from "react";
import {
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Star,
  Building2,
  Tag,
  Briefcase,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentContacts,
} from "../service/overviewService";
import { useToast } from "../context/ToastContext";

const OverviewTab = ({ onNavigate }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    contacts: 0,
    rfps: 0,
    services: 0,
    caseStudies: 0,
    reviews: 0,
    blogPosts: 0,
  });
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load stats and recent contacts in parallel
      const [statsData, contactsData] = await Promise.all([
        getDashboardStats(),
        getRecentContacts(5),
      ]);

      setStats(statsData);
      setRecentContacts(contactsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, onClick }) => (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 cursor-pointer overflow-hidden text-left w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative flex items-start justify-between mb-3">
        <div
          className={`${color} bg-opacity-10 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-md`}
        >
          <Icon
            className={`w-5 h-5 ${color.replace("bg-", "text-")}`}
            strokeWidth={2}
          />
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>
      <div className="relative">
        <p className="text-xs font-semibold text-gray-600 mb-1 truncate">
          {title}
        </p>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-1">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 font-medium truncate">
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={MessageSquare}
          title="Contact Forms"
          value={stats.contacts}
          subtitle="Total submissions"
          color="bg-brand-600"
          onClick={() => onNavigate?.("leads", "contact")}
        />
        <StatCard
          icon={FileText}
          title="RFP Submissions"
          value={stats.rfps}
          subtitle="Detailed proposals"
          color="bg-cyan-600"
          onClick={() => onNavigate?.("leads", "rfp")}
        />
        <StatCard
          icon={Briefcase}
          title="Services"
          value={stats.services}
          subtitle="Active offerings"
          color="bg-orange-600"
          onClick={() => onNavigate?.("services")}
        />
        <StatCard
          icon={FileText}
          title="Case Studies"
          value={stats.caseStudies}
          subtitle="Success stories"
          color="bg-green-600"
          onClick={() => onNavigate?.("case-studies")}
        />
        <StatCard
          icon={Star}
          title="Reviews"
          value={stats.reviews}
          subtitle="Client testimonials"
          color="bg-purple-600"
          onClick={() => onNavigate?.("reviews")}
        />
        <StatCard
          icon={BookOpen}
          title="Blog Posts"
          value={stats.blogPosts}
          subtitle="Published articles"
          color="bg-brand-700"
          onClick={() => onNavigate?.("blog")}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            Recent Contact Forms
          </h3>
          <p className="text-sm text-gray-600 mt-1">Latest submissions</p>
        </div>

        {recentContacts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No contact submissions yet
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Project Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {contact.company}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700 capitalize font-medium">
                          {contact.projectType || "Not specified"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            contact.status === "new"
                              ? "bg-brand-100 text-brand-700"
                              : contact.status === "contacted"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.createdAt?.toDate
                          ? new Date(
                              contact.createdAt.toDate()
                            ).toLocaleDateString()
                          : "Just now"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Mail className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {contact.company}
                      </span>
                    </div>

                    {contact.projectType && (
                      <div className="flex items-center text-sm">
                        <Tag className="w-3.5 h-3.5 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700 capitalize font-medium">
                          {contact.projectType}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                        <span>
                          {contact.createdAt?.toDate
                            ? new Date(
                                contact.createdAt.toDate()
                              ).toLocaleDateString()
                            : "Just now"}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          contact.status === "new"
                            ? "bg-brand-100 text-brand-700"
                            : contact.status === "contacted"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
