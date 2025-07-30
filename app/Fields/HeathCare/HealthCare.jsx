import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

export default function HealthCare() {
  return (
     <View>
     <TouchableOpacity
           style={styles.companyCard}
           onPress={goToRaphaelHospitals}
           activeOpacity={2}
         >
         <Text>Name of the company:RaphaelHospitals</Text>
         <Text>City:Tel-Aviv</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.companyCard}
           onPress={goToReuthRehabilitationHospital}
           activeOpacity={2}
         >
         <Text>Name of the company:ReuthRehabilitationHospital</Text>
         <Text> City:Tel-Aviv</Text>
         </TouchableOpacity>
          <TouchableOpacity
          style={styles.companyCard}
           onPress={goToShaareZedekMedicalCenter}
           activeOpacity={2}
         >
          <Text>Name of the company:ShaareZedekMedicalCenter</Text>
          <Text>City:Jerusalem</Text>
         </TouchableOpacity>
      </View>    
    )
  }
  
  const goToRaphaelHospitals = () => {
      router.push('/Fields/HeathCare/RaphaelHospitals'); // 👈 this matches app/RaphaelHospitals.js
    };
  
  const goToReuthRehabilitationHospital = () => {
      router.push('/Fields/HeathCare/ReuthRehabilitationHospital'); // 👈 this matches app/RaphaelHospitals.js
    };
  
  const goToShaareZedekMedicalCenter = () => {
      router.push('/Fields/HeathCare/ShaareZedekMedicalCenter'); // 👈 this matches app/RaphaelHospitals.js
    };


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