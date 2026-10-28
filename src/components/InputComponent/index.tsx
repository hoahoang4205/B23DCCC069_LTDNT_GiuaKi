import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { InputComponentProps } from './types';
import { styles } from './styles';
import { colors } from '../../theme';

export function InputComponent({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  maxLength,
  counter,
  accessory,
  required = false,
  onBlur,
  returnKeyType,
  onSubmitEditing,
}: InputComponentProps) {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.required}> *</Text> : null}
        </Text>
        {counter ? (
          <Text
            style={[
              styles.counter,
              counter.current > counter.max && styles.counterDanger,
            ]}
          >
            {counter.current}/{counter.max}
          </Text>
        ) : null}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            accessory ? styles.inputWithAccessory : undefined,
            multiline && styles.multiline,
            isFocused && styles.inputFocused,
            hasError && styles.inputError,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          accessibilityLabel={label}
        />
        {accessory}
      </View>

      {hasError ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export default InputComponent;
