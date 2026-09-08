import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  FileSignature,
  Loader2,
  CheckCircle2,
  PartyPopper,
} from "lucide-react";
import {
  ENTITY_BASE_FEES,
  ADDITIONAL_STATE_OPTIONS,
  SCHEDULE_OPTIONS,
  calculateQuote,
  addClient,
  FIRM_NAME,
} from "./mockData";
import SEO from "../../component/SEO";

const emptyForm = {
  name: "",
  entityType: "Individual",
  additionalStates: [],
  schedules: [],
  priorYearFee: "",
  contactEmail: "",
};

const toggle = (arr, value) =>
  arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

const NewEngagement = () => {
  const [form, setForm] = useState(emptyForm);
  const [stage, setStage] = useState("form"); // form | quoted | letter | sending | signed
  const [quote, setQuote] = useState(null);
  const [newClient, setNewClient] = useState(null);

  const calculateAndAdvance = () => {
    if (!form.name.trim()) return;
    const result = calculateQuote({
      entityType: form.entityType,
      additionalStates: form.additionalStates,
      schedules: form.schedules,
      priorYearFee: Number(form.priorYearFee) || 0,
    });
    setQuote(result);
    setStage("quoted");
  };

  const sendForSignature = () => {
    setStage("sending");
    setTimeout(() => {
      const client = addClient({
        name: form.name.trim(),
        entityType: form.entityType,
        additionalStates: form.additionalStates,
        schedules: form.schedules,
        fee: quote.total,
        contactEmail: form.contactEmail,
      });
      setNewClient(client);
      setStage("signed");
    }, 1800);
  };

  const startOver = () => {
    setForm(emptyForm);
    setStage("form");
    setQuote(null);
    setNewClient(null);
  };

  return (
    <div className="space-y-6">
      <SEO
        title="Meridian Tax & Advisory New Engagement"
        description="Sample practice management dashboard preview."
        path="/firm-os-preview/new-engagement"
        noindex
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-slate-400" />
            New Engagement Quote
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            A prospect's complexity → an auto-calculated fee → a signed
            engagement letter → a client record, ready for intake.
          </p>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Prospect / business name
              </label>
              <input
                type="text"
                value={form.name}
                disabled={stage !== "form"}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Jordan Ellis"
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Contact email
              </label>
              <input
                type="email"
                value={form.contactEmail}
                disabled={stage !== "form"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contactEmail: e.target.value }))
                }
                placeholder="jordan@email.com"
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Entity type
            </label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {Object.keys(ENTITY_BASE_FEES).map((et) => (
                <button
                  key={et}
                  type="button"
                  disabled={stage !== "form"}
                  onClick={() => setForm((f) => ({ ...f, entityType: et }))}
                  className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors disabled:cursor-not-allowed ${
                    form.entityType === et
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "border-slate-200 text-slate-600 hover:border-violet-300"
                  }`}
                >
                  {et}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Additional states beyond TX
            </label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {ADDITIONAL_STATE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={stage !== "form"}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      additionalStates: toggle(f.additionalStates, s),
                    }))
                  }
                  className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors disabled:cursor-not-allowed ${
                    form.additionalStates.includes(s)
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "border-slate-200 text-slate-600 hover:border-violet-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Complexity flags
            </label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {SCHEDULE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  disabled={stage !== "form"}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      schedules: toggle(f.schedules, s.id),
                    }))
                  }
                  className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors disabled:cursor-not-allowed ${
                    form.schedules.includes(s.id)
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "border-slate-200 text-slate-600 hover:border-violet-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-xs">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Prior-year fee (optional)
            </label>
            <input
              type="number"
              value={form.priorYearFee}
              disabled={stage !== "form"}
              onChange={(e) =>
                setForm((f) => ({ ...f, priorYearFee: e.target.value }))
              }
              placeholder="e.g. 500"
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {stage === "form" && (
            <button
              onClick={calculateAndAdvance}
              disabled={!form.name.trim()}
              className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-40"
            >
              Calculate Quote
            </button>
          )}
        </div>
      </div>

      {quote && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">
              Quote for {form.name}
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-2">
              {quote.lineItems.map((li) => (
                <div
                  key={li.label}
                  className="flex items-center justify-between text-sm border-b border-slate-100 pb-2"
                >
                  <span className="text-slate-600">{li.label}</span>
                  <span className="font-semibold text-slate-800">
                    ${li.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 mt-1">
              <span className="text-sm font-bold text-slate-900">
                Total annual fee
              </span>
              <span className="text-2xl font-extrabold text-violet-700">
                ${quote.total.toLocaleString()}
              </span>
            </div>

            {stage === "quoted" && (
              <button
                onClick={() => setStage("letter")}
                className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md"
              >
                <FileSignature className="w-4 h-4" />
                Generate Engagement Letter
              </button>
            )}
          </div>
        </div>
      )}

      {(stage === "letter" || stage === "sending" || stage === "signed") && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Engagement Letter</h2>
          </div>
          <div className="p-5">
            <div className="border border-slate-200 rounded-lg p-5 bg-slate-50 text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900">
                Engagement Letter — {FIRM_NAME}
              </p>
              <p>Dear {form.name},</p>
              <p>
                This letter confirms our engagement to prepare your{" "}
                {form.entityType.toLowerCase()} tax return
                {form.additionalStates.length > 0
                  ? ` across ${1 + form.additionalStates.length} states (TX${
                      form.additionalStates.length
                        ? ", " + form.additionalStates.join(", ")
                        : ""
                    })`
                  : " for Texas"}
                {form.schedules.length > 0
                  ? `, including ${form.schedules
                      .map((id) => id.toLowerCase())
                      .join(", ")}`
                  : ""}
                .
              </p>
              <p>
                Our fee for this engagement is{" "}
                <span className="font-semibold text-slate-900">
                  ${quote?.total.toLocaleString()}
                </span>
                , due upon completion. This engagement covers preparation and
                filing only; bookkeeping and advisory services are billed
                separately.
              </p>
              <p>
                Please sign below to authorize us to begin work and open your
                document checklist.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              {stage === "letter" && (
                <button
                  onClick={sendForSignature}
                  className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md"
                >
                  Send for E-Signature
                </button>
              )}
              {stage === "sending" && (
                <span className="flex items-center gap-2 text-sm font-medium text-violet-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Awaiting signature...
                </span>
              )}
              {stage === "signed" && (
                <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  Signed by {form.name}
                </span>
              )}
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                DocuSign
              </span>
            </div>
          </div>
        </div>
      )}

      {stage === "signed" && newClient && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
          <PartyPopper className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">
              {newClient.name} has been added to your client roster.
            </p>
            <p className="text-sm text-slate-600 mt-0.5">
              Status: Not Started. Their document checklist was created
              automatically from this engagement's scope.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <Link
                to={`/firm-os-preview/clients/${newClient.id}`}
                className="text-sm font-bold px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                View Client Profile
              </Link>
              <button
                onClick={startOver}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800"
              >
                Start another quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewEngagement;
