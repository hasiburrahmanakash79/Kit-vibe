import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import Badge from "../common/Badge";
import Rating from "../common/Rating";
import { formatCurrency, classNames } from "../../utils/format";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, onQuickView }) {
  const wishlist = useWishlist();
  const cart = useCart();
  const wishlisted = wishlist?.isWishlisted(product.id);
  const discount = product.discountPrice
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
    : null;

  const quickAdd = (e) => {
    e.preventDefault();
    const firstAvailable = product.sizes.find((s) => s.stock > 0);
    if (firstAvailable) cart.addToCart(product, firstAvailable.size, 1);
  };

  return (
    <div className="group relative flex flex-col">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden rounded-card bg-black/5 aspect-[4/5]">
        <img
          src={product.images[0]}
          alt={`${product.name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <img
          src={product.images[1]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && <Badge tone="pitch">-{discount}%</Badge>}
          {product.newArrival && <Badge tone="dark">New</Badge>}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            wishlist?.toggleWishlist(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={classNames(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur transition-colors",
            wishlisted ? "bg-pitch text-ink" : "bg-white/85 text-ink hover:bg-white"
          )}
        >
          <Heart size={16} className={wishlisted ? "fill-ink" : ""} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={quickAdd}
            className="flex-1 bg-ink text-white text-xs font-semibold rounded-pill py-2.5 flex items-center justify-center gap-1.5 hover:bg-pitch hover:text-ink transition-colors"
          >
            <ShoppingBag size={13} /> Quick Add
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              aria-label="Quick view"
              className="w-9 h-9 shrink-0 rounded-full bg-white/90 text-ink flex items-center justify-center hover:bg-white transition-colors"
            >
              <Eye size={15} />
            </button>
          )}
        </div>
      </Link>

      <Link to={`/product/${product.id}`} className="mt-3.5 flex-1 flex flex-col">
        <p className="text-[11px] font-mono uppercase tracking-wide text-ink/40">{product.team} · {product.season}</p>
        <h3 className="font-semibold text-sm mt-0.5 leading-snug line-clamp-2 group-hover:text-pitch-dark transition-colors">
          {product.name}
        </h3>
        <Rating value={product.rating} count={product.reviewCount} className="mt-1.5" />
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-mono font-bold text-sm">{formatCurrency(product.discountPrice || product.price)}</span>
          {product.discountPrice && (
            <span className="font-mono text-xs text-ink/35 line-through">{formatCurrency(product.price)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
