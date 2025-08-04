import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function PerformanceMetrics() {
  const [responses, setResponses] = useState({});

  const updateResponse = (questionKey, value) => {
    setResponses(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const TextInputQuestion = ({ question, questionKey, placeholder }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={responses[questionKey] || ''}
        onChangeText={(text) => updateResponse(questionKey, text)}
        keyboardType="numeric"
      />
    </View>
  );

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>4 of 5 questions completed</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '80%' }]} />
      </View>
    </View>
  );

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      <TouchableOpacity style={[styles.sectionItem, styles.sectionCompleted]}>
        <Text style={styles.sectionCompletedText}>Hiring Practices</Text>
        <Text style={styles.sectionCompletedBadge}>✓</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.sectionItem, styles.sectionCompleted]}>
        <Text style={styles.sectionCompletedText}>Promotion & Advancement</Text>
        <Text style={styles.sectionCompletedBadge}>✓</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.sectionItem, styles.sectionCompleted]}>
        <Text style={styles.sectionCompletedText}>Pay Equity</Text>
        <Text style={styles.sectionCompletedBadge}>✓</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.sectionItem, styles.sectionActive]}>
        <Text style={styles.sectionActiveText}>Performance Metrics</Text>
        <Text style={styles.sectionBadge}>4</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionItem}>
        <Text style={styles.sectionText}>Additional Considerations</Text>
        <Text style={styles.sectionInactiveBadge}>5</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gender Equity Assessment</Text>
        <Text style={styles.headerSubtitle}>Evaluate your organization's practices across key areas of gender equity</Text>
        <ProgressBar />
      </View>

      <View style={styles.content}>
        {/* Sidebar Navigation */}
        <View style={styles.sidebar}>
          <SectionNav />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Performance Metrics</Text>
            <Text style={styles.contentSubtitle}>Quantitative data on women in your organization</Text>
          </View>

          <TextInputQuestion
            question="What percentage of women applied for positions in the last 12 months?"
            questionKey="women_applied_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of women were hired in the last 12 months?"
            questionKey="women_hired_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of promotions went to women in the last 12 months?"
            questionKey="women_promotions_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of salary raises went to women in the last 12 months?"
            questionKey="women_salary_raises_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <TextInputQuestion
            question="What percentage of your leadership team (manager level and above) are women?"
            questionKey="women_leadership_percentage"
            placeholder="Enter percentage (0-100)"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.prevButton}>
              <Text style={styles.prevButtonText}>Previous Section</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next Section</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#805ad5',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#f7fafc',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  sectionNav: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  sectionActive: {
    backgroundColor: '#805ad5',
  },
  sectionCompleted: {
    backgroundColor: '#d6f5d6',
  },
  sectionText: {
    fontSize: 14,
    color: '#4a5568',
    flex: 1,
  },
  sectionActiveText: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    fontWeight: '500',
  },
  sectionCompletedText: {
    fontSize: 14,
    color: '#2d7d2d',
    flex: 1,
    fontWeight: '500',
  },
  sectionBadge: {
    backgroundColor: 'white',
    color: '#805ad5',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionCompletedBadge: {
    backgroundColor: '#2d7d2d',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionInactiveBadge: {
    backgroundColor: '#e2e8f0',
    color: '#718096',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  contentHeader: {
    marginBottom: 24,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 8,
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f7fafc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  prevButton: {
    backgroundColor: '#e2e8f0',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  prevButtonText: {
    color: '#4a5568',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#805ad5',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})