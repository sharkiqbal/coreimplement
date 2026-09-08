import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, AlertTriangle, DollarSign, CheckCircle2 } from "lucide-react";
import { CLIENTS, getBottlenecks, getPipelineCounts, getStageStyle } from "./mockData";
import SEO from "../../component/SEO";

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

const FirmDashboard = () => {
  const bottlenecks = getBottlenecks();
  const pipeline = getPipelineCounts();
  const activeCount = CLIENTS.filter((c) => c.status !== "Invoiced").length;
  const revenueBooked = CLIENTS.reduce((sum, c) => sum + c.fee, 0);
  const revenueCollected = CLIENTS.filter((c) => c.status === "Invoiced").reduce(
    (sum, c) => sum + c.fee,
    0
  );

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Dashboard"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview"
        noindex
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Active engagements" value={activeCount} />
        <StatCard
          icon={AlertTriangle}
          label="Needs attention"
          value={bottlenecks.length}
          toneClass="text-amber-500"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue booked"
          value={`$${revenueBooked.toLocaleString()}`}
        />
        <StatCard
          icon={CheckCircle2}
          label="Revenue collected"
          value={`$${revenueCollected.toLocaleString()}`}
          toneClass="text-emerald-500"
        />
      </div>

      {bottlenecks.length > 0 && (
        <div className="bg-white border border-amber-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-amber-100 bg-amber-50">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Needs attention
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Clients stuck awaiting documents for a week or more.
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {bottlenecks.map((c) => (
              <Link
                key={c.id}
                to={`/firm-os-preview/clients/${c.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {c.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {c.entityType} · {c.documents.filter((d) => d.status === "missing").length}{" "}
                    document(s) missing
                  </p>
                </div>
                <span className="text-sm font-bold text-amber-700 whitespace-nowrap">
                  {c.daysInStatus} days
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <h2 className="font-bold text-slate-900">Pipeline by status</h2>
          <Link
            to="/firm-os-preview/clients?view=board"
            className="text-sm font-semibold text-violet-700 hover:text-violet-800 whitespace-nowrap"
          >
            View full board →
          </Link>
        </div>
        <div className="p-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(pipeline).map(([stage, count]) => {
            const style = getStageStyle(stage);
            return (
              <div
                key={stage}
                className={`rounded-lg p-3 text-center ${style.bg}`}
              >
                <p className={`text-2xl font-extrabold ${style.text}`}>
                  {count}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-1 leading-tight">
                  {stage}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FirmDashboard;
