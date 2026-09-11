import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { listClients } from "@dataconnect/generated";
import { slugify } from "../../utils/slugify";
import SEO from "../../component/SEO";
import { LogoMark } from "../../component/Logo";

const PersonaPicker = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    let cancelled = false;
    listClients()
      .then((res) => {
        if (!cancelled) setClients(res.data.clients);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <SEO
        title="Platform Preview"
        description="Sample product dashboard preview."
        path="/platform-preview"
        noindex
      />

      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="relative flex-shrink-0 p-2">
            <LogoMark className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-900">Core Implement</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3">
          See a sample dashboard
        </h1>
        <p className="text-slate-500 text-center mb-10">
          Pick the industry closest to your business to see what your own
          dashboard could look like.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() =>
                  navigate(`/platform-preview/${slugify(client.industry)}`)
                }
                className="group flex items-center justify-between px-5 py-4 bg-white border border-slate-200 rounded-xl hover:border-brand-300 hover:shadow-md transition-all text-left"
              >
                <div>
                  <p className="font-bold text-slate-900">
                    {client.industry}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {client.name}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaPicker;
