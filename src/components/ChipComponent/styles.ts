import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.pale,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    fontFamily,
    fontSize: fontSize.caption,
    color: colors.text,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.surface,
    fontWeight: '700',
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  countBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  countText: {
    fontFamily,
    fontSize: fontSize.small - 1,
    fontWeight: '700',
    color: colors.text,
  },
  countTextSelected: {
    color: colors.surface,
  },
});
