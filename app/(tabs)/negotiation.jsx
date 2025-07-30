import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NegotiationSimulatorPage() {
  const openSimulator = () => {
    Linking.openURL('https://app.cesura.ai/sim/dd070bcd-9b2c-48e3-90ca-21fa7f4501db');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://app.cesura.ai/sim/dd070bcd-9b2c-48e3-90ca-21fa7f4501db' }}
        style={styles.image}
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
        <Ionicons name="rocket-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Start Simulating</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
  },
});
