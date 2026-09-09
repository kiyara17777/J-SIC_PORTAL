import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  UploadCloud,
  MapPin,
  LocateFixed,
  Send,
  Image as ImageIcon,
  Info,
  ListChecks,
  X,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { DOMAINS, DISTRICTS } from "@/lib/jsic-data";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Problem — J-SIC Portal" },
      {
        name: "description",
        content:
          "Submit a local problem with photos, domain and district so J-SIC can match it to universities and funders.",
      },
      { property: "og:title", content: "Report a Problem — J-SIC Portal" },
      {
        property: "og:description",
        content: "Report a local problem in Jharkhand and track it from submission to resolution.",
      },
    ],
  }),
  component: ReportPage,
});

const ITEMS: SideItem[] = [
  { id: "submit", label: "Report a Problem", icon: Send },
  { id: "track", label: "Track My Reports", icon: ListChecks, badge: "1" },
];

function ReportPage() {
  const [duplicateMode, setDuplicateMode] = useState(false);
  const [located, setLocated] = useState(false);
  const [district, setDistrict] = useState("");
  const [domain, setDomain] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  function submit() {
    if (duplicateMode) {
      toast.warning("Similar problem found", {
        description: "Your report was added as confirmation (now 14 people reported this).",
        duration: 6000,
      });
    } else {
      toast.success("Problem submitted!", {
        description: "Reference #JSIC-2026-0847 — track it from “Track My Reports”.",
        duration: 6000,
      });
    }
  }

  return (
    <DashboardShell
      roleLabel="Complainant"
      title="Sunita Devi"
      subtitle="Gumla block · Citizen reporter"
      items={ITEMS}
      active="submit"
      onSelect={(id) => {
        if (id === "track") window.location.assign("/track");
      }}
    >
      <SectionHeader
        title="Report a Problem"
        description="Describe the issue in your own words. Photos and location help universities design a real fix."
        action={
          <Button asChild variant="outline">
            <Link to="/track">View my tracked report</Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="surface-card p-5 sm:p-7">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="title">Problem title</Label>
              <Input id="title" placeholder="e.g. Tomato crop pest damage in Gumla" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                rows={5}
                placeholder="What is happening, since when, and how many people are affected?"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Domain</Label>
                <Select value={domain} onValueChange={setDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOMAINS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>District</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRICTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Photos</Label>
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  setFiles((f) => [...f, `field-photo-${f.length + 1}.jpg`]);
                }}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                  dragOver ? "border-accent bg-accent-soft" : "border-border hover:bg-secondary/60"
                }`}
              >
                <UploadCloud className="size-7 text-primary" />
                <span className="text-sm font-semibold">Drag &amp; drop photos here</span>
                <span className="text-xs text-muted-foreground">
                  or click to browse · JPG/PNG up to 5 MB each
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setFiles((f) => [
                      ...f,
                      ...Array.from(e.target.files ?? []).map((x) => x.name),
                    ])
                  }
                />
              </label>
              {files.length > 0 && (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {files.map((f, i) => (
                    <li
                      key={`${f}-${i}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium"
                    >
                      <ImageIcon className="size-3.5 text-primary" />
                      {f}
                      <button
                        onClick={() => setFiles((x) => x.filter((_, j) => j !== i))}
                        aria-label={`Remove ${f}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Location</Label>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="outline" onClick={() => setLocated(true)}>
                  <LocateFixed className="size-4" /> Auto-detect my location
                </Button>
                {located && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-semibold text-success">
                    <MapPin className="size-3.5" /> 23.0432° N, 84.5401° E · Gumla
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <Button size="lg" onClick={submit}>
                <Send className="size-4" /> Submit Problem
              </Button>
              <div className="flex items-center gap-3 rounded-lg bg-secondary/70 px-3 py-2">
                <Switch
                  id="dupe"
                  checked={duplicateMode}
                  onCheckedChange={setDuplicateMode}
                />
                <Label htmlFor="dupe" className="text-xs font-medium">
                  Demo: simulate duplicate-match outcome
                </Label>
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-6 self-start">
          <div className="surface-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Info className="size-4 text-primary" /> What happens next
            </h3>
            <ol className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>1. Your report is checked against nearby reports.</li>
              <li>2. Duplicates merge — every extra report raises the upvote count.</li>
              <li>3. The problem is matched to the top 12 universities by expertise-fit.</li>
              <li>4. A 2-week proposal window opens for student teams.</li>
            </ol>
          </div>
          <div className="surface-card overflow-hidden">
            <div className="border-b border-border bg-secondary/50 px-5 py-3 text-sm font-semibold">
              Both possible outcomes
            </div>
            <div className="grid gap-3 p-5 text-sm">
              <div className="rounded-lg border border-success/30 bg-success/8 p-3">
                <p className="font-semibold text-success">New problem accepted</p>
                <p className="mt-1 text-muted-foreground">
                  “Problem submitted! Reference #JSIC-2026-0847”
                </p>
              </div>
              <div className="rounded-lg border border-warning/50 bg-warning/12 p-3">
                <p className="font-semibold text-warning-foreground">Merged as confirmation</p>
                <p className="mt-1 text-muted-foreground">
                  “Similar problem found — your report added as confirmation (now 14 people reported
                  this).”
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}
