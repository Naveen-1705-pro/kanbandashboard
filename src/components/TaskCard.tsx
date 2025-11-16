import { Task } from "@/types/kanban";
import { Calendar, Tag } from "lucide-react";
import { Badge } from "./ui/badge";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDragStart: () => void;
}

const priorityColors = {
  low: "bg-priority-low/20 text-priority-low border-priority-low/50",
  medium: "bg-priority-medium/20 text-priority-medium border-priority-medium/50",
  high: "bg-priority-high/20 text-priority-high border-priority-high/50",
  urgent: "bg-priority-urgent/20 text-priority-urgent border-priority-urgent/50",
};

export const TaskCard = ({ task, onClick, onDragStart }: TaskCardProps) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="task-card glass-card p-4 rounded-lg cursor-pointer border border-border/50 hover:border-primary/50"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-2">
        <Badge className={`${priorityColors[task.priority]} capitalize text-xs`}>
          {task.priority}
        </Badge>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">
          {task.assignee}
        </div>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/20 text-accent text-xs"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Due Date */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
