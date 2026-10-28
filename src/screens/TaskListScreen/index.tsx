import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, ScrollView, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FilterKey, RootStackParamList, SortKey, Task } from '../../types/task';
import { useTasks } from '../../context/TasksContext';
import { getToday } from '../../utils/date';
import {
  applyFilter,
  applySearch,
  applySort,
  getProgress,
  isOverdue,
} from '../../utils/taskSelectors';
import { FILTERS } from '../../constants/task';

import ButtonComponent from '../../components/ButtonComponent';
import SearchComponent from '../../components/SearchComponent';
import ProgressComponent from '../../components/ProgressComponent';
import ChipComponent from '../../components/ChipComponent';
import TaskItemComponent from '../../components/TaskItemComponent';
import EmptyComponent from '../../components/EmptyComponent';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskList'>;

export function TaskListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { tasks, toggleTask, removeTask, clearCompleted } = useTasks();

  const [today, setToday] = useState(getToday());
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sortKey, setSortKey] = useState<SortKey>('dueDate');

  // Cập nhật today mỗi khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      setToday(getToday());
    }, []),
  );

  // Đếm tiến độ trên TOÀN BỘ danh sách gốc
  const { done: totalDone, total: totalTasks } = useMemo(
    () => getProgress(tasks),
    [tasks],
  );

  // Số lượng đếm cho từng filter chip
  const filterCounts = useMemo(() => {
    let pending = 0;
    let done = 0;
    let overdue = 0;
    for (const t of tasks) {
      if (t.done) {
        done += 1;
      } else {
        pending += 1;
        if (isOverdue(t, today)) {
          overdue += 1;
        }
      }
    }
    return {
      all: tasks.length,
      pending,
      done,
      overdue,
    };
  }, [tasks, today]);

  // Chuỗi xử lý lọc -> tìm kiếm -> sắp xếp (chạy đồng thời)
  const visible = useMemo(() => {
    const filtered = applyFilter(tasks, filter, today);
    const searched = applySearch(filtered, query);
    return applySort(searched, sortKey);
  }, [tasks, filter, query, sortKey, today]);

  const handlePressTask = useCallback(
    (taskId: string) => {
      navigation.navigate('TaskDetail', { taskId });
    },
    [navigation],
  );

  const handleLongPressTask = useCallback(
    (task: Task) => {
      Alert.alert(
        'Xóa công việc',
        `Bạn có chắc muốn xóa "${task.title}"? Hành động này không thể hoàn tác.`,
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Xóa',
            style: 'destructive',
            onPress: () => removeTask(task.id),
          },
        ],
        { cancelable: true },
      );
    },
    [removeTask],
  );

  const handleClearCompleted = useCallback(() => {
    if (totalDone === 0) return;

    Alert.alert(
      'Xoá việc đã hoàn thành',
      `Bạn sắp xoá ${totalDone} công việc đã hoàn thành. Hành động này không thể hoàn tác.`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: () => clearCompleted(),
        },
      ],
      { cancelable: true },
    );
  }, [totalDone, clearCompleted]);

  const renderTaskItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskItemComponent
        task={item}
        overdue={isOverdue(item, today)}
        onPress={handlePressTask}
        onLongPress={handleLongPressTask}
        onToggle={toggleTask}
      />
    ),
    [today, handlePressTask, handleLongPressTask, toggleTask],
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 16) },
      ]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>Kế hoạch cá nhân</Text>
      </View>

      {/* Tiến độ hoàn thành */}
      <ProgressComponent done={totalDone} total={totalTasks} />

      {/* Ô tìm kiếm */}
      <SearchComponent
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm kiếm công việc..."
      />

      {/* Hàng bộ lọc */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
        >
          {FILTERS.map(f => (
            <ChipComponent
              key={f.key}
              label={f.label}
              selected={filter === f.key}
              onPress={() => setFilter(f.key)}
              count={filterCounts[f.key]}
            />
          ))}
        </ScrollView>
      </View>

      {/* Hàng sắp xếp */}
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sắp xếp:</Text>
        <ChipComponent
          label="Hạn hoàn thành"
          selected={sortKey === 'dueDate'}
          onPress={() => setSortKey('dueDate')}
        />
        <ChipComponent
          label="Mức ưu tiên"
          selected={sortKey === 'priority'}
          onPress={() => setSortKey('priority')}
        />
      </View>

      {/* Danh sách FlatList */}
      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        renderItem={renderTaskItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[styles.list, styles.listGrow]}
        ListEmptyComponent={
          tasks.length === 0 ? (
            <EmptyComponent
              title="Chưa có công việc nào"
              message="Bắt đầu ngày mới bằng cách lên kế hoạch!"
              actionLabel="+ Thêm việc đầu tiên"
              onAction={() => navigation.navigate('TaskForm')}
            />
          ) : (
            <EmptyComponent
              title="Không tìm thấy công việc phù hợp"
              message="Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc khác."
            />
          )
        }
      />

      {/* Nút Xoá việc đã hoàn thành cố định ở đáy */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <ButtonComponent
          title={`Xóa việc đã xong (${totalDone})`}
          variant="secondary"
          disabled={totalDone === 0}
          onPress={handleClearCompleted}
          style={styles.bottomAction}
        />
        <ButtonComponent
          title="+ Thêm việc"
          onPress={() => navigation.navigate('TaskForm')}
          style={styles.bottomAction}
        />
      </View>
    </View>
  );
}

export default TaskListScreen;
