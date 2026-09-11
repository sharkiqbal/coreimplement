import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PlugZap } from "lucide-react";
import { getPersonaIntegrations } from "@dataconnect/generated";
import { getStatusStyle, formatStatusLabel } from "./statusColors";
import SEO from "../../component/SEO";

const PersonaIntegrations = () => {
  const { industry, persona, industrySlug } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPersonaIntegrations({ industry })
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch((err) => {
        console.error("Error loading integrations:", err);
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

  const connectedIds = new Set(
    data.clientIntegrations.map((ci) => ci.integration.id)
  );
  const available = data.integrations.filter((i) => !connectedIds.has(i.id));

  return (
    <div className="space-y-6">
      <SEO
        title={`${persona.name} Integrations`}
        description="Sample product dashboard preview."
        path={`/platform-preview/${industrySlug}/integrations`}
        noindex
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Connected</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left font-semibold px-5 py-2.5">Tool</th>
              <th className="text-left font-semibold px-5 py-2.5">
                Category
              </th>
              <th className="text-left font-semibold px-5 py-2.5">Status</th>
              <th className="text-left font-semibold px-5 py-2.5">
                Connected
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.clientIntegrations.map((ci) => {
              const style = getStatusStyle(ci.status);
              const StatusIcon = style.icon;
              return (
                <tr key={ci.integration.id}>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {ci.integration.name}
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {ci.integration.category}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 ${style.text}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {formatStatusLabel(ci.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {ci.connectedAt
                      ? new Date(ci.connectedAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {available.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Available to connect</h2>
          </div>
          <div className="p-5 flex flex-wrap gap-2">
            {available.map((integ) => (
              <div
                key={integ.id}
                className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <PlugZap className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">
                  {integ.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaIntegrations;
