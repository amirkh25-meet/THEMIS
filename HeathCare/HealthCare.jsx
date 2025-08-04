import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function HealthCare() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>HealthCare Companies</Text>

      <TouchableOpacity style={styles.companyCard} onPress={goToRaphaelHospitals} activeOpacity={0.7}>
        <Text style={styles.companyName}>Raphael Hospitals</Text>
        <Text style={styles.city}>Tel Aviv</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.companyCard} onPress={goToReuthRehabilitationHospital} activeOpacity={0.7}>
        <Text style={styles.companyName}>Reuth Rehabilitation Hospital</Text>
        <Text style={styles.city}>Tel Aviv</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.companyCard} onPress={goToShaareZedekMedicalCenter} activeOpacity={0.7}>
        <Text style={styles.companyName}>Shaare Zedek Medical Center</Text>
        <Text style={styles.city}>Jerusalem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const goToRaphaelHospitals = () => {
  router.push('/Fields/HeathCare/RaphaelHospitals');
};

const goToReuthRehabilitationHospital = () => {
  router.push('/Fields/HeathCare/ReuthRehabilitationHospital');
};

const goToShaareZedekMedicalCenter = () => {
  router.push('/Fields/HeathCare/ShaareZedekMedicalCenter');
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#e9f0f7',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',  // מרכז את כל התוכן
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 30,
    textAlign: 'center',
  },
  companyCard: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',  // מרכז את הטקסט בתוך הכרטיס
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // elevation for Android
    elevation: 8,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0d47a1',
    marginBottom: 6,
    textAlign: 'center',
  },
  city: {
    fontSize: 16,
    color: '#4a4a4a',
    fontWeight: '500',
    textAlign: 'center',
  },
});
