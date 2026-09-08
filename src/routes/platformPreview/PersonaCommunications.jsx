import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Phone, Mail, Bot, User } from "lucide-react";
import { getPersonaCommunications } from "@dataconnect/generated";
import SEO from "../../component/SEO";

const PersonaCommunications = () => {
  const { industry, persona, industrySlug } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPersonaCommunications({ industry })
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch((err) => {
        console.error("Error loading communications:", err);
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

  return (
    <div className="space-y-6">
      <SEO
        title={`${persona.name} Communications`}
        description="Sample product dashboard preview."
        path={`/platform-preview/${industrySlug}/communications`}
        noindex
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">AI communication log</h2>
        </div>

        {data.communications.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500 text-center">
            No communications logged yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.communications.map((comm) => {
              const ChannelIcon = comm.channel === "voice" ? Phone : Mail;
              const HandlerIcon = comm.handledBy === "ai" ? Bot : User;
              return (
                <div
                  key={comm.id}
                  className="px-5 py-4 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <ChannelIcon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-900 capitalize">
                        {comm.direction} {comm.channel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                        <HandlerIcon className="w-3 h-3" />
                        {comm.handledBy === "ai" ? "Handled by AI" : "Handled by staff"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {comm.summary}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                    {new Date(comm.occurredAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaCommunications;
