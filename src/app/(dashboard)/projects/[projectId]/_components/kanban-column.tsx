import { Task } from "@/generated/prisma/client";
import TaskCard from "./task-card";

interface Column {
  id: string;
  label: string;
  color: string;
}

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  projectId: string;
}

export default function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  return (
    <div className={`${column.color} rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-zinc-700 dark:text-zinc-300 text-sm">
          {column.label}
        </h3>
        <span className="text-xs bg-white dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300 px-2 py-1 rounded-full font-medium">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-zinc-400 text-sm">No tasks</div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
