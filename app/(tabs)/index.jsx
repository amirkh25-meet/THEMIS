import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [expanded, setExpanded] = useState(null);
  const router = useRouter();

  console.log("Loaded: HomeScreen");
  

  const toggleSection = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const sections = [
    {
      key: 'intro',
      title: 'Introduction',
      content: 'We’re building a community of women to share reviews and discuss the gender pay gap at work, while offering tools, videos and resources to help them master negotiation and advance their careers.'
    },
    {
      key: 'vision',
      title: 'Vision',
      content: 'Our solution is to build a community of women who write reviews and communicate about the gender pay gap in their workplaces. We also offer simulations and lessons in negotiation.'
    },
    {
      key: 'mission',
      title: 'Mission',
      content: 'To simplify legal workflows and support informed decision-making for users.'
    },
    {
      key: 'feature1',
      title: 'Ranking',
      content: 'Smart Case Tracking – monitor all your legal updates in one dashboard.'
    },
    {
      key: 'feature2',
      title: 'Videos',
      content: 'Ruling Search – find relevant legal decisions with powerful filtering.'
    },
    {
      key: 'feature3',
      title: 'Did you know?',
      content: 'Legal Assistant Bot – get instant guidance through AI-powered answers.'
    },
        {
      key: 'feature4',
      title: 'AI Chat Boss',
      content: 'AI Chat Boss – your personal legal assistant for quick answers and support.'
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Welcome to THEMIS</Text>

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

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push('videoPage')} 
      >
        <Text style={styles.navButtonText}>Go to Video Page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#041e42ff',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#B9BDFF',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 16,
    color: '#B9BDFF',
    marginBottom: 20
  },
  image: {
  width: 200,
  height: 200,
  marginBottom: 15,
  borderRadius: 10
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
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#ecf0f1'
  },
  cardText: {
    fontSize: 14,
    color: '#2d3436'
  },
  navButton: {
    backgroundColor: '#B9BDFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});