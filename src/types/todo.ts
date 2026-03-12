export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // ISO string
}

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest";
