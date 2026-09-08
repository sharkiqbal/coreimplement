import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BrainCircuit,
  LayoutDashboard,
  Users,
  FileStack,
  MessageSquare,
  Receipt,
  FileSignature,
} from "lucide-react";
import { FIRM_NAME } from "./mockData";

const NAV_ITEMS = [
  { to: "", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "new-engagement", label: "New Engagement", icon: FileSignature },
  { to: "clients", label: "Clients", icon: Users },
  { to: "documents", label: "Documents", icon: FileStack },
  { to: "communications", label: "Communications", icon: MessageSquare },
  { to: "billing", label: "Billing", icon: Receipt },
];

const FirmOSLayout = () => {
  return (
    <div
      className="min-h-screen flex bg-slate-50"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
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
              to={`/firm-os-preview/${item.to}`}
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

        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 leading-relaxed">
            Practice management OS demo for {FIRM_NAME}
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold text-slate-900 truncate">
            {FIRM_NAME}
          </h1>
          <span className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full">
            Tax Season Console
          </span>
        </header>

        <main className="flex-1 p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FirmOSLayout;
