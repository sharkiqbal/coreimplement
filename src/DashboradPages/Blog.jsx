import React, { useState, useEffect } from "react";
import { Calendar, X, Clock, Plus, Edit, Trash2, Save } from "lucide-react";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from "../service/blogService";

const BlogTab = () => {
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  const [blogForm, setBlogForm] = useState({
    blogType: "",
    blogName: "",
    description: "",
    content: "",
    readTime: "",
  });

  const blogTypeOptions = [
    "Getting Started",
    "Strategy",
    "Implementation",
    "Case Study",
    "Industry Insights",
    "Best Practices",
    "Technology",
    "Automation",
  ];

  // Load blogs from Firebase on component mount
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await getAllBlogs();
      setBlogPosts(blogs);
    } catch (error) {
      console.error("Error loading blogs:", error);
      alert("Failed to load blog posts. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setBlogForm({
      blogType: "",
      blogName: "",
      description: "",
      content: "",
      readTime: "",
    });
    setEditingBlog(null);
    setShowBlogModal(true);
  };

  const openEditModal = (blog) => {
    setBlogForm({
      blogType: blog.blogType,
      blogName: blog.blogName,
      description: blog.description,
      content: blog.content,
      readTime: blog.readTime,
    });
    setEditingBlog(blog.id);
    setShowBlogModal(true);
  };

  const handleInputChange = (field, value) => {
    setBlogForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveBlog = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Validation
      if (
        !blogForm.blogType.trim() ||
        !blogForm.blogName.trim() ||
        !blogForm.description.trim() ||
        !blogForm.content.trim()
      ) {
        alert("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      if (editingBlog) {
        // Update existing blog in Firebase
        await updateBlog(editingBlog, blogForm);
        alert("Blog post updated successfully!");
      } else {
        // Add new blog to Firebase
        await addBlog(blogForm);
        alert("Blog post published successfully!");
      }

      // Reload blogs from Firebase
      await loadBlogs();
      setShowBlogModal(false);
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id);
        alert("Blog post deleted successfully!");
        // Reload blogs from Firebase
        await loadBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog post. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
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
              Blog Posts Management
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Create and manage your blog content
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Blog Post
          </button>
        </div>
      </div>

      {/* Blog Posts Grid */}
      {blogPosts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">
            No blog posts yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                    {blog.blogType}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(blog)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {blog.blogName}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    <span>
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <button
                onClick={() => setShowBlogModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Blog Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Blog Type *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={blogForm.blogType}
                  onChange={(e) =>
                    handleInputChange("blogType", e.target.value)
                  }
                >
                  <option value="">Select blog type...</option>
                  {blogTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blog Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., 5 Ways AI Saves Time in Your Business"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={blogForm.blogName}
                  onChange={(e) =>
                    handleInputChange("blogName", e.target.value)
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  placeholder="Brief summary of the blog post (shown in preview)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={blogForm.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  placeholder="e.g., 5 min read"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={blogForm.readTime}
                  onChange={(e) =>
                    handleInputChange("readTime", e.target.value)
                  }
                />
              </div>

              {/* Blog Content */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Blog Content *
                </label>
                <textarea
                  placeholder="Write your blog post content here..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm"
                  value={blogForm.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {blogForm.content.length} characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBlog}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting
                    ? "Saving..."
                    : editingBlog
                    ? "Update Post"
                    : "Publish Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTab;
