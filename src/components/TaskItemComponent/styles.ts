import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, shadow, spacing } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  cardDone: {
    backgroundColor: '#fafafc',
    borderColor: '#eef0f5',
  },
  cardOverdue: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.danger,
    borderLeftWidth: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: spacing.md,
  },
  taskContent: {
    flex: 1,
    minWidth: 0,
    minHeight: 40,
    justifyContent: 'center',
  },
  priorityBadge: {
    marginLeft: spacing.sm,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily,
    fontSize: fontSize.cardTitle,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  contentDone: {
    opacity: 0.55,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.md,
    gap: 6,
  },
  dueDateText: {
    fontFamily,
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontWeight: '500',
    marginRight: 4,
  },
  dueDateOverdue: {
    color: colors.danger,
    fontWeight: '700',
  },
});
