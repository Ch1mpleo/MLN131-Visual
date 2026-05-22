import { cn } from "@/lib/utils";

const HAMMER_SICKLE_SRC =
  "https://bqn.1cdn.vn/2018/02/02/baodanang.vn-dataimages-201802-original-_images1425250_5.jpg";

interface CornerEmblemProps {
  className?: string;
}

export default function CornerEmblem({ className }: CornerEmblemProps) {
  return (
    <div
      className={cn(
        "h-9 w-9 shrink-0 overflow-hidden border border-cream/40 shadow-[3px_3px_0_#1A1A1A]",
        className,
      )}
      title="Dân chủ xã hội chủ nghĩa"
    >
      <img
        src={HAMMER_SICKLE_SRC}
        alt="Biểu tượng búa liềm"
        className="h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
