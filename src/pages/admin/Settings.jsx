import { useOutletContext, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminHeader from "../../components/layout/AdminHeader";
import { Field, Input, Checkbox } from "../../components/common/FormFields";
import Button from "../../components/common/Button";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNotification } from "../../context/NotificationContext";

const DEFAULT_SETTINGS = {
  storeName: "KitVibe", storeEmail: "support@kitvibe.com", storePhone: "+1 (800) 555-0134", storeAddress: "142 Pitchside Ave, Portland, OR",
  standardShipping: 6.99, expressShipping: 14.99, freeShippingThreshold: 100,
  taxPercent: 0,
  orderNotifs: true, customerNotifs: true, lowStockNotifs: true,
};

export default function Settings() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Settings", ""];
  const [settings, setSettings] = useLocalStorage("kitvibe_admin_settings", DEFAULT_SETTINGS);
  const notification = useNotification();
  const { register, handleSubmit } = useForm({ values: settings });

  const save = (data) => {
    setSettings(data);
    notification?.success("Settings saved.");
  };

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <form onSubmit={handleSubmit(save)} className="p-5 md:p-8 max-w-2xl space-y-8">
        <section className="bg-white border border-black/8 rounded-card p-6 space-y-4">
          <h3 className="font-semibold text-sm">Store Settings</h3>
          <Field label="Store Name"><Input {...register("storeName")} /></Field>
          <Field label="Email"><Input type="email" {...register("storeEmail")} /></Field>
          <Field label="Phone"><Input {...register("storePhone")} /></Field>
          <Field label="Address"><Input {...register("storeAddress")} /></Field>
        </section>

        <section className="bg-white border border-black/8 rounded-card p-6 space-y-4">
          <h3 className="font-semibold text-sm">Shipping Settings</h3>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Standard ($)"><Input type="number" step="0.01" {...register("standardShipping")} /></Field>
            <Field label="Express ($)"><Input type="number" step="0.01" {...register("expressShipping")} /></Field>
            <Field label="Free Shipping Over ($)"><Input type="number" step="0.01" {...register("freeShippingThreshold")} /></Field>
          </div>
        </section>

        <section className="bg-white border border-black/8 rounded-card p-6 space-y-4">
          <h3 className="font-semibold text-sm">Tax Settings</h3>
          <Field label="Tax Percentage"><Input type="number" step="0.1" {...register("taxPercent")} /></Field>
        </section>

        <section className="bg-white border border-black/8 rounded-card p-6 space-y-3">
          <h3 className="font-semibold text-sm mb-1">Notification Settings</h3>
          <Checkbox label="Order notifications" {...register("orderNotifs")} />
          <Checkbox label="Customer notifications" {...register("customerNotifs")} />
          <Checkbox label="Low stock notifications" {...register("lowStockNotifs")} />
        </section>

        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
