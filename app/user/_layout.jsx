import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="_ProfilePage" />
      <Stack.Screen name="videoPage" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}