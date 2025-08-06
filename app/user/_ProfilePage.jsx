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
import { ActivityIndicator } from 'react-native';
import { databases, account, avatars } from '../../assets/appwrite1';

export default function _ProfilePage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [time, setTime] = useState('');
  const [if1, setIf] = useState(0);

  // Simple time updater - no auth checking
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to redirect after successful login/signup
  const redirectAfterAuth = async () => {
      try {
    // Check global variable instead of AsyncStorage
    const intendedRoute = global.intendedRoute;
    
    if (intendedRoute) {
      // Clear the stored route
      global.intendedRoute = null;
      console.log('Redirecting to intended route:', intendedRoute);
      router.replace(intendedRoute);
    } else {
      // No intended route, go to main user area
      console.log('No intended route, going to main user area');
      router.replace('/user');
    }
  } catch (error) {
    console.error('Error redirecting after auth:', error);
    router.replace('/user');
  }
  };

  // Modified createUser function
  const createUser = async () => {
    try {
    // No need to delete existing session - Appwrite handles this
    const userId = UUID.v4();

    await account.create(userId, email, password, name);
    console.log('User created successfully');

    const session = await account.createEmailPasswordSession(email, password);
    console.log('Session created:', session);

    const user = await account.get();
    
    console.log('Authenticated user:', user);

    // No AsyncStorage - user data comes from server
    setCurrentUser(user);
    
    // Redirect after successful signup
    await redirectAfterAuth();

  } catch (error) {
    console.error('Error creating account:', error);
    Alert.alert('Error', 'Error creating account, please try again.');
  }
  };

  // Modified signIn function
  const signIn = async () => {
    try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log('Session created:', session);

    const user = await account.get();
    console.log('Authenticated user:', user);

    // No AsyncStorage - rely on server session
    setCurrentUser(user);
    
    // Redirect after successful signin
    await redirectAfterAuth();

  } catch (error) {
    console.error('Error signing in:', error);
    Alert.alert('Error', 'Failed to sign in, please check your credentials.');
  }
  };

  // const signOut = async () => {
  //   try {
  //     await account.deleteSession('current');
  //     // await AsyncStorage.removeItem('userSession');
  //     // await AsyncStorage.removeItem('intendedRoute'); // Clear any stored intended route
  //     setCurrentUser(null);
  //     setIf(0);
  //     // Redirect to home after sign out
  //     router.replace('/');
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //     Alert.alert('Error', 'Failed to sign out, please try again.');
  //   }
  // };

  // const deleteExistingSession = async () => {
  //   try {
  //     // Try to delete current session directly
  //     await account.deleteSession('current');
  //     console.log('Session deleted successfully');
  //   } catch (error) {
  //     // Check if error is because there's no session to delete
  //     if (error.code === 401 || 
  //         error.message.includes('missing scope') || 
  //         error.message.includes('guests')) {
  //       console.log('No active session to delete');
  //       // This is expected when user isn't logged in - not an error
  //       return;
  //     }
      
  //     // If it's a different error, log it
  //     console.error('Unexpected error deleting session:', error);
  //   }
  // };

  const useAuthStatus = () => {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyAuthStatus();
      setAuthState({
        isSignedIn: result.isSignedIn,
        user: result.user,
        loading: false
      });
    };

    checkAuth();
  }, []);

  return authState;
};
  // Optional: Add a "Go to Dashboard" button for logged-in users
  const goToDashboard = () => {
    router.replace('/user');
  };

  // Check if user is currently logged in (for UI purposes only - no auto-redirect)
const checkCurrentUser = async () => {
  try {
    console.log('Checking current user from server...');
    const user = await account.get();
    console.log('User found:', user);
    setCurrentUser(user);
    return user;
  } catch (error) {
    console.log('No authenticated user found');
    setCurrentUser(null);
    return null;
  }
};

  // Check current user on component mount (but don't redirect)
  useEffect(() => {
    checkCurrentUser();
  }, []);

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
        
        {/* Optional: Show dashboard button if user is logged in */}
        {currentUser && (
          <TouchableOpacity style={styles.dashboardButton} onPress={goToDashboard}>
            <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Sign Up Form
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

  // Sign In Form
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
      "Don't have an account? Sign Up",
      () => setIf(0),
      'Sign In'
    );
  }

  // This should not be reached anymore since we removed the auto-redirect
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/pinklogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.header}>Welcome!</Text>
      <TouchableOpacity style={styles.button} onPress={() => setIf(0)}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
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
  dashboardButton: {
    backgroundColor: '#041E42',
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  dashboardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },topRightContainer: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 999,
  alignItems: 'flex-end',
},

menuIcon: {
  fontSize: 24,
  padding: 5,
},

languageMenu: {
  backgroundColor: '#fff',
  borderRadius: 6,
  padding: 8,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

menuItem: {
  paddingVertical: 6,
  paddingHorizontal: 10,
  fontSize: 16,
},
});