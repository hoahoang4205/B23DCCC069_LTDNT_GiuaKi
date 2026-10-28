import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily,
    fontSize: fontSize.cardTitle + 1,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    fontFamily,
    fontSize: fontSize.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
  messageWithoutAction: {
    marginBottom: 0,
  },
  actionButton: {
    marginTop: spacing.sm,
    minWidth: 160,
  },
});
