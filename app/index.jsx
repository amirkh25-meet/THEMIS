import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();

  const handleCompanySelection = () => {
    // Navigate to companies login in the same folder (companies/login.jsx)
    router.push('companyLogin');
  };

  const handleUserSelection = () => {
    // Navigate directly to user tabs index
    router.push('/user/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c63d2', '#7c4dff', '#9c27b0']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>📱</Text>
            </View>
            <Text style={styles.title}>Welcome to Our Platform</Text>
            <Text style={styles.subtitle}>
              Choose your account type to get started
            </Text>
          </View>

          {/* Selection Cards */}
          <View style={styles.selectionContainer}>
            {/* User Card */}
            <TouchableOpacity
              style={styles.selectionCard}
              onPress={handleUserSelection}
              activeOpacity={0.9}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, styles.userIcon]}>
                  <Text style={styles.iconEmoji}>👤</Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>I'm a User</Text>
                  <Text style={styles.cardDescription}>
                    Explore companies, browse content, and discover opportunities
                  </Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Company Card */}
            <TouchableOpacity
              style={styles.selectionCard}
              onPress={handleCompanySelection}
              activeOpacity={0.9}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, styles.companyIcon]}>
                  <Text style={styles.iconEmoji}>🏢</Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>I'm a Company</Text>
                  <Text style={styles.cardDescription}>
                    Manage your business profile and connect with users
                  </Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.featuresList}>
              <Text style={styles.featureItem}>✨ Easy to use interface</Text>
              <Text style={styles.featureItem}>🔒 Secure and private</Text>
              <Text style={styles.featureItem}>🚀 Fast and reliable</Text>
            </View>
            
            <Text style={styles.footerNote}>
              Tap on your account type to continue
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    marginVertical: 40,
  },
  selectionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userIcon: {
    backgroundColor: '#e3f2fd',
  },
  companyIcon: {
    backgroundColor: '#f3e5f5',
  },
  iconEmoji: {
    fontSize: 32,
  },
  cardText: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 21,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  featuresList: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  featureItem: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  footerNote: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontStyle: 'italic',
  },
});