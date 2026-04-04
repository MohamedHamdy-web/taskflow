"use client";

import { Task } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { updateTaskStatus } from "@/lib/actions";

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

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await updateTaskStatus(task.id, e.target.value as Task["status"]);
    router.refresh();
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
      <p className="text-sm font-medium text-zinc-900 mb-2">{task.title}</p>

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
