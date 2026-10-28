import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SearchComponentProps } from './types';
import { styles } from './styles';
import { colors } from '../../theme';

export function SearchComponent({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm công việc...',
}: SearchComponentProps) {
  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        returnKeyType="search"
        accessibilityLabel={placeholder}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={handleClear}
          hitSlop={8}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Xóa nội dung tìm kiếm"
        >
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default SearchComponent;
