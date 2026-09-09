import { cn } from "@/lib/utils";
import { DOMAIN_TONES } from "@/lib/jsic-data";

export function DomainBadge({ domain, className }: { domain: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        DOMAIN_TONES[domain] ?? DOMAIN_TONES.Other,
        className,
      )}
    >
      {domain}
    </span>
  );
}
