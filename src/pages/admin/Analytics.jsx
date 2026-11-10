import { useOutletContext, useLocation } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AdminHeader from "../../components/layout/AdminHeader";
import ChartCard from "../../components/admin/ChartCard";
import StatCard from "../../components/admin/StatCard";
import { userActivity, customerGrowth, dailySales } from "../../data/orders";
import { formatCurrency } from "../../utils/format";
import { Eye, Heart, ShoppingCart, CreditCard } from "lucide-react";

export default function Analytics() {
  const { setMobileOpen, titles } = useOutletContext();
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] || ["Analytics", ""];

  const totalViews = userActivity.reduce((s, d) => s + d.views, 0);
  const totalWishlist = userActivity.reduce((s, d) => s + d.wishlist, 0);
  const totalCart = userActivity.reduce((s, d) => s + d.cart, 0);
  const totalCheckout = userActivity.reduce((s, d) => s + d.checkout, 0);

  const avgOrderValue = dailySales.reduce((s, d) => s + d.revenue, 0) / dailySales.reduce((s, d) => s + d.orders, 0);

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
      <div className="p-5 md:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Product Views" value={totalViews.toLocaleString()} change={9.2} icon={<Eye size={17} />} />
          <StatCard label="Wishlist Adds" value={totalWishlist.toLocaleString()} change={14.5} icon={<Heart size={17} />} />
          <StatCard label="Cart Adds" value={totalCart.toLocaleString()} change={6.8} icon={<ShoppingCart size={17} />} />
          <StatCard label="Checkout Attempts" value={totalCheckout.toLocaleString()} change={3.1} icon={<CreditCard size={17} />} />
        </div>

        <ChartCard title="User Activity" subtitle="Product views, wishlist and cart activity, last 7 days">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userActivity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000f" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 13 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="views" stroke="#0A0A0B" strokeWidth={2} dot={false} name="Views" />
              <Line type="monotone" dataKey="wishlist" stroke="#17E06B" strokeWidth={2} dot={false} name="Wishlist" />
              <Line type="monotone" dataKey="cart" stroke="#0B7A3C" strokeWidth={2} dot={false} name="Cart" />
              <Line type="monotone" dataKey="checkout" stroke="#F4B740" strokeWidth={2} dot={false} name="Checkout" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ChartCard title="Customer Growth" subtitle="Total registered customers by month">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={customerGrowth}>
                <defs>
                  <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A0A0B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0A0A0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000f" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 13 }} />
                <Area type="monotone" dataKey="customers" stroke="#0A0A0B" strokeWidth={2} fill="url(#custGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Orders by Day" subtitle="Order volume, last 7 days">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000f" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 13 }} />
                <Bar dataKey="orders" fill="#17E06B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Today's Revenue" value={formatCurrency(dailySales[dailySales.length - 1].revenue)} change={4.2} icon={<CreditCard size={17} />} />
          <StatCard label="This Week" value={formatCurrency(dailySales.reduce((s, d) => s + d.revenue, 0))} change={7.5} icon={<CreditCard size={17} />} />
          <StatCard label="Avg. Order Value" value={formatCurrency(avgOrderValue)} change={2.3} icon={<CreditCard size={17} />} />
          <StatCard label="This Year" value={formatCurrency(612400)} change={18.9} icon={<CreditCard size={17} />} />
        </div>
      </div>
    </div>
  );
}
