import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Package, Heart, MapPin, Lock, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { orders as demoOrders } from "../../data/orders";
import { useNotification } from "../../context/NotificationContext";
import { Field, Input, Checkbox } from "../../components/common/FormFields";
import Button from "../../components/common/Button";
import StatusPill from "../../components/admin/StatusPill";
import { Breadcrumb } from "../../components/common/Misc";
import { formatDate } from "../../utils/format";

const SECTIONS = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "password", label: "Password", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Profile() {
  const auth = useAuth();
  const [active, setActive] = useState("personal");

  if (!auth?.isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Profile" }]} />
      <h1 className="font-display text-4xl tracking-wide mt-3 mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-56 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  active === s.id ? "bg-ink text-white" : "text-ink/60 hover:bg-black/5"
                }`}
              >
                <s.icon size={16} /> {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          {active === "personal" && <PersonalInfo />}
          {active === "orders" && <OrdersTab />}
          {active === "wishlist" && <WishlistTab />}
          {active === "addresses" && <AddressesTab />}
          {active === "password" && <PasswordTab />}
          {active === "notifications" && <NotificationsTab />}
        </div>
      </div>
    </div>
  );
}

function PersonalInfo() {
  const auth = useAuth();
  const notification = useNotification();
  const { register, handleSubmit } = useForm({ defaultValues: { name: auth.user?.name, email: auth.user?.email, phone: "" } });

  return (
    <form onSubmit={handleSubmit(() => notification?.success("Your profile has been updated.", { title: "Profile updated" }))} className="max-w-md space-y-4">
      <Field label="Full Name"><Input {...register("name")} /></Field>
      <Field label="Email"><Input type="email" {...register("email")} /></Field>
      <Field label="Phone"><Input type="tel" {...register("phone")} placeholder="+1 202 555 0100" /></Field>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}

function OrdersTab() {
  const [customerOrders] = useLocalStorage("kitvibe_customer_orders", []);
  const all = [...customerOrders, ...demoOrders.slice(0, 2)];
  if (all.length === 0) return <p className="text-sm text-ink/50">You haven't placed any orders yet.</p>;
  return (
    <div className="space-y-3">
      {all.map((o) => (
        <Link key={o.id} to={`/orders/${o.id}`} className="flex items-center justify-between border border-black/10 rounded-card p-4 hover:border-pitch/50 transition-colors">
          <div>
            <p className="font-mono text-sm font-semibold">{o.id}</p>
            <p className="text-xs text-ink/45">{formatDate(o.date)}</p>
          </div>
          <StatusPill status={o.status} />
        </Link>
      ))}
    </div>
  );
}

function WishlistTab() {
  const wishlist = useWishlist();
  if (!wishlist || wishlist.count === 0) return <p className="text-sm text-ink/50">Your wishlist is empty. <Link to="/shop" className="text-pitch-dark underline">Browse jerseys</Link>.</p>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {wishlist.items.map((item) => (
        <Link key={item.id} to={`/product/${item.id}`} className="block">
          <img src={item.image} alt={item.name} className="w-full aspect-[4/5] object-cover rounded-lg" />
          <p className="text-xs font-semibold mt-2 line-clamp-2">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}

function AddressesTab() {
  const notification = useNotification();
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(() => notification?.success("Address saved.", { title: "Saved" }))} className="max-w-md space-y-4">
      <Field label="Address"><Input {...register("address")} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="City"><Input {...register("city")} /></Field>
        <Field label="State"><Input {...register("state")} /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Postal Code"><Input {...register("zip")} /></Field>
        <Field label="Country"><Input defaultValue="United States" {...register("country")} /></Field>
      </div>
      <Button type="submit">Save Address</Button>
    </form>
  );
}

function PasswordTab() {
  const notification = useNotification();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  return (
    <form onSubmit={handleSubmit(() => notification?.success("Password updated.", { title: "Saved" }))} className="max-w-md space-y-4">
      <Field label="Current Password" required error={errors.current?.message}>
        <Input type="password" {...register("current", { required: "Required" })} />
      </Field>
      <Field label="New Password" required error={errors.next?.message}>
        <Input type="password" {...register("next", { required: "Required", minLength: { value: 6, message: "At least 6 characters" } })} />
      </Field>
      <Field label="Confirm New Password" required error={errors.confirm?.message}>
        <Input type="password" {...register("confirm", { required: "Required", validate: (v) => v === watch("next") || "Passwords don't match" })} />
      </Field>
      <Button type="submit">Update Password</Button>
    </form>
  );
}

function NotificationsTab() {
  const notification = useNotification();
  const [prefs, setPrefs] = useLocalStorage("kitvibe_notif_prefs", { order: true, promo: true, restock: false });
  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));
  return (
    <div className="max-w-md space-y-4">
      <Checkbox label="Order updates" checked={prefs.order} onChange={() => toggle("order")} />
      <Checkbox label="Promotions and offers" checked={prefs.promo} onChange={() => toggle("promo")} />
      <Checkbox label="Back-in-stock alerts" checked={prefs.restock} onChange={() => toggle("restock")} />
      <Button onClick={() => notification?.success("Notification preferences saved.")}>Save Preferences</Button>
    </div>
  );
}
