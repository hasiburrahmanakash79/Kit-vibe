import { useParams, Link } from "react-router-dom";
import { Check, MapPin, Hash } from "lucide-react";
import { orders as demoOrders, orderTotal, STATUS_FLOW } from "../../data/orders";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { Breadcrumb } from "../../components/common/Misc";
import StatusPill from "../../components/admin/StatusPill";
import { formatCurrency, formatDate, classNames } from "../../utils/format";
import NotFound from "./NotFound";

export default function OrderDetail() {
  const { id } = useParams();
  const [customerOrders] = useLocalStorage("kitvibe_customer_orders", []);

  const order =
    customerOrders.find((o) => o.id === id) ||
    demoOrders.find((o) => o.id === id);

  if (!order) return <NotFound />;

  const total = order.total ?? (order.items.reduce((s, i) => s + i.price * i.qty, 0) + order.shipping - order.discount);
  const currentIndex = STATUS_FLOW.indexOf(order.status);
  const cancelled = order.status === "Cancelled";

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Orders", href: "/orders" }, { label: order.id }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 mb-8 gap-3">
        <div>
          <h1 className="font-display text-3xl tracking-wide">Order {order.id}</h1>
          <p className="text-sm text-ink/45 mt-1">Placed {formatDate(order.date)}</p>
        </div>
        <StatusPill status={order.status} />
      </div>

      {!cancelled && (
        <div className="border border-black/10 rounded-card p-6 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-ink/40 mb-6">
            <Hash size={12} /> Tracking: {order.tracking}
          </div>
          <div className="flex justify-between relative">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-black/10" />
            <div
              className="absolute top-4 left-4 right-4 h-0.5 bg-pitch transition-all duration-500 origin-left"
              style={{ transform: `scaleX(${currentIndex / (STATUS_FLOW.length - 1)})` }}
            />
            {STATUS_FLOW.map((s, i) => (
              <div key={s} className="relative flex flex-col items-center gap-2 z-10 flex-1">
                <div
                  className={classNames(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2",
                    i <= currentIndex ? "bg-pitch border-pitch text-ink" : "bg-white border-black/15 text-ink/30"
                  )}
                >
                  {i < currentIndex ? <Check size={14} /> : i + 1}
                </div>
                <span className={classNames("text-[11px] text-center font-medium", i <= currentIndex ? "text-ink" : "text-ink/35")}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase text-ink/40 mb-2 flex items-center gap-1.5"><MapPin size={12} /> Delivery Address</p>
          <p className="text-sm">{order.address.line1}</p>
          <p className="text-sm text-ink/60">{order.address.city}, {order.address.state} {order.address.zip}</p>
          <p className="text-sm text-ink/60">{order.address.country}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-ink/40 mb-2">Payment</p>
          <p className="text-sm">{order.payment}</p>
          <StatusPill status={order.paymentStatus} />
          <p className="text-xs font-semibold uppercase text-ink/40 mb-2 mt-4">Estimated Delivery</p>
          <p className="text-sm">{formatDate(order.deliveryEstimate)}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-ink/40 mb-3">Items</p>
        <div className="divide-y divide-black/8 border-t border-b border-black/8">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <img src={item.image} alt="" className="w-14 h-16 object-cover rounded-lg bg-black/5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                <p className="text-xs text-ink/45">Size {item.size} · Qty {item.qty}</p>
              </div>
              <span className="text-sm font-mono font-semibold">{formatCurrency(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between text-ink/60"><span>Shipping</span><span className="font-mono">{order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-ink/60"><span>Discount</span><span className="font-mono">-{formatCurrency(order.discount)}</span></div>}
            <div className="flex justify-between font-semibold text-base border-t border-black/8 pt-2"><span>Total</span><span className="font-mono">{formatCurrency(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
