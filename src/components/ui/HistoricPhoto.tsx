import { useState } from "react";
import { cn } from "@/lib/utils";
import ImageLightbox from "./ImageLightbox";

interface HistoricPhotoProps {
  /**
   * 📷 PUT YOUR IMAGE URL HERE
   * Example: src="https://upload.wikimedia.org/..."
   * Leave empty to show the placeholder guide.
   */
  src?: string;
  alt: string;
  caption?: string;
  captionIcon?: string;
  captionIconAlt?: string;
  credit?: string;
  year?: string;
  className?: string;
  /** Visual frame size of the placeholder (no image). Real images size naturally. Default: "landscape" */
  aspect?: "landscape" | "portrait" | "square" | "wide";
  /** Grayscale by default (historical), hover reveals original colour */
  colorize?: boolean;
  /** Maximum height to cap very large images. Default: "70vh" */
  maxHeight?: string;
  /** Fill the parent height (e.g. card header strip). Parent must set height. */
  fill?: boolean;
  /** How the image fits inside its box when fill is true. Default: "contain" */
  objectFit?: "contain" | "cover";
  /** Focal point for cover crop */
  objectPosition?: string;
  /** Click to open full-screen viewer. Default: true */
  enableLightbox?: boolean;
}

const PLACEHOLDER_ASPECT = {
  landscape: "aspect-[16/7]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[21/8]",
} as const;

export default function HistoricPhoto({
  src,
  alt,
  caption,
  captionIcon,
  captionIconAlt,
  credit,
  year,
  className,
  aspect = "landscape",
  colorize = true,
  maxHeight = "70vh",
  fill = false,
  objectFit = "contain",
  objectPosition = "center",
  enableLightbox = true,
}: HistoricPhotoProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <figure
        className={cn(
          "group relative flex flex-col gap-0 border-2 border-ink shadow-[6px_6px_0_#1A1A1A] overflow-hidden",
          fill && "h-full min-h-0",
          className,
        )}
      >
        {/* Image or placeholder — contain by default; cover fill for card headers */}
        <div
          className={cn(
            "relative w-full bg-ink flex items-center justify-center",
            fill ? "h-full min-h-0" : "",
          )}
        >
          {src ? (
            enableLightbox ? (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className={cn(
                  "relative cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-blood",
                  fill ? "block h-full w-full" : "block w-full",
                )}
                aria-label={`Phóng to ảnh: ${alt}`}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    maxHeight: fill ? undefined : maxHeight,
                    objectPosition,
                  }}
                  className={cn(
                    "transition-all duration-700",
                    fill
                      ? cn(
                          "block h-full w-full",
                          objectFit === "cover" ? "object-cover" : "object-contain",
                        )
                      : "mx-auto block h-auto w-auto max-w-full object-contain",
                    colorize
                      ? "grayscale group-hover:grayscale-0"
                      : "grayscale-0",
                  )}
                />

                <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 border border-cream/40 bg-ink/80 px-3 py-1.5 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M4 4h6M4 4v6M4 4l7 7M20 4h-6M20 4v6M20 4l-7 7M4 20h6M4 20v-6M4 20l7-7M20 20h-6M20 20v-6M20 20l-7-7" strokeLinecap="round" />
                  </svg>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em]">
                    Phóng to
                  </span>
                </div>
              </button>
            ) : (
              <div className={cn("relative", fill ? "h-full w-full" : "w-full")}>
                <img
                  src={src}
                  alt={alt}
                  style={{
                    maxHeight: fill ? undefined : maxHeight,
                    objectPosition,
                  }}
                  className={cn(
                    "transition-all duration-700",
                    fill
                      ? cn(
                          "block h-full w-full",
                          objectFit === "cover" ? "object-cover" : "object-contain",
                        )
                      : "mx-auto block h-auto w-auto max-w-full object-contain",
                    colorize
                      ? "grayscale group-hover:grayscale-0"
                      : "grayscale-0",
                  )}
                />
              </div>
            )
          ) : (
            /* ─── PLACEHOLDER — shown when no src is provided ─── */
            <div
              className={cn(
                "w-full flex flex-col items-center justify-center gap-3 bg-bone border-4 border-dashed border-ink/30 p-6",
                PLACEHOLDER_ASPECT[aspect],
              )}
            >
              <svg
                viewBox="0 0 48 48"
                className="h-10 w-10 opacity-40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="8" width="40" height="32" rx="2" stroke="#1A1A1A" strokeWidth="2" />
                <circle cx="16" cy="20" r="4" stroke="#1A1A1A" strokeWidth="2" />
                <path d="M4 36l10-10 8 8 6-6 10 8" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 text-center leading-relaxed">
                Thêm ảnh lịch sử tại đây
              </p>
              <code className="font-mono text-[9px] bg-ink/10 px-2 py-1 text-ink/60 text-center break-all">
                src="https://your-image-url.jpg"
              </code>
              {alt && (
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/40 text-center">
                  alt: {alt}
                </p>
              )}
            </div>
          )}

          {/* Top-right corner: year badge */}
          {year && (
            <div className="absolute top-0 right-0 bg-blood text-cream font-headline text-sm px-2 py-1 leading-none pointer-events-none">
              {year}
            </div>
          )}

          {/* Grain overlay on real photos */}
          {src && (
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
              }}
            />
          )}
        </div>

        {/* Caption strip */}
        {(caption || credit) && (
          <figcaption className="flex items-start justify-between gap-4 bg-ink text-cream px-4 py-2.5">
            {caption && (
              <p className="flex flex-1 items-center gap-2 font-mono text-[9px] uppercase leading-snug tracking-[0.25em] md:text-[10px]">
                {captionIcon && (
                  <img
                    src={captionIcon}
                    alt={captionIconAlt ?? ""}
                    width={32}
                    height={32}
                    className="shrink-0"
                  />
                )}
                {caption}
              </p>
            )}
            {credit && (
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-cream/60 shrink-0 text-right leading-snug">
                {credit}
              </p>
            )}
          </figcaption>
        )}
      </figure>

      {/* Lightbox for full-resolution viewing */}
      {src && enableLightbox && (
        <ImageLightbox
          open={lightboxOpen}
          images={[{ src, alt, caption, credit, year }]}
          index={0}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={() => {}}
        />
      )}
    </>
  );
}
