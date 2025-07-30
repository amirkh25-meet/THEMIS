import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

export default function AmericanExpressIsrael() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>American Express Israel</Text>
        <Text style={styles.paragraph}>
          American Express Israel offers a workplace culture built on trust, flexibility, and fairness.
          Recognized consistently as one of the top employers for women, the company nurtures a supportive
          environment through internal networks and mentoring programs that uplift women at every stage
          of their careers.
        </Text>
        <Text style={styles.paragraph}>
          Women at AmEx benefit from career development initiatives, wellness programs, and flexible work
          arrangements that help them balance personal and professional growth. It’s a place where women
          are empowered to lead, grow, and thrive — supported by a global culture of inclusion and equity.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#e9ecef',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#003087',
    marginBottom: 18,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#343a40',
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'left',
  },
});

