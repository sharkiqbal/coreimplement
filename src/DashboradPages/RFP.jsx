import React, { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  Trash2,
  X,
  Building2,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Filter,
} from "lucide-react";
import {
  getAllRFPSubmissions,
  updateRFPStatus,
  updateRFPPriority,
  addRFPNotes,
  deleteRFPSubmission,
  getRFPStats,
} from "../service/rfpService";

const RFPTab = () => {
  const [rfps, setRFPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRFP, setSelectedRFP] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    reviewed: 0,
    proposalSent: 0,
    won: 0,
    lost: 0,
  });
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    loadRFPs();
  }, []);

  const loadRFPs = async () => {
    try {
      setLoading(true);
      const [rfpData, statsData] = await Promise.all([
        getAllRFPSubmissions(),
        getRFPStats(),
      ]);
      setRFPs(rfpData);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading RFPs:", error);
      alert("Failed to load RFP submissions. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRFPStatus(id, newStatus);
      await loadRFPs();
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handlePriorityChange = async (id, newPriority) => {
    try {
      await updateRFPPriority(id, newPriority);
      await loadRFPs();
    } catch (error) {
      console.error("Error updating priority:", error);
      alert("Failed to update priority. Please try again.");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedRFP) return;
    try {
      await addRFPNotes(selectedRFP.id, internalNotes);
      await loadRFPs();
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this RFP submission?")) {
      try {
        await deleteRFPSubmission(id);
        await loadRFPs();
        alert("RFP deleted successfully!");
      } catch (error) {
        console.error("Error deleting RFP:", error);
        alert("Failed to delete RFP. Please try again.");
      }
    }
  };

  const openModal = (rfp) => {
    setSelectedRFP(rfp);
    setInternalNotes(rfp.internalNotes || "");
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "reviewed":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "proposal_sent":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "won":
        return "bg-green-100 text-green-700 border-green-200";
      case "lost":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filteredRFPs =
    filterStatus === "all"
      ? rfps
      : rfps.filter((rfp) => rfp.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading RFP submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">RFP Submissions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Track and manage detailed project proposals
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total RFPs</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-700">{stats.new}</div>
            <div className="text-xs text-blue-600 font-medium">New</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-700">
              {stats.reviewed}
            </div>
            <div className="text-xs text-yellow-600 font-medium">Reviewed</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="text-2xl font-bold text-purple-700">
              {stats.proposalSent}
            </div>
            <div className="text-xs text-purple-600 font-medium">
              Proposal Sent
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="text-2xl font-bold text-green-700">{stats.won}</div>
            <div className="text-xs text-green-600 font-medium">Won</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="text-2xl font-bold text-red-700">{stats.lost}</div>
            <div className="text-xs text-red-600 font-medium">Lost</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All RFPs</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* RFP List */}
      {filteredRFPs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No RFP submissions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRFPs.map((rfp) => (
            <div
              key={rfp.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">
                      {rfp.name}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                        rfp.status
                      )}`}
                    >
                      {formatStatus(rfp.status)}
                    </span>
                    <select
                      value={rfp.priority || "medium"}
                      onChange={(e) =>
                        handlePriorityChange(rfp.id, e.target.value)
                      }
                      className={`px-3 py-1 text-xs font-bold rounded-full border-0 ${getPriorityColor(
                        rfp.priority || "medium"
                      )}`}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {rfp.company || "No company"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {rfp.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {rfp.budgetBand || "TBD"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {rfp.timeline || "Flexible"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(rfp)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(rfp.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Pain Points Preview */}
              <div className="mb-4">
                <div className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Top Pain Points:
                </div>
                <div className="space-y-2">
                  {rfp.topPain1 && (
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {rfp.topPain1}
                      </p>
                    </div>
                  )}
                  {rfp.topPain2 && (
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {rfp.topPain2}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {rfp.createdAt?.toDate
                    ? new Date(rfp.createdAt.toDate()).toLocaleString()
                    : "Just now"}
                </div>
                <div className="flex gap-2">
                  {rfp.status === "new" && (
                    <button
                      onClick={() => handleStatusChange(rfp.id, "reviewed")}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      Mark as Reviewed
                    </button>
                  )}
                  {rfp.status === "reviewed" && (
                    <button
                      onClick={() =>
                        handleStatusChange(rfp.id, "proposal_sent")
                      }
                      className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      Proposal Sent
                    </button>
                  )}
                  {rfp.status === "proposal_sent" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(rfp.id, "won")}
                        className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                      >
                        Mark as Won
                      </button>
                      <button
                        onClick={() => handleStatusChange(rfp.id, "lost")}
                        className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Mark as Lost
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedRFP && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                RFP Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Status & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Status
                  </label>
                  <span
                    className={`inline-block px-4 py-2 text-sm font-bold rounded-full border ${getStatusColor(
                      selectedRFP.status
                    )}`}
                  >
                    {formatStatus(selectedRFP.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={selectedRFP.priority || "medium"}
                    onChange={(e) => {
                      handlePriorityChange(selectedRFP.id, e.target.value);
                      setSelectedRFP({
                        ...selectedRFP,
                        priority: e.target.value,
                      });
                    }}
                    className={`px-4 py-2 text-sm font-bold rounded-lg ${getPriorityColor(
                      selectedRFP.priority || "medium"
                    )}`}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Name
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {selectedRFP.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      <a
                        href={`mailto:${selectedRFP.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedRFP.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {selectedRFP.company || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Company Size
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {selectedRFP.companySize || "Not provided"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Current Systems in Use
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {selectedRFP.systemsInUse || "Not specified"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Top Pain Point #1
                    </label>
                    <div className="px-4 py-3 bg-red-50 rounded-xl text-gray-900 border border-red-200">
                      {selectedRFP.topPain1}
                    </div>
                  </div>

                  {selectedRFP.topPain2 && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Top Pain Point #2
                      </label>
                      <div className="px-4 py-3 bg-orange-50 rounded-xl text-gray-900 border border-orange-200">
                        {selectedRFP.topPain2}
                      </div>
                    </div>
                  )}

                  {selectedRFP.additionalDetails && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Additional Details
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 whitespace-pre-wrap">
                        {selectedRFP.additionalDetails}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline & Budget */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Timeline & Budget
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Desired Timeline
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {selectedRFP.timeline || "Not specified"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {selectedRFP.budgetBand || "To Be Determined"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Internal Notes
                </h3>
                <textarea
                  rows={5}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add internal notes about this RFP..."
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Notes
                </button>
              </div>

              {/* Submission Date */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Submitted
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                  {selectedRFP.createdAt?.toDate
                    ? new Date(selectedRFP.createdAt.toDate()).toLocaleString()
                    : "Just now"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                {selectedRFP.status !== "won" && selectedRFP.status !== "lost" && (
                  <button
                    onClick={() => {
                      const nextStatus =
                        selectedRFP.status === "new"
                          ? "reviewed"
                          : selectedRFP.status === "reviewed"
                          ? "proposal_sent"
                          : "won";
                      handleStatusChange(selectedRFP.id, nextStatus);
                      setShowModal(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {selectedRFP.status === "new"
                      ? "Mark as Reviewed"
                      : selectedRFP.status === "reviewed"
                      ? "Mark Proposal Sent"
                      : "Mark as Won"}
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

export default RFPTab;