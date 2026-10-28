import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/types/task';
import { TasksProvider, useTasks } from './src/context/TasksContext';
import { TaskListScreen } from './src/screens/TaskListScreen';
import { TaskFormScreen } from './src/screens/TaskFormScreen';
import { TaskDetailScreen } from './src/screens/TaskDetailScreen';
import { colors, fontFamily } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { loaded } = useTasks();

  if (!loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily,
            fontWeight: '700',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskFormScreen}
          options={{
            title: 'Thêm công việc',
            headerBackTitle: 'Quay lại',
          }}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{
            title: 'Chi tiết công việc',
            headerBackTitle: 'Danh sách',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <TasksProvider>
        <RootNavigator />
      </TasksProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
