import { useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import StatusPill from "../../components/admin/StatusPill";
import Modal from "../../components/common/Modal";
import { Select } from "../../components/common/FormFields";
import { users as initialUsers } from "../../data/users";
import { orders } from "../../data/orders";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";
import { formatCurrency, formatDate } from "../../utils/format";

export default function Customers() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Customers", ""];
  const [users, setUsers] = useLocalStorage("kitvibe_admin_customers", initialUsers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detail, setDetail] = useState(null);
  const notification = useNotification();

  const filtered = users.filter((u) => {
    const matchesQuery = [u.name, u.email].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)));
    notification?.success("Customer account updated.");
  };

  const customerOrders = detail ? orders.filter((o) => o.email === detail.email) : [];

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers..." className="w-full pl-10 pr-4 py-2.5 rounded-pill border border-black/10 text-sm outline-none focus:ring-2 focus:ring-pitch/30" />
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="!w-auto !py-2.5">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
          <p className="text-xs text-ink/40 ml-auto">{filtered.length} customers</p>
        </div>

        <div className="bg-white border border-black/8 rounded-card overflow-hidden">
          <DataTable
            columns={[
              { key: "customer", header: "Customer", render: (u) => (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pitch/15 text-pitch-dark flex items-center justify-center text-xs font-bold">{u.avatar}</div>
                  <div><p className="text-sm font-semibold">{u.name}</p><p className="text-xs text-ink/40">{u.email}</p></div>
                </div>
              )},
              { key: "joined", header: "Joined", render: (u) => <span className="text-sm">{formatDate(u.joined)}</span> },
              { key: "orders", header: "Orders", render: (u) => <span className="text-sm">{u.orders}</span> },
              { key: "spent", header: "Total Spent", render: (u) => <span className="font-mono text-sm font-semibold">{formatCurrency(u.totalSpent)}</span> },
              { key: "status", header: "Status", render: (u) => <StatusPill status={u.status} /> },
              { key: "actions", header: "", className: "text-right", render: (u) => (
                <button onClick={() => setDetail(u)} className="w-8 h-8 rounded-lg hover:bg-black/5 flex items-center justify-center ml-auto" aria-label="View customer"><Eye size={15} /></button>
              )},
            ]}
            data={filtered}
          />
        </div>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.name} footer={detail && (
        <button onClick={() => toggleStatus(detail.id)} className="text-sm font-semibold text-pitch underline underline-offset-2">
          {detail.status === "active" ? "Deactivate Account" : "Activate Account"}
        </button>
      )}>
        {detail && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-white/40 uppercase mb-1">Email</p><p>{detail.email}</p></div>
              <div><p className="text-xs text-white/40 uppercase mb-1">Phone</p><p>{detail.phone}</p></div>
              <div><p className="text-xs text-white/40 uppercase mb-1">Joined</p><p>{formatDate(detail.joined)}</p></div>
              <div><p className="text-xs text-white/40 uppercase mb-1">Total Spent</p><p className="font-mono">{formatCurrency(detail.totalSpent)}</p></div>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase mb-2">Recent Orders</p>
              {customerOrders.length === 0 ? <p className="text-sm text-white/40">No orders on record.</p> : (
                <div className="space-y-2">
                  {customerOrders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between text-sm border border-line rounded-lg px-3 py-2">
                      <span className="font-mono">{o.id}</span>
                      <StatusPill status={o.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
