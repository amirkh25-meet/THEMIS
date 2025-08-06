import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ShaareZedekMedicalCenter() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="hospital-building" size={48} color="#2a5298" style={styles.icon} />
        <Text style={styles.header}>Shaare Zedek Medical Center</Text>
        <Text style={styles.subHeader}>Jerusalem, Israel</Text>

        <Text style={styles.paragraph}>
          Shaare Zedek Medical Center in Jerusalem is a highly appealing workplace for women in healthcare, offering a blend of <Text style={styles.highlight}>clinical excellence, academic opportunities, and a deeply inclusive culture.</Text> As one of Israel’s leading nonprofit teaching hospitals, it serves over half a million patients a year and is known for its compassionate, patient-centered approach.
        </Text>

        <Text style={styles.paragraph}>
          Women professionals are well-represented and actively supported in leadership and clinical roles. A notable example is Dr. Shani Paluch-Shimon, the youngest-ever director of the Oncology Department while raising three children — reflecting the hospital's commitment to <Text style={styles.highlight}>empowering women in medicine.</Text>
        </Text>

        <Text style={styles.paragraph}>
          The workplace culture emphasizes diversity and coexistence, with Jewish and Arab staff working side by side in an atmosphere of mutual respect. Significant expansion underway includes new trauma, neonatal, pediatric, and women’s health units, offering growing opportunities in both clinical and research tracks.
        </Text>

        <Text style={styles.paragraph}>
          Many roles support <Text style={styles.highlight}>flexible hours and work-life balance</Text>, beneficial for women balancing professional and personal responsibilities. Staff describe the hospital as collaborative and mission-driven, where the work is meaningful and the environment supportive.
        </Text>

        <Text style={styles.paragraph}>
          Overall, Shaare Zedek provides a strong platform for women seeking <Text style={styles.highlight}>purpose-driven careers</Text> in a respectful, dynamic, and evolving medical institution.
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
