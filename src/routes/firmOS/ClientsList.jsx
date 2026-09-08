import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { CLIENTS, STATUS_STAGES, getStageStyle } from "./mockData";
import SEO from "../../component/SEO";

const ClientsList = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return CLIENTS.filter((c) => {
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Clients"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/clients"
        noindex
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        >
          <option value="all">All statuses</option>
          {STATUS_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-semibold px-5 py-2.5">Client</th>
                <th className="text-left font-semibold px-5 py-2.5">Entity</th>
                <th className="text-left font-semibold px-5 py-2.5">Status</th>
                <th className="text-left font-semibold px-5 py-2.5">Complexity</th>
                <th className="text-right font-semibold px-5 py-2.5">Fee</th>
                <th className="text-right font-semibold px-5 py-2.5">
                  Days in status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => {
                const style = getStageStyle(c.status);
                const stuck = c.status === "Awaiting Docs" && c.daysInStatus >= 7;
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <Link
                        to={`/firm-os-preview/clients/${c.id}`}
                        className="font-semibold text-slate-900 hover:text-violet-700"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {c.entityType}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex text-xs font-semibold px-2 py-1 rounded-full ${style.bg} ${style.text}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {c.states.length > 1 && (
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {c.states.length} states
                          </span>
                        )}
                        {c.schedules.map((s) => (
                          <span
                            key={s}
                            className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right text-slate-700 tabular-nums">
                      ${c.fee.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums">
                      <span
                        className={
                          stuck ? "font-bold text-amber-700" : "text-slate-500"
                        }
                      >
                        {c.daysInStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                    No clients match that search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsList;
