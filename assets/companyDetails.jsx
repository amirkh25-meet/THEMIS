import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { databases, ID, Query } from './appwrite1';

const CompanyDetails = ({ }) => {
  const { companyId, companyName } = useLocalSearchParams();
    
  // Company state
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  
  // Review form state - FIXED STRUCTURE
  const [reviewForm, setReviewForm] = useState({
    review: '',
    jobTitle: '',
    createdAt: new Date().toISOString(),
    employmentStatus: 'current', // current, former
    yearsAtCompany: 0,
    department: '',
    isAnonymous: true,
    ratings: {
      overallRating: 0,
      salary: 0,
      workLifeBalance: 0,
      management: 0,
      workEnvironment: 0,
    },
  });
  
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchCompanyDetails();
    fetchReviews();
  }, [companyId]);

  const fetchCompanyDetails = async () => {
    try {
      const response = await databases.getDocument(
        '6865ac22001dc7cae30e', // Your database ID
        '68728d62000d8ccb61b7', // Companies collection ID
        companyId
      );
      setCompany(response);
    } catch (error) {
      console.error('Error fetching company details:', error);
      Alert.alert('Error', 'Failed to fetch company details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await databases.listDocuments(
        '6865ac22001dc7cae30e', // Your database ID
        '68728d6a0033035adb2e', // Reviews collection ID
        [
          Query.equal('companyId', companyId),
          Query.orderDesc('$createdAt'),
          Query.limit(50)
        ]
      );
      setReviews(response.documents);
      
      // Update company's average rating and total reviews
      if (response.documents.length > 0) {
        await updateCompanyStats(response.documents);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const updateCompanyStats = async (reviewsData) => {
    try {
      const totalReviews = reviewsData.length;
      const avgRating = reviewsData.reduce((sum, review) => sum + review.overallRating, 0) / totalReviews;
      
      await databases.updateDocument(
        '6865ac22001dc7cae30e', // Your database ID
        '68728d62000d8ccb61b7', // Companies collection ID
        companyId,
        {
          averageRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
          totalReviews: totalReviews
        }
      );
      
      // Update local state
      setCompany(prev => ({
        ...prev,
        averageRating: Math.round(avgRating * 10) / 10,
        totalReviews: totalReviews
      }));
    } catch (error) {
      console.error('Error updating company stats:', error);
    }
  };

  const handleAddReview = async () => {
    // FIXED VALIDATION - accessing ratings properly
    if (reviewForm.ratings.overallRating === 0) {
      Alert.alert('Error', 'Please provide an overall rating');
      return;
    }
    
    if (!reviewForm.jobTitle.trim()) {
      Alert.alert('Error', 'Please provide your job title');
      return;
    }

    setSubmittingReview(true);
    
    try {
      // FIXED REVIEW DATA - extracting ratings properly
      const reviewData = {
        companyId: companyId,
        companyName: companyName,
        overallRating: reviewForm.ratings.overallRating,
        workLifeBalance: reviewForm.ratings.workLifeBalance,
        management: reviewForm.ratings.management,
        workEnvironment: reviewForm.ratings.workEnvironment,
        salary: reviewForm.ratings.salary,
        review: reviewForm.review,
        jobTitle: reviewForm.jobTitle,
        employmentStatus: reviewForm.employmentStatus,
        yearsAtCompany: reviewForm.yearsAtCompany,
        department: reviewForm.department,
        isAnonymous: reviewForm.isAnonymous,
        createdAt: reviewForm.createdAt,
        // isVerified: false, // Can be updated later by admin
        // helpfulCount: 0,
        // reportCount: 0,
        isActive: true,
      };

      await databases.createDocument(
        '6865ac22001dc7cae30e', // Your database ID
        '68728d6a0033035adb2e', // Reviews collection ID
        ID.unique(),
        reviewData
      );
      console.log("Loaded: comapnyDetails");
      Alert.alert(
        'Success',
        'Your review has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowAddReviewModal(false);
              resetReviewForm();
              fetchReviews(); // Refresh reviews
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const resetReviewForm = () => {
    setReviewForm({
      review: '',
      jobTitle: '',
      employmentStatus: 'current',
      yearsAtCompany: 0,
      department: '',
      isAnonymous: true,
      ratings: {
        overallRating: 0,
        salary: 0,
        workLifeBalance: 0,
        management: 0,
        workEnvironment: 0,
      },
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchCompanyDetails(), fetchReviews()]);
    setRefreshing(false);
  };

  const renderStars = (rating, size = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={size} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half" size={size} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-border" size={size} color="#FFD700" />);
    }

    return stars;
  };

  const renderInteractiveStars = (rating, onPress, size = 24) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onPress(i)}>
          <Icon
            name={i <= rating ? "star" : "star-border"}
            size={size}
            color="#FFD700"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderRatingRow = (label, value, onPress) => (
    <View style={styles.ratingRow}>
      <Text style={styles.ratingLabel}>{label}:</Text>
      <View style={styles.starsContainer}>
        {renderInteractiveStars(value, onPress)}
      </View>
    </View>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>
            {item.isAnonymous ? 'Anonymous' : 'Verified Employee'}
          </Text>
          <Text style={styles.reviewerDetails}>
            {item.jobTitle} • {item.employmentStatus === 'current' ? 'Current' : 'Former'} Employee
            {item.yearsAtCompany && ` • ${item.yearsAtCompany}`}
          </Text>
        </View>
        <View style={styles.reviewRating}>
          <View style={styles.starsContainer}>
            {renderStars(item.overallRating)}
          </View>
          <Text style={styles.reviewDate}>
            {new Date(item.$createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Detailed Ratings */}
      <View style={styles.detailedRatings}>
        <View style={styles.ratingPair}>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingItemLabel}>Work-Life Balance</Text>
            <View style={styles.starsContainer}>
              {renderStars(item.workLifeBalance, 12)}
            </View>
          </View>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingItemLabel}>Salary</Text>
            <View style={styles.starsContainer}>
              {renderStars(item.salary, 12)}
            </View>
          </View>
        </View>
        <View style={styles.ratingPair}>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingItemLabel}>Work Environment</Text>
            <View style={styles.starsContainer}>
              {renderStars(item.workEnvironment, 12)}
            </View>
          </View>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingItemLabel}>Management</Text>
            <View style={styles.starsContainer}>
              {renderStars(item.management, 12)}
            </View>
          </View>
        </View>
      </View>

      {/* Review Content */}
      <View style={styles.reviewContent}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Review</Text>
          <Text style={styles.reviewText}>{item.review}</Text>
        </View>
      </View>

      {/* Review Actions */}
      <View style={styles.reviewActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="thumb-up" size={16} color="#666" />
          <Text style={styles.actionText}>Helpful ({item.helpfulCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="flag" size={16} color="#666" />
          <Text style={styles.actionText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddReviewModal = () => (
    <Modal
      visible={showAddReviewModal}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setShowAddReviewModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowAddReviewModal(false)}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add Review</Text>
          <TouchableOpacity
            onPress={handleAddReview}
            disabled={submittingReview}
          >
            <Text style={styles.saveButton}>
              {submittingReview ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Overall Rating - FIXED */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Overall Rating *</Text>
            <View style={styles.starsContainer}>
              {renderInteractiveStars(
                reviewForm.ratings.overallRating,
                (rating) => setReviewForm(prev => ({ 
                  ...prev, 
                  ratings: { ...prev.ratings, overallRating: rating }
                }))
              )}
            </View>
          </View>

          {/* Detailed Ratings - FIXED */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Detailed Ratings</Text>
            {renderRatingRow(
              'Work-Life Balance',
              reviewForm.ratings.workLifeBalance,
              (rating) => setReviewForm(prev => ({ 
                ...prev, 
                ratings: { ...prev.ratings, workLifeBalance: rating }
              }))
            )}
            {renderRatingRow(
              'Salary Rating',
              reviewForm.ratings.salary,
              (rating) => setReviewForm(prev => ({ 
                ...prev, 
                ratings: { ...prev.ratings, salary: rating }
              }))
            )}
            {renderRatingRow(
              'Management',
              reviewForm.ratings.management,
              (rating) => setReviewForm(prev => ({ 
                ...prev, 
                ratings: { ...prev.ratings, management: rating }
              }))
            )}
            {renderRatingRow(
              'Work Environment',
              reviewForm.ratings.workEnvironment,
              (rating) => setReviewForm(prev => ({ 
                ...prev, 
                ratings: { ...prev.ratings, workEnvironment: rating }
              }))
            )}
          </View>

          {/* Job Information */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Job Information</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Job Title *"
              value={reviewForm.jobTitle}
              onChangeText={(text) => setReviewForm(prev => ({ ...prev, jobTitle: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Department"
              value={reviewForm.department}
              onChangeText={(text) => setReviewForm(prev => ({ ...prev, department: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Years at Company"
              value={reviewForm.yearsAtCompany}
              onChangeText={(text) => setReviewForm(prev => ({ ...prev, yearsAtCompany: Number(text) || 0 }))}
            />
          </View>

          {/* Review Content */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Review Content</Text>
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What is it like to work here? *"
              value={reviewForm.review}
              onChangeText={(text) => setReviewForm(prev => ({ ...prev, review: text }))}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Employment Status */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Employment Status</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setReviewForm(prev => ({ ...prev, employmentStatus: 'current' }))}
              >
                <Icon
                  name={reviewForm.employmentStatus === 'current' ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={20}
                  color="#007AFF"
                />
                <Text style={styles.radioLabel}>Current Employee</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setReviewForm(prev => ({ ...prev, employmentStatus: 'former' }))}
              >
                <Icon
                  name={reviewForm.employmentStatus === 'former' ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={20}
                  color="#007AFF"
                />
                <Text style={styles.radioLabel}>Former Employee</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Anonymous Option */}
          <View style={styles.formSection}>
            <TouchableOpacity
              style={styles.checkboxOption}
              onPress={() => setReviewForm(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
            >
              <Icon
                name={reviewForm.isAnonymous ? 'check-box' : 'check-box-outline-blank'}
                size={20}
                color="#007AFF"
              />
              <Text style={styles.checkboxLabel}>Post anonymously</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading company details...</Text>
      </View>
    );
  }

  if (!company) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Company not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Company Header */}
        <View style={styles.companyHeader}>
          <Text style={styles.companyName}>{company.name}</Text>
          <View style={styles.companyMeta}>
            <Icon name="location-on" size={16} color="#666" />
            <Text style={styles.companyLocation}>{company.location}</Text>
          </View>
          <Text style={styles.companyIndustry}>{company.industry}</Text>
          
          {/* Overall Rating */}
          <View style={styles.overallRating}>
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingNumber}>{(company.averageRating || 0).toFixed(1)}</Text>
              <View style={styles.starsContainer}>
                {renderStars(company.averageRating || 0, 20)}
              </View>
              <Text style={styles.reviewCount}>({company.totalReviews || 0} reviews)</Text>
            </View>
          </View>

          {/* Company Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Gender Pay Gap</Text>
              <Text style={styles.statValue}>{company.genderPayGap}%</Text>
            </View>
          </View>

          {/* Company Description */}
          <Text style={styles.companyDescription}>{company.description}</Text>
        </View>

        {/* Add Review Button */}
        <TouchableOpacity
          style={styles.addReviewButton}
          onPress={() => setShowAddReviewModal(true)}
        >
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.addReviewText}>Add Review</Text>
        </TouchableOpacity>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          
          {reviewsLoading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : reviews.length === 0 ? (
            <View style={styles.noReviewsContainer}>
              <Icon name="rate-review" size={60} color="#ccc" />
              <Text style={styles.noReviewsText}>No reviews yet</Text>
              <Text style={styles.noReviewsSubtext}>Be the first to review this company</Text>
            </View>
          ) : (
            <FlatList
              data={reviews}
              renderItem={renderReviewItem}
              keyExtractor={(item) => item.$id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Add Review Modal */}
      {renderAddReviewModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  companyHeader: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  companyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyLocation: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  companyIndustry: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  overallRating: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  companyDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  addReviewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reviewsSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  noReviewsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noReviewsText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewerDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  reviewRating: {
    alignItems: 'flex-end',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  detailedRatings: {
    marginBottom: 16,
  },
  ratingPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  ratingItemLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  reviewContent: {
    marginBottom: 12,
  },
  reviewSection: {
    marginBottom: 12,
  },
  reviewSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 24,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});

export default CompanyDetails;