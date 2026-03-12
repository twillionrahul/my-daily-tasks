import { useState, useMemo, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { Task, FilterType, SortType } from "@/types/todo";
import TodoHeader from "@/components/todo/TodoHeader";
import TaskInput from "@/components/todo/TaskInput";
import Controls from "@/components/todo/Controls";
import TaskList from "@/components/todo/TaskList";
import TodoFooter from "@/components/todo/TodoFooter";
import ConfirmDialog from "@/components/todo/ConfirmDialog";

const Index = () => {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-tasks", []);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [search, setSearch] = useState("");

  // Confirmation dialog state
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
  }>({ open: false, title: "", message: "", confirmLabel: "", onConfirm: () => {} });

  const closeConfirm = () => setConfirmState((s) => ({ ...s, open: false }));

  // --- Task actions ---
  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, [setTasks]);

  const editTask = useCallback((id: string, text: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }, [setTasks]);

  const requestDelete = useCallback((id: string) => {
    setConfirmState({
      open: true,
      title: "Delete Task",
      message: "Are you sure you want to delete this task? This action cannot be undone.",
      confirmLabel: "Delete",
      onConfirm: () => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        closeConfirm();
      },
    });
  }, [setTasks]);

  const requestClearCompleted = useCallback(() => {
    setConfirmState({
      open: true,
      title: "Clear Completed",
      message: "Remove all completed tasks? This action cannot be undone.",
      confirmLabel: "Clear",
      onConfirm: () => {
        setTasks((prev) => prev.filter((t) => !t.completed));
        closeConfirm();
      },
    });
  }, [setTasks]);

  // --- Derived data ---
  const completed = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const pending = tasks.length - completed;

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter
    if (filter === "active") result = result.filter((t) => !t.completed);
    if (filter === "completed") result = result.filter((t) => t.completed);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(q));
    }

    // Sort
    result = [...result].sort((a, b) => {
      const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return sort === "newest" ? diff : -diff;
    });

    return result;
  }, [tasks, filter, search, sort]);

  return (
    <div className="flex min-h-screen justify-center bg-background px-4 py-8 sm:py-16">
      <div className="w-full max-w-[640px] space-y-6">
        <TodoHeader isDark={isDark} onToggleDark={toggleDark} />
        <TaskInput onAdd={addTask} />
        <Controls
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortToggle={() => setSort((s) => (s === "newest" ? "oldest" : "newest"))}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={requestDelete}
        />
        <TodoFooter
          total={tasks.length}
          completed={completed}
          pending={pending}
          onClearCompleted={requestClearCompleted}
        />
        <ConfirmDialog
          open={confirmState.open}
          title={confirmState.title}
          message={confirmState.message}
          confirmLabel={confirmState.confirmLabel}
          onConfirm={confirmState.onConfirm}
          onCancel={closeConfirm}
        />
      </div>
    </div>
  );
};

export default Index;
