import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Megaphone,
  GraduationCap,
  Factory,
  ShieldCheck,
  FileText,
  Building2,
  Handshake,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/jsic-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "J-SIC Portal — Turning Local Problems into Innovation" },
      {
        name: "description",
        content:
          "J-SIC connects complainants, universities, industry and government to solve local problems across Jharkhand — from reporting to funded, piloted solutions.",
      },
      { property: "og:title", content: "J-SIC Portal — Turning Local Problems into Innovation" },
      {
        property: "og:description",
        content:
          "Report a local problem, get it matched to university innovators and funded by industry partners.",
      },
    ],
  }),
  component: Landing,
});

const STATS = [
  { label: "Problems Submitted", value: "1,240", icon: FileText },
  { label: "Universities", value: "38", icon: Building2 },
  { label: "Industry Partners", value: "112", icon: Handshake },
  { label: "Solutions Deployed", value: "67", icon: CheckCircle2 },
];

const ROLE_CARDS = [
  {
    title: "Complainant",
    desc: "Report a problem in your village or ward and track it end to end.",
    icon: Megaphone,
    to: "/report",
    cta: "Report & Track",
  },
  {
    title: "University / IIC",
    desc: "See problems matched to your expertise and submit student-led proposals.",
    icon: GraduationCap,
    to: "/university",
    cta: "Open Dashboard",
  },
  {
    title: "Industry",
    desc: "Fund shortlisted proposals in your interest domains through CSR.",
    icon: Factory,
    to: "/industry",
    cta: "Browse Projects",
  },
  {
    title: "Government",
    desc: "Verify progress and track department-wise analytics across districts.",
    icon: ShieldCheck,
    to: "/government",
    cta: "Select Department",
  },
];

const FLOW = [
  "Citizen reports a problem",
  "Duplicates merge into one upvoted problem",
  "Matched to top 12 universities",
  "2-week proposal window opens",
  "Industry funds the best proposal",
  "Government verifies each milestone",
];

function Landing() {
  return (
    <PageShell>
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImage} alt="" className="size-full object-cover" />
        </div>
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
              <Sparkles className="size-3.5" /> Government of Jharkhand · Innovation Mission
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Turning Local Problems into{" "}
              <span className="text-accent">Innovation</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
              One portal where citizens report real problems, universities design solutions,
              industry funds them and the state verifies every milestone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="accent">
                <Link to="/report">
                  Report a Problem <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="onDark">
                <Link to="/industry">Explore Projects</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              How a problem travels
            </p>
            <ol className="mt-4 space-y-3">
              {FLOW.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-primary-foreground/90">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-8 max-w-[1400px] px-4 sm:px-6 lg:-mt-10">
        <div className="surface-card grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">

          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                <s.icon className="size-5" />
              </span>
              <div>
                <p className="text-xl font-bold tabular-nums sm:text-2xl">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Choose your role</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Four dashboards, one problem pipeline. Every role sees the same problem at a different
          stage.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLE_CARDS.map((r) => (
            <Link
              key={r.title}
              to={r.to}
              className="surface-card group flex flex-col gap-3 p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <r.icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="flex-1 text-sm text-muted-foreground">{r.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                {r.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <p>J-SIC Portal · Jharkhand Societal Innovation Collaboration</p>
          <p>A Government of Jharkhand innovation initiative.</p>
        </div>
      </footer>

    </PageShell>
  );
}
