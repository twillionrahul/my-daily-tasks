import { Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface TodoHeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
}

const TodoHeader = ({ isDark, onToggleDark }: TodoHeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h1 className="text-base font-medium text-foreground">Tasks</h1>
        {user && (
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
            {user.email}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleDark}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={signOut}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary"
          aria-label="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default TodoHeader;
