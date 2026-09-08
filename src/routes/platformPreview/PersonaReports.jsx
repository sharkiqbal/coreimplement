import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getPersonaReports } from "@dataconnect/generated";
import SEO from "../../component/SEO";

const PersonaReports = () => {
  const { industry, persona, industrySlug } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPersonaReports({ industry })
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch((err) => {
        console.error("Error loading reports:", err);
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

  const snapshots = [...data.metricsSnapshots].sort(
    (a, b) => new Date(a.snapshotDate) - new Date(b.snapshotDate)
  );
  const maxHours = Math.max(...snapshots.map((s) => s.hoursSaved), 1);

  return (
    <div className="space-y-6">
      <SEO
        title={`${persona.name} Reports`}
        description="Sample product dashboard preview."
        path={`/platform-preview/${industrySlug}/reports`}
        noindex
      />

      {snapshots.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
          No reports generated yet.
        </div>
      ) : (
        <>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="font-bold text-slate-900 mb-4">
              Hours saved over time
            </h2>
            <div className="flex items-end gap-3 h-32">
              {snapshots.map((s) => (
                <div key={s.id} className="flex-1 h-full flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md"
                    style={{ height: `${(s.hoursSaved / maxHours) * 100}%` }}
                    title={`${s.hoursSaved} hours`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              {snapshots.map((s) => (
                <span
                  key={s.id}
                  className="flex-1 text-xs text-slate-400 text-center whitespace-nowrap"
                >
                  {new Date(s.snapshotDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Snapshot history</h2>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-2.5">
                    Date
                  </th>
                  <th className="text-right font-semibold px-5 py-2.5">
                    Hours saved
                  </th>
                  <th className="text-right font-semibold px-5 py-2.5">
                    Tasks automated
                  </th>
                  <th className="text-right font-semibold px-5 py-2.5">
                    Avg response
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...snapshots].reverse().map((s) => (
                  <tr key={s.id}>
                    <td className="px-5 py-3 text-slate-500">
                      {new Date(s.snapshotDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right text-slate-900 font-medium">
                      {s.hoursSaved}
                    </td>
                    <td className="px-5 py-3 text-right text-slate-700">
                      {s.tasksAutomated}
                    </td>
                    <td className="px-5 py-3 text-right text-slate-700">
                      {s.avgResponseSeconds >= 60
                        ? `${Math.round(s.avgResponseSeconds / 60)} min`
                        : `${s.avgResponseSeconds} sec`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonaReports;
