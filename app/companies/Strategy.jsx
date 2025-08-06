import { StyleSheet, Text, View, ScrollView,TextInput, Button } from 'react-native'
import React, { use } from 'react'
import { useState } from 'react' 


export default function Strategy() {
  const [a,setA] = useState(0)
  const [b,setB] = useState(0)
  const [c,setC] = useState(0)
  const [d,setD] = useState(0)
  const [e,setE] = useState(0)
  const [if1,setIf1] = useState(0)
  
  if(if1===0)
    {
return (
    <View style={styles.container}>
      
      <TextInput
      value={a}
      onChangeText={text => setA(text)}
      placeholder="enter your HiringPractices rate"
      style={styles.input}/>

      <TextInput
      value={b}
      onChangeText={text => setB(text)}
      placeholder="enter your PromotionAdvancement rate"
      style={styles.input}/>

      <TextInput
      value={c}
      onChangeText={text => setC(text)}
      placeholder="enter your PayEquity rate"
      style={styles.input}/>

      <TextInput
      value={d}
      onChangeText={text => setD(text)}
      placeholder="enter your PerformanceMetrics rate"
      style={styles.input}/>

      <TextInput
      value={e}
      onChangeText={text => setE(text)}
      placeholder="enter your AdditionalConsiderations rate"
      style={styles.input}/>

      <Button title="Submit"
      onPress={() => {setIf1(1)}}
      style={styles.button}/>
      </View>
)
  }
  
  if(if1===1)
  {return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gender Equity Strategy</Text>
    {a < 80 ? (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>1. Hiring Practices</Text>
    <Text style={styles.goal}>Goal:</Text>
    <Text style={styles.text}>
      Ensure fair, inclusive, and transparent recruitment processes.
    </Text>
    <Text style={styles.subTitle}>Steps to Improve:</Text>
    <Text style={styles.bullet}>• Audit job descriptions for biased language and unnecessary requirements.</Text>
    <Text style={styles.bullet}>• Commit to diverse interview panels.</Text>
    <Text style={styles.bullet}>• Standardize interview questions.</Text>
    <Text style={styles.bullet}>• Track applicant demographics.</Text>
    <Text style={styles.bullet}>• Post openings on inclusive platforms.</Text>
  </View>
) : null}
      {b < 80 ? (

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
      </View>) : null}

      {c < 80 ? (
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
      </View>) : null}


      {d < 80 ? (
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
      </View>) : null}


      {e < 80 ? (
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
      </View>) : null}
    </ScrollView>
  )
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEBFF',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#021F54',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 10,
  },
  goal: {
    fontWeight: '600',
    color: '#374259',
    marginBottom: 4,
  },
  subTitle: {
    marginTop: 8,
    fontWeight: '600',
    color: '#374259',
    marginBottom: 6,
  },
  text: {
    marginBottom: 8,
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 6,
    color: '#333',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#021F54',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
