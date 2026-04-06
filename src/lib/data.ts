import { prisma } from "@/lib/db";

export async function getProjects(workspaceId: string) {
  return prisma.project.findMany({
    where: { workspaceId },
    include: {
      _count: { select: { tasks: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDashboardStats(workspaceId: string) {
  const [projects, members, tasks, doneTasks] = await Promise.all([
    prisma.project.count({ where: { workspaceId } }),
    prisma.member.count({ where: { workspaceId } }),
    prisma.task.count({ where: { project: { workspaceId } } }),
    prisma.task.count({ where: { project: { workspaceId }, status: "DONE" } }),
  ]);

  return { projects, members, tasks, doneTasks };
}

export async function getMembers(workspaceId: string) {
  return prisma.member.findMany({
    where: { workspaceId },
    include: { user: true },
    orderBy: { joinedAt: "asc" },
  });
}

export async function getPendingInvitations(email: string) {
  return prisma.invitation.findMany({
    where: {
      email,
      status: "PENDING",
    },
    include: {
      workspace: true,
      invitedBy: true,
    },
  });
}
