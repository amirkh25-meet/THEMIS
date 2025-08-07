import { Stack } from 'expo-router';
import  {LanguageProvider}  from './LanguageContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="user" />
        <Stack.Screen name="companies" />
        <Stack.Screen name="companyLogin" />
      </Stack>
    </LanguageProvider>
  );
}
