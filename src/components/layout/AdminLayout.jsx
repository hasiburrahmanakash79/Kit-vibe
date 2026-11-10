import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";

const TITLES = {
  "/admin": ["Dashboard", "Store performance at a glance"],
  "/admin/products": ["Products", "Manage your jersey catalog"],
  "/admin/categories": ["Categories", "Organize how jerseys are browsed"],
  "/admin/orders": ["Orders", "Track and fulfill customer orders"],
  "/admin/customers": ["Customers", "View and manage customer accounts"],
  "/admin/reviews": ["Reviews", "Moderate customer feedback"],
  "/admin/inventory": ["Inventory", "Monitor stock levels"],
  "/admin/discounts": ["Discounts", "Manage product discounts"],
  "/admin/coupons": ["Coupons", "Create and manage promo codes"],
  "/admin/analytics": ["Analytics", "Deep dive into store performance"],
  "/admin/content": ["Content", "Manage homepage content"],
  "/admin/settings": ["Settings", "Configure your store"],
};

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 min-w-0">
        <Outlet context={{ setMobileOpen, titles: TITLES }} />
      </div>
    </div>
  );
}
