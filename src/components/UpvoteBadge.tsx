import { Flame, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  count: number;
  label?: string;
  className?: string;
  size?: "sm" | "md";
};

/**
 * Upvote counter badge. Tone is driven by the count and MUST stay consistent
 * everywhere a problem counter appears: 1-5 neutral, 6-15 amber, 16+ red.
 */
export function UpvoteBadge({ count, label, className, size = "sm" }: Props) {
  const tone =
    count >= 16
      ? "bg-destructive/12 text-destructive border-destructive/30"
      : count >= 6
        ? "bg-warning/20 text-warning-foreground border-warning/50"
        : "bg-neutral-badge text-neutral-badge-foreground border-border";

  const Icon = count >= 16 ? Flame : ArrowBigUp;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-semibold tabular-nums",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        tone,
        className,
      )}
    >
      <Icon className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2.4} />
      {label ? `${count} ${label}` : count}
    </span>
  );
}
