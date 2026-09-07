import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { slugify } from "../utils/slugify";

const COLLECTION_NAME = "blogPosts";

// A post's slug is its stored `slug` field, falling back to one derived from its title
export const getBlogSlug = (blog) => blog.slug || slugify(blog.blogName);

// Get all blog posts
export const getAllBlogs = async () => {
  try {
    const blogsRef = collection(db, COLLECTION_NAME);
    const q = query(blogsRef, orderBy("publishDate", "desc"));
    const querySnapshot = await getDocs(q);

    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return blogs;
  } catch (error) {
    console.error("Error getting blogs:", error);
    throw error;
  }
};

// Get a single blog post by its slug
export const getBlogBySlug = async (slug) => {
  const blogs = await getAllBlogs();
  return blogs.find((blog) => getBlogSlug(blog) === slug) || null;
};

// Add new blog post
export const addBlog = async (blogData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...blogData,
      publishDate: new Date().toISOString().split("T")[0],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

// Update existing blog post
export const updateBlog = async (blogId, blogData) => {
  try {
    const blogRef = doc(db, COLLECTION_NAME, blogId);
    await updateDoc(blogRef, {
      ...blogData,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete blog post
export const deleteBlog = async (blogId) => {
  try {
    const blogRef = doc(db, COLLECTION_NAME, blogId);
    await deleteDoc(blogRef);

    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
