import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  ChevronLeft, BookOpen, User, GraduationCap, Briefcase, Award,
  Settings, ArrowRight, CheckCircle, FileText
} from 'lucide-react-native';

const ResumeGuideApp = () => {
  const [currentStep, setCurrentStep] = useState(null);

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#f9fafb'
    },
    header: {
      backgroundColor: '#3b82f6',
      paddingHorizontal: 24,
      paddingVertical: 32,
      paddingTop: 48
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 8
    },
    headerSubtitle: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)'
    },
    stepsList: {
      padding: 16,
      paddingBottom: 32
    },
    stepCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#f3f4f6'
    },
    stepCardContent: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    stepIcon: {
      width: 48,
      height: 48,
      backgroundColor: '#8b5cf6',
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16
    },
    stepInfo: {
      flex: 1
    },
    stepNumber: {
      fontSize: 12,
      fontWeight: '500',
      color: '#6b7280',
      marginBottom: 4
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#111827',
      marginBottom: 4
    },
    stepPreview: {
      fontSize: 14,
      color: '#6b7280',
      lineHeight: 20
    }
  };

  const steps = [
    {
      id: 1,
      title: "Choose a CV Format",
      icon: <FileText color="white" size={24} />,
      preview: "Select between reverse-chronological and functional formats",
      content: {
        title: "Choose a CV Format",
        description: "Reverse-chronological: Work experience and education from most recent to oldest.\n\nFunctional: Focuses on skills more than job history (useful if you have gaps)."
      }
    },
    {
      id: 2,
      title: "Add Contact Information",
      icon: <User color="white" size={24} />,
      preview: "Essential contact details and professional links",
      content: {
        title: "Add Contact Information",
        description: "Include at the top of your CV:\n- Full name\n- Phone number\n- Professional email\n- LinkedIn (optional but recommended)\n- Location (City, Country – no full address)"
      }
    },
    {
      id: 3,
      title: "Write a Personal Statement",
      icon: <BookOpen color="white" size={24} />,
      preview: "Craft a compelling 2–3 sentence summary",
      content: {
        title: "Write a Personal Statement",
        description: "2–3 sentences summarizing who you are, your goals, and what you offer.\n\nExample:\nMotivated high school student passionate about tech and gender equality, seeking opportunities to apply research and problem-solving skills in social-impact projects."
      }
    },
    {
      id: 4,
      title: "List Your Education",
      icon: <GraduationCap color="white" size={24} />,
      preview: "Academic background and relevant coursework",
      content: {
        title: "List Your Education",
        description: "Include:\n- School name\n- Years attended (or expected graduation)\n- Relevant courses, honors, GPA (optional)\n\nExample:\nMEET Program – Computer Science and Entrepreneurship\n2022–2025"
      }
    },
    {
      id: 5,
      title: "Highlight Work or Project Experience",
      icon: <Briefcase color="white" size={24} />,
      preview: "Showcase projects, internships, and achievements",
      content: {
        title: "Highlight Work or Project Experience",
        description: "Include:\n- Job title / project role\n- Organization name\n- Dates\n- 2–4 bullet points describing achievements or responsibilities\n\nTypes:\n- Full-time and part-time employment\n- Internships\n- Research projects\n- Lab work\n- Volunteer work\n- Field experience\n\nTips:\n- Start each bullet with an action verb\n- Focus on outcomes or skills used\n\nExample:\nCo-Founder, Themis – Social Impact Startup\nSummer 2025\n- Developed a mobile app tackling the gender wage gap\n- Led interviews with users and improved UX design based on feedback"
      }
    },
    {
      id: 6,
      title: "Add Skills",
      icon: <Award color="white" size={24} />,
      preview: "Technical and soft skills categorization",
      content: {
        title: "Add Skills",
        description: "Use a bulleted or categorized list.\n\nExamples:\nTechnical: Python, Canva, Figma, Google Sheets\nSoft: Teamwork, Communication, Problem-solving"
      }
    },
    {
      id: 7,
      title: "Add Extra Sections",
      icon: <CheckCircle color="white" size={24} />,
      preview: "Languages, awards, volunteering, and more",
      content: {
        title: "Add Extra Sections",
        description: "You can include:\n- Languages (e.g., Arabic – Native, English – Fluent, Hebrew – Intermediate)\n- Volunteering\n- Awards & Achievements\n- Certificates\n- Publications\n- Presentations and lectures\n- Grants, fellowships and scholarships\n- Awards and honors"
      }
    },
    {
      id: 8,
      title: "Format Your CV Professionally",
      icon: <Settings color="white" size={24} />,
      preview: "Final formatting and presentation tips",
      content: {
        title: "Format Your CV Professionally",
        description: "- Keep it to 1 page (especially if you're still a student)\n- Use clean fonts (Arial, Calibri, etc.)\n- Clear headings and consistent spacing\n- Save as PDF"
      }
    }
  ];

  const StepsList = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resume Guide</Text>
        <Text style={styles.headerSubtitle}>Master resume writing in 8 steps</Text>
      </View>

      <ScrollView contentContainerStyle={styles.stepsList}>
        {steps.map((step) => (
          <TouchableOpacity
            key={step.id}
            style={styles.stepCard}
            onPress={() => setCurrentStep(step)}
            activeOpacity={0.8}
          >
            <View style={styles.stepCardContent}>
              <View style={styles.stepIcon}>
                {step.icon}
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepNumber}>Step {step.id}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepPreview}>{step.preview}</Text>
              </View>
              <ArrowRight color="#9ca3af" size={20} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  const StepDetail = ({ step }) => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.stepsList}>
        <TouchableOpacity onPress={() => setCurrentStep(null)}>
          <ChevronLeft color="#3b82f6" size={24} />
        </TouchableOpacity>
        <Text style={styles.stepTitle}>{step.content.title}</Text>
        <Text style={styles.stepPreview}>{step.content.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <View style={{ flex: 1 }}>
      {currentStep ? <StepDetail step={currentStep} /> : <StepsList />}
    </View>
  );
};

export default ResumeGuideApp;
