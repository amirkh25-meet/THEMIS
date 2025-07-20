import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
const _layout = () => {
  return (
    <Tabs>
    <Tabs.Screen 
        name="index"
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
        {/* <Tabs.Screen
            name="index"
            options ={{title : 'Home',
            headerShown : false}}
        /> */}
        {/* <Tabs.Screen
            name="index"
            options ={{title : 'Home',
            headerShown : false}}
        /> */}
    </Tabs>
  )
}

export default _layout