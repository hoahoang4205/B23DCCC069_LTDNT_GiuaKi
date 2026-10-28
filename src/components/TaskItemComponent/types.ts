import { Task } from '../../types/task';

export interface TaskItemComponentProps {
  task: Task;
  overdue: boolean;
  onPress: (id: string) => void;
  onLongPress: (task: Task) => void;
  onToggle: (id: string) => void;
}
