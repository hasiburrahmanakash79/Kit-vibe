import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Check, Truck, Zap, Banknote, CreditCard, Smartphone } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { useLocalStorage } from "../../utils/useLocalStorage";
import Button from "../../components/common/Button";
import { Field, Input, Select } from "../../components/common/FormFields";
import { formatCurrency, classNames } from "../../utils/format";

const STEPS = ["Information", "Shipping", "Delivery", "Payment", "Review"];

export default function Checkout() {
  const cart = useCart();
  const auth = useAuth();
  const notification = useNotification();
  const navigate = useNavigate();
  const [, setOrders] = useLocalStorage("kitvibe_customer_orders", []);
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [info, setInfo] = useState({ fullName: auth?.user?.name || "", email: auth?.user?.email || "", phone: "" });
  const [address, setAddress] = useState({ address: "", city: "", state: "", postalCode: "", country: "United States" });
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("cod");

  const infoForm = useForm({ defaultValues: info });
  const addressForm = useForm({ defaultValues: address });

  if (!cart || cart.items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const deliveryFee = delivery === "express" ? 14.99 : cart.shipping;
  const total = cart.subtotal + deliveryFee;

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const submitInfo = (data) => {
    setInfo(data);
    goNext();
  };
  const submitAddress = (data) => {
    setAddress(data);
    goNext();
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const orderId = `KV-${Math.floor(100000 + Math.random() * 899999)}`;
      const order = {
        id: orderId,
        customer: info.fullName,
        email: info.email,
        date: new Date().toISOString(),
        status: "Pending",
        payment: payment === "cod" ? "Cash on Delivery" : payment === "card" ? "Card" : "Mobile Payment",
        paymentStatus: payment === "cod" ? "Pending" : "Paid",
        tracking: `KV-TRK-${Math.floor(10000 + Math.random() * 89999)}`,
        address: { line1: address.address, city: address.city, state: address.state, zip: address.postalCode, country: address.country },
        items: cart.items.map((i) => ({ productId: i.productId, name: i.name, image: i.image, size: i.size, qty: i.qty, price: i.price })),
        shipping: deliveryFee,
        discount: 0,
        deliveryMethod: delivery,
        deliveryEstimate: new Date(Date.now() + (delivery === "express" ? 2 : 6) * 86400000).toISOString(),
      };
      setOrders((prev) => [order, ...prev]);
      cart.clearCart();
      notification?.success(`Order ${orderId} placed successfully.`, { title: "Order Confirmed" });
      setPlacing(false);
      navigate("/order-success", { state: { order } });
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <h1 className="font-display text-4xl tracking-wide mb-8">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center gap-1 md:gap-2 mb-10 overflow-x-auto pb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1 md:gap-2 shrink-0">
            <div
              className={classNames(
                "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                i < step ? "bg-pitch text-ink" : i === step ? "bg-ink text-white" : "bg-black/8 text-ink/40"
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={classNames("text-xs md:text-sm font-medium whitespace-nowrap", i === step ? "text-ink" : "text-ink/40")}>{label}</span>
            {i < STEPS.length - 1 && <div className="w-6 md:w-10 h-px bg-black/10 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {step === 0 && (
            <form onSubmit={infoForm.handleSubmit(submitInfo)} className="space-y-4 max-w-md">
              <h2 className="font-semibold text-lg mb-2">Customer Information</h2>
              <Field label="Full Name" required error={infoForm.formState.errors.fullName?.message}>
                <Input {...infoForm.register("fullName", { required: "Full name is required" })} />
              </Field>
              <Field label="Email" required error={infoForm.formState.errors.email?.message}>
                <Input type="email" {...infoForm.register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })} />
              </Field>
              <Field label="Phone" required error={infoForm.formState.errors.phone?.message}>
                <Input type="tel" {...infoForm.register("phone", { required: "Phone number is required" })} />
              </Field>
              <Button type="submit" size="lg" className="mt-2">Continue to Shipping</Button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={addressForm.handleSubmit(submitAddress)} className="space-y-4 max-w-md">
              <h2 className="font-semibold text-lg mb-2">Shipping Address</h2>
              <Field label="Address" required error={addressForm.formState.errors.address?.message}>
                <Input {...addressForm.register("address", { required: "Address is required" })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" required error={addressForm.formState.errors.city?.message}>
                  <Input {...addressForm.register("city", { required: "Required" })} />
                </Field>
                <Field label="State / Division" required error={addressForm.formState.errors.state?.message}>
                  <Input {...addressForm.register("state", { required: "Required" })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Postal Code" required error={addressForm.formState.errors.postalCode?.message}>
                  <Input {...addressForm.register("postalCode", { required: "Required" })} />
                </Field>
                <Field label="Country" required>
                  <Select {...addressForm.register("country")}>
                    <option>United States</option>
                    <option>Bangladesh</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </Select>
                </Field>
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="ghost" onClick={goBack}>Back</Button>
                <Button type="submit" size="lg">Continue to Delivery</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="max-w-md space-y-4">
              <h2 className="font-semibold text-lg mb-2">Delivery Options</h2>
              <DeliveryOption
                icon={<Truck size={18} />} label="Standard Delivery" desc="4–6 business days"
                price={cart.shipping === 0 ? "FREE" : formatCurrency(cart.shipping)}
                selected={delivery === "standard"} onSelect={() => setDelivery("standard")}
              />
              <DeliveryOption
                icon={<Zap size={18} />} label="Express Delivery" desc="1–2 business days"
                price={formatCurrency(14.99)}
                selected={delivery === "express"} onSelect={() => setDelivery("express")}
              />
              <div className="flex gap-3 mt-2">
                <Button variant="ghost" onClick={goBack}>Back</Button>
                <Button size="lg" onClick={goNext}>Continue to Payment</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-md space-y-4">
              <h2 className="font-semibold text-lg mb-2">Payment Method</h2>
              <DeliveryOption icon={<Banknote size={18} />} label="Cash on Delivery" desc="Pay when your order arrives" selected={payment === "cod"} onSelect={() => setPayment("cod")} />
              <DeliveryOption icon={<CreditCard size={18} />} label="Card" desc="Visa, Mastercard, Amex" selected={payment === "card"} onSelect={() => setPayment("card")} />
              <DeliveryOption icon={<Smartphone size={18} />} label="Mobile Payment" desc="bKash, Apple Pay, Google Pay" selected={payment === "mobile"} onSelect={() => setPayment("mobile")} />
              <p className="text-xs text-ink/40">This is a demo checkout — no real payment will be processed.</p>
              <div className="flex gap-3 mt-2">
                <Button variant="ghost" onClick={goBack}>Back</Button>
                <Button size="lg" onClick={goNext}>Review Order</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-md space-y-6">
              <h2 className="font-semibold text-lg">Review Your Order</h2>
              <div>
                <p className="text-xs font-semibold uppercase text-ink/40 mb-1">Ship To</p>
                <p className="text-sm">{info.fullName} · {info.phone}</p>
                <p className="text-sm text-ink/60">{address.address}, {address.city}, {address.state} {address.postalCode}, {address.country}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-ink/40 mb-1">Delivery</p>
                <p className="text-sm capitalize">{delivery} Delivery</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-ink/40 mb-1">Payment</p>
                <p className="text-sm">{payment === "cod" ? "Cash on Delivery" : payment === "card" ? "Card" : "Mobile Payment"}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={goBack} disabled={placing}>Back</Button>
                <Button size="lg" onClick={placeOrder} disabled={placing}>{placing ? "Placing Order..." : "Place Order"}</Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="border border-black/10 rounded-card p-6 sticky top-24">
            <h3 className="font-display text-xl tracking-wide mb-5">Order Summary</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.items.map((item) => (
                <div key={item.key} className="flex gap-3">
                  <img src={item.image} alt="" className="w-12 h-14 object-cover rounded-lg bg-black/5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-xs text-ink/40">Size {item.size} · Qty {item.qty}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold shrink-0">{formatCurrency(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-black/8 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink/60"><span>Subtotal</span><span className="font-mono">{formatCurrency(cart.subtotal)}</span></div>
              <div className="flex justify-between text-ink/60"><span>Shipping</span><span className="font-mono">{deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}</span></div>
              <div className="flex justify-between font-semibold text-base border-t border-black/8 pt-2"><span>Total</span><span className="font-mono">{formatCurrency(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryOption({ icon, label, desc, price, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={classNames(
        "w-full flex items-center gap-4 border rounded-card p-4 text-left transition-colors",
        selected ? "border-pitch bg-pitch/5" : "border-black/10 hover:border-ink/30"
      )}
    >
      <div className={classNames("w-10 h-10 rounded-full flex items-center justify-center shrink-0", selected ? "bg-pitch text-ink" : "bg-black/5 text-ink/50")}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-ink/45">{desc}</p>
      </div>
      {price && <span className="text-sm font-mono font-semibold">{price}</span>}
    </button>
  );
}
