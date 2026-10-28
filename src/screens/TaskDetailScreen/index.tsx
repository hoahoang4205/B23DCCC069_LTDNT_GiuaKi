import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { RootStackParamList } from '../../types/task';
import { useTasks } from '../../context/TasksContext';
import { getToday } from '../../utils/date';
import { getDueInfo } from '../../utils/taskSelectors';

import BadgeComponent, { BadgeTone } from '../../components/BadgeComponent';
import ButtonComponent from '../../components/ButtonComponent';
import EmptyComponent from '../../components/EmptyComponent';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

const priorityToneMap: Record<string, BadgeTone> = {
  Cao: 'high',
  'Trung bình': 'medium',
  Thấp: 'low',
};

export function TaskDetailScreen({ navigation, route }: Props) {
  const { taskId } = route.params;
  const { tasks, toggleTask } = useTasks();
  const [today, setToday] = useState(getToday());

  useFocusEffect(
    useCallback(() => {
      setToday(getToday());
    }, []),
  );

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <EmptyComponent
          title="Công việc không tồn tại"
          message="Công việc này có thể đã bị xoá."
          actionLabel="Quay lại danh sách"
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  const priTone = priorityToneMap[task.priority] || 'medium';
  const dueInfo = getDueInfo(task, today);

  const getDueNoticeStyle = () => {
    switch (dueInfo.tone) {
      case 'overdue':
        return styles.dueNoticeOverdue;
      case 'warning':
        return styles.dueNoticeWarning;
      case 'success':
        return styles.dueNoticeSuccess;
      case 'neutral':
      default:
        return styles.dueNoticeNeutral;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Hàng nhãn: Trạng thái, Quá hạn, Danh mục, Ưu tiên */}
        <View style={styles.badgesRow}>
          {task.done ? (
            <BadgeComponent label="Đã hoàn thành" tone="success" />
          ) : (
            <BadgeComponent label="Chưa hoàn thành" tone="neutral" />
          )}

          {dueInfo.isOverdue ? (
            <BadgeComponent label="Quá hạn" tone="overdue" variant="solid" />
          ) : null}

          <BadgeComponent label={task.category} tone="neutral" />
          <BadgeComponent
            label={task.priority}
            tone={priTone}
            variant="soft"
            showDot
          />
        </View>

        {/* Tiêu đề công việc */}
        <Text style={[styles.title, task.done && styles.titleDone]}>
          {task.title}
        </Text>

        {/* Thông tin hạn và số ngày */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hạn hoàn thành</Text>
            <Text
              style={[
                styles.infoValue,
                dueInfo.isOverdue && styles.infoValueOverdue,
              ]}
            >
              📅 {task.dueDate}
            </Text>
          </View>

          <View style={styles.dueBadgeContainer}>
            <Text style={[styles.dueNoticeText, getDueNoticeStyle()]}>
              ⏳ {dueInfo.text}
            </Text>
          </View>
        </View>

        {/* Phần ghi chú */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Ghi chú</Text>
          {task.note && task.note.trim().length > 0 ? (
            <Text style={styles.noteText}>{task.note}</Text>
          ) : (
            <Text style={styles.noteEmpty}>Không có ghi chú</Text>
          )}
        </View>
      </View>

      {/* Hai nút hành động */}
      <View style={styles.actionRow}>
        <ButtonComponent
          title={
            task.done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'
          }
          variant={task.done ? 'secondary' : 'primary'}
          onPress={() => toggleTask(task.id)}
        />
        <ButtonComponent
          title="Sửa công việc"
          variant="secondary"
          onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
        />
      </View>
    </ScrollView>
  );
}

export default TaskDetailScreen;
