import { useOutletContext, useLocation } from "react-router-dom";
import { useState } from "react";
import { AlertTriangle, PackageX, Boxes } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import DataTable from "../../components/admin/DataTable";
import StatusPill from "../../components/admin/StatusPill";
import { products as initialProducts } from "../../data/products";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";

export default function Inventory() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Inventory", ""];
  const [products, setProducts] = useLocalStorage("kitvibe_admin_products", initialProducts);
  const notification = useNotification();
  const [editingId, setEditingId] = useState(null);
  const [draftStock, setDraftStock] = useState("");

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 15).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const commitStock = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: Number(draftStock) || 0 } : p)));
    notification?.success("Stock updated.");
    setEditingId(null);
  };

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Stock" value={totalStock.toLocaleString()} icon={<Boxes size={17} />} />
          <StatCard label="Low Stock" value={lowStock} icon={<AlertTriangle size={17} />} tone="warn" />
          <StatCard label="Out of Stock" value={outOfStock} icon={<PackageX size={17} />} tone="warn" />
        </div>

        <div className="bg-white border border-black/8 rounded-card overflow-hidden">
          <DataTable
            columns={[
              { key: "product", header: "Product", render: (p) => (
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="w-9 h-11 object-cover rounded-lg" />
                  <div><p className="text-sm font-semibold max-w-[220px] truncate">{p.name}</p><p className="text-xs text-ink/40">{p.sku}</p></div>
                </div>
              )},
              { key: "stock", header: "Stock", render: (p) => (
                editingId === p.id ? (
                  <div className="flex items-center gap-2">
                    <input type="number" value={draftStock} onChange={(e) => setDraftStock(e.target.value)} className="w-20 border border-black/15 rounded-lg px-2 py-1 text-sm" autoFocus />
                    <button onClick={() => commitStock(p.id)} className="text-xs font-semibold text-pitch-dark">Save</button>
                  </div>
                ) : (
                  <button onClick={() => { setEditingId(p.id); setDraftStock(String(p.stock)); }} className="font-mono text-sm font-semibold hover:underline">{p.stock} units</button>
                )
              )},
              { key: "alert", header: "Alert", render: (p) => p.stock === 0 ? <span className="text-xs text-red-500 font-semibold">Out of stock</span> : p.stock < 15 ? <span className="text-xs text-amber-600 font-semibold">Only {p.stock} units left.</span> : <span className="text-xs text-ink/30">—</span> },
              { key: "status", header: "Status", render: (p) => <StatusPill status={p.stock === 0 ? "Cancelled" : p.stock < 15 ? "pending" : "active"} /> },
            ]}
            data={[...products].sort((a, b) => a.stock - b.stock)}
          />
        </div>
      </div>
    </div>
  );
}
