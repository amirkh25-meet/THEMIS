// import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const companies = [
//   {
//     name: 'Bank Leumi',
//     city: 'Tel Aviv',
//     description: "Bank Leumi is one of Israel’s leading banking institutions and a pioneer in promoting genderequality in the finance sector. The bank has a strong history of female leadership and is widely recognized for its efforts to modernize and digitize the banking experience. Bank Leumi invests in employee development through innovative programs that encourage career growth — especially for women seeking to transition into high-tech roles or advance into leadership positions. As a woman working at Leumi, you’ll find an inclusive culture that values your voice, supports your professional development, and provides meaningful opportunities for advancement.",
//     industry: 'Banking',
//     founded: 1902,
//     employees: '12,000+',
//     // route: '/Fields/Fainance/BankLeumi',
//   },
//   {
//     name: 'American Express Israel',
//     city: 'Tel Aviv',
//     description: 'American Express Israel offers a workplace culture built on trust, flexibility, and fairness. Recognized consistently as one of the top employers for women, the company nurtures a supportive environment through internal networks and mentoring programs that uplift women at every stage of their careers. Women at AmEx benefit from career development initiatives, wellness programs, and flexible work arrangements that help them balance personal and professional growth. It’s a place where women are empowered to lead, grow, and thrive — supported by a global culture of inclusion and equity.',

//     industry: 'Financial Services',
//     founded: 1850,
//     employees: '2,500+',
//     // route: '/Fields/Fainance/AmericanExpressIsrael',
//   },
//   {
//     name: 'Fidelity Investments Israel',
//     city: 'Jerusalem',
//     description: 'A multinational financial services corporation, specializing in investment management, retirement planning, and wealth management solutions.',

//     industry: 'Investment Management',
//     founded: 1946,
//     employees: '1,800+',
//     // route: '/Fields/Fainance/FidelityInvestmentsIsrael',
//   },
// ];

// export default function Fainance() {
//   const [search, setSearch] = useState('');
//   const [expanded, setExpanded] = useState({});
//   const [animations] = useState(companies.map(() => new Animated.Value(1)));
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(50));

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const handleCardPress = (idx, route) => {
//     Animated.sequence([
//       Animated.timing(animations[idx], {
//         toValue: 0.95,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(animations[idx], {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
//     });
//   };

//   const handleNavigate = (route) => {
//     router.push(route);
//   };



//   const filteredCompanies = companies.filter((c) => {
//     const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
//                          c.city.toLowerCase().includes(search.toLowerCase()) ||
//                          c.industry.toLowerCase().includes(search.toLowerCase());
    
//     if (selectedFilter === 'all') return matchesSearch;
//     if (selectedFilter === 'high-rating') return matchesSearch && c.rating >= 4.3;
//     if (selectedFilter === 'many-jobs') return matchesSearch && c.jobCount >= 30;
//     return matchesSearch;
//   });

//   return (
//     <ScrollView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Finance Companies</Text>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search companies, cities, or industries..."
//           value={search}
//           onChangeText={setSearch}
//         />
//       </View>


//       <ScrollView contentContainerStyle={styles.stepsList}>
//         {filteredCompanies.map((company, idx) => (
//           <Animated.View
//             key={company.name}
//             style={{
//               opacity: fadeAnim,
//               transform: [{ translateY: slideAnim }, { scale: animations[idx] }],
//               width: '100%',
//               marginBottom: 20,
//             }}
//           >
//             <TouchableOpacity
//               style={styles.companyCard}
//               activeOpacity={0.9}
//               onPress={() => handleCardPress(idx, company.route)}
//             >
//               <View style={styles.cardHeader}>
//                 <View style={styles.logoContainer}>
//                   <MaterialIcons name="business" size={32} color="#003366" />
//                 </View>
//                 <View style={styles.companyInfo}>
//                   <Text style={styles.companyName}>{company.name}</Text>
//                   <View style={styles.locationContainer}>
//                     <Ionicons name="location" size={14} color="#6c757d" />
//                     <Text style={styles.city}>{company.city}</Text>
//                   </View>
//                   <View style={styles.ratingContainer}>
//                     <Text style={styles.ratingText}>{company.rating}</Text>
//                   </View>
//                 </View>
//               </View>

//               {expanded[idx] && (
//                 <View style={styles.expandedContent}>
//                   <Text style={styles.description}>{company.description}</Text>
                  
//                 </View>
//               )}
//             </TouchableOpacity>
//           </Animated.View>
//         ))}
//         {filteredCompanies.length === 0 && (
//           <View style={styles.emptyState}>
//             <MaterialIcons name="search-off" size={48} color="#ccc" />
//             <Text style={styles.emptyText}>No companies found</Text>
//             <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
//           </View>
//         )}
//       </ScrollView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     backgroundColor: '#041E42FF',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     paddingTop: 40,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#ffffff',
//     marginBottom: 6,
//     textAlign: 'center',
//   },
//   searchBar: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#dcdcdc',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.06,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   filterContainer: {
//     marginBottom: 20,
//     paddingHorizontal: 2,
//   },
//   filterButton: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//     elevation: 1,
//   },
//   filterButtonActive: {
//     backgroundColor: '#003366',
//     borderColor: '#003366',
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#6c757d',
//     fontWeight: '500',
//   },
//   filterTextActive: {
//     color: '#fff',
//   },
//   stepsList: {
//     padding: 24,
//     paddingBottom: 40,
//   },
//   companyCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#041E42FF',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.12,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoContainer: {
//     width: 56,
//     height: 56,
//     borderRadius: 14,
//     backgroundColor: '#e9f1fa',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },
//   companyInfo: {
//     flex: 1,
//   },
//   companyName: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#212529',
//     marginBottom: 4,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   city: {
//     fontSize: 14,
//     color: '#6c757d',
//     marginLeft: 4,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     fontSize: 14,
//     color: '#444',
//     marginLeft: 6,
//     fontWeight: '600',
//   },
//   badgeContainer: {
//     alignItems: 'flex-end',
//   },
//   jobBadge: {
//     backgroundColor: '#e0f2ff',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   jobCount: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#0077cc',
//   },
//   jobLabel: {
//     fontSize: 11,
//     color: '#0077cc',
//     fontWeight: '500',
//   },
//   expandedContent: {
//     marginTop: 18,
//     borderTopWidth: 1,
//     borderTopColor: '#eeeeee',
//     paddingTop: 16,
//   },
//   description: {
//     fontSize: 15,
//     color: '#333',
//     lineHeight: 22,
//     marginBottom: 16,
//   },
//   companyStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     paddingHorizontal: 4,
//   },
//   statItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#666',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   statValue: {
//     fontSize: 14,
//     color: '#003366',
//     fontWeight: '700',
//   },
//   detailsButton: {
//     backgroundColor: '#003366',
//     borderRadius: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   detailsButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//     marginRight: 8,
//   },
//   emptyState: {
//     alignItems: 'center',
//     marginTop: 60,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     marginTop: 16,
//     fontWeight: '600',
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 8,
//   },
// });
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

const { width } = Dimensions.get('window');

const companies = [
  {
    name: 'Bank Leumi',
    city: 'Tel Aviv',
    description:
      "Bank Leumi is one of Israel’s leading banking institutions and a pioneer in promoting gender equality in the finance sector. The bank has a strong history of female leadership and is widely recognized for its efforts to modernize and digitize the banking experience. Bank Leumi invests in employee development through innovative programs that encourage career growth — especially for women seeking to transition into high-tech roles or advance into leadership positions. As a woman working at Leumi, you’ll find an inclusive culture that values your voice, supports your professional development, and provides meaningful opportunities for advancement.",
    industry: 'Banking',
    founded: 1902,
    employees: '12,000+',
  },
  {
    name: 'American Express Israel',
    city: 'Tel Aviv',
    description:
      'American Express Israel offers a workplace culture built on trust, flexibility, and fairness. Recognized consistently as one of the top employers for women, the company nurtures a supportive environment through internal networks and mentoring programs that uplift women at every stage of their careers. Women at AmEx benefit from career development initiatives, wellness programs, and flexible work arrangements that help them balance personal and professional growth. It’s a place where women are empowered to lead, grow, and thrive — supported by a global culture of inclusion and equity.',
    industry: 'Financial Services',
    founded: 1850,
    employees: '2,500+',
  },
  {
    name: 'Fidelity Investments Israel',
    city: 'Jerusalem',
    description:
      'A multinational financial services corporation, specializing in investment management, retirement planning, and wealth management solutions.',
    industry: 'Investment Management',
    founded: 1946,
    employees: '1,800+',
  },
];

export default function Fainance() {
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
                    <Text style={styles.description}>{company.description}</Text>
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
});
