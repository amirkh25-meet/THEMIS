import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RaphaelHospitals from '../Fields/HeathCare/RaphaelHospitals';    
import ReuthRehabilitationHospital from '../Fields/HeathCare/ReuthRehabilitationHospital';      
import ShaareZedekMedicalCenter from '../Fields/HeathCare/ShaareZedekMedicalCenter';
import { router } from 'expo-router';

export default function FeildPage() {
  return (
  <View>
    <TouchableOpacity 
    style={styles.companyCard}
    onPress={goToHealthCare}
    activeOpacity={2}><Text>HealthCare companies</Text></TouchableOpacity>
    <TouchableOpacity 
    style={styles.companyCard}
    onPress={goToTech}
    activeOpacity={2}><Text>Tech companies</Text></TouchableOpacity>
    <TouchableOpacity 
    style={styles.companyCard}
    onPress={goToFainance}
    activeOpacity={2}><Text>Fainance companies</Text></TouchableOpacity>
  </View>)}
 
const goToHealthCare = () => {
  router.push('/Fields/HeathCare/HealthCare'); // 👈 this matches app/Fields/HeathCare/HealthCare.jsx
}
const goToTech = () => {
  router.push('/Fields/Tech/Tech'); // 👈 this matches app/Fields/HeathCare/HealthCare.jsx
}
const goToFainance = () => {
  router.push('/Fields/Fainance/Fainance'); // 👈 this matches app/Fields/HeathCare/HealthCare.jsx
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
  },
  companyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 100,
  },
  toggleText: {
    color: '#007bff',
    marginTop: 5,
    fontWeight: '500',
  },
});