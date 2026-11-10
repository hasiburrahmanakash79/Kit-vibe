import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, Tag, ClipboardList, Users, Star, Boxes,
  Percent, TicketPercent, BarChart3, FileText, Settings, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { classNames } from "../../utils/format";

const NAV = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Tag },
  { label: "Orders", to: "/admin/orders", icon: ClipboardList },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Reviews", to: "/admin/reviews", icon: Star },
  { label: "Inventory", to: "/admin/inventory", icon: Boxes },
  { label: "Discounts", to: "/admin/discounts", icon: Percent },
  { label: "Coupons", to: "/admin/coupons", icon: TicketPercent },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Content", to: "/admin/content", icon: FileText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const auth = useAuth();

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-ink/70 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={classNames(
          "fixed lg:sticky top-0 left-0 h-screen bg-ink border-r border-line flex flex-col z-50 transition-all duration-300 shrink-0",
          collapsed ? "w-[76px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-line shrink-0">
          {!collapsed && <span className="font-display text-lg text-white tracking-wide">KIT<span className="text-pitch">VIBE</span></span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
            className="hidden lg:flex w-7 h-7 rounded-full items-center justify-center text-white/50 hover:text-white hover:bg-white/10"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 dark-scroll">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                classNames(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group",
                  isActive ? "bg-pitch text-ink" : "text-white/60 hover:bg-white/5 hover:text-white"
                )
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-line shrink-0">
          <div className={classNames("flex items-center gap-3 px-2 py-2", collapsed && "justify-center")}>
            <div className="w-9 h-9 rounded-full bg-pitch/20 text-pitch flex items-center justify-center font-semibold text-sm shrink-0">
              {auth?.user?.name?.[0] || "A"}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{auth?.user?.name || "Admin"}</p>
                <p className="text-xs text-white/40 truncate">{auth?.user?.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={auth?.logout}
            className={classNames(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white w-full mt-1",
              collapsed && "justify-center"
            )}
          >
            <LogOut size={18} />
            {!collapsed && "Log Out"}
          </button>
        </div>
      </aside>
    </>
  );
}
