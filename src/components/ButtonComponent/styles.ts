import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius } from '../../theme';

export const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.md,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.pale,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  disabled: {
    backgroundColor: colors.disabledBg,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  textBase: {
    fontFamily,
    fontSize: fontSize.cardTitle,
    fontWeight: '700',
    textAlign: 'center',
  },
  textPrimary: {
    color: colors.surface,
  },
  textSecondary: {
    color: colors.primary,
  },
  textDanger: {
    color: colors.surface,
  },
  textDisabled: {
    color: colors.disabledText,
  },
});
