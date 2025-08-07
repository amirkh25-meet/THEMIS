import { Stack } from 'expo-router';

export default function CompaniesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Show header for company dashboard
      }}
    >
            <Stack.Screen 
        name="GenderEquityAssessmentApp" 
        options={{
          
          title: 'Company Dashboard',
          headerShown: true
        }} 
      />
                  <Stack.Screen 
        name="Strategy" 
        options={{
          
          title: 'Company Dashboard',
          headerShown: true
        }} 
      />

    </Stack>
  );
}