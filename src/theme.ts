import { Platform } from 'react-native';

export const colors = {
  primary: '#4f46e5',
  primaryDark: '#3730a3',
  background: '#f5f6fb',
  surface: '#ffffff',
  border: '#e8eaf1',
  borderFocus: '#4f46e5',
  pale: '#eef2ff',
  text: '#172033',
  textMuted: '#778196',
  danger: '#ef4444',
  dangerBg: '#fee2e2',
  dangerDark: '#b91c1c',
  success: '#10b981',
  successBg: '#d1fae5',
  successDark: '#047857',
  warning: '#f59e0b',
  warningBg: '#fef3c7',
  warningDark: '#92400e',
  disabledBg: '#e2e8f0',
  disabledText: '#94a3b8',
  priority: {
    high: {
      bg: '#fee2e2',
      text: '#b91c1c',
      border: '#fca5a5',
    },
    medium: {
      bg: '#fef3c7',
      text: '#92400e',
      border: '#fcd34d',
    },
    low: {
      bg: '#dcfce7',
      text: '#15803d',
      border: '#86efac',
    },
  },
};

export const fontFamily = Platform.select({
  android: 'sans-serif-rounded',
  ios: 'Avenir Next',
  default: undefined,
});

export const fontSize = {
  title: 22,
  cardTitle: 16,
  body: 15,
  caption: 13,
  small: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 8,
  md: 14,
  pill: 999,
};

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: '#0f172a',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
};
