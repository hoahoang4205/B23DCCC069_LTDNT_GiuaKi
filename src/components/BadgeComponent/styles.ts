import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius } from '../../theme';

export const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    marginRight: 5,
  },
  text: {
    fontFamily,
    fontSize: fontSize.small,
    fontWeight: '700',
    lineHeight: 16,
  },
  // Overdue solid
  overdueSolid: {
    backgroundColor: colors.danger,
  },
  overdueSolidText: {
    color: colors.surface,
  },
  // Overdue soft
  overdueSoft: {
    backgroundColor: colors.priority.high.bg,
  },
  overdueSoftText: {
    color: colors.priority.high.text,
  },
  // High
  highSoft: {
    backgroundColor: colors.priority.high.bg,
  },
  highSoftText: {
    color: colors.priority.high.text,
  },
  highDot: {
    backgroundColor: colors.priority.high.text,
  },
  // Medium
  mediumSoft: {
    backgroundColor: colors.priority.medium.bg,
  },
  mediumSoftText: {
    color: colors.priority.medium.text,
  },
  mediumDot: {
    backgroundColor: colors.priority.medium.text,
  },
  // Low
  lowSoft: {
    backgroundColor: colors.priority.low.bg,
  },
  lowSoftText: {
    color: colors.priority.low.text,
  },
  lowDot: {
    backgroundColor: colors.priority.low.text,
  },
  // Neutral (danh mục)
  neutralSoft: {
    backgroundColor: colors.pale,
  },
  neutralSoftText: {
    color: colors.primary,
  },
  // Success
  successSoft: {
    backgroundColor: colors.successBg,
  },
  successSoftText: {
    color: colors.successDark,
  },
});
