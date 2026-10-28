import { parseDate, daysUntil, formatDate } from './date';

export type FormMode = 'add' | 'edit';

export interface FormErrors {
  title?: string;
  dueDate?: string;
}

export function validateTaskForm(
  v: { title: string; dueDate: string },
  mode: FormMode,
  today: Date,
): FormErrors {
  const errors: FormErrors = {};
  const title = v.title.normalize('NFC').trim();
  const len = Array.from(title).length; // Đếm theo ký tự thật, không phải code unit

  if (!title) {
    errors.title = 'Vui lòng nhập tên công việc';
  } else if (len > 50) {
    errors.title = `Tên công việc tối đa 50 ký tự (hiện ${len})`;
  }

  const raw = v.dueDate.trim();
  if (!raw) {
    errors.dueDate = 'Vui lòng nhập hạn hoàn thành';
  } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    errors.dueDate = 'Hạn phải có dạng dd/mm/yyyy';
  } else {
    const due = parseDate(raw);
    if (!due) {
      errors.dueDate = 'Ngày không tồn tại trong lịch (ví dụ 31/02/2026)';
    } else if (mode === 'add' && daysUntil(due, today) < 0) {
      errors.dueDate = `Hạn không được trước ngày hôm nay (${formatDate(today)})`;
    }
  }

  return errors;
}
