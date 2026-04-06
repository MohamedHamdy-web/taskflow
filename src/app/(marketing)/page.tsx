import Link from "next/link";
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  Users,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-lg" />
          <span className="font-bold text-xl text-zinc-900">Taskflow</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
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
        {/* Background gradient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-r from-violet-200 via-indigo-200 to-cyan-200 rounded-full blur-3xl opacity-40 -z-10" />

        <div className="inline-flex items-center gap-2 bg-linear-to-r from-violet-50 to-indigo-50 border border-violet-200 text-violet-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Zap className="w-4 h-4" />
          Built for modern teams
        </div>

        <h1 className="text-6xl font-extrabold text-zinc-900 leading-tight mb-6 max-w-4xl mx-auto">
          Manage projects with{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            clarity and speed
          </span>
        </h1>

        <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Taskflow helps your team stay organized, ship faster, and never lose
          track of what matters. From simple tasks to complex projects.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-200"
          >
            Start for free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/sign-in"
            className="px-8 py-4 rounded-xl font-semibold text-lg text-zinc-700 border border-zinc-200 hover:border-zinc-400 transition-colors"
          >
            Sign in
          </Link>
        </div>

        <p className="text-sm text-zinc-400 mt-4">No credit card required</p>
      </section>

      {/* Features */}
      <section className="px-8 py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 mb-4">
              Everything your team needs
            </h2>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto">
              Powerful features that scale with your team — from solo projects
              to large organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FolderKanban,
                color: "from-violet-500 to-indigo-500",
                bg: "bg-violet-50",
                title: "Kanban Boards",
                description:
                  "Visualize your workflow with drag-and-drop kanban boards. Move tasks across stages with ease.",
              },
              {
                icon: Users,
                color: "from-indigo-500 to-cyan-500",
                bg: "bg-indigo-50",
                title: "Team Collaboration",
                description:
                  "Invite teammates, assign roles, and work together in real time on shared workspaces.",
              },
              {
                icon: CheckSquare,
                color: "from-cyan-500 to-emerald-500",
                bg: "bg-cyan-50",
                title: "Task Management",
                description:
                  "Create tasks, set priorities, track progress, and never miss a deadline again.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl border border-zinc-200 p-8 hover:shadow-lg hover:shadow-zinc-100 transition-shadow"
              >
                <div
                  className={`${feature.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}
                >
                  <feature.icon
                    className={`w-6 h-6 bg-linear-to-br ${feature.color} bg-clip-text`}
                    style={{ color: "transparent", stroke: "url(#grad)" }}
                  />
                  <feature.icon
                    className={`w-6 h-6 absolute`}
                    style={{
                      background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    }}
                  />
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-linear-to-br ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed">
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
        <div className="bg-linear-to-br from-violet-50 via-indigo-50 to-cyan-50 border border-violet-100 rounded-3xl p-16">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-zinc-500 mb-8 max-w-xl mx-auto">
            Join thousands of teams already using Taskflow to ship better work,
            faster.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-linear-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-200"
          >
            Get started for free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-8 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-linear-to-br from-violet-600 to-indigo-600 rounded-md" />
            <span className="font-bold text-zinc-900">Taskflow</span>
          </div>
          <p className="text-sm text-zinc-400">
            © 2026 Taskflow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
