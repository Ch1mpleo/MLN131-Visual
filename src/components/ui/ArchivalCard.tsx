import { cn } from "@/lib/utils";

interface ArchivalCardProps {
  children: React.ReactNode;
  label?: string;
  number?: string;
  className?: string;
  variant?: "cream" | "ink" | "blood";
}

export default function ArchivalCard({
  children,
  label,
  number,
  className,
  variant = "cream",
}: ArchivalCardProps) {
  const variants = {
    cream: "bg-bone text-ink border-ink",
    ink: "bg-ink text-cream border-cream",
    blood: "bg-blood text-cream border-ink",
  };

  return (
    <article
      className={cn(
        "relative border-2 p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1",
        "shadow-[6px_6px_0_rgba(26,26,26,0.9)]",
        variants[variant],
        className,
      )}
    >
      {(label || number) && (
        <header className="mb-4 flex items-center justify-between">
          {label && (
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-70">
              {label}
            </span>
          )}
          {number && (
            <span className="font-headline text-4xl md:text-5xl leading-none opacity-90">
              {number}
            </span>
          )}
        </header>
      )}
      <div className="serif text-base md:text-[1.05rem] leading-relaxed">
        {children}
      </div>
    </article>
  );
}
