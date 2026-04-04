import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateWorkspace } from "@/lib/workspace";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getOrCreateWorkspace(
    user.id,
    user.emailAddresses[0]?.emailAddress ?? "",
    user.fullName,
  );

  if (!workspace) redirect("/sign-in");

  // Fetch real stats from DB
  const [projects, members, tasks] = await Promise.all([
    prisma.project.count({ where: { workspaceId: workspace.id } }),
    prisma.member.count({ where: { workspaceId: workspace.id } }),
    prisma.task.count({
      where: { project: { workspaceId: workspace.id } },
    }),
  ]);

  const doneTasks = await prisma.task.count({
    where: {
      project: { workspaceId: workspace.id },
      status: "DONE",
    },
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Welcome back, {user.firstName}!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <p className="text-sm text-zinc-500">Total Projects</p>
          <p className="text-3xl font-bold text-zinc-900 mt-1">{projects}</p>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <p className="text-sm text-zinc-500">Team Members</p>
          <p className="text-3xl font-bold text-zinc-900 mt-1">{members}</p>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <p className="text-sm text-zinc-500">Total Tasks</p>
          <p className="text-3xl font-bold text-zinc-900 mt-1">{tasks}</p>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <p className="text-sm text-zinc-500">Completed Tasks</p>
          <p className="text-3xl font-bold text-zinc-900 mt-1">{doneTasks}</p>
        </div>
      </div>
    </div>
  );
}
