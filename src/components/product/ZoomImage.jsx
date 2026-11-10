import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";

export default function ZoomImage({ src, alt, onOpenLightbox }) {
  const containerRef = useRef(null);
  const [zoomActive, setZoomActive] = useState(false);
  const [bgPos, setBgPos] = useState("50% 50%");

  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] rounded-card overflow-hidden bg-black/5 cursor-zoom-in group"
      onMouseEnter={() => setZoomActive(true)}
      onMouseLeave={() => setZoomActive(false)}
      onMouseMove={handleMove}
      onClick={onOpenLightbox}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {zoomActive && (
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "230%",
            backgroundPosition: bgPos,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ZoomIn size={16} className="text-ink" />
      </div>
      <p className="md:hidden absolute bottom-3 left-3 text-[11px] font-mono bg-ink/70 text-white px-2 py-1 rounded-pill">
        Tap to zoom
      </p>
    </div>
  );
}
