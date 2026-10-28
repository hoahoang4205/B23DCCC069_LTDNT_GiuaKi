import { Task, FilterKey, SortKey } from '../types/task';
import { PRIORITY_WEIGHT } from '../constants/task';
import { parseDate, daysUntil, dueSortKey } from './date';

export const isOverdue = (task: Task, today: Date): boolean => {
  if (task.done) return false;
  const parsed = parseDate(task.dueDate);
  if (!parsed) return false;
  return daysUntil(parsed, today) < 0;
};

export interface DueInfo {
  text: string;
  tone: 'overdue' | 'warning' | 'neutral' | 'success';
  isOverdue: boolean;
}

export const getDueInfo = (task: Task, today: Date): DueInfo => {
  if (task.done) {
    return {
      text: 'Đã hoàn thành',
      tone: 'success',
      isOverdue: false,
    };
  }

  const parsed = parseDate(task.dueDate);
  if (!parsed) {
    return {
      text: task.dueDate || 'Chưa có hạn',
      tone: 'neutral',
      isOverdue: false,
    };
  }

  const diff = daysUntil(parsed, today);
  if (diff < 0) {
    return {
      text: `Quá hạn ${Math.abs(diff)} ngày`,
      tone: 'overdue',
      isOverdue: true,
    };
  }

  if (diff === 0) {
    return {
      text: 'Hạn hôm nay',
      tone: 'warning',
      isOverdue: false,
    };
  }

  return {
    text: `Còn ${diff} ngày`,
    tone: 'neutral',
    isOverdue: false,
  };
};

export const normalizeText = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .trim()
    .toLowerCase();

export const applyFilter = (tasks: Task[], f: FilterKey, today: Date): Task[] => {
  switch (f) {
    case 'pending':
      return tasks.filter(t => !t.done);
    case 'done':
      return tasks.filter(t => t.done);
    case 'overdue':
      return tasks.filter(t => isOverdue(t, today));
    case 'all':
    default:
      return tasks;
  }
};

export const applySearch = (tasks: Task[], q: string): Task[] => {
  const k = normalizeText(q);
  if (!k) return tasks;
  return tasks.filter(t => normalizeText(t.title).includes(k));
};

export const applySort = (tasks: Task[], s: SortKey): Task[] => {
  const byDue = (a: Task, b: Task) => dueSortKey(a.dueDate) - dueSortKey(b.dueDate);
  const byPri = (a: Task, b: Task) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
  const byTitle = (a: Task, b: Task) => a.title.localeCompare(b.title, 'vi');

  const cmp =
    s === 'dueDate'
      ? (a: Task, b: Task) => byDue(a, b) || byPri(a, b) || byTitle(a, b)
      : (a: Task, b: Task) => byPri(a, b) || byDue(a, b) || byTitle(a, b);

  return [...tasks].sort(cmp);
};

export const getProgress = (tasks: Task[]) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  return { done, total };
};
