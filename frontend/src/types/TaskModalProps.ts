export interface TaskInput {
  title: string;
  description?: string;
  quantity?:number;
  dueDate?: string;
  isPriority: boolean;
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskInput) => void;
  initialData?: TaskInput;
}