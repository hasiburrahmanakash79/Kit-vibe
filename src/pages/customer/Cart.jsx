import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, X, BookmarkPlus, Trash2, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Button from "../../components/common/Button";
import { EmptyState, Breadcrumb } from "../../components/common/Misc";
import { QuantitySelector } from "../../components/product/Selectors";
import { formatCurrency, classNames } from "../../utils/format";

export default function Cart() {
  const cart = useCart();
  const navigate = useNavigate();

  if (!cart) return null;

  const progress = Math.min(100, (cart.subtotal / cart.FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="font-display text-4xl tracking-wide mt-3 mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={24} className="text-ink/40" />}
          title="Your bag is empty."
          message="Looks like you haven't added any jerseys yet. Let's fix that."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cart.amountToFreeShipping > 0 ? (
              <div className="bg-pitch/10 border border-pitch/30 rounded-card p-4">
                <p className="text-sm font-medium mb-2">
                  Add <strong>{formatCurrency(cart.amountToFreeShipping)}</strong> more to unlock <strong>FREE SHIPPING</strong>.
                </p>
                <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pitch transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <div className="bg-pitch/10 border border-pitch/30 rounded-card p-4 flex items-center gap-2">
                <Truck size={16} className="text-pitch-dark" />
                <p className="text-sm font-medium">You've unlocked free shipping!</p>
              </div>
            )}

            <div className="divide-y divide-black/8 border-t border-b border-black/8">
              {cart.items.map((item) => (
                <div key={item.key} className="flex gap-4 py-5">
                  <img src={item.image} alt={item.name} className="w-24 h-28 object-cover rounded-lg bg-black/5 shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-3">
                        <div>
                          <Link to={`/product/${item.productId}`} className="text-sm font-semibold hover:text-pitch-dark line-clamp-1">{item.name}</Link>
                          <p className="text-xs text-ink/45 mt-1">{item.team} · Size {item.size}</p>
                        </div>
                        <button onClick={() => cart.removeFromCart(item.key)} aria-label="Remove item" className="text-ink/30 hover:text-red-500 shrink-0">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <QuantitySelector value={item.qty} onChange={(q) => cart.updateQty(item.key, q)} />
                      <div className="flex items-center gap-4">
                        <button onClick={() => cart.saveForLater(item.key)} className="text-xs font-semibold text-ink/50 hover:text-ink flex items-center gap-1">
                          <BookmarkPlus size={13} /> Save for later
                        </button>
                        <span className="font-mono font-bold text-sm">{formatCurrency(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cart.savedForLater.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-4">Saved for Later ({cart.savedForLater.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cart.savedForLater.map((item) => (
                    <div key={item.key} className="border border-black/8 rounded-card p-3">
                      <img src={item.image} alt={item.name} className="w-full aspect-[4/5] object-cover rounded-lg mb-2" />
                      <p className="text-xs font-semibold line-clamp-2">{item.name}</p>
                      <p className="text-xs font-mono mt-1">{formatCurrency(item.price)}</p>
                      <button onClick={() => cart.moveToCart(item.key)} className="text-xs font-semibold text-pitch-dark mt-2 underline underline-offset-2">
                        Move to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button as={Link} to="/shop" variant="ghost">← Continue Shopping</Button>
          </div>

          <div>
            <div className="border border-black/10 rounded-card p-6 sticky top-24">
              <h3 className="font-display text-xl tracking-wide mb-5">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink/60"><span>Subtotal</span><span className="font-mono">{formatCurrency(cart.subtotal)}</span></div>
                <div className="flex justify-between text-ink/60">
                  <span>Shipping</span>
                  <span className="font-mono">{cart.shipping === 0 ? "FREE" : formatCurrency(cart.shipping)}</span>
                </div>
                <div className="flex justify-between text-ink/60"><span>Discount</span><span className="font-mono">$0.00</span></div>
                <div className="border-t border-black/8 pt-3 flex justify-between font-semibold text-base">
                  <span>Estimated Total</span>
                  <span className="font-mono">{formatCurrency(cart.subtotal + cart.shipping)}</span>
                </div>
              </div>
              <Button full size="lg" className="mt-6" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
