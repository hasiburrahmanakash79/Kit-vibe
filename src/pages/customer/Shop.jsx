import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "../../data/products";
import { categories, getCategoryById } from "../../data/categories";
import ProductGrid from "../../components/product/ProductGrid";
import { Breadcrumb, Pagination } from "../../components/common/Misc";
import { Select, Checkbox } from "../../components/common/FormFields";
import Button from "../../components/common/Button";
import { classNames } from "../../utils/format";

const PAGE_SIZE = 8;
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Best Rated" },
  { id: "popular", label: "Most Popular" },
];

export default function Shop() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("featured");

  const [selectedCats, setSelectedCats] = useState(category ? [category] : []);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(150);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const query = searchParams.get("q") || "";
  const filterParam = searchParams.get("filter");

  useEffect(() => {
    setSelectedCats(category ? [category] : []);
    setPage(1);
  }, [category]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const toggleCat = (id) => {
    setSelectedCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
    setPage(1);
  };
  const toggleSize = (s) => {
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => [p.name, p.team, p.player, p.category, p.season].join(" ").toLowerCase().includes(q));
    }
    if (filterParam === "new") list = list.filter((p) => p.newArrival);
    if (filterParam === "best") list = list.filter((p) => p.bestSeller);
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    if (selectedSizes.length) list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s.size) && s.stock > 0));
    list = list.filter((p) => (p.discountPrice || p.price) <= priceRange);
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);

    switch (sort) {
      case "newest": list.sort((a, b) => (b.newArrival === a.newArrival ? 0 : b.newArrival ? 1 : -1)); break;
      case "price-asc": list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)); break;
      case "price-desc": list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "popular": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: list.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    }
    return list;
  }, [query, filterParam, selectedCats, selectedSizes, priceRange, minRating, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCategory = category ? getCategoryById(category) : null;

  const clearFilters = () => {
    setSelectedCats([]);
    setSelectedSizes([]);
    setPriceRange(150);
    setMinRating(0);
    setInStockOnly(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: activeCategory ? activeCategory.name : "Shop" }]} />
      <div className="flex flex-col md:flex-row md:items-end justify-between mt-3 mb-8 gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-wide">
            {activeCategory ? activeCategory.name : query ? `Results for "${query}"` : "Shop All Jerseys"}
          </h1>
          <p className="text-ink/50 text-sm mt-1">{filtered.length} jerseys{activeCategory ? ` in ${activeCategory.name}` : ""}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-pill border border-black/15 text-sm font-semibold"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="!w-auto !py-2.5">
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>Sort: {s.label}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterPanel
            selectedCats={selectedCats} toggleCat={toggleCat}
            selectedSizes={selectedSizes} toggleSize={toggleSize}
            priceRange={priceRange} setPriceRange={setPriceRange}
            minRating={minRating} setMinRating={setMinRating}
            inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
            clearFilters={clearFilters}
          />
        </aside>

        <div className="flex-1 min-w-0">
          <ProductGrid products={paged} loading={loading} />
          <Pagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 300, behavior: "smooth" }); }} />
        </div>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-ink/70" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-paper p-6 overflow-y-auto animate-slideInRight">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl tracking-wide">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={20} /></button>
            </div>
            <FilterPanel
              selectedCats={selectedCats} toggleCat={toggleCat}
              selectedSizes={selectedSizes} toggleSize={toggleSize}
              priceRange={priceRange} setPriceRange={setPriceRange}
              minRating={minRating} setMinRating={setMinRating}
              inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
              clearFilters={clearFilters}
            />
            <Button full className="mt-6" onClick={() => setFiltersOpen(false)}>Show {filtered.length} Results</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({ selectedCats, toggleCat, selectedSizes, toggleSize, priceRange, setPriceRange, minRating, setMinRating, inStockOnly, setInStockOnly, clearFilters }) {
  return (
    <div className="space-y-7">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Filters</h3>
        <button onClick={clearFilters} className="text-xs text-pitch-dark font-semibold underline underline-offset-2">Clear all</button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Category</p>
        <div className="space-y-2">
          {categories.map((c) => (
            <Checkbox key={c.id} label={c.name} checked={selectedCats.includes(c.id)} onChange={() => toggleCat(c.id)} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={classNames(
                "w-10 h-10 rounded-lg text-xs font-semibold border transition-colors",
                selectedSizes.includes(s) ? "bg-ink text-white border-ink" : "border-black/15 hover:border-ink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">Max Price</p>
          <span className="text-xs font-mono font-semibold">${priceRange}</span>
        </div>
        <input
          type="range" min={30} max={150} step={5} value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-pitch"
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Rating</p>
        <div className="space-y-2">
          {[4, 3, 0].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-pitch" />
              {r === 0 ? "Any rating" : `${r}+ stars`}
            </label>
          ))}
        </div>
      </div>

      <Checkbox label="In stock only" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
    </div>
  );
}
