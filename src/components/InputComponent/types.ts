import { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import { ReactNode } from 'react';

export interface InputComponentProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  counter?: { current: number; max: number };
  accessory?: ReactNode;
  required?: boolean;
  onBlur?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
}
