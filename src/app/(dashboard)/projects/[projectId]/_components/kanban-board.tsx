"use client";

import { Task } from "@/generated/prisma/client";
import CreateTaskDialog from "./create-task-dialog";
import KanbanColumn from "./kanban-column";

const COLUMNS = [
  { id: "TODO", label: "To Do", color: "bg-zinc-100" },
  { id: "IN_PROGRESS", label: "In Progress", color: "bg-blue-50" },
  { id: "IN_REVIEW", label: "In Review", color: "bg-yellow-50" },
  { id: "DONE", label: "Done", color: "bg-green-50" },
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
