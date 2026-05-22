import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  year?: string;
}

interface Props {
  open: boolean;
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export default function ImageLightbox({
  open,
  images,
  index,
  onClose,
  onIndexChange,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && images.length > 1) {
        onIndexChange((index + 1) % images.length);
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        onIndexChange((index - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, index, images.length, onClose, onIndexChange]);

  if (!open) return null;
  const img = images[index];
  if (!img) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10",
        "bg-ink/90 backdrop-blur-sm",
        "animate-in fade-in-0 duration-300",
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 grid place-items-center bg-blood text-cream border-2 border-cream shadow-[4px_4px_0_#1A1A1A] hover:scale-110 hover:-rotate-6 transition-all duration-200 z-10"
        aria-label="Đóng"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Nav buttons for galleries */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + images.length) % images.length);
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 grid place-items-center bg-ink text-cream border-2 border-cream shadow-[4px_4px_0_#D32F2F] hover:scale-110 hover:-translate-x-1 transition-all duration-200 z-10"
            aria-label="Ảnh trước"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % images.length);
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 grid place-items-center bg-ink text-cream border-2 border-cream shadow-[4px_4px_0_#D32F2F] hover:scale-110 hover:translate-x-1 transition-all duration-200 z-10"
            aria-label="Ảnh kế"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Figure — animated in */}
      <figure
        key={index}
        className="relative max-w-full max-h-full flex flex-col items-center gap-5 animate-in fade-in-0 zoom-in-95 duration-400 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-4 border-cream shadow-[12px_12px_0_#D32F2F] bg-ink">
          <img
            src={img.src}
            alt={img.alt}
            className="block max-w-[92vw] max-h-[72vh] w-auto h-auto"
          />
          {img.year && (
            <div className="absolute top-0 right-0 bg-blood text-cream font-headline text-sm md:text-base px-3 py-1.5 leading-none">
              {img.year}
            </div>
          )}
        </div>

        <figcaption className="max-w-2xl text-center px-4">
          {img.caption && (
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-cream leading-snug">
              {img.caption}
            </p>
          )}
          {img.credit && (
            <p className="mt-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/60">
              {img.credit}
            </p>
          )}
          {images.length > 1 && (
            <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-flagYellow">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
