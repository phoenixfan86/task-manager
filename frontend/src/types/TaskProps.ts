export interface Task {
  _id: string;
  title: string;
  description?: string;
  quantity?:string;
  dueDate?: string;
  createdAt:string;
  completed: boolean;
  isPriority: boolean;
}