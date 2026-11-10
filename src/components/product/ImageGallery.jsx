import { useState } from "react";
import ZoomImage from "./ZoomImage";
import ImageLightbox from "./ImageLightbox";
import { classNames } from "../../utils/format";
import CoachMark from "../common/CoachMark";

export default function ImageGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={classNames(
              "w-16 h-20 md:w-20 md:h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-colors",
              active === i ? "border-pitch" : "border-black/5 hover:border-black/20"
            )}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="relative flex-1">
        <ZoomImage src={images[active]} alt={productName} onOpenLightbox={() => setLightboxOpen(true)} />
        <CoachMark
          id="tip-zoom"
          text="Hover over the jersey to zoom in on the fabric and stitching detail."
          position="bottom"
          className="left-1/2 top-4"
        />
      </div>

      {lightboxOpen && (
        <ImageLightbox images={images} index={active} onClose={() => setLightboxOpen(false)} onNavigate={setActive} />
      )}
    </div>
  );
}
