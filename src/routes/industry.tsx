import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutGrid,
  Wallet,
  Settings2,
  MapPin,
  Mail,
  Lock,
  ArrowLeft,
  FileStack,
  CheckCircle2,
  IndianRupee,
  CalendarDays,
  Eye,
  ClipboardList,
} from "lucide-react";
import { DashboardShell, type SideItem } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UpvoteBadge } from "@/components/UpvoteBadge";
import { DomainBadge } from "@/components/DomainBadge";
import { PROBLEMS, PROPOSALS } from "@/lib/jsic-data";

export const Route = createFileRoute("/industry")({
  head: () => ({
    meta: [
      { title: "Industry / Funder Dashboard — J-SIC Portal" },
      {
        name: "description",
        content:
          "Browse open J-SIC projects in your interest domains, compare university proposals and fund the best one.",
      },
      { property: "og:title", content: "Industry / Funder Dashboard — J-SIC Portal" },
      {
        property: "og:description",
        content: "Compare university proposals side by side and fund CSR-ready innovation projects.",
      },
    ],
  }),
  component: IndustryPage,
});

const ITEMS: SideItem[] = [
  { id: "open", label: "Open Projects", icon: LayoutGrid, badge: "3" },
  { id: "funded", label: "Funded Projects", icon: Wallet, badge: "2" },
  { id: "prefs", label: "Interest Domains", icon: Settings2 },
];

const INTERESTS = ["Agriculture", "Water"];

const FUNDED = [
  {
    title: "Recharge-shaft mapping for drying handpumps",
    university: "NIT Jamshedpur",
    amount: "₹ 11,20,000",
    stage: "In Progress",
  },
  {
    title: "Solar cold-storage micro unit for vegetable clusters",
    university: "BIT Sindri",
    amount: "₹ 9,60,000",
    stage: "Piloted",
  },
];

function IndustryPage() {
  const [active, setActive] = useState("open");
  const [openProblem, setOpenProblem] = useState<string | null>(null);
  const [fundedId, setFundedId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);

  const openProjects = PROBLEMS.filter((p) => INTERESTS.includes(p.domain));
  const selected = PROBLEMS.find((p) => p.id === openProblem);
  const detail = PROPOSALS.find((p) => p.id === detailId);

  return (
    <DashboardShell
      roleLabel="Industry / Funder"
      title="Tata Steel Foundation"
      subtitle="CSR & Innovation cell"
      items={ITEMS}
      active={active}
      onSelect={(id) => {
        setActive(id);
        setOpenProblem(null);
      }}
    >
      {active === "open" && !selected && (
        <>
          <SectionHeader
            title="Open Projects"
            description="Only problems matching your interest domains are shown."
          />
          <div className="surface-card mb-6 flex flex-wrap items-center gap-3 p-4">
            <span className="text-sm font-semibold">Interest domains</span>
            {INTERESTS.map((d) => (
              <DomainBadge key={d} domain={d} />
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => setActive("prefs")}
            >
              <Settings2 className="size-3.5" /> Edit
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {openProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenProblem(p.id)}
                className="surface-card group flex flex-col gap-3 p-5 text-left transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <DomainBadge domain={p.domain} />
                  {p.emailSent && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      <Mail className="size-3.5" /> Email sent
                    </span>
                  )}
                </div>
                <h3 className="font-semibold leading-snug">{p.title}</h3>
                <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {p.district}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <UpvoteBadge count={p.upvotes} />
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold">
                    <FileStack className="size-3.5" /> {p.proposals} proposals submitted
                  </span>
                </div>
                <span
                  className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    p.windowClosed
                      ? "bg-success/12 text-success"
                      : "bg-warning/20 text-warning-foreground"
                  }`}
                >
                  <Lock className="size-3.5" />
                  {p.windowClosed
                    ? "Proposal window closed — ready for review"
                    : `Window open · ${p.daysLeft} days left`}
                </span>
                <span className="mt-1 text-sm font-semibold text-accent">
                  Compare proposals →
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {active === "open" && selected && (
        <>
          <SectionHeader
            title="Proposal Comparison"
            description={`${selected.title} · ${selected.district}`}
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setOpenProblem(null);
                  setFundedId(null);
                }}
              >
                <ArrowLeft className="size-4" /> Back to projects
              </Button>
            }
          />

          {fundedId && (
            <div className="surface-card mb-6 flex flex-wrap items-center gap-3 border-success/40 bg-success/8 p-5">
              <CheckCircle2 className="size-5 text-success" />
              <p className="text-sm font-semibold">
                You are now funding{" "}
                {PROPOSALS.find((p) => p.id === fundedId)?.university}&apos;s proposal
              </p>
              <span className="ml-auto text-sm font-semibold tabular-nums">
                {PROPOSALS.find((p) => p.id === fundedId)?.funding}
              </span>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PROPOSALS.map((pr) => {
              const isFunded = fundedId === pr.id;
              const rejected = fundedId !== null && !isFunded;
              return (
                <div
                  key={pr.id}
                  className={`surface-card flex flex-col gap-3 p-5 transition-all ${
                    isFunded
                      ? "border-success/50 ring-2 ring-success/25"
                      : rejected
                        ? "opacity-55 grayscale"
                        : "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-snug">{pr.university}</h3>
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold">
                      {pr.stage}
                    </span>
                  </div>
                  <p className="flex-1 text-sm text-muted-foreground">{pr.summary}</p>
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums">
                    <IndianRupee className="size-4 text-primary" /> {pr.funding.replace("₹ ", "")}
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" /> {pr.timeline}
                  </p>
                  {isFunded ? (
                    <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-success/12 px-3 py-2 text-sm font-semibold text-success">
                      <CheckCircle2 className="size-4" /> Funded by you
                    </span>
                  ) : rejected ? (
                    <span className="rounded-lg bg-secondary px-3 py-2 text-center text-sm font-semibold text-muted-foreground">
                      Not Selected
                    </span>
                  ) : (
                    <Button variant="outline" onClick={() => setDetailId(pr.id)}>
                      <Eye className="size-4" /> {t("View Details")}
                    </Button>
                  )}

                </div>
              );
            })}
          </div>
        </>
      )}

      {active === "funded" && (
        <>
          <SectionHeader
            title="Funded Projects"
            description="Projects your CSR cell is currently backing."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {FUNDED.map((f) => (
              <div key={f.title} className="surface-card p-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2.5 py-0.5 text-xs font-semibold text-success">
                  <CheckCircle2 className="size-3.5" /> {f.stage}
                </span>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.university}</p>
                <p className="mt-3 text-sm font-semibold tabular-nums">{f.amount}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {active === "prefs" && (
        <>
          <SectionHeader
            title="Interest Domains"
            description="You are notified by email when a matching problem's proposal window closes."
          />
          <div className="surface-card max-w-2xl p-5">
            <div className="flex flex-wrap gap-2">
              {[
                "Agriculture",
                "Water",
                "Education",
                "Healthcare",
                "Sanitation",
                "Environment",
                "Rural Livelihoods",
              ].map((d) => (
                <span
                  key={d}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                    INTERESTS.includes(d)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="size-3.5" /> 2 email alerts received this month
            </p>
          </div>
        </>
      )}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetailId(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{detail?.university}</DialogTitle>
            <DialogDescription>{selected?.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {selected && <DomainBadge domain={selected.domain} />}
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                <MapPin className="size-3.5" /> {selected?.district}
              </span>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                Current stage: {detail?.stage}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Solution summary
              </p>
              <p className="mt-1 text-sm">{detail?.summary}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">Funding requested</p>
                <p className="mt-1 inline-flex items-center gap-1 text-lg font-bold tabular-nums">
                  <IndianRupee className="size-4 text-primary" />
                  {detail?.funding.replace("\u20b9 ", "")}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">Timeline</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-lg font-bold">
                  <CalendarDays className="size-4 text-primary" />
                  {detail?.timeline}
                </p>
              </div>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ClipboardList className="size-3.5" /> Requirements
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {(detail?.needs ?? []).map((n) => (
                  <li
                    key={n}
                    className="rounded-full bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailId(null)}>
              Close
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                if (!detail) return;
                setFundedId(detail.id);
                setDetailId(null);
                toast.success("Funding confirmed", {
                  description: `${detail.university} \u2014 ${detail.funding} committed.`,
                });
              }}
            >
              Fund This Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </DashboardShell>
  );
}
