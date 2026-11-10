import { useOutletContext, useLocation } from "react-router-dom";
import { Check, X, Star, Trash2 } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import StatusPill from "../../components/admin/StatusPill";
import { reviews as initialReviews } from "../../data/reviews";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";
import { formatDate } from "../../utils/format";

export default function Reviews() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Reviews", ""];
  const [reviews, setReviews] = useLocalStorage("kitvibe_admin_reviews", initialReviews);
  const notification = useNotification();

  const setStatus = (id, status) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    notification?.success(status === "approved" ? "Review approved." : "Review rejected.");
  };
  const remove = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    notification?.success("Review deleted.");
  };

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8">
        <div className="bg-white border border-black/8 rounded-card overflow-hidden">
          <DataTable
            columns={[
              { key: "customer", header: "Customer", render: (r) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pitch/15 text-pitch-dark flex items-center justify-center text-xs font-bold">{r.avatar}</div>
                  <span className="text-sm font-medium">{r.customer}</span>
                </div>
              )},
              { key: "product", header: "Product", render: (r) => <span className="text-sm max-w-[180px] block truncate">{r.jersey}</span> },
              { key: "rating", header: "Rating", render: (r) => (
                <span className="flex items-center gap-1 text-sm"><Star size={12} className="fill-pitch text-pitch" /> {r.rating}</span>
              )},
              { key: "review", header: "Review", render: (r) => <p className="text-sm text-ink/60 max-w-xs line-clamp-2">{r.text}</p> },
              { key: "date", header: "Date", render: (r) => <span className="text-sm">{formatDate(r.date)}</span> },
              { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} /> },
              { key: "actions", header: "", className: "text-right", render: (r) => (
                <div className="flex items-center gap-1 justify-end">
                  {r.status !== "approved" && (
                    <button onClick={() => setStatus(r.id, "approved")} aria-label="Approve" className="w-8 h-8 rounded-lg hover:bg-emerald-50 text-emerald-600 flex items-center justify-center"><Check size={14} /></button>
                  )}
                  {r.status !== "rejected" && (
                    <button onClick={() => setStatus(r.id, "rejected")} aria-label="Reject" className="w-8 h-8 rounded-lg hover:bg-amber-50 text-amber-600 flex items-center justify-center"><X size={14} /></button>
                  )}
                  <button onClick={() => remove(r.id)} aria-label="Delete" className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><Trash2 size={14} /></button>
                </div>
              )},
            ]}
            data={reviews}
          />
        </div>
      </div>
    </div>
  );
}
