import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";
import {
  getAllContactSubmissions,
  updateContactStatus,
  deleteContactSubmission,
} from "../service/contactService";

const ContactSubmissionsTab = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllContactSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error("Error loading submissions:", error);
      alert("Failed to load contact submissions. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateContactStatus(id, newStatus);
      await loadSubmissions();
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        await deleteContactSubmission(id);
        await loadSubmissions();
        alert("Submission deleted successfully!");
      } catch (error) {
        console.error("Error deleting submission:", error);
        alert("Failed to delete submission. Please try again.");
      }
    }
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredSubmissions =
    filterStatus === "all"
      ? submissions
      : submissions.filter((s) => s.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Submissions
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and respond to customer inquiries
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {submissions.length}
              </div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No submissions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">
                      {submission.name}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {submission.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {submission.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {submission.email}
                    </div>
                    {submission.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {submission.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(submission)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(submission.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                {submission.projectType && (
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-2">
                    {submission.projectType}
                  </div>
                )}
                <p className="text-sm text-gray-700 line-clamp-2">
                  {submission.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {submission.createdAt?.toDate
                    ? new Date(submission.createdAt.toDate()).toLocaleString()
                    : "Just now"}
                </div>
                <div className="flex gap-2">
                  {submission.status === "new" && (
                    <button
                      onClick={() =>
                        handleStatusChange(submission.id, "contacted")
                      }
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      Mark as Contacted
                    </button>
                  )}
                  {submission.status === "contacted" && (
                    <button
                      onClick={() =>
                        handleStatusChange(submission.id, "completed")
                      }
                      className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {submission.status === "completed" && (
                    <button
                      onClick={() => handleStatusChange(submission.id, "new")}
                      className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                Submission Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Status
                </label>
                <span
                  className={`inline-block px-4 py-2 text-sm font-bold rounded-full ${getStatusColor(
                    selectedSubmission.status
                  )}`}
                >
                  {selectedSubmission.status.toUpperCase()}
                </span>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Name
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {selectedSubmission.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {selectedSubmission.company}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedSubmission.email}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {selectedSubmission.phone ? (
                      <a
                        href={`tel:${selectedSubmission.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedSubmission.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Type */}
              {selectedSubmission.projectType && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Project Type
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {selectedSubmission.projectType}
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>

              {/* Submitted Date */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Submitted
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                  {selectedSubmission.createdAt?.toDate
                    ? new Date(
                        selectedSubmission.createdAt.toDate()
                      ).toLocaleString()
                    : "Just now"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                {selectedSubmission.status !== "completed" && (
                  <button
                    onClick={() => {
                      handleStatusChange(
                        selectedSubmission.id,
                        selectedSubmission.status === "new"
                          ? "contacted"
                          : "completed"
                      );
                      setShowModal(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {selectedSubmission.status === "new"
                      ? "Mark as Contacted"
                      : "Mark as Completed"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissionsTab;
