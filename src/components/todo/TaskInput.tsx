import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

/** Primary input for adding new tasks */
const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full rounded-lg bg-background px-4 py-3 pr-12 text-[0.9375rem] text-foreground placeholder:text-muted-foreground input-shadow transition-shadow duration-200 focus:input-shadow-focus focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
        aria-label="Add task"
      >
        <Plus size={18} />
      </button>
    </form>
  );
};

export default TaskInput;
