import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ClipboardList,
  FileStack,
  Activity,
  Users,
  Plus,
  Trash2,
  Eye,
  Send,
  Timer,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { DashboardShell, type SideItem } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { PROBLEMS } from "@/lib/jsic-data";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/university")({
  head: () => ({
    meta: [
      { title: "University / IIC Dashboard — J-SIC Portal" },
      {
        name: "description",
        content:
          "Assigned problems, proposal windows and student team formation for university Institution Innovation Councils.",
      },
      { property: "og:title", content: "University / IIC Dashboard — J-SIC Portal" },
      {
        property: "og:description",
        content: "See problems matched to your expertise and submit student-led proposals.",
      },
    ],
  }),
  component: UniversityPage,
});

const ITEMS: SideItem[] = [
  { id: "assigned", label: "Assigned Problems", icon: ClipboardList, badge: "6" },
  { id: "proposals", label: "My Proposals", icon: FileStack, badge: "3" },
  { id: "updates", label: "Status Updates", icon: Activity },
];

const MY_PROPOSALS = [
  {
    title: "IoT pheromone traps + SMS pest advisory",
    problem: "Tomato crop pest damage — Gumla",
    ask: "₹ 8,50,000",
    status: "Funded",
  },
  {
    title: "Recharge-shaft mapping for drying handpumps",
    problem: "Handpumps running dry — Palamu",
    ask: "₹ 11,20,000",
    status: "Under review",
  },
  {
    title: "Modular low-cost PHC ramp kit",
    problem: "No ramp access at PHC — Ranchi",
    ask: "₹ 3,40,000",
    status: "Submitted",
  },
];

function CountdownBadge({ days }: { days: number }) {
  const tone =
    days === 0
      ? "bg-destructive/12 text-destructive border-destructive/30"
      : days <= 2
        ? "bg-warning/20 text-warning-foreground border-warning/50"
        : "bg-secondary text-secondary-foreground border-border";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold tabular-nums ${tone}`}
    >
      <Timer className="size-3.5" />
      {days === 0 ? "Window closed" : `${days} day${days === 1 ? "" : "s"} left`}
    </span>
  );
}

function UniversityPage() {
  const t = useT();
  const [active, setActive] = useState("assigned");
  const [teamOpen, setTeamOpen] = useState(false);
  const [students, setStudents] = useState(["Ankit Oraon", "Priya Kumari", ""]);
  const [mentor, setMentor] = useState("");

  return (
    <DashboardShell
      roleLabel="University / IIC"
      title="Birsa Agricultural University"
      subtitle="Institution Innovation Council"
      items={ITEMS}
      active={active}
      onSelect={setActive}
    >
      {active === "assigned" && (
        <>
          <SectionHeader
            title="Assigned Problems"
            description="Matched to your institution by expertise-fit. Submit a proposal before the window closes."
            action={
              <Button onClick={() => setTeamOpen(true)}>
                <Users className="size-4" /> {t("Create Team")}
              </Button>
            }
          />
          <div className="surface-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/60">
                    <TableHead className="min-w-[260px]">Title</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Upvotes</TableHead>
                    <TableHead>Proposal window</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PROBLEMS.map((p) => (
                    <TableRow key={p.id} className="transition-colors hover:bg-secondary/40">
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
                        <CountdownBadge days={p.daysLeft} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {p.daysLeft > 0 ? (
                            <Button asChild size="sm">
                              <Link to="/proposal">
                                <Send className="size-3.5" /> {t("Submit Proposal")}
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" variant="secondary" disabled>
                              Closed
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="size-3.5" /> View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      {active === "proposals" && (
        <>
          <SectionHeader
            title="My Proposals"
            description="Proposals submitted by your student teams across open problems."
            action={
              <Button asChild>
                <Link to="/proposal">
                  <Plus className="size-4" /> {t("New Proposal")}
                </Link>
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {MY_PROPOSALS.map((p) => (
              <div
                key={p.title}
                className="surface-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    p.status === "Funded"
                      ? "bg-success/12 text-success"
                      : p.status === "Under review"
                        ? "bg-warning/20 text-warning-foreground"
                        : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {p.status === "Funded" && <CheckCircle2 className="size-3.5" />}
                  {p.status}
                </span>
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.problem}</p>
                <p className="mt-4 text-sm font-semibold tabular-nums">Ask: {p.ask}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {active === "updates" && (
        <>
          <SectionHeader
            title="Status Updates"
            description="Post progress for funded projects. Each claim is verified by the nodal department."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="surface-card p-5">
              <h3 className="font-semibold">Tomato crop pest damage — Gumla</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Current stage: In Progress · claimed update awaiting verification
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Select defaultValue="Prototype">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["In Progress", "Prototype", "Piloted", "Resolved"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() =>
                    toast.success("Update sent for verification", {
                      description: "Agriculture Dept will review “Marked as: Prototype”.",
                    })
                  }
                >
                  Submit update
                </Button>
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-warning-foreground">
                <AlertTriangle className="size-3.5" /> Pending government verification
              </p>
            </div>
            <div className="surface-card p-5">
              <h3 className="font-semibold">Recent activity</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between gap-4">
                  <span>Field visit report uploaded</span>
                  <span className="text-muted-foreground">02 Sep</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Prototype claim submitted</span>
                  <span className="text-muted-foreground">28 Aug</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Team formed (4 students, 1 mentor)</span>
                  <span className="text-muted-foreground">12 Aug</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      <Dialog open={teamOpen} onOpenChange={setTeamOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("Create Team")}</DialogTitle>
            <DialogDescription>
              Add student members and assign a faculty mentor for this problem.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>{t("Student members")}</Label>
              {students.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={s}
                    placeholder={`Student ${i + 1} full name`}
                    onChange={(e) =>
                      setStudents((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remove student"
                    onClick={() => setStudents((prev) => prev.filter((_, j) => j !== i))}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => setStudents((prev) => [...prev, ""])}
              >
                <Plus className="size-3.5" /> Add student
              </Button>
            </div>

            <div className="grid gap-2">
              <Label>{t("Faculty mentor")}</Label>
              <Select value={mentor} onValueChange={setMentor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a faculty mentor" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Dr. A. Mahto — Entomology",
                    "Dr. S. Banerjee — Soil Science",
                    "Prof. R. Tiwary — Agri Engineering",
                    "Dr. M. Hansda — Extension Studies",
                  ].map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTeamOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setTeamOpen(false);
                toast.success("Team created", {
                  description: "Team of 4 registered under Birsa Agricultural University IIC.",
                });
              }}
            >
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
