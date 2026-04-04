"use client";

import { ProjectWithCount } from "@/types";
import { FolderKanban, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateProjectDialog from "./create-project-dialog";
import { deleteProject, updateProject } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProjectListProps {
  projects: ProjectWithCount[];
  workspaceId: string;
}

export default function ProjectList({
  projects,
  workspaceId,
}: ProjectListProps) {
  const router = useRouter();
  const [editingProject, setEditingProject] = useState<ProjectWithCount | null>(
    null,
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete(projectId: string) {
    toast("Delete this project and all its tasks?", {
      action: {
        label: "Delete",
        onClick: async () => {
          await deleteProject(projectId);
          router.refresh();
          toast.success("Project deleted");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  }

  function openEdit(project: ProjectWithCount) {
    setEditingProject(project);
    setName(project.name);
    setDescription(project.description || "");
  }

  async function handleUpdate() {
    if (!editingProject || !name.trim()) return;
    setLoading(true);
    await updateProject({ projectId: editingProject.id, name, description });
    setLoading(false);
    setEditingProject(null);
    router.refresh();
    toast.success("Project updated!");
  }

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
            <div
              key={project.id}
              className="relative bg-white rounded-xl border border-zinc-200 hover:border-zinc-400 hover:shadow-sm transition-all"
            >
              <Link href={`/projects/${project.id}`} className="block p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-zinc-100 p-2 rounded-lg">
                    <FolderKanban className="w-5 h-5 text-zinc-600" />
                  </div>
                  <h3 className="font-semibold text-zinc-900">
                    {project.name}
                  </h3>
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

              {/* Buttons sit on top of the link */}
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <button
                  onClick={() => openEdit(project)}
                  className="text-zinc-400 hover:text-zinc-600 p-1"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-zinc-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6">
              Edit Project
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setEditingProject(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
