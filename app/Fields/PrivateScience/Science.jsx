import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
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

const companies = [
    {
    name: 'Oramed Pharmaceuticals',
    city: 'Jerusalem',
    description: [
      'Develops oral drug delivery solutions.',
      'Focus on diabetes treatment via oral insulin.',
      'Innovative culture and biotech research roles.',
      'Women involved in clinical and regulatory teams.',
    ],
  },
  {
    name: 'AION Labs',
    city: 'Rehovot',
    description: [
      'AI and bio lab backed by pharma leaders.',
      'Combines cloud, biology, and machine learning.',
      'Fosters startup innovation with biotech experts.',
      'Encourages female founders and scientists.',
    ],
  },
  {
    name: 'BioLineRx',
    city: 'Modi’in',
    description: [
      'Clinical-stage biopharma developing cancer therapies.',
      'Focus on immunotherapy and rare diseases.',
      'Women contribute in research, trials, and ops.',
      'Dynamic, impact-driven team culture.',
    ],
  },
  {
    name: 'Innocan Pharma',
    city: 'Herzliya',
    description: [
      'Specializes in cannabinoid-based treatments.',
      'Integrates nanotech and medical cannabis.',
      'R&D and formulation roles open to women.',
      'Supports hybrid and flexible research schedules.',
    ],
  },
  {
    name: 'EZbra Advanced Wound Care',
    city: 'Tel Aviv',
    description: [
      'Develops sterile, disposable breast dressings.',
      'Female-led startup addressing women’s health.',
      'Designs with dignity, comfort, and innovation.',
      'Promotes women in product, design, and sales.',
    ],
  },
  {
    name: 'MobileODT',
    city: 'Tel Aviv',
    description: [
      'Uses mobile phones for cervical cancer screening.',
      'AI-powered digital colposcopy for low-resource areas.',
      'Impact-driven, female-forward company culture.',
      'Opportunities in AI, UX, and clinical validation.',
    ],
  },
  {
    name: 'Biop Medical',
    city: 'Ramat Gan',
    description: [
      'Develops imaging tech for early cancer detection.',
      'Women contribute in R&D and clinical outreach.',
      'Focus on gynecological cancer diagnostics.',
      'Mission-driven and innovation-focused team.',
    ],
  },
  {
    name: 'Embie',
    city: 'Tel Aviv',
    description: [
      'Fertility tracking app for patients and clinics.',
      'Empowers women through fertility data insights.',
      'Female-led startup with focus on reproductive health.',
      'Tech and product roles suited for women in digital health.',
    ],
  },
  {
    name: 'Gals Bio',
    city: 'Herzliya',
    description: [
      'Develops smart tampon for menstrual biomarker tracking.',
      'Promotes women’s health innovation and body literacy.',
      'Startup run by women, for women.',
      'Tech and bioengineering opportunities.',
    ],
  },
  {
    name: 'impact.51',
    city: 'Tel Aviv',
    description: [
      'Health tech impact accelerator supporting diverse founders.',
      'Invests in women-led startups in healthcare.',
      'Offers mentorship, funding, and tech tools.',
      'Women leaders in venture, health, and strategy.',
    ],
  },

];


export default function HealthCare() {
  const [expanded, setExpanded] = useState({});
  const [animations] = useState(companies.map(() => new Animated.Value(1)));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

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

  const handleCardPress = (idx, route) => {
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
      if (route) router.push(route);
    });
  };
if(if2===0){
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')}
            style={styles.photoHeader}
            resizeMode="cover"
          />
        </View>

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
                onPress={() => handleCardPress(idx, company.route)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.logoContainer}>
                    <Ionicons name="flask-outline" size={24} color="#003366" />
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
                    {company.description.map((point, i) => (
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
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  photoHeaderContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 90,
    marginBottom: 20,
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
