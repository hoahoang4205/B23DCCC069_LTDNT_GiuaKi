import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChipComponentProps } from './types';
import { styles } from './styles';

export function ChipComponent({
  label,
  selected,
  onPress,
  count,
  activeColor,
  accessibilityLabel,
}: ChipComponentProps) {
  const customSelectedStyle =
    selected && activeColor
      ? { backgroundColor: activeColor, borderColor: activeColor }
      : null;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel || `${label} ${count !== undefined ? count : ''}`}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        customSelectedStyle,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      {count !== undefined && count > 0 ? (
        <View style={[styles.countBadge, selected && styles.countBadgeSelected]}>
          <Text style={[styles.countText, selected && styles.countTextSelected]}>
            {count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export default ChipComponent;
