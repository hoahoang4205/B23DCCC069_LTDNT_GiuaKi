import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontFamily,
    fontSize: fontSize.caption + 1,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs + 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  submitButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
  calendarButton: {
    paddingHorizontal: spacing.md,
  },
  calendarOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  calendarDialog: {
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  calendarTitle: {
    fontFamily,
    fontSize: fontSize.cardTitle,
    fontWeight: '700',
    color: colors.text,
  },
  calendarClose: {
    fontSize: 28,
    lineHeight: 30,
    color: colors.textMuted,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  monthArrow: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.pale,
  },
  monthArrowText: {
    fontSize: 28,
    lineHeight: 32,
    color: colors.primary,
  },
  monthTitle: {
    fontFamily,
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'capitalize',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekday: {
    width: '14.2857%',
    paddingVertical: spacing.sm,
    textAlign: 'center',
    fontFamily,
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.textMuted,
  },
  dayCell: {
    width: '14.2857%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
  dayText: {
    fontFamily,
    fontSize: fontSize.body,
    color: colors.text,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  selectedDayText: {
    color: colors.surface,
    fontWeight: '700',
  },
  disabledDay: {
    opacity: 0.35,
  },
  disabledDayText: {
    color: colors.textMuted,
  },
});
