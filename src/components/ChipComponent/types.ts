export interface ChipComponentProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  count?: number;
  activeColor?: string;
  accessibilityLabel?: string;
}
