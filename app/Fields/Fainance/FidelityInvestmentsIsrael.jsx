import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FidelityInvestmentsIsrael() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.companyName}>Fidelity Investments Israel</Text>
        <Text style={styles.description}>
          Fidelity Investments Israel is known for its inclusive approach and dedication to empowering women in the workplace.
          The company provides structured pathways for women returning to work, along with leadership programs, peer mentoring,
          and personal development resources. Fidelity encourages work-life balance and offers flexibility to support women
          in both their careers and personal journeys. Its culture promotes collaboration, innovation, and continuous learning—
          making it an excellent environment for women who seek professional fulfillment in a supportive and forward-thinking workplace.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f4f7',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#4a4a4a',
    textAlign: 'center',
  },
});
