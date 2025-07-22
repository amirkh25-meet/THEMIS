import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { databases, Query } from './appwrite1';

const { width } = Dimensions.get('window');

// Function 1: Generate 5 random numbers between 1 and your max StatisticID
function generateRandomStatIds(maxId = 100) {
  const randomIds = [];
  const usedIds = new Set();
  
  while (randomIds.length < 5) {
    const randomId = Math.floor(Math.random() * maxId) + 1;
    if (!usedIds.has(randomId)) {
      randomIds.push(randomId);
      usedIds.add(randomId);
    }
  }
  
  return randomIds;
}

// Function 2: Fetch stats by IDs from Appwrite
async function fetchStatsByIds(ids) {
  try {
    // Create queries for each ID
    const queries = ids.map(id => Query.equal('StatisticID', id));
    
    // Fetch documents from Appwrite
    const response = await databases.listDocuments(
      "6865ac22001dc7cae30e",
      "6876917a00217db5ad7f",
      [Query.or(queries)]
    );
    
    return response.documents;
  } catch (error) {
    console.error('Error fetching statistics from Appwrite:', error);
    throw error;
  }
}

// Function 3: Carousel component to display stats
function StatisticsCarousel() {
  const [stats, setStats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load random stats when component mounts
  useEffect(() => {
    loadRandomStats();
  }, []);

  const loadRandomStats = async () => {
    setLoading(true);
    setError(null);
    try {
      // You might want to fetch the max StatisticID first
      // const maxIdResponse = await databases.listDocuments(
      //   "6865ac22001dc7cae30e",
      //   "6876917a00217db5ad7f",
      //   [Query.orderDesc('StatisticID'), Query.limit(1)]
      // );
      // const maxId = maxIdResponse.documents[0]?.StatisticID || 100;
      
      const randomIds = generateRandomStatIds(100); // Replace 100 with your actual max ID
      const fetchedStats = await fetchStatsByIds(randomIds);
      
      if (fetchedStats.length === 0) {
        setError('No statistics found for the selected IDs');
      } else {
        setStats(fetchedStats);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      setError('Failed to load statistics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stats.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
  };

  const showAlert = (message) => {
    Alert.alert('Statistics Carousel', message);
  };

  const openLink = (url) => {
    Alert.alert(
      'Open Link',
      'Do you want to open this link in your web browser?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open',
          onPress: () => {
            Linking.openURL(url).catch(err => {
              Alert.alert('Error', 'Failed to open link. Please try again.');
              console.error('Failed to open URL:', err);
            });
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading statistics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadRandomStats}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (stats.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No statistics available</Text>
        <TouchableOpacity
          style={styles.loadButton}
          onPress={loadRandomStats}
        >
          <Text style={styles.loadButtonText}>Load Statistics</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentStat = stats[currentIndex];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Statistics Carousel</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={loadRandomStats}
          >
            <Text style={styles.refreshButtonText}>Load New Stats</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          {/* Navigation Buttons */}
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={prevSlide}
          >
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={nextSlide}
          >
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>

          {/* Stat Card */}
          <View style={styles.statCard}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{currentStat.category}</Text>
            </View>
            
            <Text style={styles.description}>{currentStat.description}</Text>
            
            <Text style={styles.value}>
              {currentStat.Value?.toLocaleString() || 'N/A'}
            </Text>
            
            <Text style={styles.unit}>{currentStat.Unit}</Text>
            
            <View style={styles.metaInfo}>
              <Text style={styles.metaText}>📅 {currentStat.Year}</Text>
              <Text style={styles.metaText}>📊 {currentStat.Source}</Text>
              {currentStat.Link && (
                <TouchableOpacity
                  onPress={() => openLink(currentStat.Link)}
                >
                  <Text style={styles.linkText}>🔗 View Data</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Indicators */}
          <View style={styles.indicators}>
            {stats.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator
                ]}
                onPress={() => setCurrentIndex(index)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Stats Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Showing {currentIndex + 1} of {stats.length} statistics
        </Text>
        <Text style={styles.idText}>
          Statistic ID: {currentStat.StatisticID}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    backgroundColor: '#3B82F6',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  carouselContainer: {
    position: 'relative',
    minHeight: 350,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  prevButton: {
    left: 16,
    marginTop: -20,
  },
  nextButton: {
    right: 16,
    marginTop: -20,
  },
  navButtonText: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  statCard: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  categoryText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
  },
  unit: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 24,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 14,
  },
  linkText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 20,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },
  activeIndicator: {
    backgroundColor: '#3B82F6',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  infoText: {
    color: '#6B7280',
    fontSize: 16,
  },
  idText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 20,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 16,
    marginBottom: 16,
  },
  loadButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default StatisticsCarousel;