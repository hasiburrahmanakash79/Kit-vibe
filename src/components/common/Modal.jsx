import { useEffect } from "react";
import { X } from "lucide-react";
import { classNames } from "../../utils/format";

export default function Modal({ open, onClose, title, children, size = "md", footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={classNames(
          "relative w-full bg-charcoal text-white rounded-card border border-line shadow-premium animate-scaleIn max-h-[90vh] flex flex-col",
          sizes[size]
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-line shrink-0">
          <h3 className="font-display text-lg tracking-wide">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-white/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-line flex justify-end gap-3 shrink-0">{footer}</div>}
      </div>
    </div>
  );
}
