import { useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import StatusPill from "../../components/admin/StatusPill";
import Modal from "../../components/common/Modal";
import { Select } from "../../components/common/FormFields";
import { orders as initialOrders, orderTotal, STATUS_FLOW } from "../../data/orders";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";
import { formatCurrency, formatDate } from "../../utils/format";

const ALL_STATUSES = [...STATUS_FLOW, "Cancelled"];

export default function OrdersAdmin() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Orders", ""];
  const [orders, setOrders] = useLocalStorage("kitvibe_admin_orders", initialOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detail, setDetail] = useState(null);
  const notification = useNotification();

  const filtered = orders.filter((o) => {
    const matchesQuery = [o.id, o.customer, o.email].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const updateStatus = (orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    notification?.success("Order status updated.");
    setDetail((d) => (d && d.id === orderId ? { ...d, status } : d));
  };

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search orders..." className="w-full pl-10 pr-4 py-2.5 rounded-pill border border-black/10 text-sm outline-none focus:ring-2 focus:ring-pitch/30" />
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="!w-auto !py-2.5">
            <option value="all">All Statuses</option>
            {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
          <p className="text-xs text-ink/40 ml-auto">{filtered.length} orders</p>
        </div>

        <div className="bg-white border border-black/8 rounded-card overflow-hidden">
          <DataTable
            columns={[
              { key: "id", header: "Order ID", render: (o) => <span className="font-mono text-sm font-semibold">{o.id}</span> },
              { key: "customer", header: "Customer", render: (o) => <div><p className="text-sm font-medium">{o.customer}</p><p className="text-xs text-ink/40">{o.email}</p></div> },
              { key: "date", header: "Date", render: (o) => <span className="text-sm">{formatDate(o.date)}</span> },
              { key: "products", header: "Products", render: (o) => <span className="text-sm">{o.items.length} item{o.items.length > 1 ? "s" : ""}</span> },
              { key: "amount", header: "Amount", render: (o) => <span className="font-mono text-sm font-semibold">{formatCurrency(o.total ?? orderTotal(o))}</span> },
              { key: "payment", header: "Payment", render: (o) => <StatusPill status={o.paymentStatus} /> },
              { key: "status", header: "Status", render: (o) => <StatusPill status={o.status} /> },
              { key: "actions", header: "", className: "text-right", render: (o) => (
                <button onClick={() => setDetail(o)} className="w-8 h-8 rounded-lg hover:bg-black/5 flex items-center justify-center ml-auto" aria-label="View order"><Eye size={15} /></button>
              )},
            ]}
            data={filtered}
          />
        </div>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail ? `Order ${detail.id}` : ""} size="lg">
        {detail && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-white/40 uppercase mb-1">Customer</p><p>{detail.customer}</p><p className="text-white/50">{detail.email}</p></div>
              <div><p className="text-xs text-white/40 uppercase mb-1">Address</p><p>{detail.address.line1}, {detail.address.city}, {detail.address.state} {detail.address.zip}</p></div>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {ALL_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(detail.id, s)}
                    className={`px-3 py-1.5 rounded-pill text-xs font-semibold border transition-colors ${detail.status === s ? "bg-pitch text-ink border-pitch" : "border-white/15 text-white/60 hover:border-white/40"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase mb-2">Items</p>
              <div className="divide-y divide-line">
                {detail.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <img src={item.image} alt="" className="w-10 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-xs text-white/40">Size {item.size} · Qty {item.qty}</p>
                    </div>
                    <span className="text-sm font-mono">{formatCurrency(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
