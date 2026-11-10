import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { classNames } from "../../utils/format";
import Modal from "../common/Modal";
import Button from "../common/Button";

export function SizeSelector({ sizes, selected, onSelect }) {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Select Size</span>
        <button onClick={() => setGuideOpen(true)} className="text-xs font-semibold text-pitch-dark underline underline-offset-2">
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {sizes.map((s) => {
          const disabled = s.stock === 0;
          const isSelected = selected === s.size;
          return (
            <button
              key={s.size}
              disabled={disabled}
              onClick={() => onSelect(s.size)}
              className={classNames(
                "relative h-11 rounded-lg text-sm font-semibold border transition-all",
                disabled
                  ? "border-black/5 text-ink/25 line-through cursor-not-allowed"
                  : isSelected
                  ? "border-pitch bg-pitch text-ink"
                  : "border-black/15 hover:border-ink"
              )}
              aria-label={disabled ? `${s.size}, out of stock` : `Size ${s.size}`}
            >
              {s.size}
            </button>
          );
        })}
      </div>

      <Modal open={guideOpen} onClose={() => setGuideOpen(false)} title="Size Guide">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/50 text-xs uppercase font-mono">
              <th className="pb-2">Size</th>
              <th className="pb-2">Chest (in)</th>
              <th className="pb-2">Length (in)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {[
              ["XS", "34-36", "26"],
              ["S", "36-38", "27"],
              ["M", "38-40", "28"],
              ["L", "40-42", "29"],
              ["XL", "42-44", "30"],
              ["XXL", "44-46", "31"],
            ].map((row) => (
              <tr key={row[0]}>
                <td className="py-2 font-semibold">{row[0]}</td>
                <td className="py-2 text-white/70">{row[1]}</td>
                <td className="py-2 text-white/70">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-white/40 mt-4">Measurements are approximate. For a looser fit, we recommend sizing up.</p>
      </Modal>
    </div>
  );
}

export function QuantitySelector({ value, onChange, max = 10 }) {
  return (
    <div className="flex items-center border border-black/15 rounded-pill w-fit">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-semibold font-mono">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
