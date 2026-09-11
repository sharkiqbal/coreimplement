import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Bot,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { COMMUNICATIONS, getClientById } from "./mockData";

const Tag = ({ icon: Icon, label }) => (
  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
    <Icon className="w-3 h-3" />
    {label}
  </span>
);

const formatTime = (ts) =>
  new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

// ---------------------------------------------------------------------------
// Document Nudges
// ---------------------------------------------------------------------------

export const NudgeSweepDemo = () => {
  const [stage, setStage] = useState("idle"); // idle | scanning | done
  const [expanded, setExpanded] = useState(null);

  const nudges = COMMUNICATIONS.filter((c) => c.type === "nudge");

  const run = () => {
    setStage("scanning");
    setTimeout(() => setStage("done"), 1600);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-sm text-slate-500">
          Personalized reminders for every client still missing documents —
          nudging stops automatically the moment they're resolved.
        </p>
        {stage !== "scanning" && (
          <button
            onClick={run}
            className="flex-shrink-0 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md whitespace-nowrap"
          >
            Run Nudge Sweep
          </button>
        )}
      </div>

      {stage === "idle" && (
        <p className="text-sm text-slate-400">
          Click "Run Nudge Sweep" to see who gets reminded today.
        </p>
      )}

      {stage === "scanning" && (
        <div className="flex items-center gap-2 text-sm font-medium text-violet-600 py-6 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
          Checking outstanding documents against the last nudge sent...
        </div>
      )}

      {stage === "done" && (
        <div className="space-y-2">
          {nudges.map((n) => {
            const client = getClientById(n.clientId);
            return (
              <div
                key={n.id}
                className="border border-slate-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(expanded === n.id ? null : n.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    {n.subject} → {client.name}
                  </span>
                  <span className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Sent
                    </span>
                    {expanded === n.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </span>
                </button>
                {expanded === n.id && (
                  <div className="px-4 pb-3 text-sm text-slate-600 border-t border-slate-100 pt-3">
                    {n.body}
                  </div>
                )}
              </div>
            );
          })}
          <p className="text-sm text-slate-500 pt-2">
            Nguyen Family Dental was nudged earlier this week but stopped
            automatically once their documents came in — no message sent
            today.
          </p>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Client Replies
// ---------------------------------------------------------------------------

export const RoutineReplyDemo = () => {
  const replies = COMMUNICATIONS.filter((c) => c.type === "reply");
  const [approved, setApproved] = useState([]);

  return (
    <div className="p-5 space-y-3">
      <p className="text-sm text-slate-500 mb-1">
        Routine client emails get an AI-drafted reply — simple ones send
        themselves, anything with a commitment attached waits for a human.
      </p>
      {replies.map((r) => {
        const client = getClientById(r.clientId);
        const isApproved = r.status === "auto-sent" || approved.includes(r.id);
        return (
          <div key={r.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <Link
                to={`/firm-os-preview/clients/${client.id}`}
                className="text-sm font-semibold text-slate-900 hover:text-violet-700"
              >
                {client.name}
              </Link>
              <span className="text-xs text-slate-400 whitespace-nowrap">
                {formatTime(r.timestamp)}
              </span>
            </div>
            <p className="text-sm text-slate-500 italic mb-2">
              "{r.inboundQuestion}"
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex gap-2.5">
              <Bot className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{r.body}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              {isApproved ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {r.status === "auto-sent" ? "Auto-sent" : "Approved & sent"}
                </span>
              ) : (
                <button
                  onClick={() => setApproved((a) => [...a, r.id])}
                  className="text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all"
                >
                  Approve & Send
                </button>
              )}
              <Tag icon={Mail} label="Gmail" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// After-Hours Calls
// ---------------------------------------------------------------------------

export const AfterHoursCallDemo = () => {
  const calls = COMMUNICATIONS.filter((c) => c.type === "call").sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="p-5 space-y-3">
      <p className="text-sm text-slate-500 mb-1">
        An AI phone agent picks up after hours during peak season and logs
        the summary straight back to the client record.
      </p>
      {calls.map((c) => {
        const client = getClientById(c.clientId);
        return (
          <div
            key={c.id}
            className="flex items-start gap-3 border border-slate-200 rounded-lg p-4"
          >
            <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-brand-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <Link
                  to={`/firm-os-preview/clients/${client.id}`}
                  className="text-sm font-semibold text-slate-900 hover:text-violet-700"
                >
                  {client.name}
                </Link>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {formatTime(c.timestamp)}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{c.summary}</p>
              <div className="mt-2">
                <Tag icon={Bot} label="AI phone agent" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
