import React from 'react';
import { Text, View } from 'react-native';
import { EmptyComponentProps } from './types';
import { styles } from './styles';
import ButtonComponent from '../ButtonComponent';

export function EmptyComponent({
  title,
  message,
  actionLabel,
  onAction,
  icon = '📋',
}: EmptyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? (
        <Text
          style={[
            styles.message,
            !(actionLabel && onAction) && styles.messageWithoutAction,
          ]}
        >
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <ButtonComponent
          title={actionLabel}
          onPress={onAction}
          variant="secondary"
          style={styles.actionButton}
        />
      ) : null}
    </View>
  );
}

export default EmptyComponent;
