import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    marginBottom: spacing.md,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    color: colors.textMuted,
  },
  input: {
    flex: 1,
    height: 46,
    color: colors.text,
    fontFamily,
    fontSize: fontSize.body,
    paddingVertical: 0,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.pale,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    lineHeight: 14,
  },
});
