import React, { useState } from "react";
import {
  FileText,
  Receipt,
  FileWarning,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Send,
  Bot,
  User,
  BookOpen,
  Mail,
  ChevronDown,
  ChevronUp,
  Banknote,
  KanbanSquare,
  FileSpreadsheet,
  HardDrive,
  Slack,
  PlugZap,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Shared: the real tools this workspace plugs into
// ---------------------------------------------------------------------------

export const INTEGRATIONS = {
  "QuickBooks Online": {
    icon: Banknote,
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    role: "Accounting ledger — where expenses and invoices get posted",
  },
  Karbon: {
    icon: KanbanSquare,
    color: "text-indigo-700 bg-indigo-50 border-indigo-200",
    role: "Practice management — engagement status and workflow",
  },
  Tax1099: {
    icon: FileSpreadsheet,
    color: "text-violet-700 bg-violet-50 border-violet-200",
    role: "1099 e-filing queue",
  },
  Gmail: {
    icon: Mail,
    color: "text-rose-700 bg-rose-50 border-rose-200",
    role: "Client email reminders",
  },
  "Google Drive": {
    icon: HardDrive,
    color: "text-blue-700 bg-blue-50 border-blue-200",
    role: "Where firm SOPs and past client files live",
  },
  Slack: {
    icon: Slack,
    color: "text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200",
    role: "Partner alerts for anything escalated",
  },
};

export const ToolBadge = ({ name, className = "" }) => {
  const tool = INTEGRATIONS[name];
  if (!tool) return null;
  return (
    <span
      title={tool.role}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border ${tool.color} ${className}`}
    >
      <tool.icon className="w-3 h-3" />
      {name}
    </span>
  );
};

export const ConnectedToolsStrip = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-3">
      <PlugZap className="w-4 h-4 text-slate-400" />
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Connected tools powering this workspace
      </p>
    </div>
    <div className="flex flex-wrap gap-2">
      {Object.keys(INTEGRATIONS).map((name) => (
        <ToolBadge key={name} name={name} />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Smart Document Processing (AI Intake + AI Document Processing)
// ---------------------------------------------------------------------------

const SAMPLE_DOCS = [
  {
    id: "invoice-clean",
    label: "Office Supplies Invoice",
    icon: Receipt,
    docType: "Invoice",
    docLines: [
      "Staples Business Advantage",
      "Invoice #INV-88213",
      "Bill To: Bayou City Tax & Accounting",
      "Date: 09/03/2026",
      "Office supplies — paper, toner, folders",
      "Total Due: $342.18",
    ],
    highlightLines: [1, 3, 5],
    fields: [
      { label: "Vendor", value: "Staples Business Advantage" },
      { label: "Invoice #", value: "INV-88213" },
      { label: "Date", value: "Sep 3, 2026" },
      { label: "Amount", value: "$342.18" },
      { label: "Suggested Category", value: "Office Supplies" },
    ],
    outcome: "success",
    outcomeText: "Posted as a new Expense entry under Office Supplies.",
    destinationTool: "QuickBooks Online",
  },
  {
    id: "1099",
    label: "1099-NEC Form",
    icon: FileText,
    docType: "1099-NEC",
    docLines: [
      "Form 1099-NEC — Nonemployee Compensation",
      "Payer: Riverside Home Services",
      "Recipient: Jordan Reyes Consulting",
      "Tax Year: 2025",
      "Box 1 — Nonemployee Compensation",
      "Amount: $4,200.00",
    ],
    highlightLines: [2, 3, 5],
    fields: [
      { label: "Payer", value: "Riverside Home Services" },
      { label: "Recipient", value: "Jordan Reyes Consulting" },
      { label: "Tax Year", value: "2025" },
      { label: "Compensation", value: "$4,200.00" },
    ],
    outcome: "success",
    outcomeText: "Added to the e-filing queue for tax year 2025, ready for review.",
    destinationTool: "Tax1099",
  },
  {
    id: "invoice-duplicate",
    label: "Acme Corp Invoice",
    icon: FileWarning,
    docType: "Invoice",
    docLines: [
      "Acme Corp Supply Co.",
      "Invoice #INV-55210",
      "Bill To: Bayou City Tax & Accounting",
      "Date: 09/05/2026",
      "Consulting services rendered",
      "Total Due: $1,240.00",
    ],
    highlightLines: [1, 3, 5],
    fields: [
      { label: "Vendor", value: "Acme Corp Supply Co." },
      { label: "Invoice #", value: "INV-55210" },
      { label: "Date", value: "Sep 5, 2026" },
      { label: "Amount", value: "$1,240.00" },
    ],
    outcome: "warning",
    outcomeText:
      "Flagged for review — a matching invoice from Acme Corp for $1,240.00 (Invoice #INV-55198) was already posted on Sep 2, 2026. Possible duplicate, routed to a bookkeeper before posting.",
    destinationTool: "Karbon",
  },
];

export const DocumentProcessingDemo = () => {
  const [selected, setSelected] = useState(null);
  const [stage, setStage] = useState("idle"); // idle | scanning | extracting | done

  const runDemo = (doc) => {
    setSelected(doc);
    setStage("scanning");
    setTimeout(() => setStage("extracting"), 1100);
    setTimeout(() => setStage("done"), 2200);
  };

  const reset = () => {
    setSelected(null);
    setStage("idle");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <h2 className="font-bold text-slate-900">Document Inbox</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          A document arrives, gets read, and either posts itself automatically
          or gets flagged for a human.
        </p>
      </div>

      <div className="p-5">
        {!selected ? (
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">
              Try sending a document to the firm:
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {SAMPLE_DOCS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => runDemo(doc)}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left"
                >
                  <doc.icon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    {doc.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Document mock */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <selected.icon className="w-3.5 h-3.5" />
                  {selected.docType}
                </div>
                <div className="bg-white rounded border border-slate-200 p-3 space-y-2">
                  {selected.docLines.map((line, i) => (
                    <div
                      key={i}
                      className={`h-2.5 rounded transition-colors duration-500 ${
                        stage !== "scanning" &&
                        selected.highlightLines.includes(i)
                          ? "bg-blue-200"
                          : "bg-slate-150 bg-slate-200"
                      }`}
                      style={{ width: `${60 + ((i * 13) % 35)}%` }}
                      title={line}
                    ></div>
                  ))}
                </div>
                {stage === "scanning" && (
                  <div className="flex items-center gap-2 mt-3 text-xs font-medium text-blue-600">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Reading document...
                  </div>
                )}
              </div>

              {/* Extracted fields */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Extracted fields
                </p>
                {stage === "scanning" ? (
                  <p className="text-sm text-slate-400 italic">
                    Waiting for scan to finish...
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selected.fields.map((f, i) => (
                      <div
                        key={f.label}
                        className="flex items-center justify-between text-sm border-b border-slate-100 pb-2 animate-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <span className="text-slate-500">{f.label}</span>
                        <span className="font-semibold text-slate-900">
                          {f.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {stage === "done" && (
                  <div
                    className={`mt-4 p-3.5 rounded-lg flex items-start gap-2.5 ${
                      selected.outcome === "success"
                        ? "bg-emerald-50 border border-emerald-200"
                        : "bg-amber-50 border border-amber-200"
                    }`}
                  >
                    {selected.outcome === "success" ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          selected.outcome === "success"
                            ? "text-emerald-800"
                            : "text-amber-800"
                        }`}
                      >
                        {selected.outcomeText}
                      </p>
                      <ToolBadge
                        name={selected.destinationTool}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {stage === "done" && (
              <button
                onClick={reset}
                className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Try another document →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Ask the Firm's Knowledge Base — designed to live in a narrow docked panel
// ---------------------------------------------------------------------------

const KNOWLEDGE_QA = [
  {
    keywords: ["s-corp", "election", "scorp"],
    question: "What's our process when a client misses the S-corp election deadline?",
    answer:
      "If a client misses the March 15 deadline, we file Form 2553 with a reasonable-cause statement requesting late election relief under Rev. Proc. 2013-30. Draft the statement from the SOP template, get partner sign-off, and file within 3 business days of client authorization.",
    source: "SOP: S-Corp Elections & Late Relief.pdf",
  },
  {
    keywords: ["onboarding", "new client", "new business"],
    question: "What documents do we need for new business client onboarding?",
    answer:
      "EIN confirmation letter, prior 2 years of returns if applicable, Articles of Incorporation/Organization, a signed engagement letter, and bank access via Plaid or manual upload. Add the client in Karbon using the 'New Business Client' template — it auto-creates the document checklist.",
    source: "SOP: New Client Onboarding.pdf",
  },
  {
    keywords: ["rush", "fee", "surcharge"],
    question: "What's our policy on rush return fees?",
    answer:
      "Returns requested with less than 5 business days before a filing deadline carry a 25% rush surcharge. Confirm it with the client in writing before starting, and flag the engagement 'Rush' in Karbon so it's prioritized correctly.",
    source: "Firm Policy: Pricing & Rush Fees.pdf",
  },
  {
    keywords: ["amend", "amended", "1040-x"],
    question: "How do we handle a client who wants to amend a prior year return?",
    answer:
      "Open a new 'Amendment' engagement in Karbon, linked to the original return, and confirm whether it affects state filings too. Amendments bill at the standard hourly rate unless covered by a flat-fee retainer. File Form 1040-X for individual returns.",
    source: "SOP: Amended Return Procedures.pdf",
  },
];

export const KnowledgeAssistantChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const ask = (qaOrText) => {
    const isQa = typeof qaOrText !== "string";
    const questionText = isQa ? qaOrText.question : qaOrText;

    setMessages((m) => [...m, { role: "user", text: questionText }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      let match = isQa ? qaOrText : null;
      if (!match) {
        const lower = questionText.toLowerCase();
        match = KNOWLEDGE_QA.find((qa) =>
          qa.keywords.some((k) => lower.includes(k))
        );
      }
      setThinking(false);
      setMessages((m) => [
        ...m,
        match
          ? { role: "ai", text: match.answer, source: match.source }
          : {
              role: "ai",
              text: "I couldn't find a confident answer to that in the firm's knowledge base. Try one of the suggested questions below, or in a real engagement this would be trained on your actual SOPs and documents.",
            },
      ]);
    }, 1100);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-sm text-slate-400">
            Ask anything about firm policy, SOPs, or past client work — I'll
            cite where the answer comes from.
          </p>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-700 border border-slate-200"
                }`}
              >
                <p>{m.text}</p>
                {m.source && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-200 text-xs text-slate-400">
                    <BookOpen className="w-3 h-3" />
                    {m.source}
                    <ToolBadge name="Google Drive" />
                  </div>
                )}
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                </div>
              )}
            </div>
          ))
        )}
        {thinking && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Searching...
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
        {KNOWLEDGE_QA.map((qa) => (
          <button
            key={qa.question}
            onClick={() => ask(qa)}
            disabled={thinking}
            className="text-xs font-medium px-2.5 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-200 rounded-full transition-colors disabled:opacity-50 text-left"
          >
            {qa.question}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !thinking) ask(input.trim());
        }}
        className="flex gap-2 p-3 border-t border-slate-200"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 min-w-0 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={thinking || !input.trim()}
          className="flex-shrink-0 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Daily Workflow Manager
// ---------------------------------------------------------------------------

export const WorkflowManagerDemo = () => {
  const [stage, setStage] = useState("idle"); // idle | scanning | done
  const [expanded, setExpanded] = useState(null);
  const [reviewed, setReviewed] = useState(false);

  const run = () => {
    setStage("scanning");
    setReviewed(false);
    setTimeout(() => setStage("done"), 1800);
  };

  const reminders = [
    {
      id: "r1",
      title: "Missing Documents Reminder → Thompson Family Trust",
      tool: "Gmail",
      draft:
        "Hi Sarah, we're still waiting on your Q3 brokerage statement to finish your review. Could you upload it to the client portal by Friday? Thanks — Bayou City Tax Team",
    },
    {
      id: "r2",
      title: "Q3 Estimated Tax Payment Reminder → 3 clients",
      tool: "Gmail",
      draft:
        "Reminder: your Q3 estimated tax payment is due in 9 days. Let us know if you'd like us to recalculate your estimate based on year-to-date income. — Bayou City Tax Team",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900">Today's AI Briefing</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Scans open engagements, handles the routine work, and escalates
            what needs a human.
          </p>
        </div>
        {stage !== "scanning" && (
          <button
            onClick={run}
            className="flex-shrink-0 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md whitespace-nowrap"
          >
            Run Daily Check
          </button>
        )}
      </div>

      <div className="p-5">
        {stage === "idle" && (
          <p className="text-sm text-slate-400">
            Click "Run Daily Check" to see what the AI would find and act on
            today.
          </p>
        )}

        {stage === "scanning" && (
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600 py-6 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
            Scanning 14 active engagements across Karbon and QuickBooks
            Online, plus 3 upcoming deadlines...
          </div>
        )}

        {stage === "done" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
                Sent automatically ({reminders.length})
              </p>
              <div className="space-y-2">
                {reminders.map((r) => (
                  <div
                    key={r.id}
                    className="border border-slate-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpanded(expanded === r.id ? null : r.id)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        {r.title}
                      </span>
                      <span className="flex items-center gap-2 flex-shrink-0">
                        <ToolBadge name={r.tool} />
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Sent
                        </span>
                        {expanded === r.id ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </span>
                    </button>
                    {expanded === r.id && (
                      <div className="px-4 pb-3 text-sm text-slate-600 border-t border-slate-100 pt-3">
                        {r.draft}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Status updates made
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-700 border border-slate-200 rounded-lg px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="flex-1">
                  3 returns moved from "In Prep" to "Ready for Review" after
                  final documents arrived.
                </span>
                <ToolBadge name="Karbon" />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
                Escalated to a human (1)
              </p>
              <div className="border border-amber-200 bg-amber-50 rounded-lg px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Martinez Auto Repair — rush return requested
                    </p>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Exceeds the standard 5-day SLA. Needs partner approval
                      before committing to the deadline.
                    </p>
                    <ToolBadge name="Slack" className="mt-2" />
                  </div>
                  {!reviewed ? (
                    <button
                      onClick={() => setReviewed(true)}
                      className="flex-shrink-0 text-xs font-bold px-3 py-1.5 bg-white border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
                    >
                      Mark Reviewed
                    </button>
                  ) : (
                    <span className="flex-shrink-0 flex items-center gap-1 text-xs font-bold text-emerald-700 whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Reviewed
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
