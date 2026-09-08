import React, { useState } from "react";
import {
  NudgeSweepDemo,
  RoutineReplyDemo,
  AfterHoursCallDemo,
} from "./communicationsDemos";
import SEO from "../../component/SEO";

const TABS = [
  { id: "nudges", label: "Document Nudges" },
  { id: "replies", label: "Client Replies" },
  { id: "calls", label: "After-Hours Calls" },
];

const FirmCommunications = () => {
  const [tab, setTab] = useState("nudges");

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Communications"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/communications"
        noindex
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 mb-3">
            AI Communication Layer
          </h2>
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  tab === t.id
                    ? "border-violet-600 text-violet-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className={tab === "nudges" ? "" : "hidden"}>
          <NudgeSweepDemo />
        </div>
        <div className={tab === "replies" ? "" : "hidden"}>
          <RoutineReplyDemo />
        </div>
        <div className={tab === "calls" ? "" : "hidden"}>
          <AfterHoursCallDemo />
        </div>
      </div>
    </div>
  );
};

export default FirmCommunications;
