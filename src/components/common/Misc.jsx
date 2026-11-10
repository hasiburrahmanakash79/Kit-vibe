import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/format";
import Button from "./Button";

export function Tabs({ tabs, defaultTab, onChange, dark }) {
  const [active, setActive] = useState(defaultTab || tabs[0].id);
  const select = (id) => {
    setActive(id);
    onChange && onChange(id);
  };
  return (
    <div>
      <div className={classNames("flex gap-1 overflow-x-auto border-b", dark ? "border-white/10" : "border-black/10")}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            className={classNames(
              "px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors",
              active === t.id
                ? "border-pitch text-pitch-dark"
                : dark
                ? "border-transparent text-white/50 hover:text-white"
                : "border-transparent text-ink/45 hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-6">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs text-ink/45 font-medium">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <Link to={item.href} className="hover:text-pitch-dark transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink/70">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={12} />}
        </span>
      ))}
    </nav>
  );
}

export function EmptyState({ icon, title, message, actionLabel, actionTo, dark }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <div className={classNames("w-16 h-16 rounded-full flex items-center justify-center mb-5", dark ? "bg-white/5" : "bg-black/5")}>
        {icon}
      </div>
      <h3 className="font-display text-2xl mb-2 tracking-wide">{title}</h3>
      <p className={classNames("text-sm max-w-sm mb-6", dark ? "text-white/50" : "text-ink/50")}>{message}</p>
      {actionLabel && (
        <Button as={Link} to={actionTo}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-pill border border-black/10 text-sm font-semibold disabled:opacity-30 hover:border-pitch transition-colors"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={classNames(
            "w-9 h-9 rounded-full text-sm font-semibold transition-colors",
            n === page ? "bg-ink text-white" : "hover:bg-black/5"
          )}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-pill border border-black/10 text-sm font-semibold disabled:opacity-30 hover:border-pitch transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-card overflow-hidden border border-black/5">
      <div className="skeleton aspect-[4/5]" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded mt-2" />
      </div>
    </div>
  );
}

export function DotDivider() {
  return <span className="w-1 h-1 rounded-full bg-current opacity-40 inline-block" />;
}
