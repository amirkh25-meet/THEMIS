import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { databases, account } from '../../../assets/appwrite1';


const { width, height } = Dimensions.get('window');
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);


const sections = [
  {
    key: 'intro',
    title: 'What we are?',
    content:
      "We're building a community of women to share reviews and discuss the gender pay gap at work, while offering tools, videos and resources to help them master negotiation and advance their careers.",
    icon: 'users',
    color: '#041E42FF'
  },
  {
    key: 'vision',
    title: 'Who we are?',
    content:
      'Our solution is to build a community of women who write reviews and communicate about the gender pay gap in their workplaces. We also offer simulations and lessons in negotiation.',
    icon: 'eye',
    color: '#041E42FF'
  },
  {
    key: 'mission',
    title: 'Our Mission',
    content:
      'At Themis, we give women all the tools they need to advance their career, right from the first step - the first interview, and beyond!',
    icon: 'target',
    color: '#041E42FF'
  },
];

// Define steps data inside the component file
const steps = [
  {
    id: 1,
    title: 'Companies',
    icon: <Ionicons name="business" size={40} color="#fff" />,
    route: '/FieldPage',
    description: 'Here you can find our "Themis approved" companies that have good conditions for women and promote equality.',
    backgroundColor: '#041E42FF',
    shadowColor: '#041E42FF'
  },
  {
    id: 2,
    title: 'Resume Guide',
    icon: <MaterialIcons name="description" size={40} color="#fff" />,
    route: '/resumeGuide',
    description: 'Here you can find our specially designed guide to write your CV and make a dazzling first impression.',
    backgroundColor: '#041E42FF',
    shadowColor: '#041E42FF'
  },
  {
    id: 3,
    title: 'Salary Calculator',
    icon: <Entypo name="calculator" size={40} color="#fff" />,
    route: '/IsraelSalaryCalculator',
    description: 'Come prepared to your first interview with our salary calculator - knowledge is power!',
    backgroundColor: '#041E42FF',
    shadowColor: '#041E42FF'
  },
  {
    id: 4,
    title: 'Negotiation Simulation',
    icon: <MaterialCommunityIcons name="handshake" size={40} color="#fff" />,
    route: '/negotiation',
    description: 'Here you can learn how to negotiate your desired salary and conditions with our high-quality simulator.',
    backgroundColor: '#041E42FF',
    shadowColor: '#041E42FF'
  },
  {
    id: 5,
    title: 'Mentors Videos',
    icon: <Entypo name="video" size={40} color="#fff" />,
    route: '/videoPage',
    description: 'See what advice women mentors can give about their experiences in the job market through engaging videos.',
    backgroundColor: '#041E42FF',
    shadowColor: '#041E42FF'
  },
];

// Define facts data inside the component file
const facts = [
  "Over a birth cohort's lifetime, the gender-wage gap tends to grow, as small early differences compound over time.",
  'Over their lifetime, women earn on average 30% less than men.',
  'The monthly gender wage gap is about 32%–42% in Israel.',
  'The main cause for the gender wage gap is the number of work hours, which accounts for about 57% of the gap.',
  'Within feminine occupations, wage gaps are larger.',
  "If the work is hurting the worker's health during her pregnancy, she must provide a doctor's letter about it. Absence from work as a result of this shall count as use of paid sick days.",
  'A worker who is pregnant must inform the employer about her pregnancy no later than the 5th month of the pregnancy.',
  "A worker who had an abortion may get paid leave of at least a week, only with a doctor's written approval.",
  'Firing a pregnant worker is forbidden in the case that she has worked in the same place for over 6 months, unless there is a special approval from the Minister of Labor.',
  'The employer must acquire health insurance for the employee, and must not deduct more than 125 NIS monthly from her salary.',
  'On the basis of good faith vis-à-vis the employer and in order to benefit from various employee rights, women are advised to inform their employer by the 5th month of pregnancy.',
  'The Law for Prevention of Sexual Harassment,– 1998 sets both tort and criminal responsibility. The penalty may be a monetary fine and/or imprisonment.',
  'During the pregnancy, a woman who works full time (generally considered 182 hours per month), may be absent from work for up to 40 hours, with pay',
  'The law limits fertility treatment absences to 12 days for the father. For the mother, it allows up to 4 treatment cycles per year, with a maximum of 64 days for a 5-day workweek, or 80 days for a 6-day workweek.',
];

const getRandomFact = () => {
  const index = Math.floor(Math.random() * facts.length);
  return facts[index];
};

// Main component without props - all data is defined internally
export default function HomeScreen() {
  const [expanded, setExpanded] = useState(null);
  const [visibleStepId, setVisibleStepId] = useState(null);
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [randomFact, setRandomFact] = useState('');
  const [logoAnimation] = useState(new Animated.Value(0));
  const [cardAnimations] = useState(sections.map(() => new Animated.Value(0)));
  const [stepAnimations] = useState(steps.map(() => new Animated.Value(0)));
  const [pulseAnimation] = useState(new Animated.Value(1));
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);
  const toggleSection = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleCloseModal = () => {
    setVisibleStepId(null);
  };

  const closeFactPopup = () => setShowFactPopup(false);

  // Animations
  useEffect(() => {
    // Logo entrance animation
    Animated.spring(logoAnimation, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Stagger card animations
    const cardDelay = 200;
    cardAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 800,
        delay: index * cardDelay,
        useNativeDriver: true,
      }).start();
    });

    // Stagger step animations
    const stepDelay = 150;
    stepAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: 1000 + index * stepDelay,
        useNativeDriver: true,
      }).start();
    });

    // Pulse animation for subheading
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Auto-popup with random fact every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomFact(getRandomFact());
      setShowFactPopup(true);
      setTimeout(() => setShowFactPopup(false), 300000);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const logoTransform = {
    transform: [
      {
        scale: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        })
      },
      {
        rotate: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '0deg'],
        })
      }
    ]
  };


const handleStepNavigation = async (step) => {
if (!step?.route) {
    console.error('Invalid step parameter');
    return { isSignedIn: false, user: null };
  }

  try {
    console.log('Checking authentication for route:', step.route);
    const authResult = await verifyAuthStatus();
    
    if (!authResult.isSignedIn) {
      console.log('User not authenticated, redirecting to profile page');
      // Store intended route in a global variable or context (not AsyncStorage)
      global.intendedRoute = `/user${step.route}`;
      router.replace('/user/_ProfilePage');
      return authResult;
    }
    
    console.log('User authenticated, proceeding to:', step.route);
    router.push(`/user${step.route}`);
    return authResult;
    
  } catch (error) {
    console.error('Navigation failed:', error);
    router.replace('/user/_ProfilePage');
    return { isSignedIn: false, user: null, error: error.message };
  }
};
// Separate auth verification
const verifyAuthStatus = async () => {
  try {
    console.log('Verifying authentication with server...');
    const user = await account.get();
    console.log('User authenticated:', user);
    return { isSignedIn: true, user };
  } catch (error) {
    console.log('User not authenticated:', error.message);
    return { isSignedIn: false, user: null, error: error.message };
  }
};

const handleCardPress = async (step) => {
  if (!step?.route) {
    console.error('Invalid step parameter');
    router.replace('/user/_ProfilePage');
    return;
  }

  try {
    const authStatus = await verifyAuthStatus();
    const fullRoute = `/user${step.route}`;
    
    if (authStatus.isSignedIn) {
      console.log('User authenticated, navigating to:', fullRoute);
      router.push(fullRoute);
    } else {
      console.log('User not authenticated, redirecting to signup...');
      
      // Store intended route globally (instead of AsyncStorage)
      global.intendedRoute = fullRoute;
      
      router.replace({
        pathname: '/user/_ProfilePage',
        params: { isSignupFlow: true }
      });
    }
  } catch (error) {
    console.error('Navigation error:', error);
    router.replace('/user/_ProfilePage');
  }
};


  const handleHelpPress = (stepId) => {
    setVisibleStepId(stepId);
  };
  const handleMenuPress = () => {
    router.push('/user/settings')
  }


  return (
                    <AnimatedImageBackground
      source={require('../../../assets/images/backpink.jpeg')}
      style={[styles.background, { opacity: fadeAnim }]}
      resizeMode="cover">

    
    <View style={styles.mainContainer}>

      <View style={styles.backgroundGradient} />
      
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >      
        <TouchableOpacity >
          <View style={{ position: 'relative', top: 0, left: "50%" }} >
            < Ionicons onPress={handleMenuPress} name="reorder-three-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>
        {/* Animated Logo */}
        <Animated.View style={[styles.logoContainer, logoTransform]}>
          <Image
            
            source={require('../../../assets/images/reallogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Animated Subheading */}
        <Animated.View style={[styles.subheadingContainer, { transform: [{ scale: pulseAnimation }] }]}>
          <Text style={styles.subheading}>Empower Women,</Text>
          <Text style={styles.subheading}>Empower Humanity</Text>
        </Animated.View>

        {/* Animated Info Cards */}
        <View style={styles.cardsContainer}>
          {sections.map((section, index) => (
            <Animated.View
              key={section.key}
              style={[
                styles.cardWrapper,
                {
                  opacity: cardAnimations[index],
                  transform: [
                    {
                      translateY: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity 
                onPress={() => toggleSection(section.key)} 
                style={[styles.modernCard]}
                activeOpacity={0.8}
              >
                <View style={styles.cardGradient}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: section.color }]}>
                      <Entypo name={section.icon} size={24} color="#fff" />
                    </View>
                    <Text style={styles.modernCardTitle}>{section.title}</Text>
                    <Animated.View
                      style={{
                        transform: [{
                          rotate: expanded === section.key ? '180deg' : '0deg'
                        }]
                      }}
                    >
                      <MaterialIcons name="keyboard-arrow-down" size={28} color="#666" />
                    </Animated.View>
                  </View>
                  {expanded === section.key && (
                    <Animated.View style={styles.cardContent}>
                      <Text style={styles.cardText}>{section.content}</Text>
                    </Animated.View>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Journey Steps Title */}
        <View style={styles.journeyTitleContainer}>
          <Text style={styles.journeyTitle}>Your Career Journey:</Text>
          <View style={styles.titleUnderline} />
        </View>
        {/* Animated Step Grid */}
        <View style={styles.stepsContainer}>
          <View style={styles.stepRow}>
            {steps.slice(0, 3).map((step, index) => (
              <Animated.View
                key={step.id}
                style={[
                  styles.stepWrapper,
                  {
                    opacity: stepAnimations[index],
                    transform: [
                      {
                        translateY: stepAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        })
                      },
                      {
                        scale: stepAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        })
                      }
                    ]
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleCardPress(step)}
                  activeOpacity={0.8}
                  style={styles.stepCard}
                >
                  <View
                    style={[
                      styles.stepBubble, 
                      { 
                        backgroundColor: step.backgroundColor,
                        shadowColor: step.shadowColor 
                      }
                    ]}
                  >
                    {step.icon}
                  </View>
                  <View style={styles.stepTitleContainer}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <TouchableOpacity 
                      onPress={() => handleHelpPress(step.id)}
                      style={styles.helpButton}
                    >
                      <MaterialIcons name="help-outline" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          <View style={styles.stepRow}>
            {steps.slice(3).map((step, index) => (
              <Animated.View
                key={step.id}
                style={[
                  styles.stepWrapper,
                  {
                    opacity: stepAnimations[index + 3],
                    transform: [
                      {
                        translateY: stepAnimations[index + 3].interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        })
                      },
                      {
                        scale: stepAnimations[index + 3].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        })
                      }
                    ]
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleCardPress(step)}
                  activeOpacity={0.8}
                  style={styles.stepCard}
                >
                  <View
                    style={[
                      styles.stepBubble, 
                      { 
                        backgroundColor: step.backgroundColor,
                        shadowColor: step.shadowColor 
                      }
                    ]}
                  >
                    {step.icon}
                  </View>
                  <View style={styles.stepTitleContainer}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <TouchableOpacity 
                      onPress={() => handleHelpPress(step.id)}
                      style={styles.helpButton}
                    >
                      <MaterialIcons name="help-outline" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          
        </View>
      </ScrollView>

      {/* Help Modal */}
      <Modal 
        visible={visibleStepId !== null} 
        transparent 
        animationType="slide" 
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.modernModalBox}>
            <View style={styles.modalGradient}>
              <View style={styles.modalHeader}>
                <MaterialIcons name="info" size={40} color="#fff" />
                <Text style={styles.modalTitle}>
                  {steps.find((s) => s.id === visibleStepId)?.title}
                </Text>
              </View>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {steps.find((s) => s.id === visibleStepId)?.description}
              </Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.modernCloseButton}>
                <View style={styles.closeButtonGradient}>
                  <Text style={styles.closeButtonText}>Got it!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Fact Popup Modal */}
      <Modal 
        visible={showFactPopup} 
        transparent 
        animationType="fade" 
        onRequestClose={closeFactPopup}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.factModalBox}>
            <View style={styles.factModalGradient}>
              <View style={styles.factHeader}>
                <Text style={styles.factEmoji}>💡</Text>
                <Text style={styles.factTitle}>Did You Know?</Text>
              </View>
              <Text style={styles.factText}>{randomFact}</Text>
              <TouchableOpacity onPress={closeFactPopup} style={styles.factCloseButton}>
                <Text style={styles.factCloseText}>Got It.</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
    </AnimatedImageBackground>
  );
}

// Define styles inside the component file - no props needed
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
    background: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
    background: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    marginBottom: -35,
  },
  logo: {
    width: 450,
    height: 200,
  },
  subheadingContainer: {
    marginBottom: 30,
  },
  subheading: {
    fontSize: 24,
    color: '#041E42FF',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  cardWrapper: {
    marginBottom: 15,
  },
  modernCard: {
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderLeftColor: '#ff7c8a',
    borderRightColor: '#ff7c8a',
  },
  cardGradient: {
    backgroundColor: '#ffffff', 
    backgroundColor: '#ffffff',
    padding: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 3,
  },
  modernCardTitle: {
    flex: 1,
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  journeyTitleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  journeyTitle: {
    fontSize: 28,
    color: '#041E42FF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginTop: 10,
  },
  stepsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  stepWrapper: {
    alignItems: 'center',
  },
  stepCard: {
    alignItems: 'center',
    width: 100,
  },
  stepBubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  stepTitleContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  stepTitle: {
    fontSize: 16,
    color: '#041E42FF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  helpButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 6,
    elevation: 2,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modernModalBox: {
    backgroundColor: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    maxWidth: 400,
    width: '100%',
    elevation: 20,
  },
  modalGradient: {
    backgroundColor: '#041E42FF',
    padding: 25,
  },
  modalHeader: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  modalContent: {
    padding: 25,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 25,
  },
  modernCloseButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  closeButtonGradient: {
    backgroundColor: '#041E42FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  factModalBox: {
    borderRadius: 25,
    overflow: 'hidden',
    maxWidth: 380,
    width: '100%',
    elevation: 20,
  },
  factModalGradient: {
    backgroundColor: '#041E42FF',
    padding: 30,
  },
  factHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  factEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  factTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  factText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic',
  },
  factCloseButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: 'center',
  },
  factCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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