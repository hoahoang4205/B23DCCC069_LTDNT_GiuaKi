import React from 'react';
import { Pressable, Text } from 'react-native';
import { CheckboxComponentProps } from './types';
import { styles } from './styles';

export function CheckboxComponent({
  checked,
  onToggle,
  accessibilityLabel = 'Đánh dấu hoàn thành',
  size = 24,
}: CheckboxComponentProps) {
  const dynamicBoxStyle = {
    width: size,
    height: size,
  };

  const dynamicMarkStyle = {
    fontSize: size * 0.62,
  };

  return (
    <Pressable
      onPress={e => {
        // Ngăn chặn sự kiện lan ra thẻ cha (card)
        e.stopPropagation();
        onToggle();
      }}
      hitSlop={10}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.box,
        dynamicBoxStyle,
        checked && styles.boxChecked,
        pressed && styles.pressed,
      ]}
    >
      {checked ? <Text style={[styles.checkMark, dynamicMarkStyle]}>✓</Text> : null}
    </Pressable>
  );
}

export default CheckboxComponent;
