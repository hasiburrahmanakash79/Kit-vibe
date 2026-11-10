import { classNames } from "../../utils/format";

const TONES = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-sky-100 text-sky-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-pitch/15 text-pitch-dark",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-600",
  Paid: "bg-emerald-100 text-emerald-700",
  Refunded: "bg-red-100 text-red-600",
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-black/8 text-ink/50",
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-600",
};

export default function StatusPill({ status }) {
  return (
    <span className={classNames("inline-flex px-2.5 py-1 rounded-pill text-xs font-semibold whitespace-nowrap", TONES[status] || "bg-black/8 text-ink/60")}>
      {status}
    </span>
  );
}
