import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Client, Databases } from 'appwrite';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import UUID from 'react-native-uuid';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6851607e003b10432fe3');

const account = new Account(client);
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
      setIf(0);
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
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const renderForm = (title, fields, action, switchText, switchAction, buttonText) => (
    <View style={styles.container}>
            <Image
  source={require('../../assets/images/pinklogo.png')}
  style={styles.logo}
  resizeMode="contain"
/>
      <Text style={styles.header}>{title}</Text>


      <View style={styles.card}>
        {fields}
        <TouchableOpacity style={styles.button} onPress={action}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchAction}>
          <Text style={styles.switchText}>{switchText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (if1 === 0) {
    return renderForm(
      'Create Account',
      <>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </>,
      createUser,
      'Already have an account? Sign In',
      () => setIf(1),
      'Sign Up'
    );
  }

  if (if1 === 1) {
    return renderForm(
      'Sign In',
      <>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </>,
      signIn,
      'Don’t have an account? Sign Up',
      () => setIf(0),
      'Sign In'
    );
  }

  // Welcome Screen (Logged in)
  if (if1 === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {currentUser?.name || currentUser?.email || 'User'}!</Text>
        <Text>Current Time: {time}</Text>
        <View style={styles.buttonSpacer} />
        <Text style={styles.link} onPress={signOut}>Sign Out</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    color: '#041E42',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF7C8A',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 600,
    height: 170,
  marginBottom: 10,
},

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#666',
    marginTop: 16,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  timeText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#041E42',
  },
});
