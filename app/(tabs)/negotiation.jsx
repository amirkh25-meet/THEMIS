import { Ionicons } from '@expo/vector-icons';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function NegotiationSimulatorPage() {
  const openSimulator = () => {
    Linking.openURL('https://app.cesura.ai/sim/4d091003-9abc-4700-8686-cb29c97fb88e');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/images/pinklogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

      <Text style={styles.heading}>Ready to Get What You Deserve?</Text>
      <Text style={styles.subheading}>
        Now that you know your target salary and conditions, it's time to practice how to ask for them.
      </Text>

      <Text style={styles.description}>
        Our AI-powered negotiation simulator helps you practice conversations with a virtual employer, improve your strategy, and build confidence — so when it's time to negotiate for real, you’ll be ready.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openSimulator}>
        <Ionicons name="rocket-outline" size={20} color="#ff7c8a" />
        <Text style={styles.buttonText}>Start Simulating</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
    logo: {
    width: 500,
    height: 250,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#041E42FF',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 1,
  },
  subheading: {
    fontSize: 22,
    color: '#041E42FF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#041E42FF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 25,
    marginTop: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#041E42FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ff7c8a',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 20,
  },
});
