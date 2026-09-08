export const FIRM_NAME = "Meridian Tax & Advisory";

export const STATUS_STAGES = [
  "Not Started",
  "Awaiting Docs",
  "In Prep",
  "In Review",
  "Sent to Client",
  "Signed",
  "Filed",
  "Invoiced",
];

const STAGE_STYLES = {
  "Not Started": { text: "text-slate-600", bg: "bg-slate-100" },
  "Awaiting Docs": { text: "text-amber-700", bg: "bg-amber-50" },
  "In Prep": { text: "text-blue-700", bg: "bg-blue-50" },
  "In Review": { text: "text-indigo-700", bg: "bg-indigo-50" },
  "Sent to Client": { text: "text-violet-700", bg: "bg-violet-50" },
  Signed: { text: "text-teal-700", bg: "bg-teal-50" },
  Filed: { text: "text-emerald-700", bg: "bg-emerald-50" },
  Invoiced: { text: "text-slate-700", bg: "bg-slate-100" },
};

export const getStageStyle = (status) =>
  STAGE_STYLES[status] || { text: "text-slate-600", bg: "bg-slate-100" };

// Each client's "documents needed" checklist. Missing items carry
// mock extractedFields so the intake/OCR demo has something real to show
// once the document is "received."
export const CLIENTS = [
  {
    id: "whitfield-d",
    name: "Dana Whitfield",
    entityType: "Individual",
    status: "Filed",
    daysInStatus: 2,
    states: ["TX"],
    schedules: [],
    priorYearFee: 450,
    fee: 475,
    contactEmail: "dana.whitfield@email.com",
    documents: [
      { id: "d1", label: "W-2 (Meridian Health Systems)", status: "received" },
      { id: "d2", label: "Prior-year AGI", status: "received" },
    ],
  },
  {
    id: "whitfield-design",
    name: "Whitfield Design LLC",
    entityType: "S-Corp",
    status: "In Review",
    daysInStatus: 3,
    states: ["TX"],
    schedules: ["Payroll"],
    priorYearFee: 1200,
    fee: 1300,
    contactEmail: "accounts@whitfielddesign.co",
    documents: [
      { id: "d1", label: "Payroll summary (Gusto)", status: "received" },
      { id: "d2", label: "1120-S prior year", status: "received" },
      { id: "d3", label: "P&L / Balance sheet (QuickBooks)", status: "received" },
    ],
  },
  {
    id: "alvarez-trust",
    name: "The Alvarez Family Trust",
    entityType: "Trust",
    status: "Awaiting Docs",
    daysInStatus: 22,
    states: ["TX"],
    schedules: ["K-1"],
    priorYearFee: 900,
    fee: 950,
    contactEmail: "malvarez@alvarezfamily.com",
    documents: [
      { id: "d1", label: "K-1 (Alvarez Holdings LP)", status: "received" },
      { id: "d2", label: "Prior-year 1041", status: "received" },
      {
        id: "d3",
        label: "Trust brokerage statement (Schwab)",
        status: "missing",
        extractedFields: [
          { label: "Institution", value: "Charles Schwab" },
          { label: "Account", value: "Trust — ...4471" },
          { label: "Dividend Income", value: "$8,240.00" },
          { label: "Realized Gains", value: "$2,115.00" },
        ],
      },
    ],
  },
  {
    id: "ferro-construction",
    name: "Ferro Construction Inc.",
    entityType: "C-Corp",
    status: "In Prep",
    daysInStatus: 6,
    states: ["TX", "OK", "LA"],
    schedules: ["Multi-State", "Fixed Assets"],
    priorYearFee: 3200,
    fee: 3450,
    contactEmail: "controller@ferroconstruction.com",
    documents: [
      { id: "d1", label: "Fixed asset schedule", status: "received" },
      { id: "d2", label: "OK & LA apportionment data", status: "received" },
      { id: "d3", label: "1120 prior year", status: "received" },
      { id: "d4", label: "Year-end trial balance", status: "received" },
    ],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    entityType: "Individual",
    status: "Not Started",
    daysInStatus: 1,
    states: ["TX"],
    schedules: ["K-1", "Crypto"],
    priorYearFee: 380,
    fee: 420,
    contactEmail: "priya.nair@email.com",
    documents: [
      {
        id: "d1",
        label: "W-2 (Latham Analytics)",
        status: "missing",
        extractedFields: [
          { label: "Employer", value: "Latham Analytics Inc." },
          { label: "Wages (Box 1)", value: "$118,400.00" },
          { label: "Fed Withholding", value: "$21,320.00" },
        ],
      },
      {
        id: "d2",
        label: "K-1 (Nair Ventures LP)",
        status: "missing",
        extractedFields: [
          { label: "Entity", value: "Nair Ventures LP" },
          { label: "Box 1 — Ordinary Income", value: "$14,200.00" },
        ],
      },
      {
        id: "d3",
        label: "Crypto exchange summary (Coinbase)",
        status: "missing",
        extractedFields: [
          { label: "Exchange", value: "Coinbase" },
          { label: "Total Proceeds", value: "$32,410.00" },
          { label: "Total Cost Basis", value: "$28,955.00" },
        ],
      },
      { id: "d4", label: "Prior-year AGI", status: "received" },
    ],
  },
  {
    id: "lonestar-vet",
    name: "Lonestar Veterinary Partners",
    entityType: "Partnership",
    status: "Sent to Client",
    daysInStatus: 4,
    states: ["TX"],
    schedules: ["K-1", "Multi-Partner"],
    priorYearFee: 1800,
    fee: 1900,
    contactEmail: "office@lonestarvet.com",
    documents: [
      { id: "d1", label: "Partner ownership schedule", status: "received" },
      { id: "d2", label: "1065 prior year", status: "received" },
      { id: "d3", label: "Year-end financials", status: "received" },
    ],
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    entityType: "Individual",
    status: "Awaiting Docs",
    daysInStatus: 9,
    states: ["TX"],
    schedules: ["Rental"],
    priorYearFee: 520,
    fee: 550,
    contactEmail: "marcus.webb@email.com",
    documents: [
      { id: "d1", label: "W-2 (Delacroix Logistics)", status: "received" },
      {
        id: "d2",
        label: "1098 Mortgage Interest (Rental #1)",
        status: "received",
      },
      {
        id: "d3",
        label: "1098 Mortgage Interest (Rental #2)",
        status: "missing",
        extractedFields: [
          { label: "Lender", value: "Regions Bank" },
          { label: "Property", value: "4420 Birchwood Ln" },
          { label: "Interest Paid", value: "$6,840.00" },
        ],
      },
      {
        id: "d4",
        label: "Property tax statements (both rentals)",
        status: "missing",
        extractedFields: [
          { label: "Rental #1 Tax Paid", value: "$3,120.00" },
          { label: "Rental #2 Tax Paid", value: "$2,890.00" },
        ],
      },
    ],
  },
  {
    id: "nguyen-dental",
    name: "Nguyen Family Dental PLLC",
    entityType: "S-Corp",
    status: "Signed",
    daysInStatus: 1,
    states: ["TX"],
    schedules: ["Payroll"],
    priorYearFee: 1650,
    fee: 1750,
    contactEmail: "billing@nguyenfamilydental.com",
    documents: [
      { id: "d1", label: "Payroll summary (Gusto)", status: "received" },
      { id: "d2", label: "1120-S prior year", status: "received" },
      { id: "d3", label: "Equipment purchase records", status: "received" },
    ],
  },
  {
    id: "coleman-associates",
    name: "Coleman & Associates",
    entityType: "Partnership",
    status: "Invoiced",
    daysInStatus: 12,
    states: ["TX"],
    schedules: ["K-1"],
    priorYearFee: 2100,
    fee: 2200,
    contactEmail: "finance@colemanassociates.com",
    documents: [
      { id: "d1", label: "Partner ownership schedule", status: "received" },
      { id: "d2", label: "1065 prior year", status: "received" },
    ],
  },
  {
    id: "rosa-ibarra",
    name: "Rosa Ibarra",
    entityType: "Individual",
    status: "Not Started",
    daysInStatus: 1,
    states: ["TX"],
    schedules: [],
    priorYearFee: 300,
    fee: 320,
    contactEmail: "rosa.ibarra@email.com",
    documents: [
      {
        id: "d1",
        label: "W-2 (Sunridge Retail Group)",
        status: "missing",
        extractedFields: [
          { label: "Employer", value: "Sunridge Retail Group" },
          { label: "Wages (Box 1)", value: "$41,900.00" },
          { label: "Fed Withholding", value: "$3,760.00" },
        ],
      },
      { id: "d2", label: "Prior-year AGI", status: "received" },
    ],
  },
];

export const getClientById = (id) => CLIENTS.find((c) => c.id === id);

// Every communication lands here, keyed to a client — the same record
// shows up in that client's Hub and in the firm-wide Communications view.
export const COMMUNICATIONS = [
  {
    id: "c1",
    clientId: "alvarez-trust",
    type: "nudge",
    status: "sent",
    subject: "Still need: Trust brokerage statement",
    body: "Hi Marcus, just a friendly follow-up — we're still waiting on the Schwab brokerage statement for the Alvarez Family Trust to finish this year's 1041. Once that's in, we can move straight to review. Thanks!",
    timestamp: "2026-09-05T09:00:00",
  },
  {
    id: "c2",
    clientId: "marcus-webb",
    type: "nudge",
    status: "sent",
    subject: "Still need: 2 documents for your rentals",
    body: "Hi Marcus, we still need the 1098 for Rental #2 and property tax statements for both properties to finish your return. Whenever you get a chance to upload those, we'll be ready to move forward.",
    timestamp: "2026-09-05T09:00:00",
  },
  {
    id: "c3",
    clientId: "whitfield-d",
    type: "reply",
    status: "auto-sent",
    subject: "Re: Any update on my refund?",
    inboundQuestion: "Hey, just wondering when my refund will show up?",
    body: "Hi Dana — your return was e-filed on Sep 3 and the IRS typically issues refunds within 21 days. You can track it directly at irs.gov/refunds using your SSN, filing status, and refund amount. Let us know if you don't see movement after that window!",
    timestamp: "2026-09-05T14:12:00",
  },
  {
    id: "c4",
    clientId: "whitfield-design",
    type: "reply",
    status: "awaiting-approval",
    subject: "Re: When will our return be ready?",
    inboundQuestion: "Quick check-in — when will our return be ready to review?",
    body: "Hi team — your S-corp return is currently in review with our senior preparer and on track to be ready for signature by early next week. We'll reach out the moment it's ready!",
    timestamp: "2026-09-05T16:40:00",
  },
  {
    id: "c5",
    clientId: "coleman-associates",
    type: "reply",
    status: "auto-sent",
    subject: "Re: Payment confirmation",
    inboundQuestion: "Can you confirm you received our payment?",
    body: "Hi — yes, we can confirm your payment was received on Sep 3 and your account is fully settled. Thanks for your business this season!",
    timestamp: "2026-09-04T11:05:00",
  },
  {
    id: "c6",
    clientId: "priya-nair",
    type: "call",
    status: "logged",
    summary:
      "Called asking whether a crypto exchange summary needs to be reported if the wallet was also used personally. AI agent explained only taxable events (sales/trades) are reportable and offered a preparer follow-up.",
    timestamp: "2026-09-04T21:47:00",
  },
  {
    id: "c7",
    clientId: "rosa-ibarra",
    type: "call",
    status: "logged",
    summary:
      "Asked whether her W-2 can be dropped off in person instead of uploaded online. AI agent confirmed office drop-box hours and sent a portal upload reminder as a backup.",
    timestamp: "2026-09-04T20:15:00",
  },
];

export const getCommunicationsForClient = (clientId) =>
  COMMUNICATIONS.filter((c) => c.clientId === clientId).sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

// ---------------------------------------------------------------------------
// Quoting & Engagement — the fee rules engine and starter-checklist logic
// used when a new prospect signs on.
// ---------------------------------------------------------------------------

export const ENTITY_BASE_FEES = {
  Individual: 300,
  "S-Corp": 950,
  "C-Corp": 1400,
  Partnership: 900,
  Trust: 700,
};

export const SCHEDULE_OPTIONS = [
  { id: "K-1", label: "K-1 income", feeAdd: 150 },
  { id: "Rental", label: "Rental property", feeAdd: 150 },
  { id: "Crypto", label: "Crypto activity", feeAdd: 175 },
  { id: "Payroll", label: "Payroll", feeAdd: 200 },
  { id: "Multi-Partner", label: "Multiple partners/owners", feeAdd: 125 },
  { id: "Fixed Assets", label: "Fixed assets / depreciation", feeAdd: 150 },
];

export const ADDITIONAL_STATE_OPTIONS = ["OK", "LA", "CA", "NY", "FL", "CO", "AZ", "GA"];
const PER_ADDITIONAL_STATE_FEE = 120;
const PRIOR_YEAR_INFLATION = 1.06;

export const calculateQuote = ({ entityType, additionalStates, schedules, priorYearFee }) => {
  const lineItems = [];
  const base = ENTITY_BASE_FEES[entityType] || ENTITY_BASE_FEES.Individual;
  lineItems.push({ label: `Base fee — ${entityType}`, amount: base });

  const extraStates = additionalStates.length;
  if (extraStates > 0) {
    const amount = extraStates * PER_ADDITIONAL_STATE_FEE;
    lineItems.push({
      label: `${extraStates} additional state${extraStates === 1 ? "" : "s"}`,
      amount,
    });
  }

  schedules.forEach((id) => {
    const opt = SCHEDULE_OPTIONS.find((s) => s.id === id);
    if (opt) lineItems.push({ label: opt.label, amount: opt.feeAdd });
  });

  const calculated = lineItems.reduce((sum, l) => sum + l.amount, 0);

  let total = calculated;
  if (priorYearFee && priorYearFee > 0) {
    const inflated = Math.round(priorYearFee * PRIOR_YEAR_INFLATION);
    if (inflated > calculated) {
      lineItems.push({
        label: "Prior-year fee floor (+6% inflation)",
        amount: inflated - calculated,
      });
      total = inflated;
    }
  }

  return { lineItems, total };
};

export const buildStarterDocuments = (entityType, schedules) => {
  const docs = [{ id: "sd0", label: "Signed engagement letter", status: "received" }];
  let n = 1;
  const push = (label) => docs.push({ id: `sd${n++}`, label, status: "missing" });

  if (entityType === "Individual") {
    push("W-2(s)");
  } else if (entityType === "Trust") {
    push("Prior-year 1041");
  } else {
    push("Prior-year business return");
    push("Year-end financials");
  }

  if (schedules.includes("K-1")) push("K-1 form(s)");
  if (schedules.includes("Rental")) push("1098 mortgage interest / property tax statements");
  if (schedules.includes("Crypto")) push("Crypto exchange summary");
  if (schedules.includes("Payroll")) push("Payroll summary");
  if (schedules.includes("Multi-Partner")) push("Partner ownership schedule");
  if (schedules.includes("Fixed Assets")) push("Fixed asset schedule");

  return docs;
};

// Downstream actions the workflow engine fires when a status changes —
// shown to make "status changes trigger the next module" visible, even
// where that downstream module (e.g. Billing) isn't fully built yet.
export const STATUS_TRIGGERS = {
  "Awaiting Docs": "Added to the document nudge queue (Communications).",
  "In Prep": "Packet assembly started from documents already on file.",
  "In Review": "Queued for senior preparer review.",
  "Sent to Client": "E-signature request queued via DocuSign.",
  Signed: "Intake checklist marked complete.",
  Filed: "Invoice will be auto-generated on next billing sweep (Phase 5).",
  Invoiced: "Payment reminder scheduled if unpaid after 14 days (Phase 5).",
};

export const updateClientStatus = (clientId, newStatus) => {
  const client = CLIENTS.find((c) => c.id === clientId);
  if (!client) return null;
  client.status = newStatus;
  client.daysInStatus = 0;
  return client;
};

// ---------------------------------------------------------------------------
// Billing — invoices generated when a return is filed, reconciled against
// payment, and nudged when overdue.
// ---------------------------------------------------------------------------

export const INVOICES = [
  {
    id: "inv1",
    clientId: "coleman-associates",
    invoiceNumber: "INV-1042",
    description: "2025 Partnership Tax Return",
    issuedDate: "2026-08-24",
    dueDate: "2026-09-07",
    amount: 2200,
    status: "paid",
    paidDate: "2026-09-03",
  },
  {
    id: "inv2",
    clientId: "ferro-construction",
    invoiceNumber: "INV-1038",
    description: "Q2 Bookkeeping Retainer",
    issuedDate: "2026-08-05",
    dueDate: "2026-08-19",
    amount: 450,
    status: "overdue",
    reminderSent: false,
  },
];

let invoiceCounter = 1043;

export const getInvoicesForClient = (clientId) =>
  INVOICES.filter((i) => i.clientId === clientId);

export const hasInvoice = (clientId) =>
  INVOICES.some((i) => i.clientId === clientId);

export const generateInvoice = (client) => {
  const invoice = {
    id: `inv-${client.id}-${Date.now().toString(36)}`,
    clientId: client.id,
    invoiceNumber: `INV-${invoiceCounter++}`,
    description: `${new Date().getFullYear() - 1} Tax Return`,
    issuedDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    amount: client.fee,
    status: "sent",
  };
  INVOICES.push(invoice);
  return invoice;
};

export const markReminderSent = (invoiceId) => {
  const invoice = INVOICES.find((i) => i.id === invoiceId);
  if (invoice) invoice.reminderSent = true;
  return invoice;
};

export const addClient = ({
  name,
  entityType,
  additionalStates,
  schedules,
  fee,
  contactEmail,
}) => {
  const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
  const client = {
    id,
    name,
    entityType,
    status: "Not Started",
    daysInStatus: 0,
    states: ["TX", ...additionalStates],
    schedules,
    priorYearFee: fee,
    fee,
    contactEmail: contactEmail || "—",
    documents: buildStarterDocuments(entityType, schedules),
  };
  CLIENTS.unshift(client);
  return client;
};

export const getBottlenecks = () =>
  CLIENTS.filter((c) => c.status === "Awaiting Docs" && c.daysInStatus >= 7).sort(
    (a, b) => b.daysInStatus - a.daysInStatus
  );

export const getPipelineCounts = () => {
  const counts = {};
  STATUS_STAGES.forEach((s) => (counts[s] = 0));
  CLIENTS.forEach((c) => (counts[c.status] = (counts[c.status] || 0) + 1));
  return counts;
};
