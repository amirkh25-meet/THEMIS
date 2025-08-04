import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CompaniesIndex() {
  const router = useRouter();

  const navigateTo = (path) => router.push(`/companies/${path}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Professional Gender Equity Assessment</Text>
      </View>

      {/* Hero Title */}
      <Text style={styles.title}>
        Build a More <Text style={styles.highlight}>Equitable Workplace</Text>
      </Text>

      {/* Subtext */}
      <Text style={styles.description}>
        Comprehensive assessment tool to evaluate your organization's gender equity practices across hiring, promotions, pay equity, and workplace culture.
        Get actionable insights and connect with industry peers.
      </Text>

      {/* Reports & Settings Buttons */}
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('GenderEquityAssessmentApp')}>
          <Ionicons name="bar-chart-outline" style={styles.menuIcon} />
          <Text style={styles.menuText}>Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('settings')}>
          <Ionicons name="people-outline" style={styles.menuIcon} />
          <Text style={styles.menuText}>Consultation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAF9FC',
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#7E57C2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 12,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    color: '#7E57C2',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 360,
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  menuItem: {
    backgroundColor: '#fff',
    width: '47%',
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#AAA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  menuIcon: {
    fontSize: 36,
    color: '#7E57C2',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
