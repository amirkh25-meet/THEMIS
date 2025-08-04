import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function PromotionAdvancement() {
  const [responses, setResponses] = useState({});

  const updateResponse = (questionKey, value) => {
    setResponses(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const QuestionCard = ({ question, options, questionKey }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option) => (
        <RadioButton
          key={option}
          selected={responses[questionKey] === option}
          onPress={() => updateResponse(questionKey, option)}
          label={option}
        />
      ))}
    </View>
  );

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>2 of 5 questions completed</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '40%' }]} />
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
      <TouchableOpacity style={[styles.sectionItem, styles.sectionActive]}>
        <Text style={styles.sectionActiveText}>Promotion & Advancement</Text>
        <Text style={styles.sectionBadge}>2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionItem}>
        <Text style={styles.sectionText}>Pay Equity</Text>
        <Text style={styles.sectionInactiveBadge}>3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionItem}>
        <Text style={styles.sectionText}>Performance Metrics</Text>
        <Text style={styles.sectionInactiveBadge}>4</Text>
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
            <Text style={styles.contentTitle}>Promotion & Advancement</Text>
            <Text style={styles.contentSubtitle}>Assess equity in career advancement opportunities</Text>
          </View>

          <QuestionCard
            question="Is promotion data broken down by gender and analyzed regularly?"
            options={['Yes', 'Sometimes', 'No', 'Unsure']}
            questionKey="promotion_data_analyzed"
          />

          <QuestionCard
            question="Are women equally represented in leadership development programs?"
            options={['Yes', 'Somewhat', 'No']}
            questionKey="leadership_development"
          />

          <QuestionCard
            question="Is there a formal mentoring or sponsorship program for women employees?"
            options={['Yes', 'Informal', 'No']}
            questionKey="mentoring_program"
          />

          <QuestionCard
            question="Are promotion criteria transparent and standardized across roles?"
            options={['Yes', 'Partially', 'No']}
            questionKey="promotion_criteria"
          />

          <QuestionCard
            question="Have women reported feeling overlooked or settled in internal reviews?"
            options={['Yes', 'Occasionally', 'Rarely', 'Never']}
            questionKey="women_overlooked"
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#805ad5',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#805ad5',
  },
  radioLabel: {
    fontSize: 14,
    color: '#4a5568',
    flex: 1,
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