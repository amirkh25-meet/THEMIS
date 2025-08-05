import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to</Text>
          <View style={styles.header}>
            
        <Image
          source={require('../images/pinklogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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
                  <MaterialCommunityIcons name="account" size={32} color="#fff" />
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
                 <MaterialCommunityIcons name="office-building" size={32} color="#fff" />
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
        </View>
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
      logo: {
    width: 500,
    height: 250,
  },
  header: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  logoText: {
    fontSize: 44,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#ff7c8a',
    textAlign: 'left',
    marginTop: 33,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#041e42',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    marginTop: 40,
  },
  selectionCard: {
    backgroundColor: '#041e42',
    borderRadius: 24,
    padding: 20,
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 15 },
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

    borderColor: '#ff7c8a',
    borderWidth: 1,
  },
  companyIcon: {
    borderColor: '#ff7c8a',
    borderWidth: 1,
  },
  iconEmoji: {
    fontSize: 32,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#041e42',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff7c8a',
  },
  arrow: {
    fontSize: 18,
    color: '#ff7c8a',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    fontSize: 14,
  },
  featuresList: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  featureItem: {
    color: '#041e42',
    fontSize: 14,
    fontWeight: '400',
  },
  footerNote: {
    color: '#041e42',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
