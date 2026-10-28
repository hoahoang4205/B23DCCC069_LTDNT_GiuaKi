import { Category, Priority, FilterKey } from '../types/task';

export const CATEGORIES: Category[] = ['Học tập', 'Công việc', 'Sức khoẻ', 'Cá nhân'];
export const PRIORITIES: Priority[] = ['Cao', 'Trung bình', 'Thấp'];

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  Cao: 0,
  'Trung bình': 1,
  Thấp: 2,
};

export const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chưa xong' },
  { key: 'done', label: 'Đã xong' },
  { key: 'overdue', label: 'Quá hạn' },
];

export const STORAGE_KEY = '@planner/tasks/v1';
