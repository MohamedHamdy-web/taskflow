# Taskflow

A full-stack project management SaaS built with Next.js 16, featuring kanban boards, team collaboration, and workspace management.

🔗 **Live Demo:** https://taskflow-orcin-phi.vercel.app

## Features

- 🔐 Authentication with Clerk (Google + Email)
- 🏢 Multi-workspace support
- 📋 Kanban boards with task management
- 👥 Team members with role-based access (Owner, Admin, Member)
- 📧 Email invitations via Resend
- 🌙 Dark mode support
- ⚡ Server Actions for data mutations
- 💀 Skeleton loading states
- 🔔 Toast notifications

## Tech Stack

**Frontend**

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

**Backend**

- Prisma ORM v7
- PostgreSQL (Neon)
- Clerk (Authentication)
- Resend (Email)
- Server Actions

**Deployment**

- Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Clerk account
- Resend account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MohamedHamdy-web/taskflow.git
cd taskflow
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables — create a `.env` file:

```env
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

src/
├── app/
│ ├── (auth)/ # Sign in & Sign up pages
│ ├── (dashboard)/ # Protected dashboard pages
│ │ ├── dashboard/ # Stats overview
│ │ ├── projects/ # Projects & Kanban boards
│ │ ├── members/ # Team management
│ │ └── settings/ # Workspace settings
│ └── (marketing)/ # Landing page
├── components/ # Reusable components
├── lib/
│ ├── actions.ts # Server Actions
│ ├── data.ts # Data fetching functions
│ ├── db.ts # Prisma client
│ ├── mailer.ts # Email functions
│ └── workspace.ts # Workspace helpers
└── types/ # TypeScript types

## Database Schema

- **User** — Clerk user synced to database
- **Workspace** — Team workspace with FREE/PRO plans
- **Member** — User-Workspace relation with roles
- **Project** — Projects inside a workspace
- **Task** — Tasks inside a project with status and priority
- **Invitation** — Pending workspace invitations

## License

MIT
