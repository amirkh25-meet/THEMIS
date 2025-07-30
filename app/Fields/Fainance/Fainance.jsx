import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';


export default function Fainance() {
  return (
         <View>
         <TouchableOpacity
               style={styles.companyCard}
               onPress={goToBankLeumi}
               activeOpacity={2}
             >
             <Text>Name of the company:BankLeumi</Text>
             <Text>City:Tel-Aviv</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.companyCard}
               onPress={goToAmericanExpressIsrael}
               activeOpacity={2}
             >
             <Text>Name of the company:AmericanExpressIsrael</Text>
             <Text> City:Tel-Aviv</Text>
             </TouchableOpacity>
              <TouchableOpacity
              style={styles.companyCard}
               onPress={goToFidelityInvestmentsIsrael}
               activeOpacity={2}
             >
              <Text>Name of the company:FidelityInvestmentsIsrael</Text>
              <Text>City:Jerusalem</Text>
             </TouchableOpacity>
          </View>    
        )
      }
      
      const goToBankLeumi = () => {
            router.push('/Fields/Fainance/BankLeumi'); // 👈 this matches app/RaphaelHospitals.js
          };
        
        const goToAmericanExpressIsrael = () => {
            router.push('/Fields/Fainance/AmericanExpressIsrael'); // 👈 this matches app/RaphaelHospitals.js
          };
        
        const goToFidelityInvestmentsIsrael = () => {
            router.push('/Fields/Fainance/FidelityInvestmentsIsrael'); // 👈 this matches app/RaphaelHospitals.js
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