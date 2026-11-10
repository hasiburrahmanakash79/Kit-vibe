import { Star } from "lucide-react";
import { classNames } from "../../utils/format";

export default function Rating({ value = 0, count, size = 14, showValue = true, dark = false, className = "" }) {
  return (
    <div className={classNames("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(value) ? "fill-pitch text-pitch" : classNames(dark ? "text-white/20" : "text-black/15")}
          />
        ))}
      </div>
      {showValue && (
        <span className={classNames("text-xs font-mono", dark ? "text-white/60" : "text-ink/55")}>
          {value.toFixed(1)}
          {count !== undefined && ` (${count})`}
        </span>
      )}
    </div>
  );
}
