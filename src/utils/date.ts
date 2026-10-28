const MS_PER_DAY = 86_400_000;
const DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export const getToday = (): Date => {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate()); // 00:00 local
};

// null nếu sai định dạng HOẶC ngày không có thật
export function parseDate(s: string): Date | null {
  const m = DATE_RE.exec(s);
  if (!m) return null;
  const d = +m[1];
  const mo = +m[2];
  const y = +m[3];
  if (y < 1900 || y > 2100) return null; // giới hạn năm hợp lý
  if (mo < 1 || mo > 12) return null;
  const date = new Date(y, mo - 1, d);
  const ok = date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
  return ok ? date : null;
}

export const formatDate = (d: Date): string =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

export const addDays = (d: Date, n: number): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

// >0: còn n ngày | 0: hôm nay | <0: đã quá n ngày
export function daysUntil(due: Date, today: Date = getToday()): number {
  const a = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const b = Date.UTC(due.getFullYear(), due.getMonth(), due.getDate());
  return Math.round((b - a) / MS_PER_DAY);
}

// Khóa sắp xếp; dữ liệu hỏng đẩy xuống cuối thay vì crash
export function dueSortKey(s: string): number {
  const d = parseDate(s);
  return d ? d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() : Number.MAX_SAFE_INTEGER;
}

// Mặt nạ nhập liệu ô hạn hoàn thành
export function formatDateInput(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 8); // chỉ giữ chữ số, tối đa 8
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}
