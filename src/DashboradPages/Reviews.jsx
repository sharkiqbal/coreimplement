import React, { useState, useEffect } from "react";
import { X, Plus, Edit, Trash2, Star, Save } from "lucide-react";
import {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../service/reviewService";

const ReviewsTab = () => {
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    designation: "",
    rating: 5,
    description: "",
  });

  // Load reviews from Firebase on component mount
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const reviewsData = await getAllReviews();
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error loading reviews:", error);
      alert("Failed to load reviews. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setReviewForm({
      name: "",
      designation: "",
      rating: 5,
      description: "",
    });
    setEditingReview(null);
    setShowReviewModal(true);
  };

  const openEditModal = (review) => {
    setReviewForm({
      name: review.name,
      designation: review.designation,
      rating: review.rating,
      description: review.description,
    });
    setEditingReview(review.id);
    setShowReviewModal(true);
  };

  const handleSaveReview = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Validation
      if (
        !reviewForm.name.trim() ||
        !reviewForm.designation.trim() ||
        !reviewForm.description.trim()
      ) {
        alert("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      if (editingReview) {
        // Update existing review in Firebase
        await updateReview(editingReview, reviewForm);
        alert("Review updated successfully!");
      } else {
        // Add new review to Firebase
        await addReview(reviewForm);
        alert("Review added successfully!");
      }

      // Reload reviews from Firebase
      await loadReviews();
      setShowReviewModal(false);
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Failed to save review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
        alert("Review deleted successfully!");
        // Reload reviews from Firebase
        await loadReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Please try again.");
      }
    }
  };

  const StarRating = ({ rating, editable = false, onChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => editable && onChange && onChange(star)}
            className={`${
              editable ? "cursor-pointer" : "cursor-default"
            } transition-colors`}
            disabled={!editable}
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
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
              Reviews Management
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage customer testimonials and reviews
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">
            No reviews yet. Add your first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <StarRating rating={review.rating} />
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(review)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                "{review.description}"
              </p>

              <div className="flex items-center pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-lg">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingReview ? "Edit Review" : "Add New Review"}
              </h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Maria Johnson"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, name: e.target.value })
                  }
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Operations Manager, Company Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={reviewForm.designation}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      designation: e.target.value,
                    })
                  }
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Rating *
                </label>
                <StarRating
                  rating={reviewForm.rating}
                  editable={true}
                  onChange={(rating) =>
                    setReviewForm({ ...reviewForm, rating })
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Review Description *
                </label>
                <textarea
                  rows={5}
                  placeholder="Enter the customer's review..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={reviewForm.description}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReview}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting
                    ? "Saving..."
                    : editingReview
                    ? "Update Review"
                    : "Save Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
