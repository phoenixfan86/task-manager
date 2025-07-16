import type { User } from './UserProps';

export interface TaskInput {
  title: string;
  description?: string;
  quantity?:number;
  dueDate?: string;
  isPriority: boolean;
  author?: string;
  assignedTo?: string;
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskInput) => void;
  initialData?: TaskInput;
  user: User;
}