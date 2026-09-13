# J-SIC Portal
**Jharkhand Societal Innovation Collaboration Portal**

Smart India Hackathon 2026 — Problem Statement #26043
**Theme:** Smart Education · **Category:** Software · **Team:** Vector

**Live Demo:** [J-SIC Portal — Turning Local Problems into Innovation](https://j-sic-portal.vercel.app/)

## Problem Statement

A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships.

## Overview

J-SIC Portal connects four stakeholders around local problems in Jharkhand:

- **Citizens** report problems (photo, location, domain-tagged)
- **Universities** get matched to problems by expertise and submit proposals
- **Industry/Funders** compare competing proposals and fund the strongest one
- **Government** verifies progress and tracks resolution across departments

The goal is to replace fragmented, one-off problem reporting with a single pipeline that takes a problem from submission through funding to a verified, resolved outcome.

## What's in This Repository (Current Prototype)

This repo currently contains the **frontend UI prototype** — all four role-based dashboards, built with realistic mock data to demonstrate the full user flow end-to-end:

- Landing page with role selection
- Citizen submission form + tracking page with status stepper
- University dashboard (assigned problems, proposal submission, team creation)
- Industry dashboard (open projects, proposal comparison, funding flow)
- Government analytics dashboard (KPIs, charts, verification workflow)
- Upvote/duplicate-report signal shown consistently across screens

No backend is wired up yet — this stage is meant to validate the UX and workflow end-to-end before building out the services below.

## Proposed Full Architecture (Planned)

As outlined in our submission, the target technical approach is:

- **Frontend:** React
- **Backend:** Node.js, REST APIs
- **Database:** PostgreSQL
- **AI/NLP layer:** domain classification + duplicate-detection via sentence embeddings, university/funder matching
- **Auth:** JWT-based, role-based access control
- **Notifications:** automated email on proposal-window close / status change
- **Storage:** S3-compatible object storage for photos/media
- **Scheduling:** cron-based jobs for proposal windows and escalation

## Tech Stack (Current Build)

- React + TanStack Start (TypeScript)
- Tailwind CSS
- Lucide React icons

## Getting Started

```bash
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Project Structure

- `src/` — application source code
- `public/` — static assets
- `roadmap.md` — planned features and phased rollout
