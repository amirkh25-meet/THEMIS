import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { database , account, avatars } from '../../assets/appwrite1';
const SettingsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [user, setUser] = useState(null);

  // Available languages - En, Ar, He only
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية'},
    { code: 'he', name: 'עברית'}
  ];

  // Simulate user data (in real app, this would come from Appwrite)
  useEffect(() => {
    setUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://via.placeholder.com/150'
    });
    
    // Load saved language preference
    const savedLanguage = 'en'; // In RN, you'd use AsyncStorage
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    // In React Native, you'd use AsyncStorage.setItem('selectedLanguage', languageCode);
    setIsLanguageDropdownOpen(false);
    
    // In a real app, you might trigger a language change event here
    console.log(`Language changed to: ${languageCode}`);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    try {
      // Simulate Appwrite session deletion
      // In a real app, this would be:
      // await account.deleteSession('current');
      // or await account.deleteSessions(); to delete all sessions
      
      // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      account.deleteSession('current')
      // Clear AsyncStorage
      // await AsyncStorage.removeItem('selectedLanguage');
      // await AsyncStorage.removeItem('userSession');
      
      // In a real app, navigate to login screen
      console.log('User signed out successfully');
      Alert.alert('Success', 'You have been signed out successfully!');
      
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Error signing out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerIcon}>
              <Ionicons name="settings-outline" size={24} color="#2563eb" />
            </View>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
          <Text style={styles.headerSubtitle}>Manage your account preferences and settings</Text>
        </View>

        {/* User Profile Card */}
        {user && (
          <View style={styles.userCard}>
            <View style={styles.userRow}>
              <Image 
                source={{ uri: user.avatar }}
                style={styles.userAvatar}
              />
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Language Settings */}
        <View style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <View style={[styles.settingIconContainer, styles.languageIconContainer]}>
              <Ionicons name="globe-outline" size={20} color="#16a34a" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingSubtitle}>Choose your preferred language</Text>
            </View>
          </View>

          {/* Language Dropdown */}
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              style={[
                styles.dropdownButton,
                isLanguageDropdownOpen && styles.dropdownButtonPressed
              ]}
            >
              <View style={styles.dropdownContent}>
                <Text style={styles.dropdownFlag}>{selectedLang?.flag}</Text>
                <Text style={styles.dropdownText}>{selectedLang?.name}</Text>
              </View>
              <Ionicons 
                name="chevron-down" 
                size={20} 
                color="#6b7280"
                style={[
                  styles.chevronIcon,
                  isLanguageDropdownOpen && styles.chevronRotated
                ]}
              />
            </TouchableOpacity>

            {isLanguageDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {languages.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    onPress={() => handleLanguageChange(language.code)}
                    style={[
                      styles.dropdownMenuItem,
                      selectedLanguage === language.code && styles.dropdownMenuItemPressed
                    ]}
                  >
                    <View style={styles.dropdownContent}>
                      <Text style={styles.dropdownFlag}>{language.flag}</Text>
                      <Text style={styles.dropdownText}>{language.name}</Text>
                    </View>
                    {selectedLanguage === language.code && (
                      <Ionicons name="checkmark" size={20} color="#16a34a" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <View style={[styles.settingIconContainer, styles.accountIconContainer]}>
              <Ionicons name="log-out-outline" size={20} color="#dc2626" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Account</Text>
              <Text style={styles.settingSubtitle}>Manage your account and sessions</Text>
            </View>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            onPress={handleSignOut}
            disabled={isSigningOut}
            style={[
              styles.signOutButton,
              isSigningOut && styles.signOutButtonDisabled
            ]}
          >
            {isSigningOut ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text style={styles.signOutButtonText}>Signing out...</Text>
              </>
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </>
            )}
          </TouchableOpacity>
          
          <Text style={styles.signOutDescription}>
            This will end your current session and redirect you to the login page.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32
  },
  header: {
    marginBottom: 32
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  headerIcon: {
    padding: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    marginRight: 12
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827'
  },
  headerSubtitle: {
    color: '#6b7280',
    fontSize: 16
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginRight: 16
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827'
  },
  userEmail: {
    color: '#6b7280',
    fontSize: 14
  },
  settingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  settingIconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12
  },
  languageIconContainer: {
    backgroundColor: '#dcfce7'
  },
  accountIconContainer: {
    backgroundColor: '#fee2e2'
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827'
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280'
  },
  dropdown: {
    position: 'relative'
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8
  },
  dropdownButtonPressed: {
    backgroundColor: '#f3f4f6'
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdownFlag: {
    fontSize: 20,
    marginRight: 12
  },
  dropdownText: {
    fontWeight: '500',
    color: '#111827',
    fontSize: 16
  },
  chevronIcon: {
    transform: [{ rotate: '0deg' }]
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }]
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    maxHeight: 240,
    zIndex: 10
  },
  dropdownMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  dropdownMenuItemPressed: {
    backgroundColor: '#f9fafb'
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#dc2626',
    borderRadius: 8
  },
  signOutButtonDisabled: {
    backgroundColor: '#f87171'
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8
  },
  signOutDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8
  }
});

export default SettingsPage;