import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, List, Kanban, Plus, Zap } from "lucide-react";
import {
  CLIENTS,
  STATUS_STAGES,
  STATUS_TRIGGERS,
  getStageStyle,
  updateClientStatus,
} from "./mockData";
import SEO from "../../component/SEO";

const ViewToggle = ({ view, onChange }) => (
  <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
    <button
      onClick={() => onChange("list")}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
        view === "list"
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      <List className="w-3.5 h-3.5" />
      List
    </button>
    <button
      onClick={() => onChange("board")}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
        view === "board"
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      <Kanban className="w-3.5 h-3.5" />
      Board
    </button>
  </div>
);

const ClientsListView = () => {
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
    <div className="space-y-4">
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

const ClientsBoardView = () => {
  const [clients, setClients] = useState(CLIENTS);
  const [dragId, setDragId] = useState(null);
  const [log, setLog] = useState([]);

  const handleDrop = (status) => {
    if (!dragId) return;
    const client = clients.find((c) => c.id === dragId);
    if (!client || client.status === status) {
      setDragId(null);
      return;
    }
    updateClientStatus(dragId, status);
    setClients([...CLIENTS]);
    setLog((l) => [
      {
        id: `${dragId}-${Date.now()}`,
        clientName: client.name,
        status,
        trigger: STATUS_TRIGGERS[status],
      },
      ...l,
    ]);
    setDragId(null);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Drag a client card to a new status — the workflow engine fires the
        next step automatically instead of a human remembering to.
      </p>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {STATUS_STAGES.map((stage) => {
          const style = getStageStyle(stage);
          const stageClients = clients.filter((c) => c.status === stage);
          return (
            <div
              key={stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(stage)}
              className="flex-shrink-0 w-64 bg-slate-100/60 rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className={`text-xs font-bold uppercase tracking-wide ${style.text}`}>
                  {stage}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {stageClients.length}
                </span>
              </div>
              <div className="space-y-2 min-h-[60px]">
                {stageClients.map((c) => (
                  <div
                    key={c.id}
                    draggable
                    onDragStart={() => setDragId(c.id)}
                    className="bg-white border border-slate-200 rounded-lg p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Link
                      to={`/firm-os-preview/clients/${c.id}`}
                      className="text-sm font-semibold text-slate-900 hover:text-violet-700"
                    >
                      {c.name}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {c.entityType} · ${c.fee.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {log.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-500" />
              Automatic triggers fired this session
            </h2>
          </div>
          <div className="divide-y divide-slate-100">
            {log.map((entry) => (
              <div key={entry.id} className="px-5 py-3 text-sm">
                <span className="font-semibold text-slate-900">
                  {entry.clientName}
                </span>{" "}
                <span className="text-slate-500">→ moved to</span>{" "}
                <span className="font-semibold text-slate-900">
                  {entry.status}
                </span>
                {entry.trigger && (
                  <p className="text-slate-500 mt-0.5">↳ {entry.trigger}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ClientsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") === "board" ? "board" : "list";

  const setView = (v) => {
    if (v === "list") {
      searchParams.delete("view");
    } else {
      searchParams.set("view", v);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory Clients"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/clients"
        noindex
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <ViewToggle view={view} onChange={setView} />
        <Link
          to="/firm-os-preview/new-engagement"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          New Client
        </Link>
      </div>

      {view === "list" ? <ClientsListView /> : <ClientsBoardView />}
    </div>
  );
};

export default ClientsPage;
