import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  label: {
    fontFamily,
    fontSize: fontSize.caption + 1,
    fontWeight: '700',
    color: colors.text,
  },
  required: {
    color: colors.danger,
    fontWeight: '700',
  },
  counter: {
    fontFamily,
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  counterDanger: {
    color: colors.danger,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.text,
    fontFamily,
    fontSize: fontSize.body,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  inputWithAccessory: {
    flex: 1,
    minWidth: 0,
  },
  inputFocused: {
    borderColor: colors.borderFocus,
  },
  inputError: {
    borderColor: colors.danger,
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  errorText: {
    fontFamily,
    fontSize: fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
