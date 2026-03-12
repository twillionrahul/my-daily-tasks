interface TodoFooterProps {
  total: number;
  completed: number;
  pending: number;
  onClearCompleted: () => void;
}

/** Progress bar, counts, and clear completed button */
const TodoFooter = ({ total, completed, pending, onClearCompleted }: TodoFooterProps) => {
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Counts & clear */}
      <div className="flex items-center justify-between text-sm tabular-nums">
        <div className="flex gap-3 text-muted-foreground">
          <span>{total} total</span>
          <span>{pending} pending</span>
          <span>{completed} completed</span>
        </div>
        {completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors duration-200 hover:bg-secondary"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoFooter;
