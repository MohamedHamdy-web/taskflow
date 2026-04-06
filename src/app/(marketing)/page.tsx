import Link from "next/link";
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  Users,
  Zap,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-lg" />
          <span className="font-bold text-xl text-zinc-900 dark:text-white">
            Taskflow
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium bg-linear-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-8 pt-20 pb-32 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-r from-violet-200 via-indigo-200 to-cyan-200 dark:from-violet-900 dark:via-indigo-900 dark:to-cyan-900 rounded-full blur-3xl opacity-40 -z-10" />

        <div className="inline-flex items-center gap-2 bg-linear-to-r from-violet-50 to-indigo-50 dark:from-violet-950 dark:to-indigo-950 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Zap className="w-4 h-4" />
          Built for modern teams
        </div>

        <h1 className="text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-6 max-w-4xl mx-auto">
          Manage projects with{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            clarity and speed
          </span>
        </h1>

        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Taskflow helps your team stay organized, ship faster, and never lose
          track of what matters. From simple tasks to complex projects.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-200 dark:shadow-violet-900"
          >
            Start for free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/sign-in"
            className="px-8 py-4 rounded-xl font-semibold text-lg text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
          >
            Sign in
          </Link>
        </div>

        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-4">
          No credit card required
        </p>
      </section>

      {/* Features */}
      <section className="px-8 py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Everything your team needs
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Powerful features that scale with your team — from solo projects
              to large organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FolderKanban,
                color: "from-violet-500 to-indigo-500",
                bg: "bg-gradient-to-br from-violet-500 to-indigo-500",
                title: "Kanban Boards",
                description:
                  "Visualize your workflow with drag-and-drop kanban boards. Move tasks across stages with ease.",
              },
              {
                icon: Users,
                color: "from-indigo-500 to-cyan-500",
                bg: "bg-gradient-to-br from-indigo-500 to-cyan-500",
                title: "Team Collaboration",
                description:
                  "Invite teammates, assign roles, and work together in real time on shared workspaces.",
              },
              {
                icon: CheckSquare,
                color: "from-cyan-500 to-emerald-500",
                bg: "bg-gradient-to-br from-cyan-500 to-emerald-500",
                title: "Task Management",
                description:
                  "Create tasks, set priorities, track progress, and never miss a deadline again.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 hover:shadow-lg hover:shadow-zinc-100 dark:hover:shadow-zinc-900 transition-shadow"
              >
                <div
                  className={`${feature.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-24 bg-linear-to-br from-violet-600 via-indigo-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { value: "10x", label: "Faster project delivery" },
              { value: "98%", label: "Team satisfaction rate" },
              { value: "50+", label: "Features out of the box" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-6xl font-extrabold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-violet-200 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 max-w-7xl mx-auto text-center">
        <div className="bg-linear-to-br from-violet-50 via-indigo-50 to-cyan-50 dark:from-violet-950 dark:via-indigo-950 dark:to-cyan-950 border border-violet-100 dark:border-violet-900 rounded-3xl p-16">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Join thousands of teams already using Taskflow to ship better work,
            faster.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-linear-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-200 dark:shadow-violet-900"
          >
            Get started for free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 dark:border-zinc-800 px-8 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-linear-to-br from-violet-600 to-indigo-600 rounded-md" />
            <span className="font-bold text-zinc-900 dark:text-white">
              Taskflow
            </span>
          </div>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            © 2026 Taskflow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
