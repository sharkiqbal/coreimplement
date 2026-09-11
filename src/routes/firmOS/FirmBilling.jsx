import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Receipt,
  Zap,
} from "lucide-react";
import {
  CLIENTS,
  INVOICES,
  getClientById,
  hasInvoice,
  generateInvoice,
  markReminderSent,
} from "./mockData";
import SEO from "../../component/SEO";

const STATUS_STYLE = {
  paid: { text: "text-emerald-700", bg: "bg-emerald-50", label: "Paid" },
  sent: { text: "text-brand-700", bg: "bg-brand-50", label: "Sent" },
  overdue: { text: "text-amber-700", bg: "bg-amber-50", label: "Overdue" },
};

const StatCard = ({ icon: Icon, label, value, toneClass = "text-slate-500" }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5">
    <div className={`flex items-center gap-2 mb-2 ${toneClass}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-semibold uppercase tracking-wide">
        {label}
      </span>
    </div>
    <p className="text-3xl font-extrabold text-slate-900">{value}</p>
  </div>
);

const FirmBilling = () => {
  const [invoices, setInvoices] = useState(INVOICES);
  const [stage, setStage] = useState("idle"); // idle | scanning | done
  const [log, setLog] = useState([]);

  const totalInvoiced = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalCollected = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices
    .filter((i) => i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  const runSweep = () => {
    setStage("scanning");
    setTimeout(() => {
      const entries = [];

      CLIENTS.filter((c) => c.status === "Filed" && !hasInvoice(c.id)).forEach(
        (c) => {
          const invoice = generateInvoice(c);
          entries.push({ type: "generated", client: c, invoice });
        }
      );

      INVOICES.filter((i) => i.status === "paid").forEach((i) => {
        entries.push({
          type: "reconciled",
          client: getClientById(i.clientId),
          invoice: i,
        });
      });

      INVOICES.filter((i) => i.status === "overdue" && !i.reminderSent).forEach(
        (i) => {
          markReminderSent(i.id);
          entries.push({
            type: "reminder",
            client: getClientById(i.clientId),
            invoice: i,
          });
        }
      );

      setInvoices([...INVOICES]);
      setLog(entries);
      setStage("done");
    }, 1700);
  };

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Billing"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/billing"
        noindex
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          icon={DollarSign}
          label="Total invoiced"
          value={`$${totalInvoiced.toLocaleString()}`}
        />
        <StatCard
          icon={CheckCircle2}
          label="Collected"
          value={`$${totalCollected.toLocaleString()}`}
          toneClass="text-emerald-500"
        />
        <StatCard
          icon={AlertTriangle}
          label="Overdue"
          value={`$${totalOverdue.toLocaleString()}`}
          toneClass="text-amber-500"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-900">Billing sweep</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Filed returns get invoiced automatically, payments get
              reconciled, and overdue invoices get a nudge.
            </p>
          </div>
          {stage !== "scanning" && (
            <button
              onClick={runSweep}
              className="flex-shrink-0 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md whitespace-nowrap"
            >
              Run Billing Sweep
            </button>
          )}
        </div>

        <div className="p-5">
          {stage === "idle" && (
            <p className="text-sm text-slate-400">
              Click "Run Billing Sweep" to generate invoices, reconcile
              payments, and chase anything overdue.
            </p>
          )}

          {stage === "scanning" && (
            <div className="flex items-center gap-2 text-sm font-medium text-violet-600 py-6 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
              Checking filed returns, bank deposits, and due dates...
            </div>
          )}

          {stage === "done" &&
            (log.length === 0 ? (
              <p className="text-sm text-slate-500">
                Nothing to do — everything's already invoiced, reconciled, or
                already nudged.
              </p>
            ) : (
              <div className="space-y-2">
                {log.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 border rounded-lg px-4 py-3 ${
                      entry.type === "reminder"
                        ? "border-amber-200 bg-amber-50"
                        : "border-slate-200"
                    }`}
                  >
                    {entry.type === "reminder" ? (
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {entry.client?.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {entry.type === "generated" &&
                          `Invoice ${entry.invoice.invoiceNumber} generated and sent for $${entry.invoice.amount.toLocaleString()}.`}
                        {entry.type === "reconciled" &&
                          `Payment of $${entry.invoice.amount.toLocaleString()} matched to ${entry.invoice.invoiceNumber}.`}
                        {entry.type === "reminder" &&
                          `${entry.invoice.invoiceNumber} is overdue — payment reminder sent.`}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {entry.type === "reminder" ? "Gmail" : "QuickBooks Online"}
                    </span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-slate-400" />
            All invoices
          </h2>
        </div>
        {invoices.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500 text-center">
            No invoices yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-2.5">Client</th>
                  <th className="text-left font-semibold px-5 py-2.5">Invoice</th>
                  <th className="text-left font-semibold px-5 py-2.5">Description</th>
                  <th className="text-right font-semibold px-5 py-2.5">Amount</th>
                  <th className="text-left font-semibold px-5 py-2.5">Status</th>
                  <th className="text-left font-semibold px-5 py-2.5">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => {
                  const client = getClientById(inv.clientId);
                  const style = STATUS_STYLE[inv.status];
                  return (
                    <tr key={inv.id}>
                      <td className="px-5 py-3">
                        <Link
                          to={`/firm-os-preview/clients/${inv.clientId}`}
                          className="font-semibold text-slate-900 hover:text-violet-700"
                        >
                          {client?.name || inv.clientId}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-slate-500">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {inv.description}
                      </td>
                      <td className="px-5 py-3 text-right text-slate-800 font-medium tabular-nums">
                        ${inv.amount.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${style.bg} ${style.text}`}
                        >
                          {inv.reminderSent && inv.status === "overdue" && (
                            <Zap className="w-3 h-3" />
                          )}
                          {style.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500">
                        {new Date(inv.dueDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirmBilling;
