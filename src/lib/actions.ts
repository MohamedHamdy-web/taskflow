"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sendInvitationEmail } from "./mailer";

export async function createProject({
  name,
  description,
  workspaceId,
}: {
  name: string;
  description: string;
  workspaceId: string;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.project.create({
    data: {
      name,
      description: description || null,
      workspaceId,
      createdById: user.id,
    },
  });
}

export async function createTask({
  title,
  description,
  priority,
  projectId,
}: {
  title: string;
  description: string;
  priority: string;
  projectId: string;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.task.create({
    data: {
      title,
      description: description || null,
      priority: priority as "LOW" | "MEDIUM" | "HIGH",
      projectId,
    },
  });
}

export async function updateTaskStatus(taskId: string, status: string) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.task.update({
    where: { id: taskId },
    data: { status: status as "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" },
  });
}

export async function deleteProject(projectId: string) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.task.deleteMany({ where: { projectId } });
  await prisma.project.delete({ where: { id: projectId } });
}

export async function updateProject({
  projectId,
  name,
  description,
}: {
  projectId: string;
  name: string;
  description: string;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.project.update({
    where: { id: projectId },
    data: { name, description: description || null },
  });
}

export async function deleteTask(taskId: string) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.task.delete({ where: { id: taskId } });
}

export async function updateTask({
  taskId,
  title,
  description,
  priority,
}: {
  taskId: string;
  title: string;
  description: string;
  priority: string;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      description: description || null,
      priority: priority as "LOW" | "MEDIUM" | "HIGH",
    },
  });
}

export async function removeMember(memberId: string) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.member.delete({ where: { id: memberId } });
}

export async function updateMemberRole(memberId: string, role: string) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.member.update({
    where: { id: memberId },
    data: { role: role as "ADMIN" | "MEMBER" },
  });
}

export async function updateWorkspace({
  workspaceId,
  name,
}: {
  workspaceId: string;
  name: string;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.workspace.update({
    where: { id: workspaceId },
    data: { name },
  });
}

export async function inviteMember({
  email,
  workspaceId,
}: {
  email: string;
  workspaceId: string;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Check if already a member
  const existingMember = await prisma.member.findFirst({
    where: {
      workspaceId,
      user: { email },
    },
  });

  if (existingMember) {
    return { error: "This user is already a member of your workspace." };
  }

  // Check if already invited
  const existingInvitation = await prisma.invitation.findFirst({
    where: { email, workspaceId, status: "PENDING" },
  });

  if (existingInvitation) {
    return { error: "This user already has a pending invitation." };
  }

  // Get workspace and inviter details for the email
  const [workspace, inviter] = await Promise.all([
    prisma.workspace.findUnique({ where: { id: workspaceId } }),
    prisma.user.findUnique({ where: { id: user.id } }),
  ]);

  if (!workspace || !inviter) {
    return { error: "Something went wrong." };
  }

  // Create invitation
  await prisma.invitation.upsert({
    where: { email_workspaceId: { email, workspaceId } },
    update: { status: "PENDING" },
    create: {
      email,
      workspaceId,
      invitedById: user.id,
    },
  });

  // Send email
  await sendInvitationEmail({
    toEmail: email,
    invitedByName: inviter.name || inviter.email,
    workspaceName: workspace.name,
  });

  return { success: true };
}

export async function acceptInvitation(invitationId: string) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation || invitation.status !== "PENDING") {
    return { error: "Invitation not found or already handled." };
  }

  if (invitation.email !== user.emailAddresses[0]?.emailAddress) {
    return { error: "This invitation is not for you." };
  }

  // Add to workspace
  await prisma.member.create({
    data: {
      userId: user.id,
      workspaceId: invitation.workspaceId,
      role: "MEMBER",
    },
  });

  // Mark as accepted
  await prisma.invitation.update({
    where: { id: invitationId },
    data: { status: "ACCEPTED" },
  });

  return { success: true };
}

export async function declineInvitation(invitationId: string) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  await prisma.invitation.update({
    where: { id: invitationId },
    data: { status: "DECLINED" },
  });

  return { success: true };
}
