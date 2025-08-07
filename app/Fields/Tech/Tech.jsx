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
    name: 'Intel Israel',
    city: 'Haifa, Israel',
    bulletPoints: [
      'One of Israel’s largest and most influential tech employers.',
      'Focuses on cutting-edge semiconductor R&D and manufacturing.',
      'Strong emphasis on diversity, equity, and inclusion.',
      'Mentorship programs and leadership opportunities for women.',
      'Flexible policies supporting work-life balance.',
      'Innovation-driven environment with global impact.',
    ],
  },
  {
    name: 'Elbit Systems',
    city: 'Haifa, Israel',
    bulletPoints: [
      'A global leader in defense, aerospace, and cybersecurity tech.',
      'Develops advanced solutions for air, land, sea, and cyber domains.',
      'Offers multidisciplinary engineering and R&D roles.',
      'Invests in women in engineering and management positions.',
      'Encourages innovation, collaboration, and global teamwork.',
    ],
  },
  {
    name: 'Israel Aerospace Industries (IAI)',
    city: 'Lod',
    bulletPoints: [
      'Israel’s largest aerospace and defense company.',
      'Specializes in satellites, missiles, UAVs, and space tech.',
      'Home to large-scale engineering and research operations.',
      'Active programs supporting female engineers and leaders.',
      'Strong focus on national security and innovation.',
    ],
  },
  {
    name: 'Amdocs',
    city: "Ra'anana",
    bulletPoints: [
      'A leading global provider of telecom software and services.',
      'Headquartered in Israel with international reach.',
      'Known for supporting gender diversity in tech and leadership.',
      'Offers hybrid and flexible work arrangements.',
      'Focuses on digital transformation, cloud, and AI.',
    ],
  },
  {
    name: 'Rafael Advanced Defense Systems',
    city: 'Haifa, Israel',
    bulletPoints: [
      'Develops advanced defense systems, including Iron Dome.',
      'Government-owned, mission-driven, and highly innovative.',
      'Emphasizes inclusion in engineering and cyber units.',
      'Promotes women in STEM roles through internal programs.',
      'High-security, high-impact tech environment.',
    ],
  },
  {
    name: 'Playtika',
    city: 'Herzliya',
    bulletPoints: [
      'A top global mobile gaming company.',
      'Focuses on data-driven personalization and in-game engagement.',
      'Inclusive and dynamic workplace with many women in tech.',
      'Encourages creativity, fun, and fast-paced innovation.',
      'Offers flexibility, career growth, and equity options.',
    ],
  },
  {
    name: 'NICE Ltd.',
    city: "Ra'anana",
    bulletPoints: [
      'Global leader in AI-powered customer experience and analytics.',
      'Works with Fortune 500 companies worldwide.',
      'Strong representation of women in tech and leadership roles.',
      'Encourages hybrid work and career development.',
      'Focus on ethical AI, data privacy, and innovation.',
    ],
  },
  {
    name: 'Mobileye',
    city: 'Jerusalem',
    bulletPoints: [
      'A world leader in autonomous driving and driver-assistance tech.',
      'Owned by Intel, headquartered in Jerusalem.',
      'Employs many engineers, AI specialists, and data scientists.',
      'Women are encouraged through mentorship and leadership tracks.',
      'Innovative, mission-driven, and global in impact.',
    ],
  },
  {
    name: 'monday.com',
    city: 'Tel Aviv',
    bulletPoints: [
      'Fast-growing work operating system used globally.',
      'Known for strong company culture and visual collaboration tools.',
      'Emphasizes inclusion and transparent communication.',
      'Women hold key roles across engineering and product teams.',
      'Offers growth opportunities and excellent work-life balance.',
    ],
  },
  {
    name: 'IronSource (part of Unity)',
    city: 'Tel Aviv',
    bulletPoints: [
      'Specializes in mobile app monetization and distribution.',
      'Now part of Unity Technologies — global game engine company.',
      'Innovative, data-driven culture with a startup feel.',
      'Encourages women in product, design, and development.',
      'Known for collaboration, agility, and scale.',
    ],
  },
];

// Arabic company names (companies1)
const companies1 = [
  {
    name: 'إنتل إسرائيل',
    city: 'حيفا، إسرائيل',
  },
  {
    name: 'أنظمة إلبيت',
    city: 'حيفا، إسرائيل',
  },
  {
    name: 'الصناعات الجوية الفضائية الإسرائيلية (IAI)',
    city: 'لود',
  },
  {
    name: 'أمدوكس',
    city: "رعنانا",
  },
  {
    name: 'رافائيل أنظمة الدفاع المتقدمة',
    city: 'حيفا، إسرائيل',
  },
  {
    name: 'بلايتيكا',
    city: 'هرتسليا',
  },
  {
    name: 'شركة NICE المحدودة',
    city: "رعنانا",
  },
  {
    name: 'موبايلي',
    city: 'القدس',
  },
  {
    name: 'ماندي.كوم',
    city: 'تل أبيب',
  },
  {
    name: 'آيرون سورس (جزء من يونيتي)',
    city: 'تل أبيب',
  },
];

// Hebrew company names (companies2)
const companies2 = [
  {
    name: 'אינטל ישראל',
    city: 'חיפה, ישראל',
  },
  {
    name: 'אלביט מערכות',
    city: 'חיפה, ישראל',
  },
  {
    name: 'התעשייה האווירית לישראל (IAI)',
    city: 'לוד',
  },
  {
    name: 'אמדוקס',
    city: "רעננה",
  },
  {
    name: 'רפאל מערכות הגנה מתקדמות',
    city: 'חיפה, ישראל',
  },
  {
    name: 'פלייטיקה',
    city: 'הרצליה',
  },
  {
    name: 'NICE בע"מ',
    city: "רעננה",
  },
  {
    name: 'מוביילאיי',
    city: 'ירושלים',
  },
  {
    name: 'monday.com',
    city: 'תל אביב',
  },
  {
    name: 'IronSource (חלק מ-Unity)',
    city: 'תל אביב',
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
if(if2===0){
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Photo Header */}
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')}
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
                    <MaterialIcons name="computer" size={32} color="#003366" />
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
                    {company.bulletPoints ? (
                      company.bulletPoints.map((point, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <View style={styles.bulletCircle} />
                          <Text style={styles.bulletText}>{point}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.description}>{company.description}</Text>
                    )}
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
if(if2===1){
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Photo Header */}
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')}
            style={styles.photoHeader}
            resizeMode="cover"
          />
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {companies1.map((company, idx) => (
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
                    <MaterialIcons name="computer" size={32} color="#003366" />
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
                    {company.bulletPoints ? (
                      company.bulletPoints.map((point, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <View style={styles.bulletCircle} />
                          <Text style={styles.bulletText}>{point}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.description}>{company.description}</Text>
                    )}
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
if(if2===2){
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Photo Header */}
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')}
            style={styles.photoHeader}
            resizeMode="cover"
          />
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {companies2.map((company, idx) => (
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
                    <MaterialIcons name="computer" size={32} color="#003366" />
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
                    {company.bulletPoints ? (
                      company.bulletPoints.map((point, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <View style={styles.bulletCircle} />
                          <Text style={styles.bulletText}>{point}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.description}>{company.description}</Text>
                    )}
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
    elevation: 5,
    shadowColor: '#000',
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
  },  bulletItem: {
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
