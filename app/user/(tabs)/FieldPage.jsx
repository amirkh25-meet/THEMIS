import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  ArrowRight,
  Heart,
  Laptop,
  TrendingUp,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const fields = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Medical & Wellness',
    description:
      "Join leading healthcare institutions making a difference in people's lives through innovative medical solutions.",
    icon: <Heart color="#ffffff" size={24} />,
    gradient: ['#041E42', '#041E42'],
    route: '/Fields/HeathCare/HealthCare',
  },
  {
    id: 'tech',
    title: 'Technology',
    subtitle: 'Innovation & Digital',
    description:
      'Build the future with cutting-edge technology companies driving digital transformation and innovation.',
    icon: <Laptop color="#ffffff" size={24} />,
    gradient: ['#041E42', '#041E42'],
    route: '/Fields/Tech/Tech',
  },
  {
    id: 'finance',
    title: 'Finance',
    subtitle: 'Banking & Investment',
    description:
      'Shape the financial landscape with established banks and investment firms managing global economies.',
    icon: <TrendingUp color="#ffffff" size={24} />,
    gradient: ['#041E42', '#041E42'],
    route: '/Fields/Fainance/Fainance',
  },
{
  id: 'Private Science',
  title: 'Private Science',
  subtitle: 'Innovation in Pharmaceuticals & Diagnostics',
  description:
    'Drive scientific breakthroughs in private-sector labs, where innovation meets cutting-edge technology to shape the future of healthcare, biotech, and life sciences.',
  icon: <Ionicons name="flask" color="#ffffff" size={24} />,
  gradient: ['#041E42', '#041E42'],
  route: '/Fields/PrivateScience/Science',
}

];

export default function FieldPage() {
  const [selectedField, setSelectedField] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCardPress = (field) => {
    setSelectedField(field.id);
    setTimeout(() => {
      router.push(field.route);
    }, 200);
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
  backgroundColor: '#041E42FF',
  padding: 20,
  paddingTop: Platform.OS === 'android' ? 40 : 60,
  paddingHorizontal: 16,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  marginBottom: 20,
  elevation: 4,
  alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: 6,
      textAlign: 'center',
    },
    headerSubtitle: {
      fontSize: 14,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 20,
      fontWeight: '500',
    },
    cardList: {
      padding: 24,
      paddingBottom: 40,
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#041E42',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 2,
      borderColor: '#ffffff',
    },
    selectedCard: {
      borderColor: '#ff7c8a',
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
      backgroundColor: '#041E42',
    },
    info: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: '#041E42',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#64748B',
    },
    description: {
      fontSize: 16,
      color: '#04142F',
      lineHeight: 22,
      marginTop: 8,
    },

    arrow: {
      marginLeft: 12,
    },
    footer: {
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#041E42',
      marginBottom: 4,
    },
    footerSubtext: {
      fontSize: 13,
      color: '#64748B',
      textAlign: 'center',
      fontWeight: '500',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#041E42" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Career Fields</Text>
        <Text style={styles.headerSubtitle}>
          Find inclusive workplaces and career opportunities
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardList}>
        {fields.map((field) => (
          <Animated.View
            key={field.id}
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <TouchableOpacity
              style={[
                styles.card,
                selectedField === field.id && styles.selectedCard,
              ]}
              onPress={() => handleCardPress(field)}
              activeOpacity={0.9}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: field.gradient[0] }]}>
                  {field.icon}
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>{field.title}</Text>
                  <Text style={styles.subtitle}>{field.subtitle}</Text>
                  <Text style={styles.description}>{field.description}</Text>
                </View>
                <ArrowRight color="#041E42" size={24} style={styles.arrow} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Need help picking a field?</Text>
          <Text style={styles.footerSubtext}>
            Tap any card to explore career paths that support you
          </Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
}