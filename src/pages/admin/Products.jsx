import { useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import StatusPill from "../../components/admin/StatusPill";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Button from "../../components/common/Button";
import { Field, Input, Select, Textarea } from "../../components/common/FormFields";
import { products as initialProducts } from "../../data/products";
import { categories } from "../../data/categories";
import { formatCurrency } from "../../utils/format";
import { useNotification } from "../../context/NotificationContext";
import { useLocalStorage } from "../../utils/useLocalStorage";

export default function Products() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Products", ""];
  const [products, setProducts] = useLocalStorage("kitvibe_admin_products", initialProducts);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const notification = useNotification();

  const filtered = products.filter((p) => [p.name, p.team, p.sku].join(" ").toLowerCase().includes(query.toLowerCase()));

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setModalOpen(true); };

  const handleSave = (data) => {
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p)));
      notification?.success("Product successfully updated.");
    } else {
      const newProduct = {
        ...data,
        id: `kv-custom-${Date.now()}`,
        images: [
          `https://placehold.co/900x1100/0A0A0B/17E06B?text=${encodeURIComponent(data.team || "NEW")}`,
          `https://placehold.co/900x1100/1D1D20/FAFAF8?text=${encodeURIComponent(data.team || "NEW")}`,
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"].map((s) => ({ size: s, stock: 10 })),
        rating: 0, reviewCount: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
      notification?.success("Product successfully added.");
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    notification?.success("Product deleted.");
  };

  return (
    <div>
      <AdminHeader
        title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)}
        actions={<Button size="sm" icon={<Plus size={15} />} onClick={openAdd}>Add Product</Button>}
      />
      <div className="p-5 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-pill border border-black/10 text-sm outline-none focus:ring-2 focus:ring-pitch/30"
            />
          </div>
          <p className="text-xs text-ink/40 ml-auto">{filtered.length} products</p>
        </div>

        <div className="bg-white border border-black/8 rounded-card overflow-hidden">
          <DataTable
            columns={[
              { key: "product", header: "Product", render: (p) => (
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate max-w-[220px]">{p.name}</p>
                    <p className="text-xs text-ink/40">{p.sku}</p>
                  </div>
                </div>
              )},
              { key: "category", header: "Category", render: (p) => <span className="capitalize text-sm">{p.category}</span> },
              { key: "price", header: "Price", render: (p) => (
                <div>
                  <p className="font-mono text-sm font-semibold">{formatCurrency(p.discountPrice || p.price)}</p>
                  {p.discountPrice && <p className="font-mono text-xs text-ink/35 line-through">{formatCurrency(p.price)}</p>}
                </div>
              )},
              { key: "stock", header: "Stock", render: (p) => (
                <StatusPill status={p.stock === 0 ? "Cancelled" : p.stock < 15 ? "pending" : "active"} />
              )},
              { key: "rating", header: "Rating", render: (p) => (
                <span className="flex items-center gap-1 text-sm"><Star size={12} className="fill-pitch text-pitch" /> {p.rating?.toFixed(1) ?? "—"}</span>
              )},
              { key: "flags", header: "Status", render: (p) => (
                <div className="flex flex-wrap gap-1">
                  {p.featured && <StatusPill status="active" />}
                  {p.bestSeller && <span className="text-xs text-ink/40">Best Seller</span>}
                </div>
              )},
              { key: "actions", header: "", render: (p) => (
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg hover:bg-black/5 flex items-center justify-center" aria-label="Edit product"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteTarget(p)} className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center" aria-label="Delete product"><Trash2 size={14} /></button>
                </div>
              ), className: "text-right" },
            ]}
            data={filtered}
          />
        </div>
      </div>

      <ProductFormModal open={modalOpen} onClose={() => setModalOpen(false)} product={editing} onSave={handleSave} />
      <ConfirmModal
        open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title="Delete this product?"
        message={`"${deleteTarget?.name}" will be permanently removed from your catalog.`}
      />
    </div>
  );
}

function ProductFormModal({ open, onClose, product, onSave }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ values: product || { name: "", team: "", player: "", season: "", category: "club", league: "", price: "", discountPrice: "", sku: "", stock: "", description: "" } });

  return (
    <Modal open={open} onClose={onClose} title={product ? "Edit Product" : "Add Product"} size="lg" footer={
      <>
        <Button variant="ghostLight" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSave)}>Save Product</Button>
      </>
    }>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Product Name" required error={errors.name?.message}>
          <Input dark {...register("name", { required: "Required" })} />
        </Field>
        <Field label="SKU" required error={errors.sku?.message}>
          <Input dark {...register("sku", { required: "Required" })} />
        </Field>
        <Field label="Team" required>
          <Input dark {...register("team", { required: "Required" })} />
        </Field>
        <Field label="Player">
          <Input dark {...register("player")} />
        </Field>
        <Field label="Season" required>
          <Input dark {...register("season", { required: "Required" })} />
        </Field>
        <Field label="League">
          <Input dark {...register("league")} />
        </Field>
        <Field label="Category" required>
          <Select dark {...register("category")}>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
        <Field label="SKU Stock" required>
          <Input dark type="number" {...register("stock", { required: "Required" })} />
        </Field>
        <Field label="Price" required error={errors.price?.message}>
          <Input dark type="number" step="0.01" {...register("price", { required: "Required" })} />
        </Field>
        <Field label="Discount Price">
          <Input dark type="number" step="0.01" {...register("discountPrice")} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <Textarea dark rows={3} {...register("description")} />
          </Field>
        </div>
      </form>
    </Modal>
  );
}
