import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { classNames } from "../../utils/format";

export default function StatCard({ label, value, change, icon, tone = "default" }) {
  const positive = change >= 0;
  return (
    <div className="bg-white border border-black/8 rounded-card p-5 hover:shadow-premium transition-shadow">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</p>
        <div className={classNames("w-9 h-9 rounded-full flex items-center justify-center", tone === "warn" ? "bg-amber-400/15 text-amber-500" : "bg-pitch/15 text-pitch-dark")}>
          {icon}
        </div>
      </div>
      <p className="font-display text-3xl mt-3 tracking-wide">{value}</p>
      {change !== undefined && (
        <div className={classNames("flex items-center gap-1 mt-2 text-xs font-semibold", positive ? "text-pitch-dark" : "text-red-500")}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}% <span className="text-ink/40 font-normal">vs last period</span>
        </div>
      )}
    </div>
  );
}
