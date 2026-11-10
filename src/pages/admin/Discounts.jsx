import { useOutletContext, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminHeader from "../../components/layout/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import { Field, Input } from "../../components/common/FormFields";
import Button from "../../components/common/Button";
import { products as initialProducts } from "../../data/products";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";
import { formatCurrency } from "../../utils/format";

export default function Discounts() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Discounts", ""];
  const [products, setProducts] = useLocalStorage("kitvibe_admin_products", initialProducts);
  const notification = useNotification();

  const updateDiscount = (id, value) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, discountPrice: value ? Number(value) : null } : p)));
  };

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8">
        <p className="text-sm text-ink/50 mb-5 max-w-lg">Set a discount price directly on any product. Clear the field to remove the discount.</p>
        <div className="bg-white border border-black/8 rounded-card overflow-hidden">
          <DataTable
            columns={[
              { key: "product", header: "Product", render: (p) => (
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="w-9 h-11 object-cover rounded-lg" />
                  <span className="text-sm font-semibold max-w-[220px] truncate">{p.name}</span>
                </div>
              )},
              { key: "price", header: "Original Price", render: (p) => <span className="font-mono text-sm">{formatCurrency(p.price)}</span> },
              { key: "discount", header: "Discount Price", render: (p) => (
                <DiscountInput value={p.discountPrice} onCommit={(v) => updateDiscount(p.id, v)} onSaved={() => notification?.success("Discount updated.")} />
              )},
              { key: "off", header: "% Off", render: (p) => p.discountPrice ? <span className="text-xs font-semibold text-pitch-dark">-{Math.round(100 - (p.discountPrice / p.price) * 100)}%</span> : <span className="text-xs text-ink/30">—</span> },
            ]}
            data={products}
          />
        </div>
      </div>
    </div>
  );
}

function DiscountInput({ value, onCommit, onSaved }) {
  const { register, handleSubmit } = useForm({ values: { discount: value || "" } });
  const save = (data) => { onCommit(data.discount); onSaved(); };
  return (
    <form onSubmit={handleSubmit(save)} className="flex items-center gap-2">
      <input type="number" step="0.01" placeholder="—" className="w-24 border border-black/15 rounded-lg px-2 py-1.5 text-sm font-mono" {...register("discount")} />
      <button type="submit" className="text-xs font-semibold text-pitch-dark">Save</button>
    </form>
  );
}
