import React from 'react';
import { Text, View } from 'react-native';
import { BadgeComponentProps } from './types';
import { styles } from './styles';

export * from './types';

export function BadgeComponent({
  label,
  tone,
  variant = 'soft',
  showDot = false,
}: BadgeComponentProps) {
  const getBadgeStyle = () => {
    if (tone === 'overdue') {
      return variant === 'solid' ? styles.overdueSolid : styles.overdueSoft;
    }
    switch (tone) {
      case 'high':
        return styles.highSoft;
      case 'medium':
        return styles.mediumSoft;
      case 'low':
        return styles.lowSoft;
      case 'success':
        return styles.successSoft;
      case 'neutral':
      default:
        return styles.neutralSoft;
    }
  };

  const getTextStyle = () => {
    if (tone === 'overdue') {
      return variant === 'solid' ? styles.overdueSolidText : styles.overdueSoftText;
    }
    switch (tone) {
      case 'high':
        return styles.highSoftText;
      case 'medium':
        return styles.mediumSoftText;
      case 'low':
        return styles.lowSoftText;
      case 'success':
        return styles.successSoftText;
      case 'neutral':
      default:
        return styles.neutralSoftText;
    }
  };

  const getDotStyle = () => {
    switch (tone) {
      case 'high':
        return styles.highDot;
      case 'medium':
        return styles.mediumDot;
      case 'low':
        return styles.lowDot;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle()]}>
      {showDot && getDotStyle() ? (
        <View style={[styles.dot, getDotStyle()]} />
      ) : null}
      <Text style={[styles.text, getTextStyle()]}>{label}</Text>
    </View>
  );
}

export default BadgeComponent;
