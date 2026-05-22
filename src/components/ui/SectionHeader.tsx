import { cn } from "@/lib/utils";
import StampTag from "./StampTag";
import SplitText from "@/components/SplitText";

interface SectionHeaderProps {
  eyebrow?: string;
  phase?: string;
  title: string;
  tagline?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  phase,
  title,
  tagline,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {phase && <StampTag tone="red">{phase}</StampTag>}
        {eyebrow && (
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-ink/70">
            {eyebrow}
          </span>
        )}
      </div>

      <SplitText
        tag="h2"
        text={title}
        textAlign={align}
        className="headline text-[clamp(2.5rem,7vw,6rem)] text-ink max-w-[14ch]"
        delay={35}
        duration={0.9}
        from={{ opacity: 0, y: 60, rotate: -2 }}
        to={{ opacity: 1, y: 0, rotate: 0 }}
      />

      {tagline && (
        <p
          className={cn(
            "serif italic text-ink/80 text-lg md:text-xl max-w-2xl",
            align === "center" && "text-center",
          )}
        >
          {tagline}
        </p>
      )}

      <div
        className={cn(
          "flex items-center gap-2 pt-2",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-[3px] w-16 bg-blood" />
        <span className="h-[3px] w-40 bg-ink" />
      </div>
    </header>
  );
}
