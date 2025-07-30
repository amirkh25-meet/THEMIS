import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

export default function Fainance() {
  return (
       <View>
       <TouchableOpacity
             style={styles.companyCard}
             onPress={goToElbitSystems}
             activeOpacity={2}
           >
           <Text>Name of the company:ElbitSystems</Text>
           <Text>City:Haifa</Text>
           </TouchableOpacity>
           <TouchableOpacity
             style={styles.companyCard}
             onPress={goToIntelIsrael}
             activeOpacity={2}
           >
           <Text>Name of the company:IntelIsrael</Text>
           <Text> City:Haifa</Text>
           </TouchableOpacity>
            <TouchableOpacity
            style={styles.companyCard}
             onPress={goToIsraelAerospaceIndustries}
             activeOpacity={2}
           >
            <Text>Name of the company:IsraelAerospaceIndustries</Text>
            <Text>City:Lod</Text>
           </TouchableOpacity>
        </View>    
      )
    }
    
    const goToIntelIsrael = () => {
          router.push('/Fields/Tech/IntelIsrael'); // 👈 this matches app/RaphaelHospitals.js
        };
      
      const goToElbitSystems = () => {
          router.push('/Fields/Tech/ElbitSystems'); // 👈 this matches app/RaphaelHospitals.js
        };
      
      const goToIsraelAerospaceIndustries = () => {
          router.push('/Fields/Tech/IsraelAerospaceIndustries'); // 👈 this matches app/RaphaelHospitals.js
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