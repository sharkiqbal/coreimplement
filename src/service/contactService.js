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

const COLLECTION_NAME = "contactSubmissions";

// Get all contact submissions
export const getAllContactSubmissions = async () => {
  try {
    const contactsRef = collection(db, COLLECTION_NAME);
    const q = query(contactsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const contacts = [];
    querySnapshot.forEach((doc) => {
      contacts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return contacts;
  } catch (error) {
    console.error("Error getting contact submissions:", error);
    throw error;
  }
};

// Add new contact submission
export const addContactSubmission = async (contactData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: contactData.name,
      company: contactData.company,
      email: contactData.email,
      phone: contactData.phone || "",
      projectType: contactData.projectType || "",
      message: contactData.message,
      status: "new", // new, contacted, completed
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding contact submission:", error);
    throw error;
  }
};

// Update contact submission status
export const updateContactStatus = async (contactId, status) => {
  try {
    const contactRef = doc(db, COLLECTION_NAME, contactId);
    await updateDoc(contactRef, {
      status: status,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating contact status:", error);
    throw error;
  }
};

// Delete contact submission
export const deleteContactSubmission = async (contactId) => {
  try {
    const contactRef = doc(db, COLLECTION_NAME, contactId);
    await deleteDoc(contactRef);

    return true;
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    throw error;
  }
};
