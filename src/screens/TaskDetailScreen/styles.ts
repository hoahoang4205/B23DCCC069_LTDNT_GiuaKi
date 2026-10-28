import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, shadow, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily,
    fontSize: fontSize.title,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 30,
    marginBottom: spacing.md,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  infoSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontFamily,
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  infoValue: {
    fontFamily,
    fontSize: fontSize.body,
    color: colors.text,
    fontWeight: '700',
  },
  infoValueOverdue: {
    color: colors.danger,
    fontWeight: '800',
  },
  dueBadgeContainer: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  dueNoticeText: {
    fontFamily,
    fontSize: fontSize.body,
    fontWeight: '700',
  },
  dueNoticeOverdue: {
    color: colors.danger,
  },
  dueNoticeWarning: {
    color: colors.warningDark,
  },
  dueNoticeNeutral: {
    color: colors.textMuted,
  },
  dueNoticeSuccess: {
    color: colors.successDark,
  },
  noteContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.xs,
  },
  noteLabel: {
    fontFamily,
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  noteText: {
    fontFamily,
    fontSize: fontSize.body,
    color: colors.text,
    lineHeight: 22,
  },
  noteEmpty: {
    fontFamily,
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  actionRow: {
    gap: spacing.md,
  },
});
