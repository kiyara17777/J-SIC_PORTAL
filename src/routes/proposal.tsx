import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ClipboardList, FileStack, Activity, IndianRupee, Check, ArrowLeft } from "lucide-react";
import { DashboardShell, type SideItem } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DomainBadge } from "@/components/DomainBadge";
import { UpvoteBadge } from "@/components/UpvoteBadge";

export const Route = createFileRoute("/proposal")({
  head: () => ({
    meta: [
      { title: "Submit a Proposal — J-SIC Portal" },
      {
        name: "description",
        content:
          "University proposal form: solution summary, stage, funding needed and support required for an assigned problem.",
      },
      { property: "og:title", content: "Submit a Proposal — J-SIC Portal" },
      {
        property: "og:description",
        content: "Submit a student-led solution proposal against an assigned J-SIC problem.",
      },
    ],
  }),
  component: ProposalPage,
});

const ITEMS: SideItem[] = [
  { id: "assigned", label: "Assigned Problems", icon: ClipboardList, badge: "6" },
  { id: "proposals", label: "My Proposals", icon: FileStack, badge: "3" },
  { id: "updates", label: "Status Updates", icon: Activity },
];

const NEEDS = ["Funding", "Manufacturing", "Mentorship", "Testing Site"];

function ProposalPage() {
  const navigate = useNavigate();
  const [needs, setNeeds] = useState<string[]>(["Funding"]);
  const [stage, setStage] = useState("");

  return (
    <DashboardShell
      roleLabel="University / IIC"
      title="Birsa Agricultural University"
      subtitle="Institution Innovation Council"
      items={ITEMS}
      active="proposals"
      onSelect={() => navigate({ to: "/university" })}
    >
      <SectionHeader
        title="Submit Proposal"
        description="Against problem #JSIC-2026-0847 — Tomato crop pest damage, Gumla"
        action={
          <Button asChild variant="outline">
            <Link to="/university">
              <ArrowLeft className="size-4" /> Back to dashboard
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="surface-card grid gap-5 p-5 sm:p-7">
          <div className="grid gap-2">
            <Label htmlFor="summary">Solution summary</Label>
            <Textarea
              id="summary"
              rows={6}
              placeholder="Describe the approach, who builds it, and how it reaches farmers."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Stage</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current stage" />
                </SelectTrigger>
                <SelectContent>
                  {["Idea", "Prototype", "Pilot-ready"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="funding">Funding needed</Label>
              <div className="relative">
                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="funding" className="pl-9" placeholder="8,50,000" inputMode="numeric" />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>What&apos;s needed</Label>
            <div className="flex flex-wrap gap-2">
              {NEEDS.map((n) => {
                const on = needs.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() =>
                      setNeeds((prev) => (on ? prev.filter((x) => x !== n) : [...prev, n]))
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      on
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    {on && <Check className="size-3.5" />}
                    {n}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Selected: {needs.length ? needs.join(", ") : "none"}
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Sector tag</Label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2.5">
              <DomainBadge domain="Agriculture" />
              <span className="text-xs text-muted-foreground">
                Auto-filled from the problem&apos;s domain
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <Button
              size="lg"
              onClick={() =>
                toast.success("Proposal submitted", {
                  description:
                    "Visible to funders once the 2-week proposal window closes on 18 Sep 2026.",
                })
              }
            >
              Submit Proposal
            </Button>
          </div>
        </div>

        <aside className="surface-card self-start p-5">
          <h3 className="text-sm font-semibold">Problem snapshot</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <DomainBadge domain="Agriculture" />
            <UpvoteBadge count={14} label="reports" />
          </div>
          <p className="mt-3 font-semibold">Tomato crop pest damage — Gumla</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Whitefly and fruit borer damage across 40+ smallholder plots for three seasons.
          </p>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">District</dt>
              <dd className="font-medium">Gumla</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Window closes</dt>
              <dd className="font-medium">18 Sep 2026</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Proposals so far</dt>
              <dd className="font-medium">4</dd>
            </div>
          </dl>
        </aside>
      </div>
    </DashboardShell>
  );
}
