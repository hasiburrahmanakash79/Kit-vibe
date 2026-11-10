import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { products } from "../../data/products";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { formatCurrency } from "../../utils/format";

const POPULAR = ["Meridian FC", "Retro jerseys", "Costa Verdana", "Kids kits", "Player issue"];

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useLocalStorage("kitvibe_recent_searches", []);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.trim()
    ? products
        .filter((p) =>
          [p.name, p.team, p.player, p.category, p.season].join(" ").toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const commitSearch = (term) => {
    if (!term.trim()) return;
    setRecent((prev) => [term, ...prev.filter((t) => t !== term)].slice(0, 5));
    navigate(`/shop?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[95] bg-ink/80 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true" aria-label="Search">
      <div className="bg-paper max-w-2xl mx-auto mt-16 md:mt-24 rounded-card shadow-premium overflow-hidden animate-scaleIn mx-4">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/10">
          <Search size={18} className="text-ink/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commitSearch(query)}
            placeholder="Search jerseys, teams, players..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink/35"
          />
          <button onClick={onClose} aria-label="Close search" className="text-ink/40 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {query.trim() === "" ? (
            <div className="space-y-6">
              {recent.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-2.5 flex items-center gap-1.5">
                    <Clock size={12} /> Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((t) => (
                      <button
                        key={t}
                        onClick={() => commitSearch(t)}
                        className="px-3 py-1.5 rounded-pill bg-black/5 text-xs font-medium hover:bg-black/10"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-2.5 flex items-center gap-1.5">
                  <TrendingUp size={12} /> Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map((t) => (
                    <button
                      key={t}
                      onClick={() => commitSearch(t)}
                      className="px-3 py-1.5 rounded-pill bg-black/5 text-xs font-medium hover:bg-black/10"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="text-sm text-ink/50 py-8 text-center">No jerseys match "{query}".</p>
          ) : (
            <div className="space-y-1">
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => commitSearch(p.name)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 text-left"
                >
                  <img src={p.images[0]} alt="" className="w-12 h-14 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{p.name}</p>
                    <p className="text-xs text-ink/45">{p.team} · {p.season}</p>
                  </div>
                  <span className="text-sm font-mono font-semibold">{formatCurrency(p.discountPrice || p.price)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
