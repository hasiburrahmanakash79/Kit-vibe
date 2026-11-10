import { useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import StatusPill from "../../components/admin/StatusPill";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Button from "../../components/common/Button";
import { Field, Input, Select } from "../../components/common/FormFields";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";
import { formatDate } from "../../utils/format";

const SEED_COUPONS = [
  { id: "c1", code: "MATCHDAY10", type: "percent", amount: 10, minOrder: 50, maxDiscount: 20, expires: "2026-09-30", usageLimit: 500, used: 128, active: true },
  { id: "c2", code: "WELCOME15", type: "percent", amount: 15, minOrder: 0, maxDiscount: 30, expires: "2026-12-31", usageLimit: 1000, used: 340, active: true },
  { id: "c3", code: "FREESHIP", type: "fixed", amount: 6.99, minOrder: 40, maxDiscount: 6.99, expires: "2026-08-31", usageLimit: 200, used: 200, active: false },
];

export default function Coupons() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Coupons", ""];
  const [coupons, setCoupons] = useLocalStorage("kitvibe_admin_coupons", SEED_COUPONS);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const notification = useNotification();
  const { register, handleSubmit, reset } = useForm();

  const addCoupon = (data) => {
    setCoupons((prev) => [{ ...data, id: `c-${Date.now()}`, used: 0, active: true, amount: Number(data.amount), minOrder: Number(data.minOrder), maxDiscount: Number(data.maxDiscount), usageLimit: Number(data.usageLimit) }, ...prev]);
    notification?.success("Coupon created.");
    reset();
    setModalOpen(false);
  };

  const toggleActive = (id) => setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} actions={<Button size="sm" icon={<Plus size={15} />} onClick={() => setModalOpen(true)}>Create Coupon</Button>} />
      <div className="p-5 md:p-8">
        <div className="bg-white border border-black/8 rounded-card overflow-hidden">
          <DataTable
            columns={[
              { key: "code", header: "Code", render: (c) => <span className="font-mono font-bold text-sm">{c.code}</span> },
              { key: "discount", header: "Discount", render: (c) => <span className="text-sm">{c.type === "percent" ? `${c.amount}%` : `$${c.amount}`}</span> },
              { key: "min", header: "Min Order", render: (c) => <span className="text-sm font-mono">${c.minOrder}</span> },
              { key: "usage", header: "Usage", render: (c) => <span className="text-sm">{c.used} / {c.usageLimit}</span> },
              { key: "expires", header: "Expires", render: (c) => <span className="text-sm">{formatDate(c.expires)}</span> },
              { key: "status", header: "Status", render: (c) => <StatusPill status={c.active ? "active" : "inactive"} /> },
              { key: "actions", header: "", className: "text-right", render: (c) => (
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => toggleActive(c.id)} className="text-xs font-semibold text-pitch-dark px-2">{c.active ? "Deactivate" : "Activate"}</button>
                  <button onClick={() => setDeleteTarget(c)} aria-label="Delete coupon" className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><Trash2 size={14} /></button>
                </div>
              )},
            ]}
            data={coupons}
          />
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Coupon" footer={<><Button variant="ghostLight" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSubmit(addCoupon)}>Create</Button></>}>
        <form className="grid grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-span-2">
            <Field label="Coupon Code" required><Input dark {...register("code", { required: true })} /></Field>
          </div>
          <Field label="Discount Type"><Select dark {...register("type")}><option value="percent">Percentage</option><option value="fixed">Fixed Amount</option></Select></Field>
          <Field label="Amount" required><Input dark type="number" step="0.01" {...register("amount", { required: true })} /></Field>
          <Field label="Minimum Order"><Input dark type="number" step="0.01" defaultValue={0} {...register("minOrder")} /></Field>
          <Field label="Max Discount"><Input dark type="number" step="0.01" {...register("maxDiscount")} /></Field>
          <Field label="Expiration Date"><Input dark type="date" {...register("expires")} /></Field>
          <Field label="Usage Limit"><Input dark type="number" defaultValue={100} {...register("usageLimit")} /></Field>
        </form>
      </Modal>
      <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { setCoupons((prev) => prev.filter((c) => c.id !== deleteTarget.id)); notification?.success("Coupon deleted."); }} title="Delete this coupon?" message={`"${deleteTarget?.code}" will no longer be redeemable.`} />
    </div>
  );
}
