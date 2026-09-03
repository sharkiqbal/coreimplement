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

const COLLECTION_NAME = "blogPosts";

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
