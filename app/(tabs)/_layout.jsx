import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
const _layout = () => {
  return (
    <Tabs>
    <Tabs.Screen 
        name="homePage"
        options={{
            title: 'Home',
            headerShown: false,
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
        title: 'negotiation', 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
        ),
    }}
/>              
    </Tabs>
  )
}

export default _layout