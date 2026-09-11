import React from "react";
import { Sparkles, X, Clock } from "lucide-react";
import { KnowledgeAssistantChat } from "./aiDemos";

const AIAssistantPanel = ({ open, onClose, industry, personaName }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-slate-900/20"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-lg p-1.5 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                Ask the Firm
              </p>
              <p className="text-xs text-slate-400 truncate">
                {personaName}'s knowledge base
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close assistant"
            className="flex-shrink-0 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 min-h-0">
          {industry === "Accounting" ? (
            <KnowledgeAssistantChat />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <Clock className="w-7 h-7 text-slate-300 mb-3" />
              <p className="font-bold text-slate-900 mb-1 text-sm">
                Being trained for {industry}
              </p>
              <p className="text-xs text-slate-500">
                This assistant is being tailored to {personaName}'s SOPs and
                documents. Check back soon.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AIAssistantPanel;
