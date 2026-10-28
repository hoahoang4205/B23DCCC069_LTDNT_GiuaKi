import { StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';

export const styles = StyleSheet.create({
  box: {
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.borderFocus,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.92 }],
  },
  checkMark: {
    color: colors.surface,
    fontWeight: '800',
    lineHeight: 18,
  },
});
