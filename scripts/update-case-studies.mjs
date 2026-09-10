import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM1vB1cIMFDiHGE0fsYMlbynd-AQSx5Kg",
  authDomain: "core-implement.firebaseapp.com",
  projectId: "core-implement",
  storageBucket: "core-implement.firebasestorage.app",
  messagingSenderId: "412198618668",
  appId: "1:412198618668:web:6b150c9ddd5affd8eff389",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const [adminEmail, adminPassword] = process.argv.slice(2);
if (!adminEmail || !adminPassword) {
  console.error("Usage: node update-case-studies.mjs <admin-email> <admin-password>");
  process.exit(1);
}

await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const COLLECTION_NAME = "caseStudies";

// Explicit createdAt values control display order (query sorts desc by createdAt),
// since relying on serverTimestamp() for the new 5th entry would make it show first,
// not last as intended.
const UPDATES = [
  {
    data: {
      createdAt: new Date("2026-01-25"),
      industryType: "E-Commerce",
      logoId: "gamepad",
      relatedService: "Business Process Automation",
      projectName: "24/7 Game Key Activation Automation",
      companyName: "Digital Game Key Retailer",
      challenge:
        "This online retailer sells game activation codes around the clock, but activations were processed manually during business hours only. International customers ordering overnight faced long delays, and the support team was overwhelmed by activation-related tickets.",
      solution:
        "We built an automated activation pipeline that verifies each purchase, retrieves the activation code, and delivers it to the customer within a minute, running continuously with no manual steps, and logging every transaction for support visibility.",
      results: [
        "24/7 automated activation with 99.8% uptime",
        "76% reduction in activation-related support tickets",
        "Activation time cut from several minutes to under a minute",
        "Fewer delayed-order complaints from international customers",
        "Zero manual errors in code delivery since launch",
      ],
      timeline: "6-8 weeks",
    },
  },
  {
    data: {
      createdAt: new Date("2026-01-10"),
      industryType: "Retail",
      logoId: "package",
      relatedService: "Custom AI Software & Integrations",
      projectName: "Unified Inventory & Sales Dashboard",
      companyName: "Multi-Channel Retail Brand",
      challenge:
        "Selling across Amazon, Shopify, and a physical storefront, this retailer had no single source of truth for inventory. Staff manually cross-checked spreadsheets to avoid overselling, and forecasting was based on guesswork.",
      solution:
        "We built a custom dashboard that syncs inventory and order data from every sales channel in real time, with automated low-stock alerts and sales forecasting based on actual trends instead of manual estimates.",
      results: [
        "89% reduction in stock mismatches across channels",
        "Real-time inventory visibility across all sales channels",
        "24% faster order fulfillment",
        "Replaced 4 separate spreadsheets with one dashboard",
        "More accurate purchasing decisions from real demand data",
      ],
      timeline: "8-10 weeks",
    },
  },
  {
    data: {
      createdAt: new Date("2026-01-20"),
      industryType: "Professional Services",
      logoId: "phone",
      relatedService: "AI-Powered Customer Communication",
      projectName: "24/7 AI Phone Agent",
      companyName: "Home Services Contracting Company",
      challenge:
        "This contractor missed a significant share of inbound calls after 5 PM and on weekends, exactly when many homeowners call about urgent repairs. Missed calls meant missed jobs, and office staff were stretched thin during the day.",
      solution:
        "We deployed an AI phone agent that answers every call, collects job details, checks availability, and books appointments directly onto the team's calendar, with the same professionalism whether it's 2 PM or 2 AM.",
      results: [
        "100% call answer rate, including nights and weekends",
        "34% increase in booked appointments per month",
        "No added hiring cost for after-hours coverage",
        "Consistent intake information captured on every call",
        "Office staff freed up roughly 12 hours a week",
      ],
      timeline: "3-5 weeks",
    },
  },
  {
    data: {
      createdAt: new Date("2026-01-15"),
      industryType: "Technology",
      logoId: "mail",
      relatedService: "AI-Powered Customer Communication",
      projectName: "AI-Powered Email Triage & Response",
      companyName: "SaaS Company Support Team",
      challenge:
        "This support team received hundreds of emails daily (account questions, billing issues, and access requests), and manually reading and routing every message created a backlog that delayed response times.",
      solution:
        "We built an AI system that reads every incoming email, determines intent and urgency, drafts an accurate response, and routes anything sensitive to the right team member, with routine requests handled end-to-end automatically.",
      results: [
        "71% faster average email response time",
        "Consistent, accurate replies across the team",
        "63% reduction in manual email handling",
        "Instant resolution for routine account requests",
        "Support staff redirected toward complex customer issues",
      ],
      timeline: "4-6 weeks",
    },
  },
];

// New 5th case study to give the Marketing & Growth service its own proof point
const NEW_CASE_STUDY = {
  createdAt: new Date("2026-01-05"),
  industryType: "Hospitality",
  logoId: "megaphone",
  relatedService: "AI-Powered Marketing & Growth",
  projectName: "AI-Powered Marketing & Lead Follow-Up",
  companyName: "Boutique Fitness Studio Chain",
  challenge:
    "Running 3 locations, this studio relied on the owner personally writing social posts and following up with trial leads whenever time allowed, which meant inconsistent posting and leads going cold within days.",
  solution:
    "We set up AI-generated social content and ad copy tailored to each location, paired with automated lead follow-up that reaches out within minutes of a trial sign-up instead of days later.",
  results: [
    "41% increase in trial-to-membership conversion",
    "Consistent social posting across all 3 locations, hands-off",
    "Lead follow-up time cut from days to minutes",
    "Lower cost per lead from better-targeted ad spend",
    "Owner freed from daily content creation",
  ],
  timeline: "3-4 weeks",
};

async function run() {
  const snap = await getDocs(collection(db, COLLECTION_NAME));
  const existing = [];
  snap.forEach((d) => existing.push({ id: d.id, ...d.data() }));

  for (const update of UPDATES) {
    const match = existing.find(
      (cs) => cs.projectName === update.data.projectName
    );
    if (!match) {
      console.warn("No match found for:", update.data.projectName);
      continue;
    }
    await updateDoc(doc(db, COLLECTION_NAME, match.id), {
      ...update.data,
      updatedAt: serverTimestamp(),
    });
    console.log("Updated:", update.data.projectName);
  }

  const existingCaseStudy = existing.find(
    (cs) => cs.projectName === NEW_CASE_STUDY.projectName
  );
  if (existingCaseStudy) {
    await updateDoc(doc(db, COLLECTION_NAME, existingCaseStudy.id), {
      ...NEW_CASE_STUDY,
      updatedAt: serverTimestamp(),
    });
    console.log("Updated existing case study:", NEW_CASE_STUDY.projectName);
  } else {
    const ref = await addDoc(collection(db, COLLECTION_NAME), {
      ...NEW_CASE_STUDY,
      updatedAt: serverTimestamp(),
    });
    console.log("Added new case study:", NEW_CASE_STUDY.projectName, ref.id);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
