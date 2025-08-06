import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { account, avatars } from '../../assets/appwrite1';

const SettingsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Available languages - En, Ar, He only
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية'},
    { code: 'he', name: 'עברית'}
  ];

  // Fetch user data from Appwrite
  useEffect(() => {
    fetchUserData();
    
    // Load saved language preference
    const savedLanguage = 'en'; // In RN, you'd use AsyncStorage if needed
    setSelectedLanguage(savedLanguage);
  }, []);

  const fetchUserData = async () => {
try {
    setIsLoadingUser(true);
    
    const currentUser = await account.get();
    console.log('Fetched user:', currentUser);
    
    // Fix: Convert URL object to string and add fallback
    let avatarUrl;
    try {
      const initialsUrl = avatars.getInitials(currentUser.name || 'User', 150, 150);
      avatarUrl = initialsUrl.toString(); // Convert to string
    } catch (avatarError) {
      // Fallback to external avatar service
      const name = encodeURIComponent(currentUser.name || 'User');
      avatarUrl = `https://ui-avatars.com/api/?name=${name}&size=150&background=FF7C8A&color=fff&rounded=true`;
    }
    
    setUser({
      name: currentUser.name || 'No name provided',
      email: currentUser.email,
      avatar: avatarUrl,
      userId: currentUser.$id
    });
    
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    if (error.code === 401 || error.message.includes('missing scope')) {
      Alert.alert(
        'Authentication Required',
        'Please sign in to view your settings.',
        [
          {
            text: 'Sign In',
            onPress: () => router.replace('/user/_ProfilePage')
          }
        ]
      );
    } else {
      Alert.alert('Error', 'Failed to load user data. Please try again.');
    }
  } finally {
    setIsLoadingUser(false);
  }
  };

    

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    console.log(`Language changed to: ${languageCode}`);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    try {
      // Delete current Appwrite session
      await account.deleteSession('current');
      
      console.log('User signed out successfully');
      Alert.alert('Success', 'You have been signed out successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace('/') // Navigate to home page
        }
      ]);
      
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Error signing out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleRefreshUserData = () => {
    fetchUserData();
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  // Loading state for user data
  if (isLoadingUser) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading your settings...</Text>
      </View>
    );
  }

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
                onError={() => {
                  // Fallback to a default avatar if image fails to load
                  console.log('Avatar failed to load, using fallback');
                }}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                {/* <Text style={styles.userId}>ID: {user.userId}</Text> */}
              </View>
            </View>
            
            {/* Refresh button */}
            <TouchableOpacity 
              onPress={handleRefreshUserData}
              style={styles.refreshButton}
            >
              <Ionicons name="refresh-outline" size={20} color="#2563eb" />
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280'
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
    alignItems: 'center',
    marginBottom: 16
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginRight: 16
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827'
  },
  userEmail: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 2
  },
  userId: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#dbeafe',
    borderRadius: 6
  },
  refreshButtonText: {
    color: '#2563eb',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500'
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
  bottom: '100%', // <== DROPDOWN ABOVE INSTEAD OF BELOW
  left: 0,
  right: 0,
  marginBottom: 8,
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
  zIndex: 50 // make sure this is higher than surrounding elements
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