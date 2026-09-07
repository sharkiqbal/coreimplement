import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DOCUMENT_ID = "companyProfile"; // Single document for company profile
const COLLECTION_NAME = "settings";

// Default company data
const DEFAULT_COMPANY_DATA = {
  companyName: "Core Implementations",
  completeProjects: "5+",
  headline: "Streamline Your Business with AI",
  description:
    "We help growing businesses automate the manual, repetitive work slowing them down using AI, so teams spend less time on data entry, quotes, and reports, and more time on what matters.",
  teamMembers: [
    {
      id: 1,
      name: "Shar Iqbal",
      role: "Co-Founder",
      location: "Houston, Texas",
      description:
        "Three years consulting on major enterprise implementations for Fortune 500 companies at a Big Four firm, plus firsthand experience building and running his own business — a combination he channels into helping clients find automation that actually delivers.",
      linkedin: "https://www.linkedin.com/in/shar-iqbal/",
    },
    {
      id: 2,
      name: "Saif Iqbal",
      role: "Co-Founder",
      location: "Houston, Texas",
      description:
        "Five years leading digital transformation at one of the world's largest energy companies — experience he channels into helping growing businesses adopt AI with that same enterprise-grade rigor.",
      linkedin: "https://www.linkedin.com/in/saif-mohammad-iqbal-303117175/",
    },
    {
      id: 3,
      name: "Faisal Khan",
      role: "Technical Co-Founder",
      location: "Pakistan",
      description:
        "Extensive hands-on experience in AI and automation, leading the engineering behind every solution we build.",
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
