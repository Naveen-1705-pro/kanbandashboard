import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import { SearchBar } from "./SearchBar";
import { Task, Priority } from "@/types/kanban";
import { GripVertical } from "lucide-react";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create mockups for the new product landing page with modern design",
    priority: "high",
    assignee: "JD",
    tags: ["Design", "UI/UX"],
    dueDate: "2025-11-20",
    columnId: "todo",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate payment gateway API",
    priority: "urgent",
    assignee: "SM",
    tags: ["Backend", "API"],
    dueDate: "2025-11-18",
    columnId: "in-progress",
  },
  {
    id: "3",
    title: "Code Review",
    description: "Review PR #234 for authentication module",
    priority: "medium",
    assignee: "AL",
    tags: ["Review"],
    dueDate: "2025-11-17",
    columnId: "review",
  },
  {
    id: "4",
    title: "Deploy to Production",
    description: "Deploy v2.0 release to production servers",
    priority: "low",
    assignee: "MK",
    tags: ["DevOps"],
    dueDate: "2025-11-16",
    columnId: "done",
  },
];

const columns = [
  { id: "todo", title: "To Do", color: "hsl(var(--muted))" },
  { id: "in-progress", title: "In Progress", color: "hsl(var(--primary))" },
  { id: "review", title: "Review", color: "hsl(var(--accent))" },
  { id: "done", title: "Done", color: "hsl(var(--priority-low))" },
];

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "",
      description: "",
      priority: "medium",
      assignee: "U",
      tags: [],
      dueDate: new Date().toISOString().split("T")[0],
      columnId,
    };
    setSelectedTask(newTask);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (tasks.find((t) => t.id === task.id)) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (columnId: string) => {
    if (draggedTask) {
      setTasks(
        tasks.map((t) =>
          t.id === draggedTask.id ? { ...t, columnId } : t
        )
      );
      setDraggedTask(null);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Kanban Board
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {tasks.length} tasks
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="container mx-auto px-6 py-6">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
        />
      </div>

      {/* Kanban Columns */}
      <div className="container mx-auto px-6 pb-12">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={filteredTasks.filter((t) => t.columnId === column.id)}
              onAddTask={() => handleAddTask(column.id)}
              onEditTask={handleEditTask}
              onDragStart={handleDragStart}
              onDrop={() => handleDrop(column.id)}
              isDragging={!!draggedTask}
            />
          ))}
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};
