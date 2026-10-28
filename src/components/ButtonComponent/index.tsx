import React from 'react';
import { Pressable, Text } from 'react-native';
import { ButtonComponentProps } from './types';
import { styles } from './styles';

export default function ButtonComponent({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityLabel,
  style,
}: ButtonComponentProps) {
  const getVariantStyle = () => {
    if (disabled) return styles.disabled;
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'danger':
        return styles.danger;
      case 'primary':
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    if (disabled) return styles.textDisabled;
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'danger':
        return styles.textDanger;
      case 'primary':
      default:
        return styles.textPrimary;
    }
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel || title}
      style={({ pressed }) => [
        styles.base,
        getVariantStyle(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.textBase, getTextStyle()]}>{title}</Text>
    </Pressable>
  );
}
