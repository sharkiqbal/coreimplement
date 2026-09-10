import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Building2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  X,
  DollarSign,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  Inbox,
} from "lucide-react";
import {
  getAllContactSubmissions,
  updateContactStatus,
  deleteContactSubmission,
} from "../service/contactService";
import {
  getAllRFPSubmissions,
  updateRFPStatus,
  updateRFPPriority,
  addRFPNotes,
  deleteRFPSubmission,
  getRFPAttachmentUrl,
} from "../service/rfpService";
import { useToast } from "../context/ToastContext";
import { downloadCSV } from "../utils/csvExport";

const formatStatus = (status) =>
  (status || "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getStatusColor = (status) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "contacted":
    case "reviewed":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "proposal_sent":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "completed":
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

const getStatusBucket = (lead) => {
  if (lead.status === "new") return "new";
  if (lead.status === "lost") return "closed";
  if (lead.status === "completed" || lead.status === "won") return "closed";
  return "in-progress";
};

const toMillis = (value) => {
  if (value?.toMillis) return value.toMillis();
  if (value?.toDate) return value.toDate().getTime();
  return 0;
};

const LeadsTab = ({ onLeadsChanged, initialSourceFilter = "all" }) => {
  const toast = useToast();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sourceFilter, setSourceFilter] = useState(initialSourceFilter);
  const [statusFilter, setStatusFilter] = useState("all");
  const [internalNotes, setInternalNotes] = useState("");
  const [isFetchingAttachment, setIsFetchingAttachment] = useState(false);

  const handleDownloadAttachment = async (path) => {
    setIsFetchingAttachment(true);
    try {
      const url = await getRFPAttachmentUrl(path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error fetching attachment:", error);
      alert("Failed to load the attachment. Please try again.");
    } finally {
      setIsFetchingAttachment(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const [contacts, rfps] = await Promise.all([
        getAllContactSubmissions(),
        getAllRFPSubmissions(),
      ]);
      const merged = [
        ...contacts.map((c) => ({ ...c, _source: "contact" })),
        ...rfps.map((r) => ({ ...r, _source: "rfp" })),
      ].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
      setLeads(merged);
    } catch (error) {
      console.error("Error loading leads:", error);
      toast.error("Failed to load leads. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await loadLeads();
    onLeadsChanged?.();
  };

  const handleStatusChange = async (lead, newStatus) => {
    try {
      if (lead._source === "contact") {
        await updateContactStatus(lead.id, newStatus);
      } else {
        await updateRFPStatus(lead.id, newStatus);
      }
      await refresh();
      toast.success("Status updated.");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handlePriorityChange = async (lead, newPriority) => {
    try {
      await updateRFPPriority(lead.id, newPriority);
      await refresh();
    } catch (error) {
      console.error("Error updating priority:", error);
      toast.error("Failed to update priority. Please try again.");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      await addRFPNotes(selectedLead.id, internalNotes);
      await refresh();
      toast.success("Notes saved.");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes. Please try again.");
    }
  };

  const handleDelete = async (lead) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      if (lead._source === "contact") {
        await deleteContactSubmission(lead.id);
      } else {
        await deleteRFPSubmission(lead.id);
      }
      await refresh();
      toast.success("Lead deleted.");
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("Failed to delete lead. Please try again.");
    }
  };

  const openModal = (lead) => {
    setSelectedLead(lead);
    setInternalNotes(lead.internalNotes || "");
    setShowModal(true);
  };

  const filteredLeads = leads.filter((lead) => {
    if (sourceFilter !== "all" && lead._source !== sourceFilter) return false;
    if (statusFilter !== "all" && getStatusBucket(lead) !== statusFilter)
      return false;
    return true;
  });

  // Scoped to the source filter (but not the status filter, since these
  // counts double as the status filter buttons) so the numbers shown always
  // match what the source dropdown is currently displaying.
  const sourceFilteredLeads = leads.filter(
    (l) => sourceFilter === "all" || l._source === sourceFilter
  );
  const counts = {
    total: sourceFilteredLeads.length,
    new: sourceFilteredLeads.filter((l) => getStatusBucket(l) === "new")
      .length,
    inProgress: sourceFilteredLeads.filter(
      (l) => getStatusBucket(l) === "in-progress"
    ).length,
    closed: sourceFilteredLeads.filter((l) => getStatusBucket(l) === "closed")
      .length,
  };

  const handleExportCSV = () => {
    const rows = filteredLeads.map((lead) => ({
      source: lead._source === "contact" ? "Contact Form" : "RFP",
      name: lead.name,
      email: lead.email,
      company: lead.company || "",
      phone: lead.phone || "",
      status: formatStatus(lead.status),
      priority: lead._source === "rfp" ? lead.priority || "" : "",
      projectTypeOrTimeline:
        lead._source === "contact"
          ? lead.projectType || ""
          : lead.timeline || "",
      details:
        lead._source === "contact"
          ? lead.message || ""
          : [lead.topPain1, lead.topPain2].filter(Boolean).join(" | "),
      submitted: lead.createdAt?.toDate
        ? new Date(lead.createdAt.toDate()).toLocaleString()
        : "",
    }));

    downloadCSV(`leads-export-${Date.now()}.csv`, rows, [
      { key: "source", header: "Source" },
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      { key: "company", header: "Company" },
      { key: "phone", header: "Phone" },
      { key: "status", header: "Status" },
      { key: "priority", header: "Priority" },
      { key: "projectTypeOrTimeline", header: "Project Type / Timeline" },
      { key: "details", header: "Details" },
      { key: "submitted", header: "Submitted" },
    ]);
    toast.success(`Exported ${rows.length} lead(s) to CSV.`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
            <p className="text-sm text-gray-600 mt-1">
              Contact form and RFP submissions in one place
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            disabled={filteredLeads.length === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setStatusFilter("all")}
            className={`text-left bg-gray-50 rounded-xl p-4 border-2 transition-all hover:shadow-md ${
              statusFilter === "all"
                ? "border-gray-400 ring-2 ring-gray-200"
                : "border-gray-100"
            }`}
          >
            <div className="text-2xl font-bold text-gray-900">
              {counts.total}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              Total Leads
            </div>
          </button>
          <button
            onClick={() => setStatusFilter("new")}
            className={`text-left bg-blue-50 rounded-xl p-4 border-2 transition-all hover:shadow-md ${
              statusFilter === "new"
                ? "border-blue-400 ring-2 ring-blue-200"
                : "border-blue-100"
            }`}
          >
            <div className="text-2xl font-bold text-blue-700">
              {counts.new}
            </div>
            <div className="text-xs text-blue-600 font-medium">New</div>
          </button>
          <button
            onClick={() => setStatusFilter("in-progress")}
            className={`text-left bg-yellow-50 rounded-xl p-4 border-2 transition-all hover:shadow-md ${
              statusFilter === "in-progress"
                ? "border-yellow-400 ring-2 ring-yellow-200"
                : "border-yellow-100"
            }`}
          >
            <div className="text-2xl font-bold text-yellow-700">
              {counts.inProgress}
            </div>
            <div className="text-xs text-yellow-600 font-medium">
              In Progress
            </div>
          </button>
          <button
            onClick={() => setStatusFilter("closed")}
            className={`text-left bg-green-50 rounded-xl p-4 border-2 transition-all hover:shadow-md ${
              statusFilter === "closed"
                ? "border-green-400 ring-2 ring-green-200"
                : "border-green-100"
            }`}
          >
            <div className="text-2xl font-bold text-green-700">
              {counts.closed}
            </div>
            <div className="text-xs text-green-600 font-medium">Closed</div>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-semibold">Filter</span>
          </div>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Sources</option>
            <option value="contact">Contact Forms</option>
            <option value="rfp">RFP Submissions</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          {(sourceFilter !== "all" || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSourceFilter("all");
                setStatusFilter("all");
              }}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No leads found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map((lead) => (
            <div
              key={`${lead._source}-${lead.id}`}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        lead._source === "contact"
                          ? "bg-cyan-100 text-cyan-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {lead._source === "contact" ? "Contact Form" : "RFP"}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900">
                      {lead.name}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {formatStatus(lead.status)}
                    </span>
                    {lead._source === "rfp" && (
                      <select
                        value={lead.priority || "medium"}
                        onChange={(e) =>
                          handlePriorityChange(lead, e.target.value)
                        }
                        className={`px-3 py-1 text-xs font-bold rounded-full border-0 ${getPriorityColor(
                          lead.priority || "medium"
                        )}`}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {lead.company || "No company"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {lead.email}
                    </div>
                    {lead._source === "contact" && lead.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </div>
                    )}
                    {lead._source === "rfp" && (
                      <>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {lead.budgetBand || "TBD"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lead.timeline || "Flexible"}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(lead)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(lead)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                {lead._source === "contact" ? (
                  <>
                    {lead.projectType && (
                      <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-2">
                        {lead.projectType}
                      </div>
                    )}
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {lead.message}
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    {lead.topPain1 && (
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {lead.topPain1}
                        </p>
                      </div>
                    )}
                    {lead.topPain2 && (
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {lead.topPain2}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {lead.createdAt?.toDate
                    ? new Date(lead.createdAt.toDate()).toLocaleString()
                    : "Just now"}
                </div>
                <div className="flex gap-2">
                  {lead._source === "contact" ? (
                    <>
                      {lead.status === "new" && (
                        <button
                          onClick={() =>
                            handleStatusChange(lead, "contacted")
                          }
                          className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors"
                        >
                          Mark as Contacted
                        </button>
                      )}
                      {lead.status === "contacted" && (
                        <button
                          onClick={() =>
                            handleStatusChange(lead, "completed")
                          }
                          className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                        >
                          Mark as Completed
                        </button>
                      )}
                      {lead.status === "completed" && (
                        <button
                          onClick={() => handleStatusChange(lead, "new")}
                          className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Reopen
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {lead.status === "new" && (
                        <button
                          onClick={() => handleStatusChange(lead, "reviewed")}
                          className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors"
                        >
                          Mark as Reviewed
                        </button>
                      )}
                      {lead.status === "reviewed" && (
                        <button
                          onClick={() =>
                            handleStatusChange(lead, "proposal_sent")
                          }
                          className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors"
                        >
                          Proposal Sent
                        </button>
                      )}
                      {lead.status === "proposal_sent" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(lead, "won")}
                            className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                          >
                            Mark as Won
                          </button>
                          <button
                            onClick={() => handleStatusChange(lead, "lost")}
                            className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Mark as Lost
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedLead._source === "contact"
                  ? "Contact Form Details"
                  : "RFP Details"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block px-4 py-2 text-sm font-bold rounded-full border ${getStatusColor(
                    selectedLead.status
                  )}`}
                >
                  {formatStatus(selectedLead.status)}
                </span>
                {selectedLead._source === "rfp" && (
                  <select
                    value={selectedLead.priority || "medium"}
                    onChange={(e) => {
                      handlePriorityChange(selectedLead, e.target.value);
                      setSelectedLead({
                        ...selectedLead,
                        priority: e.target.value,
                      });
                    }}
                    className={`px-4 py-2 text-sm font-bold rounded-lg ${getPriorityColor(
                      selectedLead.priority || "medium"
                    )}`}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Name
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {selectedLead.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {selectedLead.company || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {selectedLead._source === "contact"
                      ? "Phone"
                      : "Company Size"}
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {selectedLead._source === "contact" ? (
                      selectedLead.phone ? (
                        <a
                          href={`tel:${selectedLead.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {selectedLead.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )
                    ) : (
                      selectedLead.companySize || "Not provided"
                    )}
                  </div>
                </div>
              </div>

              {selectedLead._source === "contact" ? (
                <>
                  {selectedLead.projectType && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Project Type
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                        {selectedLead.projectType}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Message
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 whitespace-pre-wrap">
                      {selectedLead.message}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Current Systems in Use
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {selectedLead.systemsInUse || "Not specified"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Top Pain Point #1
                    </label>
                    <div className="px-4 py-3 bg-red-50 rounded-xl text-gray-900 border border-red-200">
                      {selectedLead.topPain1}
                    </div>
                  </div>
                  {selectedLead.topPain2 && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Top Pain Point #2
                      </label>
                      <div className="px-4 py-3 bg-orange-50 rounded-xl text-gray-900 border border-orange-200">
                        {selectedLead.topPain2}
                      </div>
                    </div>
                  )}
                  {selectedLead.additionalDetails && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Additional Details
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 whitespace-pre-wrap">
                        {selectedLead.additionalDetails}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Desired Timeline
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                        {selectedLead.timeline || "Not specified"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                        {selectedLead.budgetBand || "To Be Determined"}
                      </div>
                    </div>
                  </div>
                  {selectedLead.attachmentPath && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Attachment
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          handleDownloadAttachment(selectedLead.attachmentPath)
                        }
                        disabled={isFetchingAttachment}
                        className="w-full flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-semibold hover:bg-blue-100 transition-colors disabled:opacity-50"
                      >
                        <Download className="w-4 h-4" />
                        {isFetchingAttachment
                          ? "Loading..."
                          : selectedLead.attachmentName || "Download attachment"}
                      </button>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Internal Notes
                    </label>
                    <textarea
                      rows={4}
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
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Submitted
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                  {selectedLead.createdAt?.toDate
                    ? new Date(selectedLead.createdAt.toDate()).toLocaleString()
                    : "Just now"}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                {selectedLead._source === "contact" &&
                  selectedLead.status !== "completed" && (
                    <button
                      onClick={() => {
                        handleStatusChange(
                          selectedLead,
                          selectedLead.status === "new"
                            ? "contacted"
                            : "completed"
                        );
                        setShowModal(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {selectedLead.status === "new"
                        ? "Mark as Contacted"
                        : "Mark as Completed"}
                    </button>
                  )}
                {selectedLead._source === "rfp" &&
                  selectedLead.status !== "won" &&
                  selectedLead.status !== "lost" && (
                    <button
                      onClick={() => {
                        const nextStatus =
                          selectedLead.status === "new"
                            ? "reviewed"
                            : selectedLead.status === "reviewed"
                            ? "proposal_sent"
                            : "won";
                        handleStatusChange(selectedLead, nextStatus);
                        setShowModal(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {selectedLead.status === "new"
                        ? "Mark as Reviewed"
                        : selectedLead.status === "reviewed"
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

export default LeadsTab;
