import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily,
    fontSize: fontSize.caption + 1,
    fontWeight: '700',
    color: colors.text,
  },
  percentage: {
    fontFamily,
    fontSize: fontSize.caption + 1,
    fontWeight: '800',
    color: colors.primary,
  },
  percentageDone: {
    color: colors.success,
  },
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.pale,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  fillDone: {
    backgroundColor: colors.success,
  },
});
