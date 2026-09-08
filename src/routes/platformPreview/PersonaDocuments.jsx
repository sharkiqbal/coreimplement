import React from "react";
import { useOutletContext } from "react-router-dom";
import { Clock } from "lucide-react";
import { DocumentProcessingDemo } from "./aiDemos";
import SEO from "../../component/SEO";

const PersonaDocuments = () => {
  const { industry, persona, industrySlug } = useOutletContext();

  return (
    <div className="space-y-6">
      <SEO
        title={`${persona.name} Documents`}
        description="Sample product dashboard preview."
        path={`/platform-preview/${industrySlug}/documents`}
        noindex
      />

      {industry === "Accounting" ? (
        <DocumentProcessingDemo />
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-slate-900 mb-1">
            Document processing is being tailored for {industry}
          </p>
          <p className="text-sm text-slate-500">
            Check back soon, or ask us for a live walkthrough built around
            your business specifically.
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonaDocuments;
