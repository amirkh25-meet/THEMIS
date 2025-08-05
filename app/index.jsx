import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

export default function LandingPage() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCompanySelection = () => {
    router.push('companyLogin');
  };

  const handleUserSelection = () => {
    router.push('/user/(tabs)');
  };

  return (
    <AnimatedImageBackground
      source={require('../assets/images/backpink.jpeg')}
      style={[styles.background, { opacity: fadeAnim }]}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to</Text>

        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../assets/images/nobackgroundlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>
              Choose your account type to get started
            </Text>
          </View>

          <View style={styles.selectionContainer}>
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
    </AnimatedImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    width: 500,
    height: 250,
    marginTop: 60,
  },
  header: {
    alignItems: 'center',
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    color: '#ff7c8a',
    textAlign: 'left',
    marginTop: 33,
    marginBottom: -20,
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
    gap: 20,
    paddingBottom: 250,
  },
  selectionCard: {
    backgroundColor: '#041e42',
    borderRadius: 24,
    padding: 20,
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
});
