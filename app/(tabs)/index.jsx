import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const sections = [
  {
    key: 'intro',
    title: 'What we are?',
    content:
      'We’re building a community of women to share reviews and discuss the gender pay gap at work, while offering tools, videos and resources to help them master negotiation and advance their careers.',
  },
  {
    key: 'vision',
    title: 'Who we are?',
    content:
      'Our solution is to build a community of women who write reviews and communicate about the gender pay gap in their workplaces. We also offer simulations and lessons in negotiation.',
  },
  {
    key: 'mission',
    title: 'Our Mission',
    content: 'At Themis, we give women all the tools they need to advance their career, right from the first step - the first interview, and beyond!',
  },
];

const steps = [
  {
    id: 1,
    title: 'Companies',
    icon: <Ionicons name="business" size={50} color="#fff" />,
    route: '/CompanySearchPage',
    description:
      'Here you can find our “Themis approved” companies that have good conditions for women and promote equality.',
  },
  {
    id: 2,
    title: 'Resume Guide',
    icon: <MaterialIcons name="description" size={50} color="#fff" />,
    route: '/resume-guide',
    description:
      'Here you can find our specially designed guide to write your CV and make a dazzling first impression.',
  },
  {
    id: 3,
    title: 'Salary Calculator',
    icon: <Entypo name="calculator" size={50} color="#fff" />,
    route: '/IsraelSalaryCalculator',
    description:
      'Come prepared to your first interview with our salary calculator - knowledge is power!',
  },
  {
    id: 4,
    title: 'Negotiation Simulation',
    icon: <MaterialCommunityIcons name="handshake" size={50} color="#fff" />,
    route: '/negotiation',
    description:
      'Here you can learn how to negotiate your desired salary and conditions with our high-quality simulator.',
  },
  {
    id: 5,
    title: 'Mentors videos',
    icon: <Entypo name="video" size={50} color="#fff" />,
    route: '/videoPage',
    description:
      'See what advice women mentors can give about their experiences in the job market through engaging videos.',
  },
];

const facts = [
  'Over a birth cohort’s lifetime, the gender-wage gap tends to grow, as small early differences compound over time.',
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

export default function HomeScreen() {
  const [expanded, setExpanded] = useState(null);
  const [visibleStepId, setVisibleStepId] = useState(null);
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [randomFact, setRandomFact] = useState('');
  const router = useRouter();

  const toggleSection = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleHelpPress = (id) => {
    setVisibleStepId(id);
  };

  const handleCloseModal = () => {
    setVisibleStepId(null);
  };

  const closeFactPopup = () => setShowFactPopup(false);

  // Auto-popup with random fact every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomFact(getRandomFact());
      setShowFactPopup(true);
      setTimeout(() => setShowFactPopup(false), 4000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>

        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subheading}>Empower Women, Empower humanity</Text>
        {sections.map((section) => (
          <View key={section.key} style={styles.card}>
            <TouchableOpacity onPress={() => toggleSection(section.key)} style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              </TouchableOpacity>
              {expanded === section.key && (
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>{section.content}</Text>
                  </View>
                )}
                </View>
              ))}



<View style={styles.mapGrid}>
  <View style={styles.row}>
    {steps.slice(0, 3).map((step) => (
      <TouchableOpacity
        key={step.id}
        onPress={() => router.push(step.route)}
        activeOpacity={0.8}
        style={styles.stepCard}
      >
        <View style={styles.bubble}>{step.icon}</View>
        <View style={styles.titleRow}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <TouchableOpacity onPress={() => handleHelpPress(step.id)}>
            <MaterialIcons name="help-outline" size={24} color="#041e42ff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ))}
  </View>

  <View style={[styles.row, styles.centerRow]}>
    {steps.slice(3).map((step) => (
      <TouchableOpacity
        key={step.id}
        onPress={() => router.push(step.route)}
        activeOpacity={0.8}
        style={styles.stepCard}
      >
        <View style={styles.bubble}>{step.icon}</View>
        <View style={styles.titleRow}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <TouchableOpacity onPress={() => handleHelpPress(step.id)}>
            <MaterialIcons name="help-outline" size={24} color="#041e42ff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ))}
  </View>
</View>


      </ScrollView>

      <Modal visible={visibleStepId !== null} transparent animationType="fade" onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              {steps.find((s) => s.id === visibleStepId)?.description}
            </Text>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showFactPopup} transparent animationType="fade" onRequestClose={closeFactPopup}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={[styles.modalText, { fontStyle: 'italic' }]}>
              💡 Did you know? {'\n\n'} {randomFact}
            </Text>
            <TouchableOpacity onPress={closeFactPopup} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    backgroundColor: '#eaebff',
    alignItems: 'center',
  },
  logo: {
    width: 450,
    height: 180,
  },
  subheading: {
    fontSize: 20,
    color: '#041e42ff',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
    paddingHorizontal: 12,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  sub2: {
    fontSize: 21,
    color: '#041e42ff',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
    lineHeight: 26,
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
  },
  mapContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  stepWrapper: {
    alignItems: 'center',
    marginBottom: 36,
  },
  connectorContainer: {
    alignItems: 'center',
  },
  connectorLine: {
    width: 6,
    height: 40,
    backgroundColor: '#ff7c8a',
  },
  bubble: {
    width: 100,
    height: 100,
    borderRadius: 40,
    backgroundColor: '#041e42ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  stepTitle: {
    fontSize: 17,
    color: '#2c3e50',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxWidth: 400,
  },
  modalText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#041e42ff',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2
  },
  cardHeader: {
    padding: 15,
    backgroundColor: '#ff7c8a'
  },
  cardTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600'
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#ecf0f1'
  },
  cardText: {
    fontSize: 18,
    color: '#2d3436'
  },
mapGrid: {
  width: '97%',
  gap: 20,
  marginTop: 20,
  marginBottom: 40,
},

row: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 20,
  width: '100%',
},

centerRow: {
  justifyContent: 'center',
  gap: 80,
},

stepCard: {
  width: 100,
  alignItems: 'center',
},


});