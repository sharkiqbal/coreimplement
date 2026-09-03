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
   import { db } from "../firebase/firebase";
     
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