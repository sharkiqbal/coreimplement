import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import {
  CLIENTS,
  STATUS_STAGES,
  STATUS_TRIGGERS,
  getStageStyle,
  updateClientStatus,
} from "./mockData";
import SEO from "../../component/SEO";

const PipelineBoard = () => {
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
      <SEO
        title="Meridian Tax & Advisory Pipeline"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/pipeline"
        noindex
      />

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-bold text-slate-900">Workflow pipeline</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Drag a client card to a new status — the workflow engine fires the
          next step automatically instead of a human remembering to.
        </p>
      </div>

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
              <div className={`flex items-center justify-between mb-3 px-1`}>
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

export default PipelineBoard;
