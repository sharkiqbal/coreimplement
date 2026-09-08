import React from "react";
import { Clock } from "lucide-react";

const PlaceholderPage = ({ title, phase, description }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
    <Clock className="w-8 h-8 text-slate-300 mx-auto mb-3" />
    <p className="font-bold text-slate-900 mb-1">{title} — coming in {phase}</p>
    <p className="text-sm text-slate-500 max-w-md mx-auto">{description}</p>
  </div>
);

export default PlaceholderPage;
