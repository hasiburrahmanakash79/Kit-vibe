import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { getProductById } from "../../data/products";
import Button from "../../components/common/Button";
import { EmptyState, Breadcrumb } from "../../components/common/Misc";
import { formatCurrency } from "../../utils/format";

export default function Wishlist() {
  const wishlist = useWishlist();
  const cart = useCart();

  const moveAllToCart = () => {
    wishlist.items.forEach((item) => {
      const product = getProductById(item.id);
      const firstSize = product?.sizes.find((s) => s.stock > 0)?.size;
      if (product && firstSize) cart.addToCart(product, firstSize, 1);
    });
    wishlist.clearWishlist();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <div className="flex items-center justify-between mt-3 mb-8">
        <h1 className="font-display text-4xl tracking-wide">Wishlist</h1>
        {wishlist?.count > 0 && (
          <Button variant="outline" size="sm" onClick={moveAllToCart}>
            Move All to Cart
          </Button>
        )}
      </div>

      {!wishlist || wishlist.count === 0 ? (
        <EmptyState
          icon={<Heart size={24} className="text-ink/40" />}
          title="Your wishlist is waiting."
          message="Save jerseys you love and come back to them anytime."
          actionLabel="Explore Jerseys"
          actionTo="/shop"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.items.map((item) => (
            <div key={item.id} className="group relative">
              <button
                onClick={() => wishlist.removeFromWishlist(item.id)}
                aria-label="Remove from wishlist"
                className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
              >
                <X size={14} />
              </button>
              <Link to={`/product/${item.id}`} className="block rounded-card overflow-hidden aspect-[4/5] bg-black/5">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <p className="text-[11px] font-mono uppercase tracking-wide text-ink/40 mt-3">{item.team}</p>
              <Link to={`/product/${item.id}`} className="text-sm font-semibold line-clamp-2 hover:text-pitch-dark">{item.name}</Link>
              <p className="font-mono font-bold text-sm mt-1">{formatCurrency(item.price)}</p>
              <button
                onClick={() => {
                  const product = getProductById(item.id);
                  const firstSize = product?.sizes.find((s) => s.stock > 0)?.size;
                  if (product && firstSize) cart.addToCart(product, firstSize, 1);
                }}
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 text-xs font-semibold border border-black/15 rounded-pill py-2 hover:border-ink transition-colors"
              >
                <ShoppingBag size={13} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
