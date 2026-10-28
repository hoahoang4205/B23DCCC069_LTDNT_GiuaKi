export type Category = 'Học tập' | 'Công việc' | 'Sức khoẻ' | 'Cá nhân';
export type Priority = 'Cao' | 'Trung bình' | 'Thấp';
export type FilterKey = 'all' | 'pending' | 'done' | 'overdue';
export type SortKey = 'dueDate' | 'priority';

export interface Task {
  id: string;
  title: string;
  note: string; // luôn là string, rỗng thì ''
  category: Category;
  priority: Priority;
  dueDate: string; // 'dd/mm/yyyy', zero-padded
  done: boolean;
}

export type RootStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  TaskForm: { taskId?: string } | undefined;
};
