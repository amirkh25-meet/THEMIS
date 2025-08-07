import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronLeft,
  FileText,
  GraduationCap,
  Settings,
  User
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const ResumeGuideApp = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const markStepComplete = (stepId) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.add(stepId);
      return newSet;
    });
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
header: {
  backgroundColor: '#041E42FF',
  padding: 20,
  paddingTop: Platform.OS === 'android' ? 40 : 60,
  paddingHorizontal: 16,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  marginBottom: 20,
  elevation: 4,
  alignItems: 'center',
},

    headerTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: 6,
      textAlign: 'center',
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 20,
      fontWeight: '500',
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      marginTop: 12,
    },
    progressText: {
      color: '#ff7c8a',
      fontSize: 16,
      fontWeight: '600',
    },
    progressBar: {
      flex: 1,
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 2,
      overflow: 'hidden',
      marginLeft: 12,
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#ff7c8a',
      borderRadius: 2,
    },
    stepsList: {
      padding: 24,
      paddingBottom: 40,
    },
    stepCard: {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#041E42FF',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 2,
      borderColor: '#ffffff',
    },
    stepCardCompleted: {
      borderColor: '#ff7c8a',
      backgroundColor: '#ffffff',
    },
    stepCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stepIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
      backgroundColor: '#041E42FF',
    },
    stepIconCompleted: {
      backgroundColor: '#ff7c8a',
    },
    stepInfo: {
      flex: 1,
    },
    stepNumber: {
      fontSize: 12,
      fontWeight: '700',
      color: '#041E42FF',
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: '#041E42FF',
      marginBottom: 6,
    },
    stepPreview: {
      fontSize: 14,
      color: '#04142F',
      lineHeight: 20,
    },
    stepStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    stepStatusText: {
      fontSize: 12,
      color: '#041E42FF',
      fontWeight: '700',
      marginLeft: 6,
    },
    detailContainer: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    detailHeader: {
      backgroundColor: '#041E42FF',
      paddingHorizontal: 24,
      paddingVertical: 10,
      paddingTop: 50,
  padding: 10,
  paddingTop: Platform.OS === 'android' ? 40 : 60,
  paddingHorizontal: 16,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
      borderBottomColor: '#eaebff',
    },
    detailContent: {
      padding: 24,
    },
    detailTitle: {
      fontSize: 28,
      fontWeight: '900',
      color: '#ffffff',
      marginBottom: 20,
    },
    detailDescription: {
      fontSize: 17,
      lineHeight: 26,
      color: '#041E42FF',
      marginBottom: 30,
    },
    tipsContainer: {
      backgroundColor: '#fec1c8',
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderLeftColor: '#041E42FF',
      borderRightColor: '#041E42FF',
    },
    tipsTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: '#041E42FF',
      marginBottom: 12,
    },
    tipsText: {
      fontSize: 15,
      color: '#041E42FF',
      lineHeight: 22,
    },
    exampleContainer: {
      backgroundColor: '#fec1c8',
      borderRadius: 20,
      padding: 20,
      marginBottom: 30,
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderLeftColor: '#041E42FF',
      borderRightColor: '#041E42FF',
    },
    exampleTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: '#041E42FF',
      marginBottom: 12,
    },
    exampleText: {
      fontSize: 15,
      color: '#041E42FF',
      fontStyle: 'italic',
      lineHeight: 22,
    },
    completeButton: {
      backgroundColor: '#ff7c8a',
      borderRadius: 16,
      paddingVertical: 18,
      paddingHorizontal: 32,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#ec4899',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    completeButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '800',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      backgroundColor: '#ffffff',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: '#041E42FF',
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#041E42FF',
      marginLeft: 8,
    },topRightContainer: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 999,
  alignItems: 'flex-end',
},

menuIcon: {
  fontSize: 24,
  padding: 5,
},

languageMenu: {
  backgroundColor: '#fff',
  borderRadius: 6,
  padding: 8,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

menuItem: {
  paddingVertical: 6,
  paddingHorizontal: 10,
  fontSize: 16,
},
  };

  const steps = [
    {
      id: 1,
      title: "Choose a CV Format",
      icon: <FileText color="#ffffff" size={24} />,
      preview: "Select between reverse-chronological and functional formats",
      tips: "• Reverse-chronological is most common and preferred by employers\n• Functional format is good for career changers or those with gaps\n• Hybrid format combines both approaches",
      example: "Reverse-chronological: Work experience listed from newest to oldest\nFunctional: Skills and achievements grouped by category",
      content: {
        title: "Choose a CV Format",
        description: "Your CV format sets the foundation for how you present your experience. Choose wisely based on your career stage and goals.\n\nReverse-chronological format is the most widely accepted and preferred by employers. It lists your work experience and education from most recent to oldest, making it easy for recruiters to see your career progression.\n\nFunctional format focuses on skills and achievements rather than chronological job history. This is useful if you have employment gaps, are changing careers, or want to emphasize specific skills."
      }
    },
    {
      id: 2,
      title: "Add Contact Information",
      icon: <User color="#ffffff" size={24} />,
      preview: "Essential contact details and professional links",
      tips: "• Use a professional email address\n• Include LinkedIn profile if you have one\n• Don't include full address - just city and country\n• Ensure phone number is current and professional",
      example: "Sarah Johnson\nsarah.johnson@email.com\n+972-50-123-4567\nTel Aviv, Israel\nlinkedin.com/in/sarahjohnson",
      content: {
        title: "Add Contact Information",
        description: "Your contact information is the first thing employers see. Make sure it's professional and up-to-date.\n\nInclude at the top of your CV:\n• Full name (as it appears on official documents)\n• Professional email address (avoid nicknames or outdated addresses)\n• Phone number (preferably mobile)\n• LinkedIn profile (optional but highly recommended)\n• Location (City, Country – no need for full address)\n\nTips for professional presentation:\n• Use a consistent font and formatting\n• Ensure all information is current and accurate\n• Consider adding a professional photo (common in some countries)"
      }
    },
    {
      id: 3,
      title: "Write a Personal Statement",
      icon: <BookOpen color="#ffffff" size={24} />,
      preview: "Craft a compelling 2–3 sentence summary",
      tips: "• Keep it concise - 2-3 sentences maximum\n• Focus on what you can offer, not what you want\n• Use action verbs and specific achievements\n• Tailor it to the specific role or industry",
      example: "Motivated high school student passionate about technology and gender equality, with experience in developing mobile applications and leading social impact projects. Seeking opportunities to apply research and problem-solving skills in innovative tech solutions.",
      content: {
        title: "Write a Personal Statement",
        description: "Your personal statement is your elevator pitch - a brief, compelling introduction that captures who you are and what you offer.\n\nA strong personal statement should be:\n• 2-3 sentences long\n• Specific to your goals and experience\n• Focused on what you can contribute\n• Written in active voice\n\nStructure your statement to include:\n• Who you are (your current role/status)\n• What you're passionate about\n• Your key skills or achievements\n• What you're seeking\n\nRemember: This is often the first thing recruiters read, so make it count!"
      }
    },
    {
      id: 4,
      title: "List Your Education",
      icon: <GraduationCap color="#ffffff" size={24} />,
      preview: "Academic background and relevant coursework",
      tips: "• Include relevant coursework that matches the job\n• Add honors, awards, or special achievements\n• List GPA only if it's 3.5 or higher\n• Include expected graduation date if still studying",
      example: "MEET Program – Computer Science and Entrepreneurship\n2022–2025\n• Relevant coursework: Programming, Business Development, UX Design\n• GPA: 3.8/4.0\n• Dean's List: 2023, 2024",
      content: {
        title: "List Your Education",
        description: "Your education section demonstrates your academic foundation and relevant knowledge. Even as a student, this section can be quite powerful.\n\nInclude:\n• School/Program name\n• Years attended (or expected graduation date)\n• Relevant courses that apply to the position\n• Honors, awards, or special achievements\n• GPA (only if it's 3.5 or higher)\n• Extracurricular activities related to your field\n\nFor students, emphasize:\n• Relevant coursework and projects\n• Academic achievements and honors\n• Leadership roles in school organizations\n• Research or lab experience\n• Internships or part-time work related to your studies"
      }
    },
    {
      id: 5,
      title: "Highlight Work or Project Experience",
      icon: <Briefcase color="#ffffff" size={28} />,
      preview: "Showcase projects, internships, and achievements",
      tips: "• Use action verbs to start each bullet point\n• Quantify achievements when possible\n• Focus on results and impact, not just duties\n• Include relevant volunteer work and projects",
      example: "Co-Founder, Themis – Social Impact Startup\nSummer 2024\n• Developed a mobile app addressing gender wage gap, reaching 500+ users\n• Led user interviews and improved UX design based on feedback\n• Managed team of 3 developers and designers",
      content: {
        title: "Highlight Work or Project Experience",
        description: "This section is where you demonstrate your practical skills and achievements. Even if you don't have traditional work experience, projects and internships count!\n\nInclude:\n• Job title or project role\n• Organization or project name\n• Dates (month/year format)\n• 2-4 bullet points describing achievements\n\nTypes of experience to include:\n• Full-time and part-time employment\n• Internships and apprenticeships\n• Research projects and lab work\n• Volunteer work and community service\n• School projects with real-world impact\n• Freelance or consulting work\n\nWriting effective bullet points:\n• Start with strong action verbs\n• Focus on outcomes and impact\n• Use specific numbers when possible\n• Highlight skills relevant to the target job"
      }
    },
    {
      id: 6,
      title: "Add Skills",
      icon: <Award color="#ffffff" size={28} />,
      preview: "Technical and soft skills categorization",
      tips: "• Group skills by category (Technical, Soft Skills, Languages)\n• Include both hard and soft skills\n• Be specific about skill levels when relevant\n• Update skills based on the job requirements",
      example: "Technical Skills: Python, JavaScript, Figma, Google Analytics\nSoft Skills: Leadership, Problem-solving, Cross-cultural Communication\nLanguages: Hebrew (Native), English (Fluent), Arabic (Intermediate)",
      content: {
        title: "Add Skills",
        description: "Your skills section showcases your capabilities and helps you pass through applicant tracking systems (ATS). Organize them clearly to make an impact.\n\nSkill categories to consider:\n• Technical Skills: Programming languages, software, tools\n• Soft Skills: Communication, leadership, problem-solving\n• Languages: Include proficiency levels\n• Industry-specific skills: Certifications, methodologies\n\nTips for effective skill presentation:\n• Use bullet points or a clean list format\n• Group related skills together\n• Be honest about your skill levels\n• Include both technical and transferable skills\n• Tailor skills to match job requirements\n\nRemember: Skills should support your experience and education, not replace them."
      }
    },
    {
      id: 7,
      title: "Add Extra Sections",
      icon: <CheckCircle color="#ffffff" size={28} />,
      preview: "Languages, awards, volunteering, and more",
      tips: "• Only include sections that add value to your application\n• Keep extra sections concise and relevant\n• Use consistent formatting throughout\n• Consider the company culture when choosing what to include",
      example: "Languages: Hebrew (Native), English (Fluent), Arabic (Intermediate)\nAwards: Outstanding Student Award 2024, Hackathon Winner 2023\nVolunteering: Tech Mentor at Girls Who Code, 2023-Present",
      content: {
        title: "Add Extra Sections",
        description: "Extra sections can set you apart from other candidates and show your well-rounded background. Choose sections that are relevant to the position and company.\n\nOptional sections to consider:\n• Languages (with proficiency levels)\n• Awards and Honors\n• Certifications and Training\n• Publications and Presentations\n• Volunteer Work and Community Service\n• Professional Memberships\n• Hobbies and Interests (if relevant)\n• Projects and Portfolio\n\nGuidelines for extra sections:\n• Only include if they add value to your application\n• Keep them concise and well-organized\n• Use consistent formatting\n• Consider the company culture and values\n• Update based on the specific role you're applying for"
      }
    },
    {
      id: 8,
      title: "Format Your CV Professionally",
      icon: <Settings color="#ffffff" size={28} />,
      preview: "Final formatting and presentation tips",
      tips: "• Keep it to 1-2 pages maximum\n• Use professional fonts (Arial, Calibri, Times New Roman)\n• Maintain consistent spacing and alignment\n• Save as PDF to preserve formatting\n• Proofread multiple times",
      example: "Format: Clean, professional layout with consistent spacing\nFont: Arial 11pt for body text, 14pt for headings\nLength: 1 page\nFile format: PDF",
      content: {
        title: "Format Your CV Professionally",
        description: "Professional formatting ensures your CV is easy to read and makes a positive first impression. Poor formatting can overshadow even the best content.\n\nEssential formatting guidelines:\n• Keep it to 1 page (especially for students and early career)\n• Use professional fonts: Arial, Calibri, or Times New Roman\n• Maintain consistent spacing and alignment\n• Use clear headings and subheadings\n• Include adequate white space\n• Save as PDF to preserve formatting\n\nFinal checklist:\n• Proofread for spelling and grammar errors\n• Ensure all contact information is current\n• Check that formatting is consistent throughout\n• Verify that the file opens correctly\n• Test how it looks when printed\n\nRemember: Your CV is often the first impression you make on a potential employer. Professional formatting shows attention to detail and respect for the hiring process."
      }
    }
  ];

  const progressPercentage = (completedSteps.size / steps.length) * 100;

  const StepsList = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resume Guide</Text>
        <Text style={styles.headerSubtitle}>Master resume writing in 8 comprehensive steps</Text>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedSteps.size} / {steps.length} 
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.stepsList}>
        {steps.map((step, index) => (
          <Animated.View
            key={step.id}
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <TouchableOpacity
              style={[
                styles.stepCard,
                completedSteps.has(step.id) && styles.stepCardCompleted
              ]}
              onPress={() => setCurrentStep(step)}
              activeOpacity={0.9}
            >
              <View style={styles.stepCardContent}>
                <View style={[
                  styles.stepIcon,
                  completedSteps.has(step.id) && styles.stepIconCompleted
                ]}>
                  {completedSteps.has(step.id) ? (
                    <CheckCircle color="#ffffff" size={28} />
                  ) : (
                    step.icon
                  )}
                </View>
                <View style={styles.stepInfo}>
                  <Text style={styles.stepNumber}>Step {step.id}</Text>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepPreview}>{step.preview}</Text>
                  {completedSteps.has(step.id) && (
                    <View style={styles. stepStatus}>
                      <CheckCircle color="#ff7c8a" size={18} />
                      <Text style={styles.stepStatusText}>Completed</Text>
                    </View>
                  )}
                </View>
                <ArrowRight color="#041E42FF" size={24} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </ScrollView>
  );

  const StepDetail = ({ step }) => (
    <ScrollView style={styles.detailContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdf2f8" />
      <View style={styles.detailHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentStep(null)}
        >
          <ChevronLeft color="#041E42FF" size={24} />
          <Text style={styles.backButtonText}>Back to Steps</Text>
        </TouchableOpacity>
        <Text style={styles.detailTitle}>{step.content.title}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.detailContent}>
        <Text style={styles.detailDescription}>{step.content.description}</Text>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
          <Text style={styles.tipsText}>{step.tips}</Text>
        </View>
        
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>📝 Example</Text>
          <Text style={styles.exampleText}>{step.example}</Text>
        </View>
        
        {!completedSteps.has(step.id) && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              markStepComplete(step.id);
              setCurrentStep(null);
            }}
          >
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ScrollView>
  );

  return (
    <View style={{ flex: 1 }}>
      {currentStep ? <StepDetail step={currentStep} /> : <StepsList />}
    </View>
  );
};

export default ResumeGuideApp;
