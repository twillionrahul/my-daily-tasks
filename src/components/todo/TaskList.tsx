import { AnimatePresence } from "framer-motion";
import type { Task } from "@/types/todo";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

/** Animated list of tasks */
const TaskList = ({ tasks, onToggle, onEdit, onDelete }: TaskListProps) => (
  <ul className="space-y-2">
    <AnimatePresence initial={false}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </AnimatePresence>
    {tasks.length === 0 && (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No tasks to show
      </p>
    )}
  </ul>
);

export default TaskList;
