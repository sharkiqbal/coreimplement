import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    // Get counts from all collections
    const [blogPosts, reviews, services, caseStudies, contacts] =
      await Promise.all([
        getDocs(collection(db, "blogPosts")),
        getDocs(collection(db, "reviews")),
        getDocs(collection(db, "services")),
        getDocs(collection(db, "caseStudies")),
        getDocs(collection(db, "contactSubmissions")),
      ]);

    return {
      blogPosts: blogPosts.size,
      reviews: reviews.size,
      services: services.size,
      caseStudies: caseStudies.size,
      contacts: contacts.size,
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    throw error;
  }
};

// Get recent contact submissions
export const getRecentContacts = async (limitCount = 5) => {
  try {
    const contactsRef = collection(db, "contactSubmissions");
    const q = query(
      contactsRef,
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
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
    console.error("Error getting recent contacts:", error);
    throw error;
  }
};

// Get recent blog posts
export const getRecentBlogs = async (limitCount = 5) => {
  try {
    const blogsRef = collection(db, "blogPosts");
    const q = query(blogsRef, orderBy("createdAt", "desc"), limit(limitCount));
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
    console.error("Error getting recent blogs:", error);
    throw error;
  }
};

// Get recent reviews
export const getRecentReviews = async (limitCount = 5) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
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
    console.error("Error getting recent reviews:", error);
    throw error;
  }
};
