import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function Strategy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gender Equity Strategy</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Hiring Practices</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Ensure fair, inclusive, and transparent recruitment processes.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Audit job descriptions for biased language and unnecessary requirements (e.g., “aggressive,” “rockstar,” or excessive years of experience).</Text>
        <Text style={styles.bullet}>• Commit to diverse interview panels (include at least one woman or underrepresented group member).</Text>
        <Text style={styles.bullet}>• Standardize interview questions to ensure candidates are assessed equally.</Text>
        <Text style={styles.bullet}>• Track applicant demographics to identify drop-off points or bias in the pipeline.</Text>
        <Text style={styles.bullet}>• Post openings on inclusive platforms that reach diverse talent pools.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Promotion & Advancement</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Provide equal opportunities for career growth and leadership development.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Implement transparent promotion criteria and communicate them clearly to all employees.</Text>
        <Text style={styles.bullet}>• Track promotion rates by gender to spot gaps and address them.</Text>
        <Text style={styles.bullet}>• Create mentorship or sponsorship programs that support women’s advancement.</Text>
        <Text style={styles.bullet}>• Encourage internal mobility by openly advertising roles to current employees.</Text>
        <Text style={styles.bullet}>• Offer leadership training programs targeted at high-potential women.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Pay Equity</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Eliminate unjustified pay gaps and build a fair compensation system.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Conduct a pay audit comparing salaries by role, gender, and tenure.</Text>
        <Text style={styles.bullet}>• Correct unjustified disparities immediately and transparently.</Text>
        <Text style={styles.bullet}>• Establish clear pay bands and make them accessible to employees.</Text>
        <Text style={styles.bullet}>• Ban asking for salary history in the hiring process.</Text>
        <Text style={styles.bullet}>• Commit to regular reviews of pay practices and adjustments.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Performance Metrics</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Use data to understand and improve gender equity outcomes.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Track key metrics like % of women in leadership, turnover by gender, and engagement survey results.</Text>
        <Text style={styles.bullet}>• Set internal goals (e.g., “30% women in leadership by 2026”) and track progress.</Text>
        <Text style={styles.bullet}>• Break down data by department to identify weak spots.</Text>
        <Text style={styles.bullet}>• Share selected results transparently with staff to build trust and accountability.</Text>
        <Text style={styles.bullet}>• Use metrics to guide decisions — don’t just collect them.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Culture & Support Systems</Text>
        <Text style={styles.goal}>Goal:</Text>
        <Text style={styles.text}>Create a workplace culture that supports and retains women.</Text>
        <Text style={styles.subTitle}>Steps to Improve:</Text>
        <Text style={styles.bullet}>• Establish and enforce zero-tolerance policies on harassment and discrimination.</Text>
        <Text style={styles.bullet}>• Provide flexible work options like hybrid schedules and parental leave.</Text>
        <Text style={styles.bullet}>• Create employee resource groups (ERGs) or women’s networks.</Text>
        <Text style={styles.bullet}>• Offer unconscious bias training for managers and hiring teams.</Text>
        <Text style={styles.bullet}>• Regularly survey employees about inclusion and respond to feedback.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEBFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#021F54',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3A59',
    marginBottom: 8,
  },
  goal: {
    fontWeight: '600',
    color: '#374259',
  },
  subTitle: {
    marginTop: 8,
    fontWeight: '600',
    color: '#374259',
    marginBottom: 4,
  },
  text: {
    marginBottom: 8,
    color: '#333',
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 6,
    color: '#333',
  },
})
