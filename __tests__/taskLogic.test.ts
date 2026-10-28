jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

import { parseDate, daysUntil, dueSortKey, formatDateInput } from '../src/utils/date';
import { validateTaskForm } from '../src/utils/validation';
import { isOverdue, applyFilter, applySearch, applySort, getProgress } from '../src/utils/taskSelectors';
import { buildSeedTasks } from '../src/data/seedTasks';
import { sanitizeTasks } from '../src/storage/taskStorage';

describe('Date Utilities', () => {

  test('parseDate validates genuine calendar dates and rejects false ones', () => {
    expect(parseDate('28/10/2026')).not.toBeNull();
    expect(parseDate('31/02/2026')).toBeNull(); // 31/02 không tồn tại
    expect(parseDate('29/02/2026')).toBeNull(); // 2026 không nhuận
    expect(parseDate('29/02/2028')).not.toBeNull(); // 2028 nhuận
    expect(parseDate('29/02/2100')).toBeNull(); // 2100 không nhuận
    expect(parseDate('31/04/2026')).toBeNull(); // tháng 4 chỉ có 30 ngày
    expect(parseDate('15/13/2026')).toBeNull(); // tháng 13
    expect(parseDate('00/10/2026')).toBeNull(); // ngày 0
    expect(parseDate('12/05/20')).toBeNull(); // năm 2 số
  });

  test('daysUntil calculates difference correctly', () => {
    const today = parseDate('28/10/2026')!;
    const past = parseDate('25/10/2026')!;
    const future = parseDate('30/10/2026')!;

    expect(daysUntil(today, today)).toBe(0);
    expect(daysUntil(past, today)).toBe(-3);
    expect(daysUntil(future, today)).toBe(2);
  });

  test('dueSortKey orders dates chronologically', () => {
    const d1 = dueSortKey('20/12/2026');
    const d2 = dueSortKey('05/01/2027');
    expect(d1).toBeLessThan(d2); // 20261220 < 20270105
  });

  test('formatDateInput formats numeric mask automatically', () => {
    expect(formatDateInput('28102026')).toBe('28/10/2026');
    expect(formatDateInput('28-10-2026')).toBe('28/10/2026');
    expect(formatDateInput('28')).toBe('28');
    expect(formatDateInput('2810')).toBe('28/10');
  });
});

describe('Validation Matrix', () => {
  const today = new Date(2026, 9, 28); // 28/10/2026

  test('F1 & F2: Tên rỗng hoặc toàn dấu cách', () => {
    expect(validateTaskForm({ title: '', dueDate: '28/10/2026' }, 'add', today).title)
      .toBe('Vui lòng nhập tên công việc');
    expect(validateTaskForm({ title: '    ', dueDate: '28/10/2026' }, 'add', today).title)
      .toBe('Vui lòng nhập tên công việc');
  });

  test('F3 & F4: Độ dài tên công việc', () => {
    const title50 = 'a'.repeat(50);
    const title51 = 'a'.repeat(51);

    expect(validateTaskForm({ title: title50, dueDate: '28/10/2026' }, 'add', today).title)
      .toBeUndefined();
    expect(validateTaskForm({ title: title51, dueDate: '28/10/2026' }, 'add', today).title)
      .toBe('Tên công việc tối đa 50 ký tự (hiện 51)');
  });

  test('F5 - F8: Validation hạn hoàn thành', () => {
    expect(validateTaskForm({ title: 'Task', dueDate: '' }, 'add', today).dueDate)
      .toBe('Vui lòng nhập hạn hoàn thành');
    expect(validateTaskForm({ title: 'Task', dueDate: '12/05/20' }, 'add', today).dueDate)
      .toBe('Hạn phải có dạng dd/mm/yyyy');
    expect(validateTaskForm({ title: 'Task', dueDate: '31/02/2026' }, 'add', today).dueDate)
      .toBe('Ngày không tồn tại trong lịch (ví dụ 31/02/2026)');
  });

  test('F10 & F11: Ngày quá khứ chỉ chặn khi Thêm, cho phép khi Sửa', () => {
    // Thêm hạn hôm qua -> lỗi
    expect(validateTaskForm({ title: 'Task', dueDate: '27/10/2026' }, 'add', today).dueDate)
      .toBe('Hạn không được trước ngày hôm nay (28/10/2026)');

    // Thêm hạn hôm nay -> hợp lệ
    expect(validateTaskForm({ title: 'Task', dueDate: '28/10/2026' }, 'add', today).dueDate)
      .toBeUndefined();

    // Sửa việc đã quá hạn -> hợp lệ
    expect(validateTaskForm({ title: 'Task sửa', dueDate: '27/10/2026' }, 'edit', today).dueDate)
      .toBeUndefined();
  });
});

describe('Seed Tasks & Selectors', () => {
  const today = new Date(2026, 9, 28);
  const seed = buildSeedTasks(today);

  test('Seed produces 8 tasks, 3 done, 2 overdue', () => {
    expect(seed).toHaveLength(8);
    const progress = getProgress(seed);
    expect(progress.done).toBe(3);
    expect(progress.total).toBe(8);

    const overdueList = seed.filter(t => isOverdue(t, today));
    expect(overdueList).toHaveLength(2); // #1 và #7
  });

  test('Filters work properly', () => {
    expect(applyFilter(seed, 'all', today)).toHaveLength(8);
    expect(applyFilter(seed, 'pending', today)).toHaveLength(5);
    expect(applyFilter(seed, 'done', today)).toHaveLength(3);
    expect(applyFilter(seed, 'overdue', today)).toHaveLength(2);
  });

  test('Search ignores case and Vietnamese diacritics', () => {
    expect(applySearch(seed, 'nộp')).toHaveLength(2);
    expect(applySearch(seed, 'NỘP')).toHaveLength(2);
    expect(applySearch(seed, 'Nộp')).toHaveLength(2);
    expect(applySearch(seed, 'kham suc khoe')).toHaveLength(1);
    expect(applySearch(seed, 'Khám sức khoẻ')).toHaveLength(1);
    expect(applySearch(seed, '[')).toHaveLength(0); // không crash khi gõ regex char
  });

  test('Sort orders correctly', () => {
    const sortedByDue = applySort(seed, 'dueDate');
    // dueDate tăng dần
    for (let i = 0; i < sortedByDue.length - 1; i++) {
      expect(dueSortKey(sortedByDue[i].dueDate)).toBeLessThanOrEqual(
        dueSortKey(sortedByDue[i + 1].dueDate)
      );
    }
  });

  test('Sanitize tasks cleans corrupted data without crashing', () => {
    const corrupted = [
      null,
      123,
      { id: '1' }, // thiếu title -> loại bỏ
      { id: '2', title: 'Task 2', category: 'Sai category', priority: 'Sai priority', note: 123 },
    ];
    const cleaned = sanitizeTasks(corrupted);
    expect(cleaned).toHaveLength(1);
    expect(cleaned[0].id).toBe('2');
    expect(cleaned[0].category).toBe('Cá nhân'); // fallback
    expect(cleaned[0].priority).toBe('Trung bình'); // fallback
    expect(cleaned[0].note).toBe(''); // fallback
  });
});
