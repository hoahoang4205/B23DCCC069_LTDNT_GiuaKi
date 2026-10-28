import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, Category, Priority } from '../types/task';
import { CATEGORIES, PRIORITIES, STORAGE_KEY } from '../constants/task';
import { buildSeedTasks } from '../data/seedTasks';

export const sanitizeTasks = (rawList: unknown[]): Task[] => {
  const seenIds = new Set<string>();
  const sanitized: Task[] = [];

  for (const raw of rawList) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Partial<Task>;

    if (typeof item.id !== 'string' || typeof item.title !== 'string') {
      continue;
    }

    let id = item.id;
    if (seenIds.has(id)) {
      id = `${id}-${Math.random().toString(36).slice(2, 7)}`;
    }
    seenIds.add(id);

    const title = item.title;
    const note = typeof item.note === 'string' ? item.note : '';
    const category: Category = CATEGORIES.includes(item.category as Category)
      ? (item.category as Category)
      : 'Cá nhân';
    const priority: Priority = PRIORITIES.includes(item.priority as Priority)
      ? (item.priority as Priority)
      : 'Trung bình';
    const dueDate = typeof item.dueDate === 'string' ? item.dueDate : '';
    const done = typeof item.done === 'boolean' ? item.done : false;

    sanitized.push({
      id,
      title,
      note,
      category,
      priority,
      dueDate,
      done,
    });
  }

  return sanitized;
};

export const loadTasks = async (today: Date): Promise<Task[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      const seed = buildSeedTasks(today);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      const seed = buildSeedTasks(today);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }

    return sanitizeTasks(parsed);
  } catch (error) {
    console.warn('Failed to load tasks from storage, falling back to seed:', error);
    const seed = buildSeedTasks(today);
    return seed;
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn('Failed to save tasks to storage:', error);
  }
};
