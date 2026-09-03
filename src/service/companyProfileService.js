import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DOCUMENT_ID = "companyProfile"; // Single document for company profile
const COLLECTION_NAME = "settings";

// Default company data
const DEFAULT_COMPANY_DATA = {
  companyName: "Core Implementations",
  completeProjects: "50+",
  headline: "Streamline Your Business with AI",
  description:
    "We help Texas SMBs unlock AI automation for efficiency and growth. Transform your operations with intelligent solutions designed for your business.",
  teamMembers: [
    {
      id: 1,
      name: "John Smith",
      role: "CEO & Founder",
      description:
        "15+ years in AI and machine learning, leading innovation in SMB solutions.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "CTO",
      description:
        "Expert in automation systems with a passion for simplifying complex technology.",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Lead Developer",
      description:
        "Full-stack developer specializing in AI integration and custom solutions.",
    },
  ],
};

// Get company profile (auto-creates with defaults if doesn't exist)
export const getCompanyProfile = async () => {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      // Auto-save default data to Firebase on first load
      console.log("No company profile found. Creating default profile...");
      await saveCompanyProfile(DEFAULT_COMPANY_DATA);
      return DEFAULT_COMPANY_DATA;
    }
  } catch (error) {
    console.error("Error getting company profile:", error);
    throw error;
  }
};

// Save/Update company profile
export const saveCompanyProfile = async (profileData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);

    await setDoc(
      docRef,
      {
        ...profileData,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    ); // merge: true will update existing fields or create new document

    return true;
  } catch (error) {
    console.error("Error saving company profile:", error);
    throw error;
  }
};
