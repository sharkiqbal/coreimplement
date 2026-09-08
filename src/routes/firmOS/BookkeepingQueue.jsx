import React from "react";
import { Link } from "react-router-dom";
import { Landmark, AlertTriangle } from "lucide-react";
import {
  CLIENTS,
  isBusinessEntity,
  getBookkeepingSuggestions,
  getReconciliationExceptions,
} from "./mockData";
import SEO from "../../component/SEO";

const BookkeepingQueue = () => {
  const businessClients = CLIENTS.filter((c) => isBusinessEntity(c.entityType));

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Bookkeeping"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/bookkeeping"
        noindex
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-slate-400" />
            Bookkeeping — business clients
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            AI suggests categories and flags exceptions, but nothing posts
            without a human decision — open a client to review.
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
    </div>
  );
};

export default BookkeepingQueue;
