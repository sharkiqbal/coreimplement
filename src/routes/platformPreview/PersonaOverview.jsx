import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Clock, TrendingUp, Zap } from "lucide-react";
import { getPersonaOverview } from "@dataconnect/generated";
import { getStatusStyle, formatStatusLabel } from "./statusColors";
import { ConnectedToolsStrip, AIBriefingWidget } from "./aiDemos";
import SEO from "../../component/SEO";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5">
    <div className="flex items-center gap-2 text-slate-500 mb-2">
      <Icon className="w-4 h-4" />
      <span className="text-xs font-semibold uppercase tracking-wide">
        {label}
      </span>
    </div>
    <p className="text-3xl font-extrabold text-slate-900">{value}</p>
  </div>
);

const PersonaOverview = () => {
  const { industry, persona, industrySlug } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPersonaOverview({ industry })
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch((err) => {
        console.error("Error loading persona overview:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [industry]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const snapshot = data.metricsSnapshots[0];
  const recentRuns = [...data.automationRuns].sort(
    (a, b) => new Date(b.runAt) - new Date(a.runAt)
  );

  return (
    <div className="space-y-6">
      <SEO
        title={`${persona.name} Dashboard`}
        description="Sample product dashboard preview."
        path={`/platform-preview/${industrySlug}`}
        noindex
      />

      {industry === "Accounting" && (
        <>
          <ConnectedToolsStrip />
          <AIBriefingWidget />
        </>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          icon={Clock}
          label="Hours saved"
          value={snapshot ? snapshot.hoursSaved : "—"}
        />
        <StatCard
          icon={Zap}
          label="Tasks automated"
          value={snapshot ? snapshot.tasksAutomated : "—"}
        />
        <StatCard
          icon={TrendingUp}
          label="Avg response"
          value={
            snapshot
              ? snapshot.avgResponseSeconds >= 60
                ? `${Math.round(snapshot.avgResponseSeconds / 60)} min`
                : `${snapshot.avgResponseSeconds} sec`
              : "—"
          }
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Recent activity</h2>
        </div>

        {recentRuns.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500 text-center">
            No runs yet — this account hasn't triggered an automation since it
            was connected.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-semibold px-5 py-2.5">Time</th>
                <th className="text-left font-semibold px-5 py-2.5">
                  Automation
                </th>
                <th className="text-left font-semibold px-5 py-2.5">
                  Status
                </th>
                <th className="text-right font-semibold px-5 py-2.5">
                  Records
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentRuns.map((run) => {
                const style = getStatusStyle(run.status);
                const StatusIcon = style.icon;
                return (
                  <tr key={run.id}>
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap">
                      {new Date(run.runAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3 text-slate-900 font-medium">
                      {run.automation.name}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 ${style.text}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {formatStatusLabel(run.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-slate-700">
                      {run.recordsProcessed ?? "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PersonaOverview;
