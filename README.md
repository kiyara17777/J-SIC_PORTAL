# Jharkhand Spark

Build a modern, polished web app UI called "J-SIC Portal" (Jharkhand Societal Innovation Collaboration) — a platform connecting complainants, universities, and industry to solve local problems in Jharkhand. Use a clean, government-tech aesthetic: deep blue (#1e3a8a) and saffron/orange (#f97316) accents, white cards, rounded corners, soft shadows, Inter font. Make it fully responsive with sidebar navigation.

UPVOTE COUNTER STYLING (applies everywhere a problem card/counter appears): Style the upvote counter badge with color based on count: 1-5 = grey/neutral badge, 6-15 = amber/yellow badge, 16+ = red badge with a small flame or alert icon. Keep this consistent across every screen.

Build these screens with realistic fake data (no backend needed, just populate with mock data):

1. LANDING PAGE

- Hero section: "Turning Local Problems into Innovation" with a CTA "Report a Problem" and "Explore Projects"

- Stats bar: "1,240 Problems Submitted", "38 Universities", "112 Industry Partners", "67 Solutions Deployed"

- 4 role cards: Complainant / University / Industry / Government, each linking to their respective dashboard (Government card leads to a department selector before entering the dashboard)

2. COMPLAINANT SUBMISSION FORM

- Fields: Problem title, description (textarea), domain dropdown (Agriculture, Education, Healthcare, Water, Sanitation, Environment, Rural Livelihoods, Accessibility, Urban Infrastructure, Public Service Delivery, Other), photo upload (drag-drop UI), auto-location detect button, district dropdown (show Jharkhand districts: Ranchi, Gumla, Dhanbad, Jamshedpur, etc.)

- Submit button shows a success toast — either "Problem submitted! Reference #JSIC-2026-0847" OR "Similar problem found — your report added as confirmation (now 14 people reported this)" — show both possible outcomes as a toggle/demo state

3. COMPLAINANT TRACKING PAGE

- Card showing submitted problem "Tomato crop pest damage — Gumla" with upvote counter badge ("14 people reported this") and a horizontal stepper: Submitted → Under Review → Assigned → Proposal Window → Funded → In Progress → Prototype → Piloted → Resolved (highlight "In Progress" as current)

- Add a small label near the stepper: "Matched to top 12 universities based on expertise-fit"

- Show assigned university: "Birsa Agricultural University" and a small update feed: "Team formed", "Field visit scheduled"

- Below the stepper, show funding attribution once funded: "Funded by: [Company Name] → [University Name]"

4. UNIVERSITY/IIC DASHBOARD

- Sidebar: Assigned Problems, My Proposals, Status Updates

- Table of 6 fake assigned problems with columns: Title, Domain (colored badge), District, Upvote count, Days left in proposal window (countdown badge), Action buttons (Submit Proposal/View)

- A "Create Team" modal mockup with student name inputs and a faculty mentor dropdown

5. PROPOSAL SUBMISSION FORM (university side)

- Fields: Solution summary, stage (dropdown: Idea/Prototype/Pilot-ready), funding needed (₹ input), what's needed (multi-select: Funding, Manufacturing, Mentorship, Testing Site), sector tag auto-filled

6. INDUSTRY/FUNDER DASHBOARD

- Top: interest domain tags selected (e.g. "Agriculture, Water" shown as chips)

- Grid of "Open Project" cards filtered to those domains only, each showing: domain badge, title, district, upvote count, "4 proposals submitted" label, proposal-window-closed indicator

- Show one problem card with a small "Email sent" tag/icon to represent the notification funders receive once the 2-week window closes and a matching problem is ready for review

- Clicking a card opens a PROPOSAL COMPARISON VIEW: 3-4 university proposal cards side by side (university name, summary, funding ask, timeline) each with a "Fund This Proposal" button

- After selecting: show confirmation state — "You are now funding Birsa Agricultural University's proposal" and other cards greyed out marked "Not Selected"

7. GOVERNMENT ANALYTICS DASHBOARD

- Login shows a department selector first (Agriculture Dept, Water Dept, Education Dept, etc.)

- Top KPI cards: Total Problems in this dept, Verified vs Pending count, Resolution Rate %, Total Funding Routed to this dept's problems (₹)

- A bar chart: problems by category

- A donut chart: status distribution (Submitted/In Progress/Piloted/Resolved)

- A simple map placeholder showing district-wise heat concentration (just a stylized India/Jharkhand map graphic is fine)

- A table: problems tagged to this department, with current status stage and a "Verify Update" button next to any pending status change

- Clicking "Verify Update" opens a small modal: shows what the university claims (e.g. "Marked as: Prototype") with an Approve/Reject verification action

- Include 1 problem card marked "Unfunded — needs attention" (red badge)

- A table: top-performing universities by projects completed

Use lucide-react icons throughout. Make all buttons and cards interactive with hover states. Add a top navbar with role switcher (Complainant / University / Industry / Government) so I can demo all four dashboards in one click during a live presentation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8e215b8d-ddeb-4235-be70-9ab4399a8302).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
