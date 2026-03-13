import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Task } from "@/types/todo";

/** Map a DB row to our Task type */
function rowToTask(row: {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
  due_date: string | null;
}): Task {
  return {
    id: row.id,
    text: row.title,
    description: row.description ?? undefined,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    dueDate: row.due_date ?? undefined,
  };
}

export function useTodos() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["todos"] });

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(rowToTask);
    },
  });

  const addTask = useMutation({
    mutationFn: async (text: string) => {
      const { error } = await supabase
        .from("todos")
        .insert({ title: text });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const toggleTask = useMutation({
    mutationFn: async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const { error } = await supabase
        .from("todos")
        .update({ completed: !task.completed })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const editTask = useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) => {
      const { error } = await supabase
        .from("todos")
        .update({ title: text })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const clearCompleted = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("completed", true);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return {
    tasks,
    isLoading,
    addTask: addTask.mutate,
    toggleTask: toggleTask.mutate,
    editTask: (id: string, text: string) => editTask.mutate({ id, text }),
    deleteTask: deleteTask.mutate,
    clearCompleted: clearCompleted.mutate,
  };
}
