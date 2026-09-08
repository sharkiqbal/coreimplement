import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import {
  CLIENTS,
  isBusinessEntity,
  getBookkeepingSuggestions,
  getReconciliationExceptions,
} from "./mockData";
import SEO from "../../component/SEO";

const IntakeQueue = () => {
  const outstanding = CLIENTS.flatMap((c) =>
    c.documents
      .filter((d) => d.status === "missing")
      .map((d) => ({ client: c, doc: d }))
  ).sort((a, b) => b.client.daysInStatus - a.client.daysInStatus);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <p className="text-sm text-slate-500">
          Every outstanding document across every client, in one place — open
          a client to simulate it coming in.
        </p>
      </div>

      {outstanding.length === 0 ? (
        <p className="px-5 py-8 text-sm text-slate-500 text-center">
          Nothing outstanding — every client is fully documented.
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {outstanding.map(({ client, doc }) => (
            <Link
              key={`${client.id}-${doc.id}`}
              to={`/firm-os-preview/clients/${client.id}`}
              className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {doc.label}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {client.name} · {client.entityType}
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0 text-xs font-bold text-amber-700 whitespace-nowrap">
                {client.daysInStatus} day{client.daysInStatus === 1 ? "" : "s"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const BookkeepingTab = () => {
  const businessClients = CLIENTS.filter((c) => isBusinessEntity(c.entityType));

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <p className="text-sm text-slate-500">
          AI suggests categories and flags exceptions for business clients,
          but nothing posts without a human decision — open a client to
          review.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {businessClients.map((c) => {
          const suggestions = getBookkeepingSuggestions(c.id);
          const exceptions = getReconciliationExceptions(c.id);
          return (
            <Link
              key={c.id}
              to={`/firm-os-preview/clients/${c.id}`}
              className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {c.name}
                </p>
                <p className="text-xs text-slate-500">{c.entityType}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {suggestions.length > 0 && (
                  <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2 py-1 rounded-full whitespace-nowrap">
                    {suggestions.length} to categorize
                  </span>
                )}
                {exceptions.length > 0 && (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                    <AlertTriangle className="w-3 h-3" />
                    {exceptions.length} exception
                    {exceptions.length === 1 ? "" : "s"}
                  </span>
                )}
                {suggestions.length === 0 && exceptions.length === 0 && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
                    All caught up
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const TABS = [
  { id: "intake", label: "Intake Queue" },
  { id: "bookkeeping", label: "Bookkeeping" },
];

const DocumentsPage = () => {
  const [tab, setTab] = useState("intake");

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Documents"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/documents"
        noindex
      />

      <div className="flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "intake" ? <IntakeQueue /> : <BookkeepingTab />}
    </div>
  );
};

export default DocumentsPage;
