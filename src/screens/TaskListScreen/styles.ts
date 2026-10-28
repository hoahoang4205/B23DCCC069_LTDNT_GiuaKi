import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  headerRow: {
    marginBottom: spacing.md,
  },
  screenTitle: {
    fontFamily,
    fontSize: fontSize.title,
    fontWeight: '800',
    color: colors.text,
  },
  filterSection: {
    marginBottom: spacing.sm,
  },
  filterScrollView: {
    flexGrow: 0,
    marginBottom: spacing.xs,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sortLabel: {
    fontFamily,
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginRight: spacing.sm,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 112,
  },
  listGrow: {
    flexGrow: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bottomAction: {
    flex: 1,
    minHeight: 46,
    paddingHorizontal: spacing.sm,
  },
});
