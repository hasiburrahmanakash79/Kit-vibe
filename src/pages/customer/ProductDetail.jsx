import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Heart, Truck, RotateCcw, ShieldCheck, Check, Star } from "lucide-react";
import { getProductById, getRelatedProducts } from "../../data/products";
import { getReviewsForProduct } from "../../data/reviews";
import ImageGallery from "../../components/product/ImageGallery";
import { SizeSelector, QuantitySelector } from "../../components/product/Selectors";
import Rating from "../../components/common/Rating";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import { Breadcrumb } from "../../components/common/Misc";
import { Tabs } from "../../components/common/Misc";
import { Field, Textarea } from "../../components/common/FormFields";
import ProductGrid from "../../components/product/ProductGrid";
import { formatCurrency, formatDate } from "../../utils/format";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNotification } from "../../context/NotificationContext";
import CoachMark from "../../components/common/CoachMark";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const cart = useCart();
  const wishlist = useWishlist();
  const notification = useNotification();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [localReviews, setLocalReviews] = useState(() => (product ? getReviewsForProduct(product.id) : []));
  const [wishlistAdded, setWishlistAdded] = useState(false);

  if (!product) return <NotFound />;

  const related = getRelatedProducts(product);
  const discount = product.discountPrice ? Math.round(100 - (product.discountPrice / product.price) * 100) : null;
  const wishlisted = wishlist?.isWishlisted(product.id);

  const requireSize = (action) => {
    if (!size) {
      setSizeError(true);
      notification?.warning("Please select a size before continuing.");
      return;
    }
    setSizeError(false);
    action();
  };

  const handleAddToCart = () => requireSize(() => cart.addToCart(product, size, qty));
  const handleBuyNow = () => requireSize(() => {
    cart.addToCart(product, size, qty);
    navigate("/checkout");
  });

  const handleWishlist = () => {
    wishlist.toggleWishlist(product);
    setWishlistAdded(true);
    setTimeout(() => setWishlistAdded(false), 1800);
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: localReviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.category[0].toUpperCase() + product.category.slice(1), href: `/shop/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-6">
        <ImageGallery images={product.images} productName={product.name} />

        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-pitch-dark">{product.team} · {product.season}</p>
          <h1 className="font-display text-3xl md:text-4xl mt-1 tracking-wide leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <Rating value={product.rating} count={product.reviewCount} />
            {product.stock > 0 ? (
              <span className="text-xs font-semibold text-pitch-dark">In Stock</span>
            ) : (
              <span className="text-xs font-semibold text-red-500">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-5">
            <span className="font-mono font-bold text-2xl">{formatCurrency(product.discountPrice || product.price)}</span>
            {product.discountPrice && (
              <>
                <span className="font-mono text-base text-ink/35 line-through">{formatCurrency(product.price)}</span>
                <Badge tone="pitch">-{discount}%</Badge>
              </>
            )}
          </div>

          <p className="text-sm text-ink/60 leading-relaxed mt-5 max-w-lg">{product.description}</p>

          <div className="mt-7 relative">
            <SizeSelector sizes={product.sizes} selected={size} onSelect={(s) => { setSize(s); setSizeError(false); }} />
            {sizeError && <p className="text-xs text-red-500 font-medium mt-2">Select a size to continue.</p>}
            <CoachMark id="tip-size" text="Not sure which size fits? Check the size guide before adding to your bag." position="bottom" className="left-0 translate-x-0" />
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/60 mb-2.5">Quantity</p>
              <QuantitySelector value={qty} onChange={setQty} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button onClick={handleAddToCart} size="lg" className="flex-1">Add to Cart</Button>
            <Button onClick={handleBuyNow} size="lg" variant="dark" className="flex-1">Buy Now</Button>
          </div>
          <button
            onClick={handleWishlist}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-pitch-dark transition-colors"
          >
            {wishlisted || wishlistAdded ? (
              <>
                <Check size={16} className="text-pitch-dark" /> Added to Wishlist
              </>
            ) : (
              <>
                <Heart size={16} /> Add to Wishlist
              </>
            )}
          </button>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-black/8">
            <div className="text-center">
              <Truck size={18} className="mx-auto text-pitch-dark mb-1.5" />
              <p className="text-[11px] text-ink/50 leading-tight">Free shipping over $100</p>
            </div>
            <div className="text-center">
              <RotateCcw size={18} className="mx-auto text-pitch-dark mb-1.5" />
              <p className="text-[11px] text-ink/50 leading-tight">30-day easy returns</p>
            </div>
            <div className="text-center">
              <ShieldCheck size={18} className="mx-auto text-pitch-dark mb-1.5" />
              <p className="text-[11px] text-ink/50 leading-tight">Secure checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-16 max-w-4xl">
        <Tabs
          tabs={[
            { id: "desc", label: "Description", content: <p className="text-sm text-ink/65 leading-relaxed">{product.description}</p> },
            {
              id: "details",
              label: "Details",
              content: (
                <ul className="space-y-2">
                  {product.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-ink/65">
                      <Check size={14} className="text-pitch-dark mt-0.5 shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "size",
              label: "Size Guide",
              content: (
                <table className="w-full text-sm max-w-md">
                  <thead>
                    <tr className="text-left text-ink/45 text-xs uppercase font-mono">
                      <th className="pb-2">Size</th><th className="pb-2">Chest (in)</th><th className="pb-2">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/8">
                    {[["XS","34-36","26"],["S","36-38","27"],["M","38-40","28"],["L","40-42","29"],["XL","42-44","30"],["XXL","44-46","31"]].map((r) => (
                      <tr key={r[0]}><td className="py-2 font-semibold">{r[0]}</td><td className="py-2 text-ink/60">{r[1]}</td><td className="py-2 text-ink/60">{r[2]}</td></tr>
                    ))}
                  </tbody>
                </table>
              ),
            },
            { id: "shipping", label: "Shipping", content: <p className="text-sm text-ink/65 leading-relaxed">Standard delivery in 4–6 business days, or Express in 1–2 business days. Orders over $100 ship free. See our <Link to='/shipping-policy' className='underline'>Shipping Policy</Link> for details.</p> },
            { id: "returns", label: "Returns", content: <p className="text-sm text-ink/65 leading-relaxed">Unworn jerseys with tags attached can be returned within 30 days for a full refund. See our <Link to='/return-policy' className='underline'>Return Policy</Link> for details.</p> },
          ]}
        />
      </div>

      {/* REVIEWS */}
      <div className="mt-16 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="md:w-64 shrink-0">
            <p className="font-display text-5xl tracking-wide">{product.rating.toFixed(1)}</p>
            <Rating value={product.rating} showValue={false} size={16} className="mt-2" />
            <p className="text-sm text-ink/50 mt-1">{product.reviewCount} reviews</p>
            <div className="mt-5 space-y-1.5">
              {ratingBreakdown.map((b) => (
                <div key={b.star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 font-mono">{b.star}</span>
                  <Star size={11} className="fill-pitch text-pitch" />
                  <div className="flex-1 h-1.5 bg-black/8 rounded-full overflow-hidden">
                    <div className="h-full bg-pitch" style={{ width: `${localReviews.length ? (b.count / localReviews.length) * 100 : 0}%` }} />
                  </div>
                  <span className="w-4 text-ink/40 font-mono">{b.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <ReviewForm product={product} onSubmitReview={(r) => setLocalReviews((prev) => [r, ...prev])} />
            <div className="space-y-6 mt-8">
              {localReviews.length === 0 && <p className="text-sm text-ink/45">Be the first to review this jersey.</p>}
              {localReviews.map((r) => (
                <div key={r.id} className="border-b border-black/8 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-pitch/15 text-pitch-dark flex items-center justify-center text-xs font-bold">{r.avatar || r.customer[0]}</div>
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        {r.customer}
                        {r.verified && <Badge tone="outline" className="!py-0.5">Verified Purchase</Badge>}
                      </p>
                      <p className="text-xs text-ink/40">{formatDate(r.date)}</p>
                    </div>
                  </div>
                  <Rating value={r.rating} showValue={false} size={13} />
                  <p className="text-sm text-ink/65 leading-relaxed mt-2">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl tracking-wide mb-6">You May Also Like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}

function ReviewForm({ product, onSubmitReview }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [rating, setRating] = useState(5);
  const [open, setOpen] = useState(false);
  const notification = useNotification();

  const onSubmit = (data) => {
    onSubmitReview({
      id: `local-${Date.now()}`,
      customer: data.name,
      avatar: data.name.slice(0, 2).toUpperCase(),
      rating,
      date: new Date().toISOString(),
      verified: false,
      text: data.text,
    });
    notification?.success("Thanks for sharing your feedback.", { title: "Review submitted" });
    reset();
    setRating(5);
    setOpen(false);
  };

  if (!open) {
    return <Button variant="outline" onClick={() => setOpen(true)}>Write a Review</Button>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-black/10 rounded-card p-5 space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} type="button" onClick={() => setRating(i)} aria-label={`Rate ${i} stars`}>
            <Star size={22} className={i <= rating ? "fill-pitch text-pitch" : "text-black/15"} />
          </button>
        ))}
      </div>
      <Field label="Your Name" required error={errors.name?.message}>
        <input className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pitch/40" {...register("name", { required: "Name is required" })} />
      </Field>
      <Field label="Your Review" required error={errors.text?.message}>
        <Textarea rows={4} placeholder={`Tell other fans what you think of the ${product.name}...`} {...register("text", { required: "Please write a review", minLength: { value: 10, message: "Please write a bit more" } })} />
      </Field>
      <div className="flex gap-3">
        <Button type="submit">Submit Review</Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </form>
  );
}
