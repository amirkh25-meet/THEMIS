import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function Layout() {
  console.log('Loaded: layout');

  return (
    <Tabs>
<<<<<<< HEAD
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

=======
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarStyle: { display: 'none' },  
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="_ProfilePage"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CompanySearchPage"
        options={{
          title: 'Reviews',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videoPage"
        options={{
          title: 'Negotiation',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="IsrealSalaryCalculator"
        options={{
          title: 'figure out your salary',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="FeildPage"
        options={{
          title: 'rField',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="resumeGuide"
        options={{
          title: 'resumeGuide',
          headerShown: false,
          //tabBarStyle: { display: 'none' },  
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
>>>>>>> 4d1720b2726529ab65baba11eb40d067bfd9eaf5
    </Tabs>
  );
}
