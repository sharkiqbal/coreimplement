import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  Brain,
  Sparkles,
  Target,
  Rocket,
  Lightbulb,
  Zap,
} from "lucide-react";
import {
  getAllServices,
  addService,
  updateService,
  deleteService,
} from "../service/serviceService";

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLogo, setSelectedLogo] = useState("");
  const [serviceForm, setServiceForm] = useState({
    name: "",
    problem: "",
    solution: "",
    points: ["", "", "", ""],
  });

  const logoOptions = [
    { id: "brain", name: "Brain", icon: Brain },
    { id: "sparkles", name: "Sparkles", icon: Sparkles },
    { id: "target", name: "Target", icon: Target },
    { id: "rocket", name: "Rocket", icon: Rocket },
    { id: "lightbulb", name: "Lightbulb", icon: Lightbulb },
    { id: "zap", name: "Zap", icon: Zap },
  ];

  // Load services from Firebase on component mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const servicesData = await getAllServices();
      setServices(servicesData);
    } catch (error) {
      console.error("Error loading services:", error);
      alert("Failed to load services. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (logoId) => {
    const logo = logoOptions.find((l) => l.id === logoId);
    return logo ? logo.icon : Brain;
  };

  const openAddModal = () => {
    setServiceForm({
      name: "",
      problem: "",
      solution: "",
      points: ["", "", "", ""],
    });
    setSelectedLogo("");
    setEditingService(null);
    setShowServiceModal(true);
  };

  const openEditModal = (service) => {
    setServiceForm({
      name: service.name,
      problem: service.problem,
      solution: service.solution,
      points: service.points,
    });
    setSelectedLogo(service.logoId);
    setEditingService(service);
    setShowServiceModal(true);
  };

  const handleInputChange = (field, value) => {
    setServiceForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePointChange = (index, value) => {
    setServiceForm((prev) => {
      const newPoints = [...prev.points];
      newPoints[index] = value;
      return {
        ...prev,
        points: newPoints,
      };
    });
  };

  const handleRemovePoint = (index) => {
    setServiceForm((prev) => {
      const newPoints = prev.points.filter((_, i) => i !== index);
      if (newPoints.length === 0) {
        newPoints.push("");
      }
      return {
        ...prev,
        points: newPoints,
      };
    });
  };

  const handleAddPoint = () => {
    setServiceForm((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  const handleSaveService = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const validPoints = serviceForm.points.filter(
        (point) => point.trim() !== ""
      );

      if (
        !serviceForm.name.trim() ||
        !serviceForm.problem.trim() ||
        !serviceForm.solution.trim() ||
        validPoints.length === 0 ||
        !selectedLogo
      ) {
        alert("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      const serviceData = {
        name: serviceForm.name,
        logoId: selectedLogo,
        problem: serviceForm.problem,
        solution: serviceForm.solution,
        points: validPoints,
      };

      if (editingService) {
        // Update existing service in Firebase
        await updateService(
          editingService.id,
          serviceData,
          null,
          editingService.imagePath
        );
        alert("Service updated successfully!");
      } else {
        // Add new service to Firebase
        await addService(serviceData, null);
        alert("Service added successfully!");
      }

      // Reload services from Firebase
      await loadServices();
      setShowServiceModal(false);
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to save service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (service) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(service.id, service.imagePath);
        alert("Service deleted successfully!");
        // Reload services from Firebase
        await loadServices();
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
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
              Services Management
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage your service offerings
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">
            No services yet. Add your first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = getIconComponent(service.logoId);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {service.name}
                </h3>

                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                    Problem
                  </p>
                  <p className="text-sm text-gray-700">{service.problem}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                    Solution
                  </p>
                  <p className="text-sm text-gray-700">{service.solution}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                    Key Points
                  </p>
                  <ul className="space-y-1">
                    {service.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-600 flex items-start"
                      >
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={() => setShowServiceModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 ">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., AI Strategy Consultation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={serviceForm.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              {/* Logo Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Choose Icon *
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {logoOptions.map((logo) => {
                    const IconComponent = logo.icon;
                    return (
                      <button
                        key={logo.id}
                        type="button"
                        onClick={() => setSelectedLogo(logo.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedLogo === logo.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 mx-auto ${
                            selectedLogo === logo.id
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        />
                        <p className="text-xs mt-2 text-gray-600 font-medium">
                          {logo.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Problem */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Problem Statement *
                </label>
                <textarea
                  placeholder="What problem does this service solve?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={serviceForm.problem}
                  onChange={(e) => handleInputChange("problem", e.target.value)}
                />
              </div>

              {/* Solution */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Solution Description *
                </label>
                <textarea
                  placeholder="How does your service solve this problem?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={serviceForm.solution}
                  onChange={(e) =>
                    handleInputChange("solution", e.target.value)
                  }
                />
              </div>

              {/* Key Points */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Key Points *
                </label>
                <div className="space-y-3">
                  {serviceForm.points.map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        placeholder={`Key point ${index + 1}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={point}
                        onChange={(e) =>
                          handlePointChange(index, e.target.value)
                        }
                      />
                      {serviceForm.points.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePoint(index)}
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Another Point
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveService}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting
                    ? "Saving..."
                    : editingService
                    ? "Update Service"
                    : "Save Service"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
