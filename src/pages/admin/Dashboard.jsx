import { useOutletContext, useLocation } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, ShoppingCart, Users, Package, Clock, AlertTriangle } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";
import { dailySales, monthlyRevenue, orderStatusBreakdown, orders } from "../../data/orders";
import { products } from "../../data/products";
import { users } from "../../data/users";
import { formatCurrency } from "../../utils/format";

export default function Dashboard() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Dashboard", ""];

  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = orders.length + 214;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 15).length;

  const KPIS = [
    { label: "Total Revenue", value: formatCurrency(totalRevenue), change: 12.4, icon: <DollarSign size={17} /> },
    { label: "Total Orders", value: totalOrders.toLocaleString(), change: 8.1, icon: <ShoppingCart size={17} /> },
    { label: "Total Customers", value: users.length + 730, change: 5.6, icon: <Users size={17} /> },
    { label: "Total Products", value: products.length, change: 2.0, icon: <Package size={17} /> },
    { label: "Pending Orders", value: pendingOrders, change: -3.2, icon: <Clock size={17} />, tone: "warn" },
    { label: "Low Stock Items", value: lowStock, change: 1.5, icon: <AlertTriangle size={17} />, tone: "warn" },
  ];

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {KPIS.map((k) => <StatCard key={k.label} {...k} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <ChartCard title="Weekly Sales" subtitle="Revenue and orders, last 7 days" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dailySales}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#17E06B" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#17E06B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000f" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 13 }} />
                <Area type="monotone" dataKey="revenue" stroke="#0B7A3C" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Order Status" subtitle="Current order distribution">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={orderStatusBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {orderStatusBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 13 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Monthly Revenue" subtitle="Last 7 months">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000f" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 13 }} formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="revenue" fill="#17E06B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
