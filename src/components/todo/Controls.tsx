import { Search, ArrowUpDown } from "lucide-react";
import type { FilterType, SortType } from "@/types/todo";

interface ControlsProps {
  search: string;
  onSearchChange: (val: string) => void;
  filter: FilterType;
  onFilterChange: (val: FilterType) => void;
  sort: SortType;
  onSortToggle: () => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

/** Search, filter, and sort controls */
const Controls = ({ search, onSearchChange, filter, onFilterChange, sort, onSortToggle }: ControlsProps) => (
  <div className="space-y-3">
    {/* Search */}
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full rounded-lg bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground input-shadow transition-shadow duration-200 focus:input-shadow-focus focus:outline-none"
      />
    </div>

    {/* Filters & Sort */}
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "text-secondary-foreground hover:bg-secondary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        onClick={onSortToggle}
        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors duration-200 hover:bg-secondary"
      >
        <ArrowUpDown size={14} />
        {sort === "newest" ? "Newest" : "Oldest"}
      </button>
    </div>
  </div>
);

export default Controls;
