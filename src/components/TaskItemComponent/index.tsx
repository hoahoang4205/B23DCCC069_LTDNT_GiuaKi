import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TaskItemComponentProps } from './types';
import { styles } from './styles';
import CheckboxComponent from '../CheckboxComponent';
import BadgeComponent, { BadgeTone } from '../BadgeComponent';

const priorityToneMap: Record<string, BadgeTone> = {
  Cao: 'high',
  'Trung bình': 'medium',
  Thấp: 'low',
};

function TaskItemComponentInner({
  task,
  overdue,
  onPress,
  onLongPress,
  onToggle,
}: TaskItemComponentProps) {
  const priTone = priorityToneMap[task.priority] || 'medium';

  return (
    <Pressable
      onPress={() => onPress(task.id)}
      onLongPress={() => onLongPress(task)}
      accessibilityRole="button"
      accessibilityLabel={`Công việc: ${task.title}, hạn: ${task.dueDate}, ưu tiên: ${task.priority}`}
      style={({ pressed }) => [
        styles.card,
        task.done && styles.cardDone,
        overdue && !task.done && styles.cardOverdue,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.checkboxContainer}>
          <CheckboxComponent
            checked={task.done}
            onToggle={() => onToggle(task.id)}
            accessibilityLabel={`Đánh dấu hoàn thành việc: ${task.title}`}
          />
        </View>
        <View style={[styles.taskContent, task.done && styles.contentDone]}>
          <Text
            style={[styles.title, task.done && styles.titleDone]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
        </View>
        <View style={styles.priorityBadge}>
          <BadgeComponent
            label={task.priority}
            tone={priTone}
            variant="soft"
            showDot
          />
        </View>
      </View>

      <View style={[styles.bottomRow, task.done && styles.contentDone]}>
        <BadgeComponent label={task.category} tone="neutral" />
        <Text style={[styles.dueDateText, overdue && styles.dueDateOverdue]}>
          📅 {task.dueDate}
        </Text>
        {overdue ? (
          <BadgeComponent label="Quá hạn" tone="overdue" variant="solid" />
        ) : null}
      </View>
    </Pressable>
  );
}

export const TaskItemComponent = React.memo(TaskItemComponentInner);
export default TaskItemComponent;
