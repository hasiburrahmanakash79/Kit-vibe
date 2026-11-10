import { Menu, Bell, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminHeader({ title, subtitle, onMenuClick, actions }) {
  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-black/8">
      <div className="flex items-center justify-between px-5 md:px-8 h-16">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onMenuClick} className="lg:hidden text-ink/70" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="font-display text-xl tracking-wide truncate">{title}</h1>
            {subtitle && <p className="text-xs text-ink/45 truncate">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          <button aria-label="Notifications" className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center relative">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pitch rounded-full" />
          </button>
          <Link
            to="/"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-pill border border-black/10 hover:border-ink"
          >
            View Store <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </header>
  );
}
