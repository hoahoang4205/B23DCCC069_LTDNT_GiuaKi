import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Category, Priority, RootStackParamList } from '../../types/task';
import { CATEGORIES, PRIORITIES } from '../../constants/task';
import { useTasks } from '../../context/TasksContext';
import { formatDate, formatDateInput, getToday, parseDate } from '../../utils/date';
import { FormErrors, validateTaskForm } from '../../utils/validation';
import { colors } from '../../theme';

import InputComponent from '../../components/InputComponent';
import ChipComponent from '../../components/ChipComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

const priorityActiveColors: Record<Priority, string> = {
  Cao: colors.danger,
  'Trung bình': colors.warningDark,
  Thấp: colors.successDark,
};

const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export function TaskFormScreen({ navigation, route }: Props) {
  const taskId = route.params?.taskId;
  const isEdit = Boolean(taskId);
  const { tasks, addTask, updateTask } = useTasks();

  const existing = useMemo(
    () => (taskId ? tasks.find(t => t.id === taskId) : undefined),
    [taskId, tasks],
  );

  // Nếu là edit mà không tìm thấy task (bị xoá trước đó) thì quay lại
  useEffect(() => {
    if (isEdit && !existing) {
      navigation.goBack();
    }
  }, [isEdit, existing, navigation]);

  // Cập nhật tiêu đề màn hình
  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Sửa công việc' : 'Thêm công việc',
    });
  }, [isEdit, navigation]);

  // Khởi tạo state bằng initial value (tránh useEffect gây nháy dữ liệu)
  const [title, setTitle] = useState(existing?.title ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [category, setCategory] = useState<Category>(
    existing?.category ?? 'Học tập',
  );
  const [priority, setPriority] = useState<Priority>(
    existing?.priority ?? 'Trung bình',
  );
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? '');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const initialDate = parseDate(existing?.dueDate ?? '') ?? getToday();
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Đếm ký tự tên công việc
  const titleCharCount = Array.from(title.normalize('NFC').trim()).length;
  const noteCharCount = Array.from(note.normalize('NFC').trim()).length;
  const today = getToday();
  const calendarOffset = (calendarMonth.getDay() + 6) % 7;
  const calendarDays = [
    ...Array.from<number | null>({ length: calendarOffset }).map(() => null),
    ...Array.from(
      { length: new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate() },
      (_, index) => index + 1,
    ),
  ];

  // Validate realtime khi đã bấm Lưu lần đầu bị lỗi
  const validateFieldOnChange = (
    updatedTitle: string,
    updatedDueDate: string,
  ) => {
    if (!hasSubmitted) return;
    const errs = validateTaskForm(
      { title: updatedTitle, dueDate: updatedDueDate },
      isEdit ? 'edit' : 'add',
      getToday(),
    );
    setErrors(errs);
  };

  const handleChangeTitle = (text: string) => {
    setTitle(text);
    validateFieldOnChange(text, dueDate);
  };

  const handleChangeNote = (text: string) => {
    setNote(text);
  };

  const handleChangeDueDate = (raw: string) => {
    const formatted = formatDateInput(raw);
    setDueDate(formatted);
    validateFieldOnChange(title, formatted);
  };

  const openCalendar = () => {
    const selectedDate = parseDate(dueDate) ?? getToday();
    setCalendarMonth(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
    );
    setIsCalendarVisible(true);
  };

  const changeCalendarMonth = (amount: number) => {
    setCalendarMonth(
      current =>
        new Date(current.getFullYear(), current.getMonth() + amount, 1),
    );
  };

  const selectCalendarDay = (day: number) => {
    const selectedDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    handleChangeDueDate(formatDate(selectedDate));
    setIsCalendarVisible(false);
  };

  const handleSave = () => {
    if (isSaving) return;

    const todayAtSave = getToday();
    const validationErrors = validateTaskForm(
      { title, dueDate },
      isEdit ? 'edit' : 'add',
      todayAtSave,
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setHasSubmitted(true);
      return;
    }

    setIsSaving(true);
    const cleanTitle = title.normalize('NFC').trim();
    const cleanNote = note.normalize('NFC').trim();
    const cleanDueDate = dueDate.trim();

    if (isEdit && taskId) {
      updateTask(taskId, {
        title: cleanTitle,
        note: cleanNote,
        category,
        priority,
        dueDate: cleanDueDate,
      });
    } else {
      addTask({
        title: cleanTitle,
        note: cleanNote,
        category,
        priority,
        dueDate: cleanDueDate,
      });
    }

    navigation.goBack();
  };

  if (isEdit && !existing) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Ô 1: Tên công việc (bắt buộc, max 50 ký tự) */}
        <InputComponent
          label="Tên công việc"
          value={title}
          onChangeText={handleChangeTitle}
          placeholder="Nhập tên công việc..."
          required
          error={errors.title}
          counter={{ current: titleCharCount, max: 50 }}
          autoCapitalize="sentences"
        />

        {/* Ô 2: Ghi chú (không bắt buộc) */}
        <InputComponent
          label="Ghi chú"
          value={note}
          onChangeText={handleChangeNote}
          placeholder="Thêm chi tiết hoặc ghi chú..."
          multiline
          maxLength={1000}
          counter={{ current: noteCharCount, max: 500 }}
          autoCapitalize="sentences"
        />

        {/* Ô 3: Chọn Danh mục (4 chips) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Danh mục</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map(cat => (
              <ChipComponent
                key={cat}
                label={cat}
                selected={category === cat}
                onPress={() => setCategory(cat)}
              />
            ))}
          </View>
        </View>

        {/* Ô 4: Chọn Mức ưu tiên (3 chips) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Mức ưu tiên</Text>
          <View style={styles.chipRow}>
            {PRIORITIES.map(pri => (
              <ChipComponent
                key={pri}
                label={pri}
                selected={priority === pri}
                onPress={() => setPriority(pri)}
                activeColor={priorityActiveColors[pri]}
              />
            ))}
          </View>
        </View>

        {/* Ô 5: Hạn hoàn thành (bắt buộc, dd/mm/yyyy) */}
        <InputComponent
          label="Hạn hoàn thành"
          value={dueDate}
          onChangeText={handleChangeDueDate}
          placeholder="dd/mm/yyyy"
          required
          error={errors.dueDate}
          keyboardType="numeric"
          autoCapitalize="none"
          accessory={
            <ButtonComponent
              title="📅 Chọn"
              variant="secondary"
              accessibilityLabel="Chọn ngày hạn hoàn thành"
              onPress={openCalendar}
              style={styles.calendarButton}
            />
          }
        />

        <Modal
          visible={isCalendarVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsCalendarVisible(false)}
        >
          <View style={styles.calendarOverlay}>
            <View style={styles.calendarDialog}>
              <View style={styles.calendarHeader}>
                <Text style={styles.calendarTitle}>Chọn hạn hoàn thành</Text>
                <Pressable
                  onPress={() => setIsCalendarVisible(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Đóng lịch"
                  hitSlop={8}
                >
                  <Text style={styles.calendarClose}>×</Text>
                </Pressable>
              </View>
              <View style={styles.monthHeader}>
                <Pressable
                  onPress={() => changeCalendarMonth(-1)}
                  accessibilityRole="button"
                  accessibilityLabel="Tháng trước"
                  style={styles.monthArrow}
                >
                  <Text style={styles.monthArrowText}>‹</Text>
                </Pressable>
                <Text style={styles.monthTitle}>
                  Tháng {calendarMonth.getMonth() + 1},{' '}
                  {calendarMonth.getFullYear()}
                </Text>
                <Pressable
                  onPress={() => changeCalendarMonth(1)}
                  accessibilityRole="button"
                  accessibilityLabel="Tháng sau"
                  style={styles.monthArrow}
                >
                  <Text style={styles.monthArrowText}>›</Text>
                </Pressable>
              </View>
              <View style={styles.calendarGrid}>
                {weekdays.map(weekday => (
                  <Text key={weekday} style={styles.weekday}>
                    {weekday}
                  </Text>
                ))}
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <View key={`empty-${index}`} style={styles.dayCell} />;
                  }
                  const date = new Date(
                    calendarMonth.getFullYear(),
                    calendarMonth.getMonth(),
                    day,
                  );
                  const isPastDate =
                    !isEdit && date.getTime() < today.getTime();
                  const isSelected = dueDate === formatDate(date);

                  return (
                    <Pressable
                      key={day}
                      disabled={isPastDate}
                      onPress={() => selectCalendarDay(day)}
                      accessibilityRole="button"
                      accessibilityLabel={formatDate(date)}
                      accessibilityState={{
                        disabled: isPastDate,
                        selected: isSelected,
                      }}
                      style={[
                        styles.dayCell,
                        isSelected && styles.selectedDay,
                        isPastDate && styles.disabledDay,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelected && styles.selectedDayText,
                          isPastDate && styles.disabledDayText,
                        ]}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>

        {/* Nút hành động */}
        <View style={styles.buttonRow}>
          <ButtonComponent
            title="Huỷ"
            variant="secondary"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          />
          <ButtonComponent
            title="Lưu"
            variant="primary"
            onPress={handleSave}
            disabled={isSaving}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default TaskFormScreen;
