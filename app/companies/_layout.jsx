import { Stack } from 'expo-router';

export default function CompaniesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Show header for company dashboard
      }}
    >
      <Stack.Screen 
        name="_layout" 
        options={{
          
          title: 'Company Dashboard',
          headerShown: true
        }} 
      />
    </Stack>
  );
}