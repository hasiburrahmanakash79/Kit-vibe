import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import SearchOverlay from "./SearchOverlay";
import { classNames } from "../../utils/format";
import { categories } from "../../data/categories";
import CoachMark from "../common/CoachMark";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "New Arrivals", to: "/shop?filter=new" },
  { label: "Best Sellers", to: "/shop?filter=best" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={classNames(
          "sticky top-0 z-50 transition-all duration-300 border-b border-stone-800",
          scrolled ? "bg-ink/95 backdrop-blur" : "bg-ink"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[70px]">
            <div className="flex items-center gap-8">
              <button className="lg:hidden text-white" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu size={22} />
              </button>
              <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="KitVibe home">
                <span className="font-display text-2xl text-white tracking-wide">KIT<span className="text-pitch">VIBE</span></span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {LINKS.map((l) => (
                  <NavLink
                    key={l.label}
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      classNames(
                        "px-3.5 py-2 text-sm font-medium rounded-pill transition-colors",
                        isActive ? "text-pitch" : "text-white/75 hover:text-white"
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
                  <button className="px-3.5 py-2 text-sm font-medium rounded-pill text-white/75 hover:text-white flex items-center gap-1">
                    Categories <ChevronDown size={14} />
                  </button>
                  {catOpen && (
                    <div className="absolute top-full left-0 pt-2 w-56 animate-fadeIn">
                      <div className="bg-charcoal border border-line rounded-xl shadow-premium py-2">
                        {categories.map((c) => (
                          <Link
                            key={c.id}
                            to={`/shop/${c.slug}`}
                            className="block px-4 py-2.5 text-sm text-white/80 hover:text-pitch hover:bg-white/5"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Search size={19} />
              </button>
              <div className="relative">
                <Link
                  to="/wishlist"
                  aria-label="Wishlist"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors relative"
                >
                  <Heart size={19} />
                  {wishlist?.count > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-pitch text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlist.count}
                    </span>
                  )}
                </Link>
                <CoachMark id="tip-wishlist-nav" text="Saved jerseys land here. Tap the heart on any product to add one." position="bottom" className="right-0 left-auto translate-x-0" />
              </div>
              <div className="relative">
                <Link
                  to="/cart"
                  aria-label="Cart"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors relative"
                >
                  <ShoppingBag size={19} />
                  {cart?.count > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-pitch text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cart.count}
                    </span>
                  )}
                </Link>
              </div>
              <button
                onClick={() => navigate(auth?.isAuthenticated ? "/profile" : "/login")}
                aria-label="Account"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <User size={19} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-fadeIn" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-ink border-r border-line p-6 animate-slideInRight" style={{ animationName: "fadeIn" }}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-display text-xl text-white">KIT<span className="text-pitch">VIBE</span></span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-white/70">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link key={l.label} to={l.to} onClick={() => setMobileOpen(false)} className="py-3 text-white/85 text-sm font-medium border-b border-line">
                  {l.label}
                </Link>
              ))}
              <p className="text-xs uppercase text-white/40 mt-4 mb-1 font-mono">Categories</p>
              {categories.map((c) => (
                <Link key={c.id} to={`/shop/${c.slug}`} onClick={() => setMobileOpen(false)} className="py-2.5 text-white/70 text-sm">
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
