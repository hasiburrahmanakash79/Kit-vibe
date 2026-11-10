import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2, Package, Eye } from "lucide-react";
import Button from "../../components/common/Button";
import { formatCurrency, formatDate } from "../../utils/format";

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/orders" replace />;

  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0) + order.shipping - order.discount;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 md:py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-pitch/15 flex items-center justify-center mx-auto mb-6 animate-scaleIn">
        <CheckCircle2 size={36} className="text-pitch-dark" />
      </div>
      <h1 className="font-display text-4xl tracking-wide">Order Confirmed!</h1>
      <p className="text-ink/50 text-sm mt-3">Thanks for your order — a confirmation has been sent to {order.email}.</p>

      <div className="border border-black/10 rounded-card p-6 mt-8 text-left">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase text-ink/40 mb-1">Order Number</p>
            <p className="font-mono font-semibold">{order.id}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-ink/40 mb-1">Order Date</p>
            <p>{formatDate(order.date)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-ink/40 mb-1">Estimated Delivery</p>
            <p>{formatDate(order.deliveryEstimate)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-ink/40 mb-1">Total Amount</p>
            <p className="font-mono font-semibold">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Button as={Link} to={`/orders/${order.id}`} icon={<Eye size={16} />}>Track Order</Button>
        <Button as={Link} to="/orders" variant="outline" icon={<Package size={16} />}>View Orders</Button>
        <Button as={Link} to="/shop" variant="ghost">Continue Shopping</Button>
      </div>
    </div>
  );
}
