import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function FieldPage() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Choose Your Field</Text>
    <Text style={styles.intro}>
      Discover companies that{" "}
      <Text style={styles.highlight}>value women</Text> .{" "}
      Choose your field and explore your best-fit workplaces.
    </Text>



      <TouchableOpacity style={styles.card} onPress={goToHealthCare} activeOpacity={0.8}>
        <Ionicons name="medkit" size={28} color="#0d6efd" style={styles.icon} />
        <Text style={styles.cardText}>Healthcare Companies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={goToTech} activeOpacity={0.8}>
        <MaterialCommunityIcons name="laptop" size={28} color="#6610f2" style={styles.icon} />
        <Text style={styles.cardText}>Tech Companies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={goToFinance} activeOpacity={0.8}>
        <FontAwesome5 name="chart-line" size={24} color="#198754" style={styles.icon} />
        <Text style={styles.cardText}>Finance Companies</Text>
      </TouchableOpacity>
    </View>
  );
}

const goToHealthCare = () => {
  router.push('/Fields/HeathCare/HealthCare');
};

const goToTech = () => {
  router.push('/Fields/Tech/Tech');
};

const goToFinance = () => {
  router.push('/Fields/Fainance/Fainance');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
    color: '#212529',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 16,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
  },
intro: {
  fontSize: 15,
  lineHeight: 20,
  textAlign: 'center',
  color: '#495057',
  marginBottom: 20,
  paddingHorizontal: 10,
},

highlight: {
  fontWeight: '600',
  color: '#d63384',
},
});
