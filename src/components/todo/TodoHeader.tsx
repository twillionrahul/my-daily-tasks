import { Moon, Sun } from "lucide-react";

interface TodoHeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
}

/** App header with title and dark mode toggle */
const TodoHeader = ({ isDark, onToggleDark }: TodoHeaderProps) => (
  <header className="flex items-center justify-between">
    <h1 className="text-base font-medium text-foreground">Tasks</h1>
    <button
      onClick={onToggleDark}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  </header>
);

export default TodoHeader;
