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

const COLLECTION_NAME = "services";

// Convert a service name into a URL-safe anchor slug (e.g. "AI-Powered Marketing & Growth" -> "ai-powered-marketing-growth")
export const slugifyServiceName = slugify;

// Get all services
export const getAllServices = async () => {
  try {
    const servicesRef = collection(db, COLLECTION_NAME);
    const q = query(servicesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const services = [];
    querySnapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return services;
  } catch (error) {
    console.error("Error getting services:", error);
    throw error;
  }
};

// Add new service
export const addService = async (serviceData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: serviceData.name,
      logoId: serviceData.logoId,
      problem: serviceData.problem,
      solution: serviceData.solution,
      points: serviceData.points,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

// Update existing service
export const updateService = async (serviceId, serviceData) => {
  try {
    const serviceRef = doc(db, COLLECTION_NAME, serviceId);
    await updateDoc(serviceRef, {
      name: serviceData.name,
      logoId: serviceData.logoId,
      problem: serviceData.problem,
      solution: serviceData.solution,
      points: serviceData.points,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

// Delete service
export const deleteService = async (serviceId) => {
  try {
    const serviceRef = doc(db, COLLECTION_NAME, serviceId);
    await deleteDoc(serviceRef);

    return true;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
