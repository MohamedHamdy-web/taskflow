"use client";

import { Task } from "@/generated/prisma/client";
import KanbanColumn from "./kanban-column";
import CreateTaskDialog from "./create-task-dialog";

const COLUMNS = [
  { id: "TODO", label: "To Do", color: "bg-zinc-100 dark:bg-zinc-800" },
  {
    id: "IN_PROGRESS",
    label: "In Progress",
    color: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "IN_REVIEW",
    label: "In Review",
    color: "bg-yellow-50 dark:bg-yellow-950",
  },
  { id: "DONE", label: "Done", color: "bg-green-50 dark:bg-green-950" },
];

interface KanbanBoardProps {
  tasks: Task[];
  projectId: string;
}

export default function KanbanBoard({ tasks, projectId }: KanbanBoardProps) {
  return (
    <div>
      <div className="flex justify-end mb-6">
        <CreateTaskDialog projectId={projectId} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((t) => t.status === column.id)}
            projectId={projectId}
          />
        ))}
      </div>
    </div>
  );
}
