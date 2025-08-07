import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ReuthRehabilitationHospital() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="hospital-building" size={48} color="#2a5298" style={styles.icon} />
        <Text style={styles.header}>Reuth Rehabilitation Hospital</Text>
        <Text style={styles.subHeader}>Tel Aviv, Israel</Text>

        <Text style={styles.paragraph}>
          Reuth Rehabilitation Hospital in Tel Aviv offers an especially attractive workplace for women in healthcare, combining a <Text style={styles.highlight}>mission-driven environment</Text> with strong professional support. As Israel’s largest rehabilitation center, Reuth is dedicated to helping patients regain independence and dignity—making it a <Text style={styles.highlight}>deeply meaningful place to work.</Text>
        </Text>

        <Text style={styles.paragraph}>
          Many core roles at Reuth, including nursing, physiotherapy, and occupational therapy, are <Text style={styles.highlight}>female-majority professions</Text>, and the hospital’s collaborative, interdisciplinary care model ensures women’s voices are integral to patient outcomes.
        </Text>

        <Text style={styles.paragraph}>
          With a major new campus in development, there will be growing opportunities for <Text style={styles.highlight}>advancement, leadership, and professional development.</Text> Reuth is known for its warm, inclusive culture, often described as family-like, where cooperation and respect are highly valued.
        </Text>

        <Text style={styles.paragraph}>
          For women seeking work-life balance, many clinical roles offer <Text style={styles.highlight}>part-time or flexible scheduling options.</Text> As a nonprofit institution, Reuth prioritizes ethical practices and gender inclusivity more effectively than large bureaucratic systems.
        </Text>

        <Text style={styles.paragraph}>
          With its expanding vision, supportive environment, and commitment to human-centered care, Reuth presents a <Text style={styles.highlight}>compelling opportunity for women</Text> looking to make a real difference in healthcare while growing their careers.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f0fe',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    maxWidth: 700,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2a5298',
    textAlign: 'center',
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 18,
    color: '#6b7a99',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    color: '#3a3f58',
    lineHeight: 28,
    marginBottom: 18,
    textAlign: 'justify',
  },
  highlight: {
    color: '#1f3c88',
    fontWeight: '600',
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
