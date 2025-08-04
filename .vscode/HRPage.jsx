import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { databases, ID, Query, account } from '../assets/appwrite1';

export default function HRPage() {
  const [hrData, setHrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const DATABASE_ID = '6865ac22001dc7cae30e';
  const COLLECTION_ID = '688f5f0d0024b031dbae';

  // Fetch HR data from database
  const fetchHRData = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(10)
        ]
      );
      setHrData(response.documents);
      setError(null);
    } catch (err) {
      console.error('Error fetching HR data:', err);
      setError('Failed to load HR data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHRData();
  }, []);

  const handleCardPress = (hrPerson) => {
    console.log('HR Person selected:', hrPerson);
  };

  const handleContactPress = (hrPerson) => {
    const email = hrPerson.Email || '';
    const number = hrPerson.Number || '';
    
    let contactInfo = 'Contact Information:\n';
    if (email) contactInfo += `Email: ${email}\n`;
    if (number) contactInfo += `Phone: ${number}`;
    
    Alert.alert('Contact Details', contactInfo, [
      { text: 'OK', style: 'default' }
    ]);
  };

  const parseExpertiseAreas = (expertiseString) => {
    if (!expertiseString) return ['Pay Equity Analysis', 'Bias Training', 'Leadership Development'];
    
    // If it's already an array, return it
    if (Array.isArray(expertiseString)) return expertiseString;
    
    // If it's a string, try to parse it
    if (typeof expertiseString === 'string') {
      // Split by common separators
      return expertiseString.split(/[,;|]/).map(item => item.trim()).filter(item => item.length > 0);
    }
    
    return ['Pay Equity Analysis', 'Bias Training', 'Leadership Development'];
  };

  const parseCertifications = (certificationsString) => {
    if (!certificationsString) return ['SHRM-SCP', 'Certified Pay Equity Professional', 'Unconscious Bias Trainer'];
    
    // If it's already an array, return it
    if (Array.isArray(certificationsString)) return certificationsString;
    
    // If it's a string, try to parse it
    if (typeof certificationsString === 'string') {
      // Split by common separators
      return certificationsString.split(/[,;|]/).map(item => item.trim()).filter(item => item.length > 0);
    }
    
    return ['SHRM-SCP', 'Certified Pay Equity Professional', 'Unconscious Bias Trainer'];
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingValue = rating || 0;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    const remainingStars = 5 - Math.ceil(ratingValue);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Loading HR consultants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchHRData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>HR Experts & Consultants</Text>
        <Text style={styles.headerSubtitle}>
          Connect with certified professionals who can help your company improve gender equity
        </Text>
      </View>

      {hrData.map((hrPerson, index) => (
        <TouchableOpacity 
          key={hrPerson.$id || index}
          style={styles.card} 
          onPress={() => handleCardPress(hrPerson)} 
          activeOpacity={0.8}
        >
          {/* Profile Image */}
          <View style={styles.profileSection}>
            {hrPerson.profileImage ? (
              <Image 
                source={{ uri: hrPerson.profileImage }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={40} color="#9CA3AF" />
              </View>
            )}
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            {/* Name */}
            <Text style={styles.name}>
              {hrPerson.Name || 'Sarah Chen'}
            </Text>

            {/* Title - Extract from Bio or use default */}
            <Text style={styles.title}>
              Senior HR Director & Equity Consultant
            </Text>

            {/* Company */}
            <Text style={styles.company}>
              Global Equity Solutions
            </Text>

            {/* Rating and Reviews */}
            <View style={styles.ratingSection}>
              <View style={styles.starsContainer}>
                {renderStars(0)}
              </View>
              <Text style={styles.ratingText}>
                0 (0 reviews)
              </Text>
            </View>

            {/* Bio/Description */}
            <Text style={styles.description}>
              {hrPerson.Bio || '15+ years experience helping organizations build equitable workplaces. Specialized in data-driven equity assessments and cultural transformation.'}
            </Text>

            {/* Expertise Areas */}
            <View style={styles.expertiseSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="people" size={16} color="#374151" />
                <Text style={styles.sectionTitle}>Expertise Areas</Text>
              </View>
              <View style={styles.expertiseContainer}>
                {parseExpertiseAreas(hrPerson.Expertise_Areas).map((skill, skillIndex) => (
                  <View key={skillIndex} style={styles.expertiseTag}>
                    <Text style={styles.expertiseText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Certifications */}
            <View style={styles.certificationsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="ribbon" size={16} color="#374151" />
                <Text style={styles.sectionTitle}>Certifications</Text>
              </View>
              <View style={styles.certificationsContainer}>
                {parseCertifications(hrPerson.Certifications).map((cert, certIndex) => (
                  <View key={certIndex} style={styles.certificationTag}>
                    <Text style={styles.certificationText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Contact Button */}
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleContactPress(hrPerson)}
            >
              <Ionicons name="mail" size={20} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  headerSection: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: 4,
    textAlign: 'center',
  },
  company: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#374151',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  expertiseSection: {
    marginBottom: 20,
  },
  certificationsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expertiseTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  expertiseText: {
    fontSize: 12,
    color: '#3730A3',
    fontWeight: '500',
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  certificationTag: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  certificationText: {
    fontSize: 12,
    color: '#166534',
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});