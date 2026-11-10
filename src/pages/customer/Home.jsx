import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Award, Headphones, Lock, Star } from "lucide-react";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { reviews } from "../../data/reviews";
import ProductGrid from "../../components/product/ProductGrid";
import Button from "../../components/common/Button";
import Rating from "../../components/common/Rating";
import { Field, Input } from "../../components/common/FormFields";
import { useNotification } from "../../context/NotificationContext";
import CoachMark from "../../components/common/CoachMark";

const FEATURES = [
  { icon: Award, title: "Premium Quality", text: "Match-grade fabrics engineered for comfort and durability." },
  { icon: ShieldCheck, title: "Authentic Designs", text: "Every crest and detail faithfully reproduced." },
  { icon: Truck, title: "Fast Delivery", text: "Standard and express shipping across the country." },
  { icon: Lock, title: "Secure Checkout", text: "Your payment details are always protected." },
  { icon: RotateCcw, title: "Easy Returns", text: "30-day hassle-free returns on unworn jerseys." },
  { icon: Headphones, title: "Customer Support", text: "Real humans, ready to help with sizing and orders." },
];

export default function Home() {
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 8);
  const notification = useNotification();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubscribe = () => {
    notification?.success("You're on the list for match-day drops and exclusive offers.", { title: "Subscribed" });
    reset();
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute -right-14 -top-4 select-none pointer-events-none">
          <span className="jersey-num text-[380px] md:text-[520px] font-display">10</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-20 md:pt-24 md:pb-28 relative">
          <div className="max-w-2xl animate-fadeUp">
            <span className="inline-flex items-center gap-2 text-pitch text-xs font-mono uppercase tracking-widest border border-pitch/30 rounded-pill px-3 py-1.5 mb-6">
              2026 Collection Live
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-wide">
              WEAR THE
              <br />
              <span className="text-pitch">GAME.</span>
            </h1>
            <p className="text-white/60 text-base md:text-lg mt-6 max-w-md leading-relaxed italic">
              Premium football jerseys for fans who live the sport. Club, country, and retro — engineered for match day, worn every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <Button as={Link} to="/shop" size="lg" icon={<ArrowRight size={16} className="order-2" />} className="flex-row-reverse">
                Shop Jerseys
              </Button>
              <Button as={Link} to="/shop" size="lg" variant="outlineLight">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-pitch-dark mb-2">Browse</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide">Shop by Category</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/shop/${c.slug}`}
              className="group relative rounded-card overflow-hidden aspect-[4/5] md:aspect-[3/4]"
            >
              <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="font-display text-white text-lg md:text-xl tracking-wide">{c.name}</h3>
                <p className="text-white/60 text-xs mt-1 hidden md:block">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-pitch-dark mb-2">Just Dropped</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide">New Arrivals</h2>
          </div>
          <Link to="/shop?filter=new" className="text-sm font-semibold flex items-center gap-1 hover:text-pitch-dark shrink-0">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      {/* BEST SELLERS */}
      <section className="bg-charcoal py-16 md:py-24 mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-pitch mb-2">Fan Favorites</p>
              <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide">Best Sellers</h2>
            </div>
            <Link to="/shop?filter=best" className="text-sm font-semibold flex items-center gap-1 text-white hover:text-pitch shrink-0">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {bestSellers.map((p) => (
              <div key={p.id} className="[&_p]:text-white/50 [&_h3]:text-white [&_.font-mono.font-bold]:text-white">
                <BestSellerCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="relative bg-pitch-gradient overflow-hidden">
        <div className="absolute -left-16 -bottom-24 select-none pointer-events-none opacity-40">
          <span className="jersey-num-dark text-[320px] font-display" style={{ WebkitTextStroke: "1.5px rgba(10,10,11,0.15)" }}>26</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 relative text-center">
          <p className="text-ink/70 text-xs font-mono uppercase tracking-widest mb-3">Limited Run</p>
          <h2 className="font-display text-4xl md:text-6xl text-ink tracking-wide">THE 2026 COLLECTION</h2>
          <p className="text-ink/70 mt-4 max-w-lg mx-auto">Built for the fans. A capsule of club, country, and retro kits for the year ahead.</p>
          <Button as={Link} to="/shop" variant="dark" size="lg" className="mt-8">
            Explore Collection
          </Button>
        </div>
      </section>

      {/* WHY KITVIBE */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-pitch-dark mb-2">The KitVibe Standard</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-wide">Why KitVibe?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-black/8 rounded-card p-6 hover:border-pitch/50 hover:shadow-premium transition-all">
              <div className="w-11 h-11 rounded-full bg-pitch/15 text-pitch-dark flex items-center justify-center mb-4">
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-black/[0.03] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-pitch-dark mb-2">From the Terrace</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide">Customer Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.id} className="bg-white rounded-card p-6 border border-black/8">
                <Rating value={r.rating} showValue={false} />
                <p className="text-sm text-ink/70 leading-relaxed mt-3 line-clamp-3">"{r.text}"</p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-9 h-9 rounded-full bg-pitch/20 text-pitch-dark flex items-center justify-center text-xs font-bold">{r.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.customer}</p>
                    <p className="text-xs text-ink/40">{r.jersey}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-ink text-white py-16 md:py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl tracking-wide mb-2">Never Miss a Drop</h2>
          <p className="text-white/50 text-sm mb-7">Sign up for match-day releases, restocks, and member-only offers.</p>
          <form onSubmit={handleSubmit(onSubscribe)} className="flex flex-col sm:flex-row gap-3 text-left">
            <div className="flex-1">
              <Input
                dark
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>
            <Button type="submit" size="md">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}

function BestSellerCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-card aspect-[4/5] bg-white/5">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <p className="text-[11px] font-mono uppercase tracking-wide text-white/40 mt-3">{product.team}</p>
      <h3 className="text-white font-semibold text-sm mt-0.5 line-clamp-2">{product.name}</h3>
      <div className="flex items-center gap-1.5 mt-1">
        <Star size={12} className="fill-pitch text-pitch" />
        <span className="text-xs text-white/50 font-mono">{product.rating}</span>
      </div>
      <p className="font-mono font-bold text-white text-sm mt-1">${(product.discountPrice || product.price).toFixed(2)}</p>
    </Link>
  );
}
