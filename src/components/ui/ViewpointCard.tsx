import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ViewpointCardProps {
  index: string;
  category: ReactNode;
  title: string;
  photo: ReactNode;
  /** HCM card — blood accent on photo strip */
  variant?: "default" | "featured";
  children: ReactNode;
  className?: string;
}

export function ViewpointCard({
  index,
  category,
  title,
  photo,
  variant = "default",
  children,
  className,
}: ViewpointCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border-2 border-ink bg-bone",
        "shadow-[5px_5px_0_#1A1A1A] transition-[transform,box-shadow] duration-200",
        "hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#D32F2F]",
        className,
      )}
    >
      <div
        className={cn(
          "h-[5.5rem] shrink-0 overflow-hidden border-b-2 border-ink bg-ink md:h-[6rem]",
          variant === "featured" && "ring-2 ring-inset ring-blood/40",
        )}
      >
        {photo}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:gap-5 md:p-6">
        <header className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/45">
              {index}
            </span>
            {category}
          </div>
          <h3 className="headline text-xl leading-[1.1] text-ink md:text-2xl">
            {title}
          </h3>
          <div className="h-px w-full bg-ink/15" aria-hidden />
        </header>

        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </div>
    </article>
  );
}

export function ViewpointFactList({
  items,
}: {
  items: readonly { label: string; value: string }[];
}) {
  return (
    <ul className="divide-y divide-ink/12">
      {items.map((item) => (
        <li
          key={item.label}
          className="grid grid-cols-1 gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[6.5rem_1fr] sm:gap-4"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 leading-snug">
            {item.label}
          </span>
          <span className="serif text-sm leading-relaxed text-ink md:text-[0.95rem]">
            {item.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ViewpointDimension({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="border-l-[3px] border-blood py-0.5 pl-3.5">
      <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-blood">
        {label}
      </span>
      <p className="serif text-sm leading-relaxed text-ink/90 md:text-[0.95rem]">
        {description}
      </p>
    </div>
  );
}

export function ViewpointQuote({
  context,
  text,
}: {
  context: string;
  text: string;
}) {
  return (
    <blockquote className="border-l-[3px] border-blood bg-blood/[0.07] px-4 py-3">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-blood">
        {context}
      </span>
      <p className="serif text-sm italic leading-relaxed text-ink md:text-[0.95rem]">
        &ldquo;{text}&rdquo;
      </p>
    </blockquote>
  );
}

export function ViewpointPillPair({
  left,
  right,
}: {
  left: { tag: string; label: string };
  right: { tag: string; label: string };
}) {
  return (
    <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
      <div className="bg-ink px-3 py-2.5 text-cream">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55">
          {left.tag}
        </span>
        <span className="font-headline text-sm uppercase leading-tight">
          {left.label}
        </span>
      </div>
      <div className="bg-blood px-3 py-2.5 text-cream">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55">
          {right.tag}
        </span>
        <span className="font-headline text-sm uppercase leading-tight">
          {right.label}
        </span>
      </div>
    </div>
  );
}
