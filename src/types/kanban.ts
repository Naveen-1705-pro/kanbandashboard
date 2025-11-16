export type Priority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  tags: string[];
  dueDate: string;
  columnId: string;
}
