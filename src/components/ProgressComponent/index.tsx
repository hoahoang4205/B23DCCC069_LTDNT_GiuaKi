import React from 'react';
import { Text, View } from 'react-native';
import { ProgressComponentProps } from './types';
import { styles } from './styles';

export function ProgressComponent({ done, total }: ProgressComponentProps) {
  const percent =
    total === 0
      ? 0
      : Math.min(100, Math.max(0, Math.round((done / total) * 100)));
  const isAllDone = total > 0 && done === total;

  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percent }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {total === 0
            ? 'Chưa có công việc nào'
            : `Đã hoàn thành ${done}/${total} công việc`}
        </Text>
        <Text
          style={[styles.percentage, isAllDone && styles.percentageDone]}
        >
          {total === 0 ? '0%' : `${percent}%`}
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%` },
            isAllDone && styles.fillDone,
          ]}
        />
      </View>
    </View>
  );
}

export default ProgressComponent;
