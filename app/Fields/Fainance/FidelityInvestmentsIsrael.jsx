import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../../LanguageContext';
export default function FidelityInvestmentsIsrael() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
const {if2,useIf2} = useLanguage(); 
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
        <View style={styles.headerSection}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="bank" size={40} color="#fff" />
          </View>
          <Text style={styles.companyName}>Fidelity Investments Israel</Text>
          <View style={styles.tagsRow}>
            <View style={styles.tag}><Ionicons name="location" size={14} color="#2563eb" /><Text style={styles.tagText}>Jerusalem</Text></View>
            <View style={styles.tag}><MaterialCommunityIcons name="briefcase" size={14} color="#2563eb" /><Text style={styles.tagText}>Investment Management</Text></View>
          </View>
        </View>
        <View style={styles.badgesRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>Women Returners</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>Mentorship</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>Work-Life Balance</Text></View>
        </View>
        <Text style={styles.sectionTitle}>Mission & Culture</Text>
        <Text style={styles.description}>
          Fidelity Investments Israel is known for its inclusive approach and dedication to empowering women in the workplace. The company provides structured pathways for women returning to work, along with leadership programs, peer mentoring, and personal development resources. Fidelity encourages work-life balance and offers flexibility to support women in both their careers and personal journeys. Its culture promotes collaboration, innovation, and continuous learning—making it an excellent environment for women who seek professional fulfillment in a supportive and forward-thinking workplace.
        </Text>
        <Text style={styles.sectionTitle}>Why Work Here?</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletPoint}>• Structured return-to-work programs for women</Text>
          <Text style={styles.bulletPoint}>• Leadership and peer mentoring opportunities</Text>
          <Text style={styles.bulletPoint}>• Flexible work arrangements and strong work-life balance</Text>
          <Text style={styles.bulletPoint}>• Culture of innovation and continuous learning</Text>
          <Text style={styles.bulletPoint}>• Supportive, inclusive, and collaborative environment</Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#2563eb',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  iconCircle: {
    backgroundColor: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
    backgroundColor: '#2563eb', // fallback for React Native
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  companyName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginHorizontal: 4,
  },
  tagText: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 18,
    gap: 8,
  },
  badge: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    marginBottom: 6,
  },
  badgeText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
    marginTop: 12,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'justify',
  },
  bulletList: {
    marginTop: 2,
    marginBottom: 8,
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 4,
    lineHeight: 22,
  },topRightContainer: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 999,
  alignItems: 'flex-end',
},

menuIcon: {
  fontSize: 24,
  padding: 5,
},

languageMenu: {
  backgroundColor: '#fff',
  borderRadius: 6,
  padding: 8,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

menuItem: {
  paddingVertical: 6,
  paddingHorizontal: 10,
  fontSize: 16,
},
});
