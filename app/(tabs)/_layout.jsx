import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function Layout() {
  console.log('Loaded: layout');

  return (
    <Tabs>
<Tabs.Screen
  name="index"
  options={{
    title: 'Home',
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="FieldPage"
  options={{
    title: 'Company',
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="business-outline" size={size} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="IsraelSalaryCalculator"
  options={{
    title: 'Salary',
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="cash-outline" size={size} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="negotiation"
  options={{
    title: 'Negotiation',
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="resumeGuide"
  options={{
    title: 'Resume',
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="document-text-outline" size={size} color={color} />
    ),
  }}
/>

    </Tabs>
  );
}
