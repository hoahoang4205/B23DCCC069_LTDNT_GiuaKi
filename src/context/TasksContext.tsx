import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Task } from '../types/task';
import { loadTasks, saveTasks } from '../storage/taskStorage';
import { getToday } from '../utils/date';

export interface TasksContextValue {
  tasks: Task[];
  loaded: boolean;
  addTask: (input: Omit<Task, 'id' | 'done'>) => void;
  updateTask: (id: string, patch: Partial<Omit<Task, 'id' | 'done'>>) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  clearCompleted: () => number;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Nạp dữ liệu lần đầu
  useEffect(() => {
    let cancelled = false;

    loadTasks(getToday())
      .then(initialTasks => {
        if (!cancelled) {
          setTasks(initialTasks);
        }
      })
      .catch(err => {
        console.warn('Error loading tasks:', err);
      })
      .finally(() => {
        if (!cancelled) {
          setLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Tự động lưu khi tasks thay đổi (chỉ sau khi đã nạp xong từ storage)
  useEffect(() => {
    if (!loaded) return;
    saveTasks(tasks);
  }, [tasks, loaded]);

  const addTask = useCallback((input: Omit<Task, 'id' | 'done'>) => {
    const newTask: Task = {
      ...input,
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      done: false,
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<Omit<Task, 'id' | 'done'>>) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...patch } : task)),
    );
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const clearCompleted = useCallback((): number => {
    let removedCount = 0;
    setTasks(prev => {
      const remaining: Task[] = [];
      for (const t of prev) {
        if (t.done) {
          removedCount += 1;
        } else {
          remaining.push(t);
        }
      }
      return remaining;
    });
    return removedCount;
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loaded,
        addTask,
        updateTask,
        toggleTask,
        removeTask,
        clearCompleted,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return ctx;
}
