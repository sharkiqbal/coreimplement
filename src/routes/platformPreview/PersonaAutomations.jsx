import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getPersonaAutomations } from "@dataconnect/generated";
import { getStatusStyle, formatStatusLabel } from "./statusColors";
import SEO from "../../component/SEO";

const PersonaAutomations = () => {
  const { industry, persona, industrySlug } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPersonaAutomations({ industry })
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch((err) => {
        console.error("Error loading automations:", err);
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

  const runsByAutomation = data.automationRuns.reduce((acc, run) => {
    (acc[run.automation.id] = acc[run.automation.id] || []).push(run);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <SEO
        title={`${persona.name} Automations`}
        description="Sample product dashboard preview."
        path={`/platform-preview/${industrySlug}/automations`}
        noindex
      />

      {data.automations.map((automation) => {
        const runs = (runsByAutomation[automation.id] || []).sort(
          (a, b) => new Date(b.runAt) - new Date(a.runAt)
        );
        const style = getStatusStyle(automation.status);

        return (
          <div
            key={automation.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h2 className="font-bold text-slate-900">
                    {automation.name}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                    {formatStatusLabel(automation.status)}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  {automation.description}
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400 whitespace-nowrap flex-shrink-0 mt-1">
                Trigger: {automation.triggerType}
              </span>
            </div>

            {runs.length === 0 ? (
              <p className="px-5 py-6 text-sm text-slate-500 text-center">
                No runs yet — this automation hasn't triggered since it was
                connected.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left font-semibold px-5 py-2.5">
                      Time
                    </th>
                    <th className="text-left font-semibold px-5 py-2.5">
                      Status
                    </th>
                    <th className="text-left font-semibold px-5 py-2.5">
                      Summary
                    </th>
                    <th className="text-right font-semibold px-5 py-2.5">
                      Records
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {runs.map((run) => {
                    const runStyle = getStatusStyle(run.status);
                    const RunIcon = runStyle.icon;
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
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 ${runStyle.text}`}
                          >
                            <RunIcon className="w-3.5 h-3.5" />
                            {formatStatusLabel(run.status)}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-700">
                          {run.summary}
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
        );
      })}
    </div>
  );
};

export default PersonaAutomations;
