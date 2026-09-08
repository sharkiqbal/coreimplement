import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FolderCheck,
  HardDrive,
  Mail,
  Phone,
  Bot,
} from "lucide-react";
import {
  getClientById,
  getStageStyle,
  STATUS_STAGES,
  getCommunicationsForClient,
  getInvoicesForClient,
  isBusinessEntity,
} from "./mockData";
import BookkeepingPanel from "./BookkeepingPanel";
import SEO from "../../component/SEO";

const BASE_TABS = ["Profile & Documents", "Communications", "Billing"];

const DocumentRow = ({ doc, clientName, onResolve }) => {
  const [stage, setStage] = useState(
    doc.status === "received" ? "received" : "idle"
  ); // idle | scanning | received

  const runDemo = () => {
    setStage("scanning");
    setTimeout(() => {
      setStage("received");
      onResolve(doc.id);
    }, 1800);
  };

  if (stage === "received") {
    return (
      <div className="border border-slate-200 rounded-lg px-4 py-3">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">{doc.label}</p>
            {doc.extractedFields && (
              <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                {doc.extractedFields.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center justify-between text-xs border-b border-slate-100 pb-1"
                  >
                    <span className="text-slate-500">{f.label}</span>
                    <span className="font-semibold text-slate-800">
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {doc.extractedFields && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                <HardDrive className="w-3 h-3" />
                Filed to /Clients/{clientName}/2025/{doc.label.split(" (")[0]}.pdf
              </div>
            )}
          </div>
          <span className="flex-shrink-0 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
            Received
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-amber-200 bg-amber-50 rounded-lg px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-slate-900">{doc.label}</p>
        </div>
        {stage === "scanning" ? (
          <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-blue-600 whitespace-nowrap">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Extracting...
          </span>
        ) : (
          <button
            onClick={runDemo}
            className="flex-shrink-0 text-xs font-bold px-3 py-1.5 bg-white border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
          >
            Simulate Upload
          </button>
        )}
      </div>
    </div>
  );
};

const ClientDetail = () => {
  const { clientId } = useParams();
  const client = getClientById(clientId);
  const [status, setStatus] = useState(client?.status);
  const [tab, setTab] = useState(BASE_TABS[0]);
  const [resolvedIds, setResolvedIds] = useState([]);

  if (!client) {
    return (
      <div className="text-center py-16">
        <p className="font-bold text-slate-900 mb-2">Client not found</p>
        <Link
          to="/firm-os-preview/clients"
          className="text-sm font-semibold text-violet-700 hover:text-violet-800"
        >
          ← Back to clients
        </Link>
      </div>
    );
  }

  const tabs = isBusinessEntity(client.entityType)
    ? [...BASE_TABS, "Bookkeeping"]
    : BASE_TABS;
  const style = getStageStyle(status);
  const missingCount = client.documents.filter(
    (d) => d.status === "missing" && !resolvedIds.includes(d.id)
  ).length;

  return (
    <div className="space-y-6">
      <SEO
        title={`${client.name} — Meridian Tax & Advisory`}
        description="Sample practice management dashboard preview."
        path={`/firm-os-preview/clients/${clientId}`}
        noindex
      />

      <Link
        to="/firm-os-preview/clients"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        All clients
      </Link>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{client.name}</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {client.entityType} · {client.states.join(", ")}
            {client.schedules.length > 0 && ` · ${client.schedules.join(", ")}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            Fee: <span className="font-semibold text-slate-800">${client.fee.toLocaleString()}</span>
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`text-sm font-semibold px-3 py-1.5 rounded-full border-0 ${style.bg} ${style.text}`}
          >
            {STATUS_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile & Documents" && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <FolderCheck className="w-4 h-4 text-slate-400" />
              Documents needed
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {missingCount === 0
                ? "Everything's in — nothing outstanding."
                : `${missingCount} document(s) still outstanding, built from last year's return and this year's intake questions.`}
            </p>
          </div>
          <div className="p-5 space-y-2">
            {client.documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                doc={doc}
                clientName={client.name}
                onResolve={(id) => setResolvedIds((r) => [...r, id])}
              />
            ))}
          </div>
        </div>
      )}

      {tab === "Communications" && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Communication history</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Every nudge, reply, and call for this client, in one place.
            </p>
          </div>
          {(() => {
            const history = getCommunicationsForClient(client.id);
            if (history.length === 0) {
              return (
                <p className="px-5 py-8 text-sm text-slate-500 text-center">
                  No communications logged yet for this client.
                </p>
              );
            }
            return (
              <div className="divide-y divide-slate-100">
                {history.map((c) => {
                  const Icon = c.type === "call" ? Phone : Mail;
                  return (
                    <div key={c.id} className="px-5 py-4 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-900">
                            {c.subject || "After-hours call"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                            <Bot className="w-3 h-3" />
                            AI handled
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-0.5">
                          {c.body || c.summary}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                        {new Date(c.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {tab === "Billing" && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Invoices</h2>
          </div>
          {(() => {
            const invoices = getInvoicesForClient(client.id);
            if (invoices.length === 0) {
              return (
                <p className="px-5 py-8 text-sm text-slate-500 text-center">
                  No invoices yet — one will be generated automatically once
                  this return is filed.
                </p>
              );
            }
            return (
              <div className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="px-5 py-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {inv.invoiceNumber} · {inv.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Due{" "}
                        {new Date(inv.dueDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-sm font-bold text-slate-800 tabular-nums">
                        ${inv.amount.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          inv.status === "paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : inv.status === "overdue"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {inv.status === "paid"
                          ? "Paid"
                          : inv.status === "overdue"
                          ? "Overdue"
                          : "Sent"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {tab === "Bookkeeping" && <BookkeepingPanel clientId={client.id} />}
    </div>
  );
};

export default ClientDetail;
