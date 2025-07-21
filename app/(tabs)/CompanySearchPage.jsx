import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Image,
  Alert,
  Modal
} from 'react-native';
import { databases, Query, ID } from '../appwrite1'; // Make sure this exports Query correctly
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { router } from 'expo-router';


const CompanySearchPage = ({  }) => {

  // State for companies
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [verifyingCompany, setVerifyingCompany] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Company verification modal state
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [suggestedCompany, setSuggestedCompany] = useState(null);
  const [originalSearchQuery, setOriginalSearchQuery] = useState('');

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI('AIzaSyC0PXqbS3CKmZsao10M2g2YaOnQVjl41kQ'); // Replace with your actual API key

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for 500ms after user stops typing
    const timeout = setTimeout(() => {
      filterCompanies();
    }, 1000);

    setSearchTimeout(timeout);

    // Cleanup timeout on component unmount or when searchQuery changes
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [companies, searchQuery]);

  const fetchCompanies = async () => {
    try {
      // Check if Query is properly imported
      if (!Query) {
        throw new Error('Query object is not properly imported from Appwrite');
      }

      const response = await databases.listDocuments(
        '6865ac22001dc7cae30e', // Replace with your actual database ID
        '68728d62000d8ccb61b7',
        [
          Query.equal('isActive', true),
          Query.orderDesc('averageRating'),
          Query.limit(100)
        ]
      );
      setCompanies(response.documents);
    } catch (error) {
      console.error('Error fetching companies:', error);
      Alert.alert('Error', `Failed to fetch companies: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkSimilarCompanyExists = async (companyName) => {
    try {
      if (!Query) {
        console.error('Query object is not properly imported from Appwrite');
        return false;
      }

      const searchTerm = companyName.toLowerCase().trim();
      
      // Check for companies with similar names (contains search term)
      const response = await databases.listDocuments(
        '6865ac22001dc7cae30e', // Replace with your actual database ID
        '68728d62000d8ccb61b7',
        [
          Query.equal('isActive', true),
          Query.limit(100) // Get more results to check similarity
        ]
      );
      
      // Check if any existing company name is similar to the search term
      const similarCompany = response.documents.find(company => {
        const companyNameLower = company.name.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        
        // Check if names are very similar (contains each other or similar)
        return companyNameLower.includes(searchTermLower) || 
               searchTermLower.includes(companyNameLower) ||
               calculateSimilarity(companyNameLower, searchTermLower) > 0.8;
      });
      
      return similarCompany ? true : false;
    } catch (error) {
      console.error('Error checking similar company existence:', error);
      return false;
    }
  };

  const calculateSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const getEditDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Function to check if a company with the exact name exists
  const checkCompanyExists = async (companyName) => {
    try {
      // Check if Query is properly imported
      if (!Query) {
        console.error('Query object is not properly imported from Appwrite');
        return null;
      }

      const response = await databases.listDocuments(
        '6865ac22001dc7cae30e', // Replace with your actual database ID
        '68728d62000d8ccb61b7',
        [
          Query.equal('name', companyName),
          Query.equal('isActive', true)
        ]
      );
      
      return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
      console.error('Error checking company existence:', error);
      return null;
    }
  };

  const handleCompanyNotFound = async () => {
    if (!searchQuery.trim()) return;
    
    setVerifyingCompany(true);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `Verify whether the company "${searchQuery}" exists in Israel/the West Bank and if it does return the name, location, industry, gender pay gap (if found) and detailed 3 line description of company. 

IMPORTANT: Your response must be ONLY a valid JSON object with no additional text, no markdown formatting, no backticks, and no code blocks. Just the raw JSON.

Format requirements:
- exists: boolean (true/false)
- name: string (company name)
- location: string (city, Israel)
- industry: string (industry name)
- genderPayGap: integer (0-100, just the number without % symbol)
- description: string (3 line detailed description)

Format:
{
  "exists": true,
  "name": "company name",
  "location": "city, Israel",
  "industry": "industry name",
  "genderPayGap": 0,
  "description": "3 line detailed description of the company"
}

If the company doesn't exist in Israel, return only: {"exists": false}

CRITICAL: genderPayGap must be an integer between 0-100 (no % symbol, no quotes around the number).`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Clean the response by removing any markdown formatting
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Additional cleanup for common formatting issues
      text = text.replace(/^[^{]*({.*})[^}]*$/s, '$1');
      
      console.log('Cleaned Gemini response:', text);
      
      try {
        // Parse the JSON response
        const companyData = JSON.parse(text);
        
        // Validate and transform the data
        if (companyData.exists) {
          // Ensure genderPayGap is always an integer
          if (companyData.genderPayGap !== undefined && companyData.genderPayGap !== null) {
            // Remove % symbol if present and convert to integer
            const payGapValue = companyData.genderPayGap.toString().replace('%', '');
            companyData.genderPayGap = parseInt(payGapValue, 10) || 0;
          } else {
            companyData.genderPayGap = 0;
          }
          
          // Validate other required fields
          companyData.name = companyData.name || 'Unknown Company';
          companyData.location = companyData.location || 'Unknown Location';
          companyData.industry = companyData.industry || 'Unknown Industry';
          companyData.description = companyData.description || 'No description available';
          
          console.log('Processed company data:', companyData);
        }
        
        if (companyData.exists) {
          // Show verification modal instead of directly adding
          setOriginalSearchQuery(searchQuery);
          setSuggestedCompany(companyData);
          setShowVerificationModal(true);
        } else {
          Alert.alert(
            'Company Not Found',
            'The company could not be verified as existing in Israel.',
            [{ text: 'OK' }]
          );
        }
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        console.error('Raw response that failed to parse:', text);
        throw new SyntaxError('Failed to parse AI response as JSON');
      }
    } catch (error) {
      console.error('Error verifying company with Gemini:', error);
      
      let errorMessage = 'Failed to verify company. Please try again later.';
      if (error instanceof SyntaxError) {
        errorMessage = 'Received invalid response from AI service. Please try again.';
      }
      
      Alert.alert(
        'Verification Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setVerifyingCompany(false);
    }
  };

  const handleConfirmAddCompany = async () => {
    if (!suggestedCompany) return;
    
    try {
      await createCompanyDocument(suggestedCompany);
      setShowVerificationModal(false);
      setSuggestedCompany(null);
      setOriginalSearchQuery('');
      
      Alert.alert(
        'Company Added Successfully',
        `${suggestedCompany.name} has been added to the database.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Refresh the companies list
              fetchCompanies();
              setSearchQuery('');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error adding company:', error);
      Alert.alert(
        'Error',
        'Failed to add company to database. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleCancelAddCompany = () => {
    setShowVerificationModal(false);
    setSuggestedCompany(null);
    setOriginalSearchQuery('');
  };

  const createCompanyDocument = async (companyData) => {
    try {
      const documentId = ID.unique();
      const newCompany = {
        // companyId: ID.unique(),
        name: companyData.name,
        location: companyData.location,
        industry: companyData.industry,
        description: companyData.description,
        genderPayGap: companyData.genderPayGap,
        averageRating: 0,
        // totalReviews: 0,
        // isActive: true,
        // createdAt: new Date().toISOString(),
        // size: 'unknown', // Default value, can be updated later
        // logoUrl: null // Can be updated later
      };

      await databases.createDocument(
        '6865ac22001dc7cae30e', // Replace with your actual database ID
        '68728d62000d8ccb61b7', // Replace with your actual collection ID
        documentId,
        newCompany
      );

      console.log('Company created successfully:', newCompany);
    } catch (error) {
      console.error('Error creating company document:', error);
      throw error;
    }
  };

  const filterCompanies = async () => {
    if (searchQuery.trim() === '') {
      setFilteredCompanies(companies);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // First check if exact company name exists in database
    const exactMatch = await checkCompanyExists(searchQuery);
    if (exactMatch) {
      setFilteredCompanies([exactMatch]);
      return;
    }

    // If no exact match, do the regular filtering
    let filtered = companies.filter(company => {
      const nameMatch = company.name.toLowerCase().includes(query);
      const locationMatch = company.location.toLowerCase().includes(query);
      const industryMatch = company.industry.toLowerCase().includes(query);
      
      // Modified logic: Return true if ANY of the fields match (not ALL)
      return nameMatch || locationMatch || industryMatch;
    });

    setFilteredCompanies(filtered);

    // Only call handleCompanyNotFound if no results after filtering AND user has stopped typing
    if (filtered.length === 0 && searchQuery.trim().length > 2) {
      // Additional check: verify company doesn't exist with similar name variations
      const similarNameExists = await checkSimilarCompanyExists(searchQuery);
      if (!similarNameExists) {
        handleCompanyNotFound();
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCompanies();
    setRefreshing(false);
  };

  const handleCompanyPress = (company) => {
    router.push({
      pathname: '/companyDetails',
      params: { 
        companyId: company.companyId || company.$id,
        companyName: company.name 
      }
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars - Fixed key prop issue
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={16} color="#FFD700" />);
    }

    // Half star - Fixed key prop issue
    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half" size={16} color="#FFD700" />);
    }

    // Empty stars - Fixed key prop issue
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-border" size={16} color="#FFD700" />);
    }

    return stars;
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search companies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={filterCompanies}
        placeholderTextColor="#999"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
          <Icon name="clear" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderCompanyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.companyCard}
      onPress={() => handleCompanyPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.companyHeader}>
        <View style={styles.companyInfo}>
          {item.logoUrl && (
            <Image source={{ uri: item.logoUrl }} style={styles.companyLogo} />
          )}
          <View style={styles.companyDetails}>
            <Text style={styles.companyName}>{item.name}</Text>
            <View style={styles.companyMeta}>
              <Icon name="location-on" size={14} color="#666" />
              <Text style={styles.companyLocation}>{item.location}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.companySize}>{item.size}</Text>
            </View>
            <Text style={styles.companyIndustry}>{item.industry}</Text>
          </View>
        </View>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(item.averageRating || 0)}
          </View>
          <Text style={styles.ratingText}>{(item.averageRating || 0).toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({item.totalReviews || 0} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderVerificationModal = () => (
    <Modal
      visible={showVerificationModal}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancelAddCompany}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Company Found</Text>
            <TouchableOpacity onPress={handleCancelAddCompany} style={styles.closeButton}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalSubtitle}>
            You searched for: "{originalSearchQuery}"
          </Text>
          
          {suggestedCompany && (
            <View style={styles.companyPreview}>
              <Text style={styles.previewTitle}>We found this company:</Text>
              
              <View style={styles.previewCard}>
                <Text style={styles.previewCompanyName}>{suggestedCompany.name}</Text>
                
                <View style={styles.previewRow}>
                  <Icon name="location-on" size={16} color="#666" />
                  <Text style={styles.previewText}>{suggestedCompany.location}</Text>
                </View>
                
                <View style={styles.previewRow}>
                  <Icon name="business" size={16} color="#666" />
                  <Text style={styles.previewText}>{suggestedCompany.industry}</Text>
                </View>
                
                <View style={styles.previewRow}>
                  <Icon name="trending-up" size={16} color="#666" />
                  <Text style={styles.previewText}>
                    Gender Pay Gap: {suggestedCompany.genderPayGap}%
                  </Text>
                </View>
                
                {/* <Text style={styles.previewDescription}>
                  {suggestedCompany.description}
                </Text> */}
              </View>
            </View>
          )}
          
          <Text style={styles.confirmationText}>
            Is this the company you were looking for?
          </Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCancelAddCompany}
            >
              <Text style={styles.cancelButtonText}>No, Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleConfirmAddCompany}
            >
              <Text style={styles.confirmButtonText}>Yes, Add Company</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading companies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      {renderSearchBar()}

      {/* Verification Loading */}
      {verifyingCompany && (
        <View style={styles.verificationContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.verificationText}>Verifying company...</Text>
        </View>
      )}

      {/* Results Count */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          {filteredCompanies.length} companies found
        </Text>
      </View>

      {/* Companies List - Fixed keyExtractor */}
      <FlatList
        data={filteredCompanies}
        renderItem={renderCompanyItem}
        keyExtractor={(item, index) => item.companyId || item.$id || `company-${index}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="business" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No companies found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        }
      />

      {/* Verification Modal */}
      {renderVerificationModal()}
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
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  verificationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  resultsRow: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  companyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  companyHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  companyInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  companyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  companyLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  separator: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  companySize: {
    fontSize: 14,
    color: '#666',
  },
  companyIndustry: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  companyPreview: {
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  previewCompanyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  previewDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 12,
    lineHeight: 20,
  },
  confirmationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default CompanySearchPage;