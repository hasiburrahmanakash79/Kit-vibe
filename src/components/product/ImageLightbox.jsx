import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { classNames } from "../../utils/format";

export default function ImageLightbox({ images, index, onClose, onNavigate }) {
  const next = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);
  const prev = useCallback(() => onNavigate((index - 1 + images.length) % images.length), [index, images.length, onNavigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  return (
    <div className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur flex flex-col animate-fadeIn" role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="flex justify-between items-center px-5 py-4 shrink-0">
        <span className="text-white/50 text-xs font-mono">{index + 1} / {images.length}</span>
        <button onClick={onClose} aria-label="Close viewer" className="text-white/70 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative px-4 min-h-0">
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 md:left-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <img src={images[index]} alt={`Product view ${index + 1}`} className="max-h-full max-w-full object-contain rounded-lg" />
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="flex justify-center gap-2 py-5 px-4 overflow-x-auto shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={classNames(
              "w-14 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors",
              i === index ? "border-pitch" : "border-transparent opacity-50 hover:opacity-80"
            )}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
