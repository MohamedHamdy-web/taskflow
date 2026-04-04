"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
