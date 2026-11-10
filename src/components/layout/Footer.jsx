import { Link } from "react-router-dom";
import { Camera, AtSign, Users, Play } from "lucide-react";

const COLS = [
  {
    title: "Shop",
    links: [
      { label: "All Jerseys", to: "/shop" },
      { label: "New Arrivals", to: "/shop?filter=new" },
      { label: "Best Sellers", to: "/shop?filter=best" },
      { label: "Club Jerseys", to: "/shop/club" },
      { label: "National Jerseys", to: "/shop/national" },
      { label: "Retro Jerseys", to: "/shop/retro" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Shipping", to: "/shipping-policy" },
      { label: "Returns", to: "/return-policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About KitVibe", to: "/about" },
      { label: "Privacy", to: "/privacy-policy" },
      { label: "Terms", to: "/terms" },
      { label: "Admin", to: "/admin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-line">
          <div className="col-span-2">
            <span className="font-display text-2xl tracking-wide">KIT<span className="text-pitch">VIBE</span></span>
            <p className="text-white/50 text-sm mt-3 max-w-xs leading-relaxed">
              Wear the game. Live the vibe. Premium football jerseys for fans who live the sport.
            </p>
            <div className="flex gap-3 mt-5">
              {[Camera, AtSign, Users, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-pitch hover:text-ink hover:border-pitch transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-white/70 hover:text-pitch transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 text-xs text-white/40">
          <p>© 2026 KitVibe. All rights reserved.</p>
          <p className="font-mono">Built for fans who live the sport.</p>
        </div>
      </div>
    </footer>
  );
}
