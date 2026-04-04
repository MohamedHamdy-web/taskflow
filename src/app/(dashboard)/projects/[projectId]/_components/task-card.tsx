"use client";

import { Task } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateTaskStatus, deleteTask, updateTask } from "@/lib/actions";
import { Trash2, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PRIORITY_COLORS = {
  LOW: "bg-zinc-100 text-zinc-600",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await updateTaskStatus(task.id, e.target.value as Task["status"]);
    router.refresh();
  }

  async function handleDelete() {
    toast("Delete this task?", {
      action: {
        label: "Delete",
        onClick: async () => {
          await deleteTask(task.id);
          router.refresh();
          toast.success("Task deleted");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  }

  async function handleUpdate() {
    if (!title.trim()) return;
    setLoading(true);
    await updateTask({ taskId: task.id, title, description, priority });
    setLoading(false);
    setEditing(false);
    router.refresh();
    toast.success("Task updated!");
  }

  if (editing) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-zinc-900">Edit Task</p>
          <button
            onClick={() => setEditing(false)}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          <div>
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
              className="mt-1 w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            className="flex-1 text-xs"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 text-xs"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-zinc-900">{task.title}</p>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => setEditing(true)}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-zinc-400 hover:text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-zinc-500 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="text-xs text-zinc-500 bg-transparent border-none outline-none cursor-pointer"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
