// Run with: node scripts/add-resource-articles.mjs <admin-email> <admin-password>
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
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

const [adminEmail, adminPassword] = process.argv.slice(2);
if (!adminEmail || !adminPassword) {
  console.error("Usage: node scripts/add-resource-articles.mjs <admin-email> <admin-password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const COLLECTION_NAME = "blogPosts";

const ARTICLES = [
  {
    slug: "is-your-business-ready-for-ai-automation",
    blogType: "Getting Started",
    blogName: "5 Signs Your Business Is Ready for AI Automation",
    description:
      "Not sure if automation makes sense for your business yet? Here are five clear signals it's time to stop doing things manually.",
    readTime: "5 min read",
    publishDate: "2026-09-01",
    relatedService: "Business Process Automation",
    content: `
<h2>1. Your team spends hours on the same task every week</h2>
<p>If the same person is doing the same repetitive task (entering invoices, updating a spreadsheet, copying leads into a CRM) every single week, that's your clearest signal. Tasks that follow a predictable, repeatable pattern are exactly what automation is good at. The time it takes to do the task once is a rounding error; the time it takes to do it 50 times a year is a real cost.</p>

<h2>2. You're copying data between systems by hand</h2>
<p>Many small businesses run on a patchwork of tools: QuickBooks for accounting, a separate CRM for sales, spreadsheets for everything in between. If someone on your team is manually re-typing information from one system into another, that's a sign those systems should be talking to each other directly. Modern automation tools can sync data between platforms like QuickBooks, HubSpot, and Salesforce automatically, so the same information doesn't have to be entered twice.</p>

<h2>3. Customers wait longer than they should for a response</h2>
<p>If leads or customer emails sit in an inbox for hours before anyone replies, you're likely losing business you don't even know about. This is especially true outside of standard office hours. Automation doesn't have to mean losing the personal touch: it can mean an AI system reads incoming messages, drafts a response, and either sends it or routes it to the right person immediately.</p>

<h2>4. Growth means hiring more people to do the same work</h2>
<p>This is one of the most expensive signals to ignore. If your only plan for handling more customers, more orders, or more calls is to hire more people to do the exact same manual process, your operating costs will always grow in lockstep with your revenue. Automating the process first means you can grow without that 1-to-1 relationship between headcount and volume.</p>

<h2>5. You've said "there has to be a better way" more than once</h2>
<p>This one is less technical and more instinctual, but it's usually right. If a process feels clunky, slow, or error-prone enough that you or your team have complained about it more than once, it's worth a second look. Often the fix isn't a full system overhaul; it's a targeted automation that removes the specific bottleneck.</p>

<h2>What to do next</h2>
<p>You don't need to automate everything at once. The businesses that get the most value out of automation usually start with a single, well-defined process (the one that's costing the most time or causing the most frustration) and expand from there. If any of the signs above sound familiar, that's a good place to start the conversation.</p>
`,
  },
  {
    slug: "ai-voice-agents-vs-traditional-call-centers",
    blogType: "Technology",
    blogName:
      "AI Voice Agents vs. Traditional Call Centers: What Growing Businesses Need to Know",
    description:
      "AI voice agents can now answer calls, qualify leads, and book appointments around the clock. Here's how they actually compare to traditional call handling.",
    readTime: "6 min read",
    publishDate: "2026-08-25",
    relatedService: "AI-Powered Customer Communication",
    content: `
<h2>How traditional call handling breaks down</h2>
<p>Most small and mid-sized businesses handle calls one of two ways: an in-house team answers during business hours, or calls go to voicemail after hours and get returned the next day. Both approaches share the same weakness: they only work as well as the humans staffing them, and neither covers nights, weekends, or the moment someone's out sick. Every missed call after 5 PM is a lead that may have already called your competitor by morning.</p>

<h2>What an AI voice agent actually does</h2>
<p>An AI voice agent is a system that answers phone calls, holds a natural conversation, and completes tasks (collecting information, checking availability, booking an appointment directly on your calendar, or answering common questions) without a human on the line. It doesn't replace judgment calls or complex negotiations, but it handles the repetitive, high-volume parts of a phone conversation exactly the same way every time, at any hour.</p>

<h2>Cost and availability compared</h2>
<ul>
<li><strong>Traditional call center or staff:</strong> Fixed hours, ongoing salary or contract costs, hiring and training overhead, and inconsistent quality depending on who picks up.</li>
<li><strong>AI voice agent:</strong> Available 24/7, consistent script and tone on every call, scales instantly during busy periods, and typically costs a fraction of an additional hire.</li>
</ul>
<p>The trade-off isn't quality versus cost: a well-built voice agent can sound natural and handle most routine calls competently. The trade-off is really about which calls need a human's discretion versus which calls are simply information exchange.</p>

<h2>When a hybrid approach makes sense</h2>
<p>Most businesses don't need to choose one or the other. A common setup is an AI agent handling the first layer of every call (after-hours calls, appointment booking, FAQs, lead qualification) and transferring anything complex or high-stakes to a human. This keeps your team focused on the conversations that actually need them, while nothing falls through the cracks overnight.</p>

<h2>Getting started</h2>
<p>The easiest way to test whether an AI voice agent fits your business is to start with a narrow use case (after-hours calls, or a single type of inbound request like appointment booking) rather than replacing your entire phone system on day one. From there, you can expand its role as you see what it handles well.</p>
`,
  },
  {
    slug: "automate-workflows-without-replacing-your-software",
    blogType: "Implementation",
    blogName:
      "How to Automate Workflows Without Replacing the Software You Already Use",
    description:
      "You don't need to rip out your existing tools to automate your business. Here's what connecting them together actually looks like in practice.",
    readTime: "5 min read",
    publishDate: "2026-08-18",
    relatedService: "Custom AI Software & Integrations",
    content: `
<h2>The myth that automation means starting over</h2>
<p>One of the biggest misconceptions about business automation is that it requires abandoning the tools your team already knows and trusts. In reality, most effective automation works the opposite way: it connects the systems you already use (QuickBooks, HubSpot, Salesforce, Slack, Google Sheets) so information moves between them automatically instead of being retyped by hand.</p>

<h2>What "connecting" your tools actually looks like</h2>
<p>In practice, this usually means building a workflow that watches for an event in one system and automatically takes an action in another. A new deal marked "won" in your CRM can automatically create a customer record in QuickBooks. A form submission on your website can automatically create a task in your project management tool and send a Slack notification to the right person. None of this requires anyone to change how they work day-to-day: it just removes the manual handoff in between.</p>

<h2>Real examples of low-disruption automation</h2>
<ul>
<li>Syncing customer or order data between an e-commerce platform and an inventory system, so stock counts update automatically instead of through manual spreadsheet edits.</li>
<li>Reading incoming invoices or forms with AI and automatically populating the right fields in your accounting software.</li>
<li>Automatically routing and tagging emails by department so the right person sees them without anyone manually forwarding messages.</li>
</ul>

<h2>What can and can't be automated this way</h2>
<p>Repetitive, rules-based tasks are ideal candidates: data entry, notifications, status updates, syncing records between systems. Tasks that require judgment calls, relationship context, or one-off exceptions usually still need a person, at least for now. The goal isn't to automate every part of a process, but to remove the parts that don't need a human involved at all.</p>

<h2>How to start small</h2>
<p>The most successful automation projects we've seen don't try to overhaul every system at once. They start with one specific, well-understood handoff (the one causing the most delays or errors), get it working reliably, and expand from there. This keeps risk low and lets your team see real results before automating anything mission-critical.</p>
`,
  },
  {
    slug: "chatgpt-vs-claude-for-business",
    blogType: "Best Practices",
    blogName: "ChatGPT vs. Claude: Which AI Model Is Right for Your Business?",
    description:
      "Not all AI models are built the same. Here's a practical, non-technical breakdown of when ChatGPT, Claude, or another model makes sense for your business.",
    readTime: "6 min read",
    publishDate: "2026-08-11",
    relatedService: "Custom AI Software & Integrations",
    content: `
<h2>Why this question matters more than you think</h2>
<p>As AI tools become part of daily business operations, a common assumption is that "AI is AI": that any large language model will produce roughly the same result. In practice, different models have different strengths, and the model you use can meaningfully affect accuracy, tone, and cost, especially once you're running the same task thousands of times a month instead of asking a one-off question.</p>

<h2>What ChatGPT (OpenAI) tends to be great at</h2>
<p>ChatGPT is broadly capable and widely integrated, with a large ecosystem of plugins, tools, and existing business integrations. It tends to be a strong choice for general content generation, brainstorming, customer-facing copy, and tasks where speed and broad familiarity matter more than nuance.</p>

<h2>What Claude (Anthropic) tends to be great at</h2>
<p>Claude is often the stronger choice for tasks involving longer documents, more careful reasoning, or higher-stakes accuracy: reading contracts or reports, analyzing structured data, or handling nuanced customer communication where getting the tone and details exactly right matters. Businesses in more regulated or detail-sensitive work often lean on Claude for this reason.</p>

<h2>Why matching the model to the task matters</h2>
<p>The real skill in building AI-powered systems for a business isn't just knowing that these models exist: it's knowing which one to use for which job, and sometimes using both within the same workflow. An automation might use one model to draft a customer email and a different model to double-check a data extraction for accuracy. Getting this matching right affects three things directly: how accurate the output is, how natural it feels to the person on the other end, and how much the system costs to run at scale.</p>

<h2>Why the "best" AI model is the one you never have to think about</h2>
<p>For most business owners, the goal isn't to become an expert in comparing AI models: it's to have automations that simply work, reliably, without needing to reconsider the underlying technology every few months. That's the approach we take: matching the right model to each specific task inside a system, so the business gets accurate, cost-effective results without needing to manage that complexity directly.</p>
`,
  },
  {
    slug: "true-cost-of-manual-data-entry-and-automation-roi",
    blogType: "Strategy",
    blogName:
      "The Real Cost of Manual Data Entry (And How to Calculate Your Automation ROI)",
    description:
      "Manual data entry costs more than it looks like on paper. Here's a simple framework for calculating what it's really costing your business, and what automating it could return.",
    readTime: "6 min read",
    publishDate: "2026-08-04",
    relatedService: "Business Process Automation",
    content: `
<h2>The hidden costs beyond hourly wages</h2>
<p>When businesses estimate the cost of manual data entry, they usually stop at the obvious number: hours spent, multiplied by hourly pay. But that's only part of the picture. Manual entry also carries the cost of errors that need to be found and corrected later, the delay between when information arrives and when it's actually usable, and the opportunity cost of what that employee could have been doing instead, like talking to customers or closing deals.</p>

<h2>A simple formula to estimate your own cost</h2>
<p>A useful starting formula:</p>
<p><strong>(Hours spent per week on manual entry) × (Hourly cost of the employee) × 52 weeks</strong></p>
<p>That gives you a baseline annual labor cost. Then add a conservative estimate for error-related costs: time spent finding and fixing mistakes, or the cost of a mistake that reaches a customer or a financial record. Most businesses are surprised to see the true number is 30-50% higher than the labor cost alone once errors and delays are factored in.</p>

<h2>What automation actually changes</h2>
<p>Automating data entry doesn't just save the hours directly spent typing. It removes the error-checking step almost entirely, since a well-built system reads and enters data the same accurate way every time. It also removes the delay: data that once sat in an inbox for a day before being entered can be processed and available within minutes, which matters for anything time-sensitive like inventory counts or customer responses.</p>

<h2>A real-world example</h2>
<p>In one project we completed, a retail business was manually reconciling inventory and order data across several disconnected tools and spreadsheets. After automating the sync between their sales channels and inventory system, they saw a significant drop in stock mismatches and faster order fulfillment, not because anyone worked harder, but because the manual handoff that caused the delays and errors was removed entirely.</p>

<h2>How to build your own business case</h2>
<p>Start by picking the single manual process that consumes the most hours or causes the most downstream problems. Calculate its real cost using the formula above, including a reasonable estimate for errors and delays. Compare that to the one-time cost of automating it. In most cases, the payback period is measured in months, not years, which is why manual data entry is usually one of the first things worth automating.</p>
`,
  },
  {
    slug: "ai-marketing-automation-for-small-business",
    blogType: "Automation",
    blogName:
      "AI Marketing Automation: How Small Businesses Can Compete with Bigger Budgets",
    description:
      "You don't need a big marketing team to compete with one. Here's how AI is leveling the playing field for lead generation and content creation.",
    readTime: "5 min read",
    publishDate: "2026-07-28",
    relatedService: "AI-Powered Marketing & Growth",
    content: `
<h2>The old advantage big budgets bought</h2>
<p>For years, marketing scale came down to headcount and ad spend: more writers producing more content, more analysts optimizing more campaigns, bigger budgets buying more visibility. A small business competing against a company with a 20-person marketing team was competing against sheer output, not just better ideas.</p>

<h2>What AI changes about content and ad creation</h2>
<p>AI tools like ChatGPT and Claude can now draft social posts, ad copy, email sequences, and landing page content in a fraction of the time it used to take a full content team. This doesn't remove the need for a clear strategy and a human reviewing the output: it removes the bottleneck of production. A single person with the right AI-powered workflow can now produce and test content at a volume that used to require a much larger team.</p>

<h2>Where automation fits in the marketing funnel</h2>
<ul>
<li><strong>Content creation:</strong> Drafting and varying ad copy, social posts, and email content at scale.</li>
<li><strong>Targeting and optimization:</strong> Using data to automatically adjust ad targeting and spend toward what's actually converting, rather than manually checking dashboards.</li>
<li><strong>Lead follow-up:</strong> Automatically responding to and qualifying new leads the moment they come in, instead of days later.</li>
</ul>
<p>Each of these used to require a dedicated specialist. Automated well, they can run continuously in the background with much less day-to-day management.</p>

<h2>What still needs a human</h2>
<p>AI is very good at production and optimization: it's not a replacement for strategy, brand voice, or judgment about what your business actually wants to be known for. The businesses that get the best results treat AI as a force multiplier for a clear strategy someone has already thought through, not a replacement for having one.</p>

<h2>Getting started without overwhelming your team</h2>
<p>The easiest entry point is usually automating one part of the funnel that's currently manual and time-consuming (content drafting, lead follow-up, or ad reporting) rather than automating your entire marketing operation at once. From there, most businesses expand into other parts of the funnel once they see it working reliably.</p>
`,
  },
];

// Stale placeholder post from before the services redesign - plain-text, unformatted,
// and superseded by the new "AI Marketing Automation" article below.
const STALE_POST_ID = "PcJVwr2riWvcI8PbvafX";

async function run() {
  await deleteDoc(doc(db, COLLECTION_NAME, STALE_POST_ID)).catch(() => {});
  console.log("Deleted stale placeholder post (if it still existed):", STALE_POST_ID);

  const existingSnap = await getDocs(collection(db, COLLECTION_NAME));
  const existing = [];
  existingSnap.forEach((d) => existing.push({ id: d.id, ...d.data() }));

  for (const article of ARTICLES) {
    const match = existing.find((post) => post.slug === article.slug);
    if (match) {
      await updateDoc(doc(db, COLLECTION_NAME, match.id), {
        ...article,
        updatedAt: serverTimestamp(),
      });
      console.log("Updated:", article.blogName, match.id);
    } else {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...article,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log("Added:", article.blogName, docRef.id);
    }
  }
  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
