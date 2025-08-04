import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RaphaelHospitals() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="hospital-building" size={48} color="#2a5298" style={styles.icon} />
        <Text style={styles.header}>Raphael Hospitals</Text>
        <Text style={styles.subHeader}>Tel Aviv, Israel</Text>
        
        <Text style={styles.paragraph}>
          Raphael Hospitals in Tel Aviv is a <Text style={styles.highlight}>modern, privately operated medical center</Text> known for its <Text style={styles.highlight}>advanced technologies</Text>, personalized care, and emphasis on innovation. It offers state-of-the-art surgical tools like <Text style={styles.highlight}>robotic systems</Text> for orthopedic and laparoscopic procedures, creating a cutting-edge environment.
        </Text>
        
        <Text style={styles.paragraph}>
          While smaller in scale than major public hospitals, Raphael fosters a <Text style={styles.highlight}>close-knit multidisciplinary team culture</Text> combining clinical precision with deep attention to patient well-being.
        </Text>

        <Text style={styles.paragraph}>
          For women in healthcare, Raphael presents an environment valuing <Text style={styles.highlight}>compassion, collaboration, and clinical excellence</Text>, with opportunities for growth in high-tech and specialized fields.
        </Text>

        <Text style={styles.paragraph}>
          Its boutique size and private setting allow for <Text style={styles.highlight}>flexibility, personalized recognition,</Text> and better work-life balance. Women in nursing, anesthesia, diagnostics, and surgical assistance roles thrive in a culture emphasizing <Text style={styles.highlight}>teamwork and emotional intelligence.</Text>
        </Text>

        <Text style={styles.paragraph}>
          Though gender equality policies are not publicly disclosed, Raphael’s holistic and respectful approach suggests a culture where <Text style={styles.highlight}>women’s contributions are essential and respected.</Text>
        </Text>

        <Text style={styles.paragraph}>
          For women seeking a <Text style={styles.highlight}>fulfilling, progressive, and supportive workplace</Text> in a forward-looking medical institution, Raphael Hospitals offers a compelling opportunity.
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
  },
});
