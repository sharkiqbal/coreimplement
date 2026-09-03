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

const COLLECTION_NAME = "reviews";

// Get all reviews
export const getAllReviews = async () => {
  try {
    const reviewsRef = collection(db, COLLECTION_NAME);
    const q = query(reviewsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return reviews;
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw error;
  }
};

// Add new review
export const addReview = async (reviewData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...reviewData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

// Update existing review
export const updateReview = async (reviewId, reviewData) => {
  try {
    const reviewRef = doc(db, COLLECTION_NAME, reviewId);
    await updateDoc(reviewRef, {
      ...reviewData,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// Delete review
export const deleteReview = async (reviewId) => {
  try {
    const reviewRef = doc(db, COLLECTION_NAME, reviewId);
    await deleteDoc(reviewRef);

    return true;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
