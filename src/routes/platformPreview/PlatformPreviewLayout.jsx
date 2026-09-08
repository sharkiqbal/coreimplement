import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  BrainCircuit,
  LayoutDashboard,
  Sparkles,
  Workflow,
  PlugZap,
  MessageSquare,
  FileBarChart,
  ChevronDown,
} from "lucide-react";
import { listClients } from "@dataconnect/generated";
import { slugify } from "../../utils/slugify";

const NAV_ITEMS = [
  { to: "", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "workspace", label: "AI Workspace", icon: Sparkles },
  { to: "automations", label: "Automations", icon: Workflow },
  { to: "integrations", label: "Integrations", icon: PlugZap },
  { to: "communications", label: "Communications", icon: MessageSquare },
  { to: "reports", label: "Reports", icon: FileBarChart },
];

const PlatformPreviewLayout = () => {
  const { industrySlug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [persona, setPersona] = useState(null);
  const [allPersonas, setAllPersonas] = useState([]);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    listClients()
      .then((res) => {
        if (cancelled) return;
        const clients = res.data.clients;
        setAllPersonas(clients);
        const match = clients.find((c) => slugify(c.industry) === industrySlug);
        if (match) {
          setPersona(match);
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.error("Error loading persona:", err);
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [industrySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (notFound || !persona) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-sm">
          <p className="text-lg font-bold text-slate-900 mb-2">
            Persona not found
          </p>
          <p className="text-sm text-slate-500 mb-6">
            This demo persona doesn't exist.
          </p>
          <button
            onClick={() => navigate("/platform-preview")}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Choose a persona
          </button>
        </div>
      </div>
    );
  }

  const otherPersonas = allPersonas.filter((p) => p.id !== persona.id);

  return (
    <div className="min-h-screen flex bg-slate-50" style={{ fontVariantNumeric: "tabular-nums" }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 flex flex-col fixed h-full z-20">
        <div className="p-5 flex items-center gap-2.5 border-b border-slate-800">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-1.5">
              <BrainCircuit className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <span className="text-white font-bold text-sm truncate">
            Core Implementations
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={`/platform-preview/${industrySlug}/${item.to}`}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`
              }
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => navigate("/platform-preview")}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            ← All personas
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold text-slate-900 truncate">
            {persona.name}
          </h1>
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setSwitcherOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Switch
              <ChevronDown className="w-4 h-4" />
            </button>
            {switcherOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSwitcherOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden">
                  {otherPersonas.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSwitcherOpen(false);
                        navigate(`/platform-preview/${slugify(p.industry)}`);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8">
          <Outlet
            context={{ persona, industry: persona.industry, industrySlug }}
          />
        </main>
      </div>
    </div>
  );
};

export default PlatformPreviewLayout;
