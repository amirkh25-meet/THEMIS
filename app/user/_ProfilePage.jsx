import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Client, Databases } from 'appwrite';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import UUID from 'react-native-uuid';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1')  // Appwrite API endpoint
      .setProject('6851607e003b10432fe3');  // Your Appwrite Project ID

// Initialize the Account service
const account = new Account(client);

// Initialize the Databases service
const databases = new Databases(client);

export default function _ProfilePage() {
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [time, setTime] = useState('');
  const [if1, setIf] = useState(0);
  
  
   const checkActiveSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('userSession');
      if (sessionData) {
        const user = JSON.parse(sessionData);
        setCurrentUser(user);
        return 2;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error checking active session:', error);
      return 0;
    }
  };

  const redirectToIntendedRoute = async () => {
    try {
      const intendedRoute = await AsyncStorage.getItem('intendedRoute');
      if (intendedRoute) {
        // Clear the stored route
        await AsyncStorage.removeItem('intendedRoute');
        // Navigate to the intended route
        router.push(intendedRoute);
      } else {
        // Default route if no intended route stored
        router.push('/user/(tabs)'); // or wherever you want them to go by default
      }
    } catch (error) {
      console.error('Error redirecting to intended route:', error);
      router.push('/user/(tabs)'); // fallback route
    }
  };

  useEffect(() => {
    checkActiveSession().then(status => {
      if (status === 2) {
        // User is already logged in, redirect to intended route
        redirectToIntendedRoute();
      }
    }); 

    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const createUser = async () => {
    try {
      await deleteExistingSession();

      const userId = UUID.v4();

      await account.create(userId, email, password);
      console.log('User created');

      const session = await account.createEmailPasswordSession(email, password);

      const user = await account.get();
      console.log('Authenticated user:', user);

      await AsyncStorage.setItem('userSession', JSON.stringify(user));
      setCurrentUser(user);
      setIf(2);

      // After successful signup, redirect to intended route
      await redirectToIntendedRoute();

    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'Error creating account, please try again.');
    }
  };

  const signIn = async () => {
    try {
      await deleteExistingSession();

      const session = await account.createEmailPasswordSession(email, password);
      console.log('Session created:', session);

      const user = await account.get();
      console.log('Authenticated user:', user);

      await AsyncStorage.setItem('userSession', JSON.stringify(user));
      setCurrentUser(user);
      setIf(2);

      // After successful signin, redirect to intended route
      await redirectToIntendedRoute();
      
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', 'Failed to sign in, please check your credentials.');
    }
  };


  const signOut = async () => {
    try {
      await account.deleteSession('current');
      await AsyncStorage.removeItem('userSession');
      setCurrentUser(null);
      setIf(0)
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out, please try again.');
    }
  };

  const deleteExistingSession = async () => {
    try {
      const sessions = await account.listSessions();

      if (sessions.total > 0) {
        await account.deleteSession('current');
        console.log('Existing session deleted.');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  // Sign Up Screen
  if (if1 === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter your name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button title="Sign Up" onPress={createUser} color="#64adc3" />
        <View style={styles.buttonSpacer} />
        <Text style={styles.link} onPress={() => setIf(1)}>Already have an account? Sign In</Text>
      </View>
    );
  }

  // Sign In Screen
  if (if1 === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button title="Sign In" onPress={signIn} color="#64adc3" />
        <View style={styles.buttonSpacer} />
        <Text style={styles.link} onPress={() => setIf(0)}>Sign Up</Text>
      </View>
    );
  }

  // Welcome Screen (Logged in)
  // if (if1 === 2) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Welcome, {currentUser?.name || currentUser?.email || 'User'}!</Text>
  //       <Text>Current Time: {time}</Text>
  //       <View style={styles.buttonSpacer} />
  //       <Text style={styles.link} onPress={signOut}>Sign Out</Text>
  //     </View>
  //   );
  // }

  // DEFAULT RETURN - This was missing!
  // Loading state while checking session
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#021F54',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#232323',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 10,
    fontSize: 16,
    width: '100%',
  },
  buttonSpacer: {
    marginVertical: 20,
  },
  link: {
    color: '#5cb85c',
    marginTop: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});