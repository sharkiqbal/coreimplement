// src/service/rfpService.js
import {
     collection,
     addDoc,
     getDocs,
     getDoc,
     doc,
     updateDoc,
     deleteDoc,
     query,
     orderBy,
     Timestamp,
   } from "firebase/firestore";
   import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
   import { db, storage } from "../firebase/firebase";

   const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB
   const ALLOWED_ATTACHMENT_TYPES = [
     "application/pdf",
     "application/msword",
     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
     "application/vnd.ms-excel",
     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
     "text/plain",
   ];

   /**
    * Upload an RFP attachment to Storage ahead of the Firestore submission,
    * so the storage path can be included in the same document. Returns just
    * the path (not a download URL) - the visitor submitting this form is
    * never authenticated, and Storage read access requires the admin, so
    * the download URL has to be resolved later from the admin dashboard,
    * not here.
    */
   export const uploadRFPAttachment = async (file) => {
     if (file.size > MAX_ATTACHMENT_SIZE) {
       throw new Error("File is too large. Please attach something under 10MB.");
     }
     if (
       !ALLOWED_ATTACHMENT_TYPES.includes(file.type) &&
       !file.type.startsWith("image/")
     ) {
       throw new Error(
         "That file type isn't supported. Please attach a PDF, Word, Excel, text, or image file."
       );
     }

     const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
     const path = `rfpAttachments/${Date.now()}-${Math.random()
       .toString(36)
       .slice(2, 8)}-${safeName}`;
     const storageRef = ref(storage, path);
     await uploadBytes(storageRef, file, { contentType: file.type });
     return { path, name: file.name };
   };

   /**
    * Resolve a stored attachment path to a downloadable URL. Only works for
    * an authenticated caller (the admin dashboard) since Storage read access
    * is admin-only.
    */
   export const getRFPAttachmentUrl = async (path) => {
     return getDownloadURL(ref(storage, path));
   };

   const RFP_COLLECTION = "rfpSubmissions";
   
   /**
    * Get all RFP submissions
    */
   export const getAllRFPSubmissions = async () => {
     try {
       const q = query(
         collection(db, RFP_COLLECTION),
         orderBy("createdAt", "desc")
       );
       const querySnapshot = await getDocs(q);
       return querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));
     } catch (error) {
       console.error("Error fetching RFP submissions:", error);
       throw error;
     }
   };
   
   /**
    * Get a single RFP submission by ID
    */
   export const getRFPSubmission = async (id) => {
     try {
       const docRef = doc(db, RFP_COLLECTION, id);
       const docSnap = await getDoc(docRef);
   
       if (docSnap.exists()) {
         return { id: docSnap.id, ...docSnap.data() };
       } else {
         throw new Error("RFP submission not found");
       }
     } catch (error) {
       console.error("Error fetching RFP submission:", error);
       throw error;
     }
   };
   
   /**
    * Add a new RFP submission
    */
   export const addRFPSubmission = async (rfpData) => {
     try {
       const docRef = await addDoc(collection(db, RFP_COLLECTION), {
         ...rfpData,
         status: "new", // new, reviewed, proposal_sent, won, lost
         priority: "medium", // low, medium, high
         createdAt: Timestamp.now(),
         updatedAt: Timestamp.now(),
       });
       return docRef.id;
     } catch (error) {
       console.error("Error adding RFP submission:", error);
       throw error;
     }
   };
   
   /**
    * Update RFP submission status
    */
   export const updateRFPStatus = async (id, status, notes = "") => {
     try {
       const docRef = doc(db, RFP_COLLECTION, id);
       await updateDoc(docRef, {
         status,
         statusNotes: notes,
         updatedAt: Timestamp.now(),
       });
     } catch (error) {
       console.error("Error updating RFP status:", error);
       throw error;
     }
   };
   
   /**
    * Update RFP priority
    */
   export const updateRFPPriority = async (id, priority) => {
     try {
       const docRef = doc(db, RFP_COLLECTION, id);
       await updateDoc(docRef, {
         priority,
         updatedAt: Timestamp.now(),
       });
     } catch (error) {
       console.error("Error updating RFP priority:", error);
       throw error;
     }
   };
   
   /**
    * Add internal notes to RFP
    */
   export const addRFPNotes = async (id, notes) => {
     try {
       const docRef = doc(db, RFP_COLLECTION, id);
       await updateDoc(docRef, {
         internalNotes: notes,
         updatedAt: Timestamp.now(),
       });
     } catch (error) {
       console.error("Error adding RFP notes:", error);
       throw error;
     }
   };
   
   /**
    * Delete an RFP submission
    */
   export const deleteRFPSubmission = async (id) => {
     try {
       const docRef = doc(db, RFP_COLLECTION, id);
       await deleteDoc(docRef);
     } catch (error) {
       console.error("Error deleting RFP submission:", error);
       throw error;
     }
   };
   
   /**
    * Get RFP submissions by status
    */
   export const getRFPsByStatus = async (status) => {
     try {
       const q = query(
         collection(db, RFP_COLLECTION),
         orderBy("createdAt", "desc")
       );
       const querySnapshot = await getDocs(q);
       const allRFPs = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));
       
       return allRFPs.filter((rfp) => rfp.status === status);
     } catch (error) {
       console.error("Error fetching RFPs by status:", error);
       throw error;
     }
   };
   
   /**
    * Get RFP statistics
    */
   export const getRFPStats = async () => {
     try {
       const querySnapshot = await getDocs(collection(db, RFP_COLLECTION));
       const rfps = querySnapshot.docs.map((doc) => doc.data());
   
       return {
         total: rfps.length,
         new: rfps.filter((r) => r.status === "new").length,
         reviewed: rfps.filter((r) => r.status === "reviewed").length,
         proposalSent: rfps.filter((r) => r.status === "proposal_sent").length,
         won: rfps.filter((r) => r.status === "won").length,
         lost: rfps.filter((r) => r.status === "lost").length,
       };
     } catch (error) {
       console.error("Error fetching RFP stats:", error);
       throw error;
     }
   };