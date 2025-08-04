import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function HiringPractices() {
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
      <Text style={styles.progressText}>1 of 5 questions completed</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '20%' }]} />
      </View>
    </View>
  );

  const SectionNav = () => (
    <View style={styles.sectionNav}>
      <Text style={styles.sectionTitle}>Sections</Text>
      <TouchableOpacity style={[styles.sectionItem, styles.sectionActive]}>
        <Text style={styles.sectionActiveText}>Hiring Practices</Text>
        <Text style={styles.sectionBadge}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionItem}>
        <Text style={styles.sectionText}>Promotion & Advancement</Text>
        <Text style={styles.sectionInactiveBadge}>2</Text>
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
            <Text style={styles.contentTitle}>Hiring Practices</Text>
            <Text style={styles.contentSubtitle}>Evaluate fairness and transparency in recruitment processes</Text>
          </View>

          <QuestionCard
            question="Do you track the gender breakdown of applicants at each hiring stage?"
            options={['Yes', 'Partially', 'No', 'Unsure']}
            questionKey="track_gender_breakdown"
          />

          <QuestionCard
            question="Are job descriptions audited for gender-biased language?"
            options={['Always', 'Sometimes', 'Rarely', 'Never']}
            questionKey="job_descriptions_audited"
          />

          <QuestionCard
            question="Do your interview panels include at least one woman?"
            options={['Always', 'Sometimes', 'Rarely', 'Never']}
            questionKey="interview_panels"
          />

          <QuestionCard
            question="Is diversity being a formal goal with KPIs?"
            options={['Yes', 'In Progress', 'No']}
            questionKey="diversity_formal_goal"
          />

          <QuestionCard
            question="Are ethnographies or entry roles explicitly offered to women?"
            options={['Yes', 'Planning To', 'No']}
            questionKey="ethnographies_offered"
          />

          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next Section</Text>
          </TouchableOpacity>
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
  sectionBadge: {
    backgroundColor: 'white',
    color: '#805ad5',
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
  nextButton: {
    backgroundColor: '#805ad5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})