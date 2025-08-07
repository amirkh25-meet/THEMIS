import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLanguage } from '../../LanguageContext';

const { width } = Dimensions.get('window');
const companies = [
  {
    name: 'Bank Leumi',
    city: 'Tel Aviv',
    bullets: [
      'Leading banking institution and gender equality pioneer in Israel.',
      'Strong history of female leadership.',
      'Invests in programs that promote women in tech and leadership.',
      'Inclusive culture supporting career growth and advancement.',
    ],
    industry: 'Banking',
    founded: 1902,
    employees: '12,000+',
  },
  {
    name: 'American Express Israel',
    city: 'Tel Aviv',
    bullets: [
      'Built on trust, flexibility, and fairness.',
      'Top employer for women with mentoring networks.',
      'Career development and wellness programs.',
      'Flexible work supports work-life balance.',
    ],
    industry: 'Financial Services',
    founded: 1850,
    employees: '2,500+',
  },
  {
    name: 'Fidelity Investments Israel',
    city: 'Jerusalem',
    bullets: [
      'Multinational financial services corporation.',
      'Focus on investment management and retirement planning.',
      'Offers roles in a global and professional environment.',
    ],
    industry: 'Investment Management',
    founded: 1946,
    employees: '1,800+',
  },
  {
    name: 'JPMorgan Chase Israel',
    city: 'Herzliya',
    bullets: [
      'Global financial leader with local presence.',
      'Focus on fintech innovation and cybersecurity.',
      'Supports DEI and women in leadership programs.',
    ],
    industry: 'Banking & Finance',
    founded: 1799,
    employees: '1,000+ (Israel)',
  },
  {
    name: 'BondIT',
    city: 'Tel Aviv',
    bullets: [
      'AI-powered fixed income investment platform.',
      'Strong representation of women in R&D roles.',
      'Promotes tech upskilling and leadership growth.',
    ],
    industry: 'Fintech',
    founded: 2012,
    employees: '150+',
  },
  {
    name: 'OurCrowd',
    city: 'Jerusalem',
    bullets: [
      'Global venture investing platform.',
      'Supports early-stage startups and impact tech.',
      'Encourages women’s participation in investing.',
    ],
    industry: 'Venture Capital',
    founded: 2013,
    employees: '300+',
  },
  {
    name: 'Payoneer',
    city: 'Petah Tikva',
    bullets: [
      'Global payments and commerce-enabling platform.',
      'Diverse workforce with strong female leadership.',
      'Emphasizes inclusion and equal opportunities.',
    ],
    industry: 'Payments & Fintech',
    founded: 2005,
    employees: '2,000+',
  },
  {
    name: 'Fido Money',
    city: 'Tel Aviv',
    bullets: [
      'Digital financial services for underbanked populations.',
      'Women in tech and product leadership roles.',
      'Focus on financial inclusion and accessibility.',
    ],
    industry: 'Fintech',
    founded: 2013,
    employees: '200+',
  },
  {
    name: 'Payouts.com',
    city: 'Ramat Gan',
    bullets: [
      'Specializes in scalable global payout infrastructure.',
      'Inclusive hiring and women’s development programs.',
      'Work environment encourages innovation and diversity.',
    ],
    industry: 'Fintech',
    founded: 2018,
    employees: '100+',
  },
  {
    name: 'Sagent Management',
    city: 'Tel Aviv',
    bullets: [
      'Wealth and asset management firm.',
      'Client-focused culture with room for internal growth.',
      'Supports women-led financial initiatives.',
    ],
    industry: 'Asset Management',
    founded: 2000,
    employees: '80+',
  },
];



export default function Fainance() {
  const [expanded, setExpanded] = useState({});
  const [animations] = useState(companies.map(() => new Animated.Value(1)));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
const {if2,useIf2} = useLanguage(); 
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCardPress = (idx) => {
    Animated.sequence([
      Animated.timing(animations[idx], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations[idx], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Photo Header */}
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')} // Adjust path & filename as needed
            style={styles.photoHeader}
            resizeMode="cover"
          />
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {companies.map((company, idx) => (
            <Animated.View
              key={company.name}
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: animations[idx] }],
                marginBottom: 20,
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={styles.companyCard}
                activeOpacity={0.9}
                onPress={() => handleCardPress(idx)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.logoContainer}>
                    <MaterialIcons name="business" size={32} color="#003366" />
                  </View>
                  <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{company.name}</Text>
                    <View style={styles.locationContainer}>
                      <Ionicons name="location" size={14} color="#6c757d" />
                      <Text style={styles.city}>{company.city}</Text>
                    </View>
                  </View>
                </View>

                {expanded[idx] && (
                  <View style={styles.expandedContent}>
{company.bullets.map((point, i) => (
  <View key={i} style={styles.bulletItem}>
    <View style={styles.bulletCircle} />
    <Text style={styles.bulletText}>{point}</Text>
  </View>
))}
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  photoHeaderContainer: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 90,
  },
  photoHeader: {
    width: '100%',
    height: '100%',
  },
  cardsContainer: {
    paddingHorizontal: 24,
  },
  companyCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#041E42',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#e9f1fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  city: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 4,
  },
  expandedContent: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  bulletItem: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 8,
},
bulletCircle: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#003366',
  marginTop: 6,
  marginRight: 10,
},
bulletText: {
  flex: 1,
  fontSize: 17,
  color: '#444',
  lineHeight: 22,
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
