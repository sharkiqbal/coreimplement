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

const COLLECTION_NAME = "caseStudies";

// Get all case studies
export const getAllCaseStudies = async () => {
  try {
    const caseStudiesRef = collection(db, COLLECTION_NAME);
    const q = query(caseStudiesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const caseStudies = [];
    querySnapshot.forEach((doc) => {
      caseStudies.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return caseStudies;
  } catch (error) {
    console.error("Error getting case studies:", error);
    throw error;
  }
};

// Add new case study
export const addCaseStudy = async (caseStudyData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...caseStudyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding case study:", error);
    throw error;
  }
};

// Update existing case study
export const updateCaseStudy = async (caseStudyId, caseStudyData) => {
  try {
    const caseStudyRef = doc(db, COLLECTION_NAME, caseStudyId);
    await updateDoc(caseStudyRef, {
      ...caseStudyData,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating case study:", error);
    throw error;
  }
};

// Delete case study
export const deleteCaseStudy = async (caseStudyId) => {
  try {
    const caseStudyRef = doc(db, COLLECTION_NAME, caseStudyId);
    await deleteDoc(caseStudyRef);

    return true;
  } catch (error) {
    console.error("Error deleting case study:", error);
    throw error;
  }
};
