export interface Task {
  id: string;
  text: string;          // maps to `title` in DB
  description?: string;
  completed: boolean;
  createdAt: string;     // ISO string, maps to `created_at`
  updatedAt?: string;    // maps to `updated_at`
  dueDate?: string;      // maps to `due_date`
}

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest";
