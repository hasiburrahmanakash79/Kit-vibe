import { useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import StatusPill from "../../components/admin/StatusPill";
import { Field, Input, Textarea, Checkbox } from "../../components/common/FormFields";
import { categories as initialCategories } from "../../data/categories";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";

export default function Categories() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Categories", ""];
  const [cats, setCats] = useLocalStorage("kitvibe_admin_categories", initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const notification = useNotification();

  const save = (data) => {
    if (editing) {
      setCats((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c)));
      notification?.success("Category updated.");
    } else {
      setCats((prev) => [...prev, { ...data, id: `cat-${Date.now()}`, image: `https://placehold.co/800x900/0A0A0B/17E06B?text=${encodeURIComponent(data.name)}` }]);
      notification?.success("Category successfully added.");
    }
    setModalOpen(false);
  };

  const toggleActive = (id) => setCats((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} actions={<Button size="sm" icon={<Plus size={15} />} onClick={() => { setEditing(null); setModalOpen(true); }}>Add Category</Button>} />
      <div className="p-5 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cats.map((c) => (
          <div key={c.id} className="bg-white border border-black/8 rounded-card overflow-hidden">
            <img src={c.image} alt={c.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <StatusPill status={c.active ? "active" : "inactive"} />
              </div>
              <p className="text-xs text-ink/50 mt-1.5 line-clamp-2">{c.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" variant="outline" icon={<Pencil size={13} />} onClick={() => { setEditing(c); setModalOpen(true); }}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => toggleActive(c.id)}>{c.active ? "Deactivate" : "Activate"}</Button>
                <button onClick={() => setDeleteTarget(c)} className="ml-auto w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center" aria-label="Delete category"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Category" : "Add Category"} footer={<CategoryFormFooter onClose={() => setModalOpen(false)} />}>
        <CategoryForm editing={editing} onSave={save} />
      </Modal>
      <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { setCats((prev) => prev.filter((c) => c.id !== deleteTarget.id)); notification?.success("Category deleted."); }} title="Delete this category?" message={`"${deleteTarget?.name}" will be removed. Products in this category will remain uncategorized.`} />
    </div>
  );
}

let formSubmitRef = { current: null };
function CategoryForm({ editing, onSave }) {
  const { register, handleSubmit } = useForm({ values: editing || { name: "", description: "", active: true } });
  formSubmitRef.current = handleSubmit(onSave);
  return (
    <form id="cat-form" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Field label="Category Name" required>
        <Input dark {...register("name", { required: true })} />
      </Field>
      <Field label="Description">
        <Textarea dark rows={3} {...register("description")} />
      </Field>
      <Checkbox label="Active" {...register("active")} />
    </form>
  );
}
function CategoryFormFooter({ onClose }) {
  return (
    <>
      <Button variant="ghostLight" onClick={onClose}>Cancel</Button>
      <Button onClick={() => { formSubmitRef.current(); }}>Save Category</Button>
    </>
  );
}
