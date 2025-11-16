import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Priority } from "@/types/kanban";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterPriority: Priority | "all";
  setFilterPriority: (priority: Priority | "all") => void;
}

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
}: SearchBarProps) => {
  return (
    <div className="glass-card p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title or description..."
            className="pl-10 bg-background/50 border-border/50 focus:border-primary"
          />
        </div>

        {/* Priority Filter */}
        <div className="w-full md:w-48">
          <Select
            value={filterPriority}
            onValueChange={(value) => setFilterPriority(value as Priority | "all")}
          >
            <SelectTrigger className="bg-background/50 border-border/50">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
