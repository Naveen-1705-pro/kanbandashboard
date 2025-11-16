import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types/kanban";
import { Button } from "./ui/button";

interface Column {
  id: string;
  title: string;
  color: string;
}

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDragStart: (task: Task) => void;
  onDrop: () => void;
  isDragging: boolean;
}

export const KanbanColumn = ({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDragStart,
  onDrop,
  isDragging,
}: KanbanColumnProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex flex-col min-w-[320px] max-w-[320px] animate-fade-in ${
        isDragging ? "ring-2 ring-primary/50 rounded-lg" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div className="glass-card rounded-t-lg p-4 border-b-2" style={{ borderBottomColor: column.color }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{column.title}</h3>
          <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
            {tasks.length}
          </span>
        </div>
        <Button
          onClick={onAddTask}
          variant="outline"
          size="sm"
          className="w-full bg-card/50 hover:bg-card border-border/50 hover:border-primary/50 transition-all"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Task List */}
      <div className="glass-card rounded-b-lg p-4 flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-300px)]">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Click "Add Task" to create one</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onEditTask(task)}
              onDragStart={() => onDragStart(task)}
            />
          ))
        )}
      </div>
    </div>
  );
};
