import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Trophy,
  ShieldCheck,
  Sprout,
  Droplets,
  GraduationCap,
  HeartPulse,
  Tractor,
  Leaf,
  HardHat,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Map as MapIcon,
  ArrowRight,
  Layers,
  type LucideIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell, PageShell, type SideItem } from "@/components/AppShell";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpvoteBadge } from "@/components/UpvoteBadge";
import { DomainBadge } from "@/components/DomainBadge";
import { JharkhandMap } from "@/components/JharkhandMap";
import {
  DEPARTMENTS,
  DEPT_DATA,
  CONSOLIDATED_ID,
  buildConsolidatedData,
  type DeptProblem,
} from "@/lib/jsic-data";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/government")({
  head: () => ({
    meta: [
      { title: "Government Analytics — J-SIC Portal" },
      {
        name: "description",
        content:
          "Department-wise J-SIC analytics: problem volumes, resolution rate, funding routed, district concentration and milestone verification.",
      },
      { property: "og:title", content: "Government Analytics — J-SIC Portal" },
      {
        property: "og:description",
        content: "Verify university progress claims and track district-wise problem analytics.",
      },
    ],
  }),
  component: GovernmentPage,
});

const DEPT_ICONS: Record<string, LucideIcon> = {
  Sprout,
  Droplets,
  GraduationCap,
  HeartPulse,
  Building2,
  Tractor,
  Leaf,
  HardHat,
  Layers,
};

const CONSOLIDATED_OPTION = {
  id: CONSOLIDATED_ID,
  name: "General / Consolidated View",
  icon: "Layers",
};

const DEPT_OPTIONS = [CONSOLIDATED_OPTION, ...DEPARTMENTS];

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function GovernmentPage() {
  const t = useT();
  const [dept, setDept] = useState<(typeof DEPT_OPTIONS)[number] | null>(null);
  const [active, setActive] = useState("overview");
  const [verifying, setVerifying] = useState<DeptProblem | null>(null);

  if (!dept) {
    return (
      <PageShell>
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="size-3.5" /> Government of Jharkhand · Nodal login
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("Select your department")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Analytics, verification queues and funding are scoped to the department you enter as.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {DEPT_OPTIONS.map((d) => {
              const Icon = DEPT_ICONS[d.icon] ?? Building2;
              const isAll = d.id === CONSOLIDATED_ID;
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setDept(d);
                    setActive("overview");
                  }}
                  className={`surface-card group flex items-center gap-4 p-5 text-left transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
                    isAll ? "border-primary/40 sm:col-span-2" : ""
                  }`}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{t(d.name)}</span>
                    <span className="text-xs text-muted-foreground">
                      {isAll ? "All departments across Jharkhand" : "Nodal officer access"}
                    </span>
                  </span>
                  <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
        </div>
      </PageShell>
    );
  }

  const isConsolidated = dept.id === CONSOLIDATED_ID;
  const data = isConsolidated
    ? buildConsolidatedData()
    : (DEPT_DATA[dept.id] ?? DEPT_DATA["agri"]!);
  const DeptIcon = DEPT_ICONS[dept.icon] ?? Building2;
  const pendingCount = data.problems.filter((p) => p.claim).length;
  const scopeName = isConsolidated ? "all departments" : dept.name;

  const ITEMS: SideItem[] = [
    { id: "overview", label: "Analytics Overview", icon: BarChart3 },
    {
      id: "verify",
      label: isConsolidated ? "All Problems" : "Department Problems",
      icon: ClipboardCheck,
      badge: String(pendingCount),
    },
    { id: "universities", label: "Top Universities", icon: Trophy },
  ];

  const KPIS = [
    {
      label: `${t("Total Problems")} · ${isConsolidated ? t("General / Consolidated View") : dept.name}`,
      value: String(data.total),
      icon: BarChart3,
      tone: "text-primary",
    },
    {
      label: t("Verified vs Pending"),
      value: `${data.verified} / ${data.pending}`,
      icon: CheckCircle2,
      tone: "text-success",
    },
    { label: t("Resolution Rate"), value: data.resolutionRate, icon: Clock3, tone: "text-accent" },
    { label: t("Funding Routed"), value: data.funding, icon: IndianRupee, tone: "text-primary" },
  ];

  const DeptHeader = (
    <div className="surface-card mb-6 flex flex-wrap items-center gap-3 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <DeptIcon className="size-5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {t("Signed in as")}
        </p>
        <p className="font-semibold">{isConsolidated ? t(dept.name) : dept.name}</p>
      </div>
      <Button variant="outline" size="sm" className="ml-auto" onClick={() => setDept(null)}>
        {t("Switch department")}
      </Button>
    </div>
  );

  return (
    <DashboardShell
      roleLabel="Government"
      title={isConsolidated ? t(dept.name) : dept.name}
      subtitle="Nodal officer · Jharkhand"
      items={ITEMS}
      active={active}
      onSelect={setActive}
    >
      {DeptHeader}

      {active === "overview" && (
        <>
          <SectionHeader
            title="Analytics Overview"
            description={`Problems, funding and verification status across ${scopeName}.`}
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((k) => (
              <div
                key={k.label}
                className="surface-card p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
                  <k.icon className={`size-4 shrink-0 ${k.tone}`} />
                </div>
                <p className="mt-2 text-2xl font-bold tabular-nums">{k.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="surface-card p-5 lg:col-span-2">
              <h3 className="text-sm font-semibold">Problems by category</h3>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.categories}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      stroke="var(--color-muted-foreground)"
                      interval={0}
                      angle={-18}
                      textAnchor="end"
                      height={54}
                    />
                    <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid var(--color-border)",
                        background: "var(--color-card)",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="var(--color-chart-1)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="surface-card p-5">
              <h3 className="text-sm font-semibold">Status distribution</h3>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.status}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="55%"
                      outerRadius="82%"
                      paddingAngle={3}
                      stroke="none"
                    >
                      {data.status.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid var(--color-border)",
                        background: "var(--color-card)",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {data.status.map((s, i) => (
                  <li key={s.name} className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                    />
                    {s.name} · <span className="font-semibold tabular-nums">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="surface-card p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <MapIcon className="size-4 text-primary" /> District-wise concentration
              </h3>
              <JharkhandMap data={data.heat} />
              <div className="grid grid-cols-3 gap-2">
                {data.heat.map((d) => {
                  const intensity = d.count / Math.max(...data.heat.map((h) => h.count));
                  return (
                    <div
                      key={d.name}
                      className="rounded-lg border border-border p-3 text-center transition-transform hover:scale-[1.03]"
                      style={{
                        background: `color-mix(in oklab, var(--color-accent) ${Math.round(intensity * 70)}%, var(--color-card))`,
                      }}
                      title={`${d.name}: ${d.count} problems`}
                    >
                      <p className="text-xs font-semibold">{d.name}</p>
                      <p className="text-lg font-bold tabular-nums">{d.count}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                Low
                <span className="h-2 flex-1 rounded-full bg-[linear-gradient(90deg,var(--color-card),var(--color-accent))] ring-1 ring-border" />
                High
              </div>
            </div>

            <div className="surface-card border-destructive/40 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/12 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                <AlertTriangle className="size-3.5" /> Unfunded — needs attention
              </span>
              <h3 className="mt-3 text-lg font-bold">{data.unfunded.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {data.unfunded.district} · {data.unfunded.note}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <DomainBadge domain={data.unfunded.domain} />
                <UpvoteBadge count={data.unfunded.upvotes} label="reports" />
              </div>
              <Button
                className="mt-4"
                variant="destructive"
                onClick={() =>
                  toast.info("Escalated to the CSR outreach cell", {
                    description: `Industry partners active in ${data.unfunded.district} will be notified.`,
                  })
                }
              >
                Escalate to funders
              </Button>
            </div>
          </div>
        </>
      )}

      {active === "verify" && (
        <>
          <SectionHeader
            title="Department Problems"
            description={`Problems tagged to the ${dept.name}. Verify each stage change claimed by the university.`}
          />
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/60">
                    <TableHead className="min-w-[240px]">Problem</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Upvotes</TableHead>
                    <TableHead>Current stage</TableHead>
                    <TableHead className="text-right">Verification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.problems.map((p) => (
                    <TableRow key={p.ref} className="transition-colors hover:bg-secondary/40">
                      <TableCell className="font-medium">
                        <span className="block">{p.title}</span>
                        <span className="text-xs text-muted-foreground">#{p.ref}</span>
                      </TableCell>
                      <TableCell>
                        <DomainBadge domain={p.domain} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.district}</TableCell>
                      <TableCell>
                        <UpvoteBadge count={p.upvotes} />
                      </TableCell>
                      <TableCell>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {p.stage}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {p.claim ? (
                          <Button size="sm" onClick={() => setVerifying(p)}>
                            <ClipboardCheck className="size-3.5" /> Verify Update
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">No pending change</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      {active === "universities" && (
        <>
          <SectionHeader
            title="Top-performing Universities"
            description={`Ranked by projects completed for the ${dept.name}.`}
          />
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/60">
                    <TableHead>#</TableHead>
                    <TableHead className="min-w-[260px]">University</TableHead>
                    <TableHead>Projects completed</TableHead>
                    <TableHead>Funding received</TableHead>
                    <TableHead>Completion rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.universities.map((u, i) => (
                    <TableRow key={u.name} className="transition-colors hover:bg-secondary/40">
                      <TableCell className="font-semibold tabular-nums">{i + 1}</TableCell>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="tabular-nums">{u.completed}</TableCell>
                      <TableCell className="tabular-nums">{u.funded}</TableCell>
                      <TableCell>
                        <span className="rounded-full bg-success/12 px-2.5 py-0.5 text-xs font-semibold text-success">
                          {u.rate}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      <Dialog open={!!verifying} onOpenChange={(o) => !o && setVerifying(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify status update</DialogTitle>
            <DialogDescription>{verifying?.title}</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-border bg-secondary/50 p-4">
            <p className="text-xs font-medium text-muted-foreground">University claims</p>
            <p className="mt-1 text-lg font-bold">Marked as: {verifying?.claim}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Evidence: 3 photos, field-visit note, 1 test report · submitted 28 Aug 2026
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                toast.error("Update rejected", {
                  description: "University asked to resubmit with pilot data.",
                });
                setVerifying(null);
              }}
            >
              Reject
            </Button>
            <Button
              variant="success"
              onClick={() => {
                toast.success("Update approved", {
                  description: `Stage moved to ${verifying?.claim}.`,
                });
                setVerifying(null);
              }}
            >
              <CheckCircle2 className="size-4" /> Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
