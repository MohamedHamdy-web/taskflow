import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateWorkspace } from "@/lib/workspace";
import { getDashboardStats } from "@/lib/data";
import { FolderKanban, Users, CheckSquare, CheckCheck } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getOrCreateWorkspace(
    user.id,
    user.emailAddresses[0]?.emailAddress ?? "",
    user.fullName,
  );

  if (!workspace) redirect("/sign-in");

  const { projects, members, tasks, doneTasks } = await getDashboardStats(
    workspace.id,
  );

  const stats = [
    {
      label: "Total Projects",
      value: projects,
      icon: FolderKanban,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Team Members",
      value: members,
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Total Tasks",
      value: tasks,
      icon: CheckSquare,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Completed Tasks",
      value: doneTasks,
      icon: CheckCheck,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Welcome back, {user.firstName}!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-zinc-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
