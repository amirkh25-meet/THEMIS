import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Fainance() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Finance Companies</Text>

      <TouchableOpacity style={styles.companyCard} onPress={goToBankLeumi} activeOpacity={0.7}>
        <Text style={styles.companyName}>Bank Leumi</Text>
        <Text style={styles.city}>Tel Aviv</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.companyCard} onPress={goToAmericanExpressIsrael} activeOpacity={0.7}>
        <Text style={styles.companyName}>American Express Israel</Text>
        <Text style={styles.city}>Tel Aviv</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.companyCard} onPress={goToFidelityInvestmentsIsrael} activeOpacity={0.7}>
        <Text style={styles.companyName}>Fidelity Investments Israel</Text>
        <Text style={styles.city}>Jerusalem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const goToBankLeumi = () => {
  router.push('/Fields/Fainance/BankLeumi');
};

const goToAmericanExpressIsrael = () => {
  router.push('/Fields/Fainance/AmericanExpressIsrael');
};

const goToFidelityInvestmentsIsrael = () => {
  router.push('/Fields/Fainance/FidelityInvestmentsIsrael');
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center', // מרכז את כל התוכן
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#003366',
  },
  companyCard: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center', // מרכז טקסט בתוך הכרטיס
    // צללים לאייפון
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // צללים לאנדרואיד
    elevation: 3,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
  city: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
    textAlign: 'center',
  },
});
