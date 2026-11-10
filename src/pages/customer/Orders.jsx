import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { orders as demoOrders, orderTotal } from "../../data/orders";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useAuth } from "../../context/AuthContext";
import { EmptyState, Breadcrumb } from "../../components/common/Misc";
import StatusPill from "../../components/admin/StatusPill";
import { formatCurrency, formatDate } from "../../utils/format";

export default function Orders() {
  const [customerOrders] = useLocalStorage("kitvibe_customer_orders", []);
  const auth = useAuth();

  const seedOrders = demoOrders.slice(0, 3).map((o) => ({ ...o, total: orderTotal(o) }));
  const myOrders = [
    ...customerOrders.map((o) => ({ ...o, total: o.items.reduce((s, i) => s + i.price * i.qty, 0) + o.shipping - o.discount })),
    ...seedOrders,
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Orders" }]} />
      <h1 className="font-display text-4xl tracking-wide mt-3 mb-8">Your Orders</h1>

      {myOrders.length === 0 ? (
        <EmptyState
          icon={<Package size={24} className="text-ink/40" />}
          title="No orders yet."
          message="Once you place an order, it'll show up here for easy tracking."
          actionLabel="Start Shopping"
          actionTo="/shop"
        />
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-black/10 rounded-card p-5 hover:border-pitch/50 hover:shadow-premium transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img key={i} src={item.image} alt="" className="w-12 h-14 object-cover rounded-lg border-2 border-white" />
                  ))}
                </div>
                <div>
                  <p className="font-mono font-semibold text-sm">{order.id}</p>
                  <p className="text-xs text-ink/45">{formatDate(order.date)} · {order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:justify-end">
                <StatusPill status={order.status} />
                <span className="font-mono font-semibold text-sm">{formatCurrency(order.total)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
