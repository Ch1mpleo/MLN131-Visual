import { cn } from "@/lib/utils";

interface StampTagProps {
  children: React.ReactNode;
  tone?: "red" | "ink" | "cream";
  rotate?: number;
  className?: string;
}

export default function StampTag({
  children,
  tone = "red",
  rotate = -1.5,
  className,
}: StampTagProps) {
  const tones = {
    red: "bg-blood text-cream shadow-[3px_3px_0_#1A1A1A]",
    ink: "bg-ink text-cream shadow-[3px_3px_0_#D32F2F]",
    cream: "bg-cream text-ink border-2 border-ink shadow-[3px_3px_0_#1A1A1A]",
  } as const;

  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "inline-block px-3 py-1.5 font-headline uppercase tracking-wide text-sm md:text-base",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
