import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import KanbanBoard from "./_components/kanban-board";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const { projectId } = await params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      tasks: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!project) redirect("/projects");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {project.name}
        </h1>
        {project.description && (
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            {project.description}
          </p>
        )}
      </div>
      <KanbanBoard tasks={project.tasks} projectId={project.id} />
    </div>
  );
}
