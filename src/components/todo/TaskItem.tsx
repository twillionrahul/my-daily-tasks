import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { Task } from "@/types/todo";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

/** Single task item with edit, delete, and complete */
const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex items-center gap-3 rounded-lg px-4 py-3 task-shadow transition-shadow duration-200 hover:task-shadow-hover"
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-200 ${
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input hover:border-primary"
        }`}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed && <Check size={12} strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit();
              if (e.key === "Escape") { setEditText(task.text); setIsEditing(false); }
            }}
            className="w-full rounded bg-transparent text-[0.9375rem] text-foreground outline-none ring-1 ring-ring px-1"
          />
        ) : (
          <>
            <p
              className={`text-[0.9375rem] leading-relaxed transition-colors duration-200 ${
                task.completed ? "text-muted-foreground line-through" : "text-foreground"
              }`}
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {task.text}
            </p>
            <p className="text-xs tabular-nums text-muted-foreground mt-0.5">
              {format(new Date(task.createdAt), "MMM d, yyyy · h:mm a")}
            </p>
          </>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={() => { setEditText(task.text); setIsEditing(true); }}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
            aria-label="Edit task"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {isEditing && (
        <button
          onClick={() => { setEditText(task.text); setIsEditing(false); }}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-secondary"
          aria-label="Cancel edit"
        >
          <X size={14} />
        </button>
      )}
    </motion.li>
  );
};

export default TaskItem;
