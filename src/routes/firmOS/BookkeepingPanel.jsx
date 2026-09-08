import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Landmark } from "lucide-react";
import { getBookkeepingSuggestions, getReconciliationExceptions } from "./mockData";

const CategorizationRow = ({ txn }) => {
  const [resolution, setResolution] = useState(null); // null | category string
  const [pickerOpen, setPickerOpen] = useState(false);

  if (resolution) {
    return (
      <div className="flex items-center justify-between gap-3 border border-slate-200 rounded-lg px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{txn.desc}</p>
          <p className="text-xs text-slate-500">
            {txn.date} · ${txn.amount.toFixed(2)}
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
          <CheckCircle2 className="w-3 h-3" />
          Posted as {resolution}
        </span>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg px-4 py-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm font-semibold text-slate-900">{txn.desc}</p>
          <p className="text-xs text-slate-500">
            {txn.date} · ${txn.amount.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">
            Suggested:{" "}
            <span className="font-semibold text-slate-800">
              {txn.suggested}
            </span>
          </span>
          <button
            onClick={() => setResolution(txn.suggested)}
            className="text-xs font-bold px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors whitespace-nowrap"
          >
            Approve
          </button>
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="text-xs font-semibold px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg hover:border-violet-300 transition-colors whitespace-nowrap"
          >
            Change
          </button>
        </div>
      </div>
      {pickerOpen && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
          {txn.alternatives.map((alt) => (
            <button
              key={alt}
              onClick={() => setResolution(alt)}
              className="text-xs font-medium px-2.5 py-1 border border-slate-200 rounded-full hover:border-violet-300 hover:text-violet-700 transition-colors"
            >
              {alt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ExceptionRow = ({ exc }) => {
  const [resolution, setResolution] = useState(null); // null | "resolved" | "flagged"

  if (resolution) {
    return (
      <div className="flex items-center justify-between gap-3 border border-slate-200 rounded-lg px-4 py-3">
        <p className="text-sm text-slate-600">{exc.description}</p>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
          {resolution === "resolved" ? "Resolved" : "Flagged for client"}
        </span>
      </div>
    );
  }

  return (
    <div className="border border-amber-200 bg-amber-50 rounded-lg px-4 py-3">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-slate-800">{exc.description}</p>
          <p className="text-xs text-slate-500 mt-0.5">{exc.possibleCause}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setResolution("resolved")}
            className="text-xs font-bold px-3 py-1.5 bg-white border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
          >
            Mark Resolved
          </button>
          <button
            onClick={() => setResolution("flagged")}
            className="text-xs font-semibold px-3 py-1.5 text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap"
          >
            Flag for Client
          </button>
        </div>
      </div>
    </div>
  );
};

const BookkeepingPanel = ({ clientId }) => {
  const suggestions = getBookkeepingSuggestions(clientId);
  const exceptions = getReconciliationExceptions(clientId);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-slate-400" />
            Categorization suggestions
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            AI suggests a category for every new transaction — nothing posts
            until it's approved.
          </p>
        </div>
        <div className="p-5 space-y-2">
          {suggestions.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">
              No new transactions to categorize.
            </p>
          ) : (
            suggestions.map((txn) => <CategorizationRow key={txn.id} txn={txn} />)
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Reconciliation exceptions</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Only the transactions that actually need a human decision — not
            the ones that matched cleanly.
          </p>
        </div>
        <div className="p-5 space-y-2">
          {exceptions.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">
              Nothing to reconcile — everything matched cleanly this period.
            </p>
          ) : (
            exceptions.map((exc) => <ExceptionRow key={exc.id} exc={exc} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default BookkeepingPanel;
