import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { CLIENTS } from "./mockData";
import SEO from "../../component/SEO";

const DocumentsQueue = () => {
  const outstanding = CLIENTS.flatMap((c) =>
    c.documents
      .filter((d) => d.status === "missing")
      .map((d) => ({ client: c, doc: d }))
  ).sort((a, b) => b.client.daysInStatus - a.client.daysInStatus);

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Document Intake"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/documents"
        noindex
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Intake queue</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Every outstanding document across every client, in one place —
            open a client to simulate it coming in.
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
    </div>
  );
};

export default DocumentsQueue;
