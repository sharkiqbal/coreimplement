import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
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
  console.error("Usage: node replace-case-studies-with-verticals.mjs <admin-email> <admin-password>");
  process.exit(1);
}

await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const COLLECTION_NAME = "caseStudies";

// Matches existing docs by their current projectName, then overwrites them in
// place (same doc IDs) with new content targeted at the business plan's
// priority verticals: insurance, accounting, legal, engineering, dental.
const REPLACEMENTS = [
  {
    matchProjectName: "24/7 Game Key Activation Automation",
    data: {
      createdAt: new Date("2026-01-25"),
      industryType: "Insurance",
      logoId: "shield",
      relatedService: "Business Process Automation",
      projectName: "Automated Renewal Prep & Document Chasing",
      companyName: "Independent Insurance Agency",
      challenge:
        "This independent agency manages several hundred active policies through Applied Epic, but renewal prep meant staff manually pulling policy history, checking for missing declarations pages, and chasing clients for updated documents by phone and email, often starting too close to the renewal date to catch problems early.",
      solution:
        "We connected directly to Applied Epic and the agency's email, so the system automatically flags upcoming renewals 60 days out, pulls prior policy and claims history, checks for missing documents against carrier requirements, and sends personalized follow-up requests, escalating to an agent for review whenever a client doesn't respond or a potential coverage gap turns up.",
      results: [
        "Renewal prep now starts automatically 60 days out instead of 2 to 3 weeks",
        "14 potential coverage gaps flagged for agent review before renewal, not after a claim",
        "58% fewer client documents requested by phone",
        "Renewal completion time cut nearly in half",
        "Staff handling a growing book of business without adding headcount",
      ],
      timeline: "5-7 weeks",
    },
  },
  {
    matchProjectName: "Unified Inventory & Sales Dashboard",
    data: {
      createdAt: new Date("2026-01-10"),
      industryType: "Accounting",
      logoId: "calculator",
      relatedService: "Custom AI Software & Integrations",
      projectName: "Automated Client Document Collection & Discrepancy Checks",
      companyName: "Regional CPA & Tax Firm",
      challenge:
        "During tax season, staff spent hours each week manually tracking which clients had submitted W-2s, 1099s, and supporting documents through QuickBooks Online and a shared client portal, then cross-checking numbers against prior-year returns by hand before a preparer ever looked at the file.",
      solution:
        "We built a system that tracks document status across the client portal and QuickBooks, sends automatic reminders for missing items, and flags discrepancies (like a significant income change or a form referenced in last year's return that's missing this year) for a preparer to review before the file is assigned.",
      results: [
        "Document collection time cut by more than half during peak season",
        "22 flagged discrepancies caught before filing, the kind that would otherwise surface in an amended return",
        "Preparers received complete files for review, not partial ones",
        "No seasonal temp staff needed for document tracking this year",
        "Client follow-up emails went out same-day instead of within a week",
      ],
      timeline: "6-8 weeks",
    },
  },
  {
    matchProjectName: "24/7 AI Phone Agent",
    data: {
      createdAt: new Date("2026-01-20"),
      industryType: "Legal",
      logoId: "scale",
      relatedService: "Business Process Automation",
      projectName: "Automated Intake & Deadline Tracking",
      companyName: "Personal Injury Law Firm",
      challenge:
        "New client intake ran through a mix of phone calls, email, and Clio, with paralegals manually entering matter details, checking for conflicts, and calculating statute of limitations deadlines by hand, a process where a single missed date carries real malpractice risk.",
      solution:
        "We connected to Clio and the firm's intake forms so new matters are logged automatically, checked against existing clients and matters with any potential conflicts flagged for attorney review, and given calculated deadline dates that sync directly to the firm's calendar with reminders well ahead of any filing date.",
      results: [
        "Every new matter gets a conflict check within minutes instead of days",
        "Zero missed statute of limitations deadlines since launch",
        "Intake-to-calendar time cut from up to a day down to minutes",
        "Paralegals redirected from data entry to case preparation",
        "Attorneys get a same-day summary of every new matter",
      ],
      timeline: "4-6 weeks",
    },
  },
  {
    matchProjectName: "AI-Powered Email Triage & Response",
    data: {
      createdAt: new Date("2026-01-15"),
      industryType: "Engineering",
      logoId: "compass",
      relatedService: "Custom AI Software & Integrations",
      projectName: "AI-Assisted Proposal Drafting & Project Knowledge Search",
      companyName: "Civil Engineering Firm",
      challenge:
        "Responding to RFPs meant engineers digging through years of past project files in Deltek and shared drives to find comparable projects, relevant resumes, and past-performance metrics, often spending a full day assembling boilerplate before writing anything new.",
      solution:
        "We built a searchable knowledge layer over the firm's Deltek project records and document archive, so staff can pull up similar past projects, get a draft proposal section with the right past-performance numbers already in place, and see which team members have relevant project experience for staffing the response.",
      results: [
        "Proposal assembly time cut from a full day to about 2 hours",
        "Win rate on submitted proposals up 19% with more targeted past-performance data",
        "Engineers spend far less time searching shared drives for old project files",
        "Consistent, accurate project metrics across every proposal",
        "Junior staff can assemble a strong first draft without starting from scratch",
      ],
      timeline: "7-9 weeks",
    },
  },
];

// New replacement content for the 5th case study, matched by its current name.
const REPLACEMENT_FIFTH = {
  matchProjectName: "AI-Powered Marketing & Lead Follow-Up",
  data: {
    createdAt: new Date("2026-01-05"),
    industryType: "Dental",
    logoId: "clipboard",
    relatedService: "Business Process Automation",
    projectName: "Automated Insurance Verification & Patient Intake",
    companyName: "Multi-Provider Dental Practice",
    challenge:
      "Front-desk staff verified dental insurance eligibility by phone or portal for every scheduled patient, often the day before or the morning of the appointment, and incomplete intake forms meant patients spent extra time in the waiting room while staff tracked down missing information.",
    solution:
      "We connected the practice's scheduling system and Dentrix to automatically verify insurance eligibility and benefits as soon as an appointment is booked, flag incomplete intake forms for follow-up before the visit, and give front-desk staff a clear status for every patient on the schedule.",
    results: [
      "Insurance eligibility confirmed an average of 4 days before the appointment instead of the day of",
      "31% fewer claim denials tied to eligibility issues",
      "Patients arrive with complete intake forms instead of finishing them in the waiting room",
      "Front-desk staff spend far less time on phone-based verification calls",
      "Fewer same-day schedule disruptions from incomplete information",
    ],
    timeline: "5-6 weeks",
  },
};

async function run() {
  const snap = await getDocs(collection(db, COLLECTION_NAME));
  const existing = [];
  snap.forEach((d) => existing.push({ id: d.id, ...d.data() }));

  for (const replacement of [...REPLACEMENTS, REPLACEMENT_FIFTH]) {
    const match = existing.find(
      (cs) => cs.projectName === replacement.matchProjectName
    );
    if (!match) {
      console.warn("No match found for:", replacement.matchProjectName);
      continue;
    }
    await updateDoc(doc(db, COLLECTION_NAME, match.id), {
      ...replacement.data,
      updatedAt: serverTimestamp(),
    });
    console.log(
      "Replaced:",
      replacement.matchProjectName,
      "->",
      replacement.data.projectName
    );
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
