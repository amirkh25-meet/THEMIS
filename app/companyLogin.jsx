import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { databases, Query } from '../assets/appwrite1'; // Adjust path as needed
import { useLanguage } from './LanguageContext';

export default function CompanyLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {if2,setIf2} = useLanguage(); 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Query the companies collection to find a company with matching email
      const response = await databases.listDocuments(
        '6865ac22001dc7cae30e', // Database ID
        '68728d62000d8ccb61b7', // Collection ID
        [
          Query.equal('email', email) // Assuming you have an email field in your companies collection
        ]
      );

      if (response.documents.length === 0) {
        Alert.alert('Error', 'Company not found');
        setLoading(false);
        return;
      }

      const company = response.documents[0];

      // Verify password (assuming you have a password field in your companies collection)
      // Note: In production, you should hash passwords and compare hashes
      if (company.password !== password) {
        Alert.alert('Error', 'Invalid password');
        setLoading(false);
        return;
      }

      // If company exists and password matches, navigate to companies index
      router.push('/companies/home');
      
      // Optionally store company data for later use
      // You might want to use AsyncStorage or a state management solution
      
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
if(if2===0){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

if (if2 === 0) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل دخول الشركة</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

if (if2 === 0) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>כניסת חברה</Text>
      <TextInput
        style={styles.input}
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'מתחבר...' : 'התחברות'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#9c27b0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});