import { CheckCircle2, Clock, XCircle } from "lucide-react";

// Status colors carry real meaning here (per the design spec), not decoration:
// emerald = connected/success, amber = pending/needs attention, rose = error/failed.
export const getStatusStyle = (status) => {
  switch (status) {
    case "connected":
    case "success":
    case "active":
    case "won":
      return {
        icon: CheckCircle2,
        text: "text-emerald-700",
        bg: "bg-emerald-50",
        dot: "bg-emerald-600",
      };
    case "pending":
    case "paused":
      return {
        icon: Clock,
        text: "text-amber-700",
        bg: "bg-amber-50",
        dot: "bg-amber-500",
      };
    case "failed":
    case "error":
    case "lost":
      return {
        icon: XCircle,
        text: "text-rose-700",
        bg: "bg-rose-50",
        dot: "bg-rose-600",
      };
    default:
      return {
        icon: Clock,
        text: "text-slate-500",
        bg: "bg-slate-100",
        dot: "bg-slate-400",
      };
  }
};

export const formatStatusLabel = (status) =>
  (status || "")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
