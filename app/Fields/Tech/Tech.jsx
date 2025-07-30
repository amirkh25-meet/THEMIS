import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function Tech() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tech Companies</Text>

      <TouchableOpacity style={styles.companyCard} onPress={goToElbitSystems} activeOpacity={0.7}>
        <Text style={styles.companyName}>Elbit Systems</Text>
        <Text style={styles.city}>Haifa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.companyCard} onPress={goToIntelIsrael} activeOpacity={0.7}>
        <Text style={styles.companyName}>Intel Israel</Text>
        <Text style={styles.city}>Haifa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.companyCard} onPress={goToIsraelAerospaceIndustries} activeOpacity={0.7}>
        <Text style={styles.companyName}>Israel Aerospace Industries</Text>
        <Text style={styles.city}>Lod</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const goToElbitSystems = () => {
  router.push('/Fields/Tech/ElbitSystems');
};

const goToIntelIsrael = () => {
  router.push('/Fields/Tech/IntelIsrael');
};

const goToIsraelAerospaceIndustries = () => {
  router.push('/Fields/Tech/IsraelAerospaceIndustries');
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',  // מרכז את כל התוכן
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#0d47a1',
    textAlign: 'center',
  },
  companyCard: {
    backgroundColor: '#fff',
    width: '90%',
    paddingVertical: 24,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',  // מרכז טקסטים בתוך הכרטיס
    // הצללה לאייפון
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // הצללה לאנדרואיד
    elevation: 8,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a237e',
    marginBottom: 6,
    textAlign: 'center',
  },
  city: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    textAlign: 'center',
  },
});
