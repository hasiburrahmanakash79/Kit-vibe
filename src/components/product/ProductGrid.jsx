import ProductCard from "./ProductCard";
import { ProductCardSkeleton, EmptyState } from "../common/Misc";
import { PackageSearch } from "lucide-react";

export default function ProductGrid({ products, loading, columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4", onQuickView }) {
  if (loading) {
    return (
      <div className={`grid ${columns} gap-x-5 gap-y-10`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch size={26} className="text-ink/40" />}
        title="No jerseys found"
        message="Try adjusting your filters or search terms to find what you're looking for."
      />
    );
  }

  return (
    <div className={`grid ${columns} gap-x-5 gap-y-10`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
