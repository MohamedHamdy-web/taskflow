"use client";

import { ProjectWithCount } from "@/types";
import { FolderKanban } from "lucide-react";
import Link from "next/link";
import CreateProjectDialog from "./create-project-dialog";

interface ProjectListProps {
  projects: ProjectWithCount[];
  workspaceId: string;
}

export default function ProjectList({
  projects,
  workspaceId,
}: ProjectListProps) {
  return (
    <div>
      <div className="flex justify-end mb-6">
        <CreateProjectDialog workspaceId={workspaceId} />
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-zinc-100 p-4 rounded-full mb-4">
            <FolderKanban className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-medium text-zinc-900">No projects yet</h3>
          <p className="text-zinc-500 mt-1 text-sm">
            Create your first project to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-white rounded-xl border border-zinc-200 p-6 hover:border-zinc-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-zinc-100 p-2 rounded-lg">
                  <FolderKanban className="w-5 h-5 text-zinc-600" />
                </div>
                <h3 className="font-semibold text-zinc-900">{project.name}</h3>
              </div>
              {project.description && (
                <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full">
                  {project._count.tasks} tasks
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
