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

import { useLanguage } from '../../LanguageContext';
const { width } = Dimensions.get('window');

const ResumeGuideApp = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const {if2,setIf2} = useLanguage(); 

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

  

  
  const steps1 = [
  {
    id: 1,
    title: "اختر صيغة السيرة الذاتية",
    icon: <FileText color="#ffffff" size={24} />,
    preview: "اختر بين الصيغة العكسية الزمنية أو الوظيفية",
    tips: "• الصيغة العكسية الزمنية هي الأكثر شيوعًا والمفضلة لدى أصحاب العمل\n• الصيغة الوظيفية مناسبة لمن يغيرون مجال العمل أو لديهم فجوات\n• الصيغة المختلطة تجمع بين الطريقتين",
    example: "الصيغة العكسية الزمنية: تسرد الخبرات من الأحدث للأقدم\nالصيغة الوظيفية: تصنف المهارات والإنجازات حسب الفئات",
    content: {
      title: "اختر صيغة السيرة الذاتية",
      description:
        "صيغة سيرتك الذاتية تحدد طريقة عرض خبراتك. اخترها بحكمة بناءً على مرحلة حياتك المهنية وأهدافك.\n\nالصيغة العكسية الزمنية هي الأكثر قبولًا وتفضيلاً من أصحاب العمل. تسرد خبراتك التعليمية والعملية من الأحدث إلى الأقدم، لتسهل على مسؤولي التوظيف متابعة تقدمك المهني.\n\nالصيغة الوظيفية تركز على المهارات والإنجازات بدلاً من التسلسل الزمني للتوظيف. مفيدة لمن لديهم فجوات وظيفية أو يغيرون مجال العمل أو يريدون التركيز على مهارات معينة."
    }
  },
  {
    id: 2,
    title: "أضف معلومات الاتصال",
    icon: <User color="#ffffff" size={24} />,
    preview: "تفاصيل الاتصال الأساسية والروابط المهنية",
    tips: "• استخدم بريد إلكتروني احترافي\n• أضف ملف لينكدإن إن وجد\n• لا تذكر العنوان الكامل - فقط المدينة والدولة\n• تأكد من تحديث رقم الهاتف",
    example: "سارة جونسون\nsarah.johnson@email.com\n+972-50-123-4567\nتل أبيب، إسرائيل\nlinkedin.com/in/sarahjohnson",
    content: {
      title: "أضف معلومات الاتصال",
      description:
        "معلومات الاتصال هي أول ما يراه أصحاب العمل. اجعلها احترافية ومحدثة.\n\nأدرج في أعلى السيرة الذاتية:\n• الاسم الكامل كما في الوثائق الرسمية\n• بريد إلكتروني احترافي (تجنب الأسماء الغير جدية)\n• رقم هاتف (يفضل الجوال)\n• ملف لينكدإن (اختياري لكن موصى به)\n• الموقع (المدينة والدولة فقط)\n\nنصائح لعرض احترافي:\n• استخدم خط وتنسيق موحد\n• تحقق من صحة ودقة المعلومات\n• قد تضيف صورة شخصية احترافية (شائعة في بعض الدول)"
    }
  },
  {
    id: 3,
    title: "اكتب ملخصًا شخصيًا",
    icon: <BookOpen color="#ffffff" size={24} />,
    preview: "صغ ملخصًا جذابًا في 2-3 جمل",
    tips: "• اجعله موجزًا - 2-3 جمل فقط\n• ركز على ما يمكنك تقديمه، لا ما تريده\n• استخدم أفعال قوية وإنجازات محددة\n• خصصه للدور أو المجال المطلوب",
    example: "طالبة متحمسة شغوفة بالتكنولوجيا والمساواة بين الجنسين، مع خبرة في تطوير تطبيقات الهواتف المحمولة وقيادة مشاريع ذات تأثير اجتماعي. أبحث عن فرص لتطبيق مهارات البحث وحل المشكلات في حلول تكنولوجية مبتكرة.",
    content: {
      title: "اكتب ملخصًا شخصيًا",
      description:
        "ملخصك الشخصي هو بمثابة عرض تقديمي موجز وجذاب يعرف من أنت وماذا تقدم.\n\nينبغي أن يكون الملخص:\n• من 2 إلى 3 جمل\n• مخصصًا لأهدافك وخبراتك\n• يركز على ما يمكنك تقديمه\n• مكتوبًا بصيغة نشطة\n\nقم بتضمين:\n• من أنت (دورك أو وضعك الحالي)\n• ما الذي تشعر بالشغف تجاهه\n• مهاراتك أو إنجازاتك الرئيسية\n• ما تبحث عنه\n\nتذكر: هذا غالبًا أول ما يقرأه المسؤولون عن التوظيف، فاجعله مؤثرًا!"
    }
  },
  {
    id: 4,
    title: "أدرج تعليمك",
    icon: <GraduationCap color="#ffffff" size={24} />,
    preview: "الخلفية الأكاديمية والدورات ذات الصلة",
    tips: "• أدرج الدورات ذات الصلة بالوظيفة\n• أضف الجوائز والتكريمات\n• أدرج المعدل التراكمي فقط إذا كان 3.5 أو أعلى\n• أضف تاريخ التخرج المتوقع إذا كنت لا تزال تدرس",
    example: "برنامج MEET – علوم الحاسوب وريادة الأعمال\n2022–2025\n• دورات ذات صلة: البرمجة، تطوير الأعمال، تصميم تجربة المستخدم\n• المعدل التراكمي: 3.8/4.0\n• قائمة العميد: 2023، 2024",
    content: {
      title: "أدرج تعليمك",
      description:
        "قسم التعليم يعكس أساسك الأكاديمي والمعرفة ذات الصلة. حتى لو كنت طالبًا، هذا القسم مهم.\n\nأدرج:\n• اسم المدرسة أو البرنامج\n• سنوات الدراسة أو تاريخ التخرج المتوقع\n• الدورات ذات الصلة بالوظيفة\n• الجوائز أو التكريمات\n• المعدل التراكمي (إذا كان 3.5 أو أكثر)\n• الأنشطة اللاصفية ذات الصلة\n\nللطلبة، ركز على:\n• الدورات والمشاريع ذات الصلة\n• الإنجازات الأكاديمية\n• الأدوار القيادية في المنظمات الطلابية\n• الأبحاث أو الخبرة المخبرية\n• التدريبات أو العمل الجزئي المرتبط بالدراسة"
    }
  },
  {
    id: 5,
    title: "سلط الضوء على الخبرات العملية أو المشاريع",
    icon: <Briefcase color="#ffffff" size={28} />,
    preview: "عرض المشاريع، التدريبات، والإنجازات",
    tips: "• استخدم أفعال حركة في بداية كل نقطة\n• كَوِّن الإنجازات بأرقام إن أمكن\n• ركز على النتائج والتأثير وليس فقط المهام\n• أدرج العمل التطوعي والمشاريع ذات الصلة",
    example: "المؤسس المشارك، Themis – شركة ذات تأثير اجتماعي\nصيف 2024\n• طورت تطبيقًا للهواتف يعالج فجوة الأجور بين الجنسين، ووصل لـ 500+ مستخدم\n• قادت مقابلات المستخدمين وحسنت تصميم تجربة المستخدم بناءً على الملاحظات\n• أدرت فريقًا من 3 مطورين ومصممين",
    content: {
      title: "سلط الضوء على الخبرات العملية أو المشاريع",
      description:
        "في هذا القسم تظهر مهاراتك العملية وإنجازاتك. حتى إذا لم يكن لديك خبرة عمل تقليدية، فالمشاريع والتدريبات تُحتسب!\n\nأدرج:\n• المسمى الوظيفي أو الدور في المشروع\n• اسم المنظمة أو المشروع\n• التواريخ (شهر/سنة)\n• 2-4 نقاط تصف الإنجازات\n\nأنواع الخبرات:\n• العمل بدوام كامل أو جزئي\n• التدريبات والتمرينات\n• الأبحاث والمشاريع المختبرية\n• العمل التطوعي\n• مشاريع دراسية ذات تأثير حقيقي\n• العمل الحر أو الاستشارات\n\nكتابة نقاط فعالة:\n• ابدأ بأفعال قوية\n• ركز على النتائج والتأثير\n• استخدم أرقامًا محددة إن أمكن\n• أبرز المهارات ذات الصلة"
    }
  },
  {
    id: 6,
    title: "أضف المهارات",
    icon: <Award color="#ffffff" size={28} />,
    preview: "تصنيف المهارات التقنية والناعمة",
    tips: "• صنف المهارات حسب الفئة (تقنية، مهارات ناعمة، لغات)\n• أدرج المهارات الصلبة والناعمة\n• كن محددًا بمستوى المهارة\n• حدّث المهارات وفقًا لمتطلبات الوظيفة",
    example: "المهارات التقنية: Python، JavaScript، Figma، Google Analytics\nالمهارات الناعمة: القيادة، حل المشكلات، التواصل بين الثقافات\nاللغات: العبرية (اللغة الأم)، الإنجليزية (بطلاقة)، العربية (متوسط)",
    content: {
      title: "أضف المهارات",
      description:
        "قسم المهارات يعرض قدراتك ويساعدك على اجتياز أنظمة تتبع المتقدمين. نظمها بوضوح.\n\nفئات المهارات:\n• المهارات التقنية: لغات البرمجة، البرمجيات، الأدوات\n• المهارات الناعمة: التواصل، القيادة، حل المشكلات\n• اللغات: أدرج مستويات الإتقان\n• مهارات متخصصة: شهادات، منهجيات\n\nنصائح:\n• استخدم نقاط أو قائمة نظيفة\n• صنف المهارات المرتبطة معًا\n• كن صادقًا بمستوى مهارتك\n• أدرج المهارات التقنية والقابلة للنقل\n• خصص المهارات للوظيفة المطلوبة\n\nتذكر: المهارات تدعم خبرتك وتعليمك، لا تستبدلها."
    }
  },
  {
    id: 7,
    title: "أضف أقسامًا إضافية",
    icon: <CheckCircle color="#ffffff" size={28} />,
    preview: "اللغات، الجوائز، التطوع، والمزيد",
    tips: "• أدرج فقط الأقسام التي تضيف قيمة\n• اجعل الأقسام الإضافية موجزة وذات صلة\n• استخدم تنسيقًا موحدًا\n• راعِ ثقافة الشركة عند الاختيار",
    example: "اللغات: العبرية (الأم)، الإنجليزية (بطلاقة)، العربية (متوسط)\nالجوائز: جائزة الطالب المتفوق 2024، الفائز في الهاكاثون 2023\nالتطوع: مرشد تقني في Girls Who Code، 2023-حتى الآن",
    content: {
      title: "أضف أقسامًا إضافية",
      description:
        "الأقسام الإضافية تميزك عن غيرك وتُظهر خلفيتك المتنوعة. اختر الأقسام ذات الصلة بالوظيفة والشركة.\n\nالأقسام الاختيارية:\n• اللغات مع مستويات الإتقان\n• الجوائز والتكريمات\n• الشهادات والتدريب\n• المنشورات والعروض\n• العمل التطوعي\n• العضويات المهنية\n• الهوايات والاهتمامات (إذا كانت ذات صلة)\n• المشاريع والمحفظة\n\nإرشادات:\n• أدرج فقط ما يضيف قيمة\n• اجعلها منظمة وموجزة\n• استخدم تنسيقًا موحدًا\n• ضع في الاعتبار ثقافة وقيم الشركة\n• حدّثها حسب الدور المتقدم إليه"
    }
  },
  {
    id: 8,
    title: "نسّق سيرتك الذاتية باحترافية",
    icon: <Settings color="#ffffff" size={28} />,
    preview: "نصائح للعرض النهائي والتنسيق",
    tips: "• اجعلها من صفحة إلى صفحتين كحد أقصى\n• استخدم خطوطًا احترافية (Arial، Calibri، Times New Roman)\n• حافظ على تباعد واتساق التنسيق\n• احفظها بصيغة PDF للحفاظ على التنسيق\n• راجعها جيدًا عدة مرات",
    example: "التنسيق: تصميم نظيف واحترافي مع تباعد منتظم\nالخط: Arial بحجم 11 للنص، 14 للعناوين\nالطول: صفحة واحدة\nصيغة الملف: PDF",
    content: {
      title: "نسّق سيرتك الذاتية باحترافية",
      description:
        "التنسيق الاحترافي يجعل سيرتك الذاتية سهلة القراءة ويترك انطباعًا إيجابيًا. التنسيق السيء قد يطغى على محتوى جيد.\n\nإرشادات التنسيق:\n• اجعلها صفحة واحدة (خاصة للطلاب والمبتدئين)\n• استخدم خطوطًا احترافية: Arial، Calibri، Times New Roman\n• حافظ على تباعد وتنظيم متسق\n• استخدم عناوين واضحة\n• وفر مساحات بيضاء مناسبة\n• احفظ بصيغة PDF للحفاظ على التنسيق\n\nالقائمة النهائية:\n• راجع الأخطاء الإملائية والنحوية\n• تأكد من صحة معلومات الاتصال\n• تحقق من الاتساق في التنسيق\n• تحقق من فتح الملف بشكل صحيح\n• اختبر مظهرها عند الطباعة\n\nتذكر: سيرتك الذاتية هي الانطباع الأول، والتنسيق الاحترافي يظهر اهتمامك ودقتك."
    }
  }
];



const steps2 = [
  {
    id: 1,
    title: "בחר פורמט קורות חיים",
    icon: <FileText color="#ffffff" size={24} />,
    preview: "בחר בין פורמט כרונולוגי הפוך או פונקציונלי",
    tips: "• הפורמט הכרונולוגי ההפוך הוא הנפוץ ביותר והמועדף על מעסיקים\n• הפורמט הפונקציונלי מתאים למי שמחליפים תחום עבודה או שיש להם פערים\n• הפורמט המעורב משלב בין שתי השיטות",
    example: "פורמט כרונולוגי הפוך: מציג ניסיון מהחדש ביותר לישן ביותר\nפורמט פונקציונלי: מסווג מهארות והישגים לפי קטגוריות",
    content: {
      title: "בחר פורמט קורות חיים",
      description:
        "פורמט קורות החיים שלך קובע את הדרך בה מוצג הניסיון שלך. בחר בחכמה בהתבסס על שלב הקריירה שלך ויעדיך.\n\nהפורמט הכרונולוגי ההפוך הוא המקובל ביותר והמועדף על מעסיקים. הוא מציג את הניסיון החינוכי והמקצועי שלך מהחדש ביותר לישן ביותר, כדי להקל על גורמי הגיוס לעקוב אחר התקדמותך המקצועית.\n\nהפורמט הפונקציונלי מתמקד במהארות והישגים במקום בסדר הכרונולוגי של העבודות. שימושי למי שיש להם פערים תעסוקתיים או מחליפים תחום עבודה או רוצים להתמקד במהארות מסוימות."
    }
  },
  {
    id: 2,
    title: "הוסף פרטי התקשרות",
    icon: <User color="#ffffff" size={24} />,
    preview: "פרטי התקשרות בסיסיים וקישורים מקצועיים",
    tips: "• השתמש בדואר אלקטרוני מקצועי\n• הוסף פרופיל לינקדאין אם קיים\n• אל תציין את הכתובת המלאה - רק עיר ומדינה\n• ודא שמספר הטלפון מעודכן",
    example: "שרה ג'ונסון\nsarah.johnson@email.com\n+972-50-123-4567\nתל אביב, ישראל\nlinkedin.com/in/sarahjohnson",
    content: {
      title: "הוסף פרטי התקשרות",
      description:
        "פרטי ההתקשרות הם הדבר הראשון שמעסיקים רואים. הפוך אותם למקצועיים ומעודכנים.\n\nכלול בחלק העליון של קורות החיים:\n• שם מלא כמו במסמכים רשמיים\n• דואר אלקטרוני מקצועי (הימנע משמות לא רציניים)\n• מספר טלפון (רצוי נייד)\n• פרופיל לינקדאין (אופציונלי אך מומלץ)\n• מיקום (עיר ומדינה בלבד)\n\nטיפים לתצוגה מקצועית:\n• השתמש בגופן ועיצוב אחיד\n• בדוק שהמידע נכון ומדויק\n• ניתן להוסיף תמונה אישית מקצועית (נהוג במדינות מסוימות)"
    }
  },
  {
    id: 3,
    title: "כתוב תקציר אישי",
    icon: <BookOpen color="#ffffff" size={24} />,
    preview: "נסח תקציר מושך ב-2-3 משפטים",
    tips: "• שמור על קיצור - 2-3 משפטים בלבד\n• התמקד במה שאתה יכול לתרום, לא במה שאתה רוצה\n• השתמש בפעלים חזקים והישגים ספציפיים\n• התאם אותו לתפקיד או התחום הרצוי",
    example: "סטודנטית נלהבת עם תשוקה לטכנולוגיה ושוויון מגדרי, עם ניסיון בפיתוח אפליקציות נייד והובלת פרויקטים עם השפעה חברתית. מחפשת הזדמנויות ליישם כישורי מחקר ופתרון בעיות בפתרונות טכנולוגיים חדשניים.",
    content: {
      title: "כתוב תקציר אישי",
      description:
        "התקציר האישי שלך הוא כמו מצגת קצרה ומושכת שמציגה מי אתה ומה אתה מביא.\n\nהתקציר צריך להיות:\n• בן 2 עד 3 משפטים\n• מותאם ליעדים ולניסיון שלך\n• מתמקד במה שאתה יכול לתרום\n• כתוב בצורה פעילה\n\nכלול:\n• מי אתה (התפקיד או המצב הנוכחי שלך)\n• מה מלהיב אותך\n• המהארות או ההישגים המרכזיים שלך\n• מה אתה מחפש\n\nזכור: זה לעתים קרובות הדבר הראשון שאחראי גיוס קורא, אז הפוך אותו למשפיע!"
    }
  },
  {
    id: 4,
    title: "פרט את ההשכלה שלך",
    icon: <GraduationCap color="#ffffff" size={24} />,
    preview: "רקע אקדמי וקורסים רלוונטיים",
    tips: "• פרט קורסים הרלוונטיים לתפקיד\n• הוסף פרסים והכרות\n• פרט ממוצע ציונים רק אם הוא 3.5 או גבוה יותר\n• הוסף תאריך סיום צפוי אם עדיין לומד",
    example: "תוכנית MEET – מדעי המחשב ויזמות\n2022–2025\n• קורסים רלוונטיים: תכנות, פיתוח עסקי, עיצוב חוויית משתמש\n• ממוצע ציונים: 3.8/4.0\n• רשימת דיקן: 2023, 2024",
    content: {
      title: "פרט את ההשכלה שלך",
      description:
        "קטע ההשכלה משקף את הבסיס האקדמי והידע הרלוונטי שלך. גם אם אתה סטודנט, הקטע הזה חשוב.\n\nפרט:\n• שם בית הספר או התוכנית\n• שנות לימוד או תאריך סיום צפוי\n• קורסים רלוונטיים לעבודה\n• פרסים או הכרות\n• ממוצע ציונים (אם 3.5 או יותר)\n• פעילויות חוץ-לימודיות רלוונטיות\n\nלסטודנטים, התמקד ב:\n• קורסים ופרויקטים רלוונטיים\n• הישגים אקדמיים\n• תפקידי מנהיגות בארגוני סטודנטים\n• מחקר או ניסיון במעבדה\n• סטז'ים או עבודה חלקית הקשורה ללימודים"
    }
  },
  {
    id: 5,
    title: "הדגש ניסיון מעשי או פרויקטים",
    icon: <Briefcase color="#ffffff" size={28} />,
    preview: "הצגת פרויקטים, סטז'ים והישגים",
    tips: "• השתמש בפעלי פעולה בתחילת כל נקודה\n• כמת הישגים במספרים כשניתן\n• התמקד בתוצאות והשפעה ולא רק במשימות\n• כלול עבודה התנדבותית ופרויקטים רלוונטיים",
    example: "מייסד שותף, Themis – חברה עם השפעה חברתית\nקיץ 2024\n• פיתחתי אפליקציה לנייד שמטפלת בפער השכר בין המינים, הגיעה ל-500+ משתמשים\n• הובלתי ראיונות משתמשים ושיפרתי עיצוב חוויית משתמש על בסיס משוב\n• ניהלתי צוות של 3 מפתחים ומעצבים",
    content: {
      title: "הדגש ניסיון מעשי או פרויקטים",
      description:
        "בקטע הזה אתה מציג את הכישורים המעשיים וההישגים שלך. גם אם אין לך ניסיון עבודה מסורתי, פרויקטים וסטז'ים נחשבים!\n\nפרט:\n• כותרת המשרה או התפקיד בפרויקט\n• שם הארגון או הפרויקט\n• תאריכים (חודש/שנה)\n• 2-4 נקודות שמתארות הישגים\n\nסוגי ניסיון:\n• עבודה במשרה מלאה או חלקית\n• סטז'ים והתמחויות\n• מחקר ופרויקטי מעבדה\n• עבודה התנדבותית\n• פרויקטים לימודיים עם השפעה אמיתית\n• עבודה עצמאית או ייעוץ\n\nכתיבת נקודות יעילה:\n• התחל בפעלים חזקים\n• התמקד בתוצאות והשפעה\n• השתמש במספרים ספציפיים כשניתן\n• הדגש כישורים רלוונטיים"
    }
  },
  {
    id: 6,
    title: "הוסף מהארות",
    icon: <Award color="#ffffff" size={28} />,
    preview: "סיווג מהארות טכניות ורכות",
    tips: "• סווג מהארות לפי קטגוריה (טכניות, מהארות רכות, שפות)\n• פרט מהארות קשות ורכות\n• היה ספציפי לגבי רמת המיומנות\n• עדכן מהארות לפי דרישות התפקיד",
    example: "מהארות טכניות: Python, JavaScript, Figma, Google Analytics\nמהארות רכות: מנהיגות, פתרון בעיות, תקשורת בין-תרבותית\nשפות: עברית (שפת אם), אנגלית (רהוטה), ערבית (בינונית)",
    content: {
      title: "הוסף מהארות",
      description:
        "קטע המהארות מציג את היכולות שלך ועוזר לך לעבור מערכות מעקב מועמדים. ארגן אותן בבירור.\n\nקטגוריות מהארות:\n• מהארות טכניות: שפות תכנות, תוכנות, כלים\n• מהארות רכות: תקשורת, מנהיגות, פתרון בעיות\n• שפות: פרט רמות בקיאות\n• מהארות מתמחות: הסמכות, מתודולוגיות\n\nטיפים:\n• השתמש בנקודות או רשימה נקייה\n• סווג מהארות קשורות יחדיו\n• היה כנה לגבי רמת המיומנות שלך\n• כלול מהארות טכניות וניידות\n• התאם מהארות לתפקיד הרצוי\n\nזכור: מהארות תומכות בניסיון ובחינוך שלך, לא מחליפות אותם."
    }
  },
  {
    id: 7,
    title: "הוסף קטעים נוספים",
    icon: <CheckCircle color="#ffffff" size={28} />,
    preview: "שפות, פרסים, התנדבות ועוד",
    tips: "• כלול רק קטעים שמוסיפים ערך\n• שמור על קטעים נוספים קצרים ורלוונטיים\n• השתמש בעיצוב אחיד\n• שקול את תרבות החברה בעת הבחירה",
    example: "שפות: עברית (שפת אם), אנגלית (רהוטה), ערבית (בינונית)\nפרסים: פרס הסטודנט המצטיין 2024, זוכה בהקאתון 2023\nהתנדבות: מדריכה טכנית ב-Girls Who Code, 2023-עד היום",
    content: {
      title: "הוסף קטעים נוספים",
      description:
        "קטעים נוספים מייחדים אותך מאחרים ומציגים את הרקע המגוון שלך. בחר קטעים רלוונטיים לתפקיד ולחברה.\n\nקטעים אופציונליים:\n• שפות עם רמות בקיאות\n• פרסים והכרות\n• הסמכות והכשרה\n• פרסומים ומצגות\n• עבודה התנדבותית\n• חברות מקצועיות\n• תחביבים ועניינים (אם רלוונטיים)\n• פרויקטים ותיק עבודות\n\nהנחיות:\n• כלול רק מה שמוסיף ערך\n• שמור על ארגון וקיצור\n• השתמש בעיצוב אחיד\n• שקול את תרבות וערכי החברה\n• עדכן לפי התפקיד אליו מתמודד"
    }
  },
  {
    id: 8,
    title: "עצב את קורות החיים שלך במקצועיות",
    icon: <Settings color="#ffffff" size={28} />,
    preview: "טיפים לתצוגה סופית ועיצוב",
    tips: "• שמור על עמוד אחד עד שני עמודים לכל היותר\n• השתמש בגופנים מקצועיים (Arial, Calibri, Times New Roman)\n• שמור על ריווח ועקביות בעיצוב\n• שמור בפורמט PDF לשמירה על העיצוב\n• בדוק היטב מספר פעמים",
    example: "עיצוב: עיצוב נקי ומקצועי עם ריווח סדיר\nגופן: Arial בגודל 11 לטקסט, 14 לכותרות\nאורך: עמוד אחד\nפורמט קובץ: PDF",
    content: {
      title: "עצב את קורות החיים שלך במקצועיות",
      description:
        "עיצוב מקצועי הופך את קורות החיים שלך לקלים לקריאה ומשאיר רושם חיובי. עיצוב גרוע עלול להעליב תוכן טוב.\n\nהנחיות עיצוב:\n• שמור על עמוד אחד (במיוחד לסטודנטים ומתחילים)\n• השתמש בגופנים מקצועיים: Arial, Calibri, Times New Roman\n• שמור על ריווח וארגון עקבי\n• השתמש בכותרות ברורות\n• ספק רווחים לבנים מתאימים\n• שמור בפורמט PDF לשמירה על העיצוב\n\nרשימת בדיקה סופית:\n• בדוק שגיאות כתיב ודקדוק\n• ודא שפרטי ההתקשרות נכונים\n• וודא עקביות בעיצוב\n• בדוק שהקובץ נפתח כראוי\n• בחן את המראה בעת הדפסה\n\nזכור: קורות החיים שלך הם הרושם הראשון, ועיצוב מקצועי מראה על תשומת הלב והדיוק שלך."
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



  const StepsList1 = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resume Guide</Text>
        <Text style={styles.headerSubtitle}>Master resume writing in 8 comprehensive steps</Text>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedSteps.size} / {steps1.length} 
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.stepsList}>
        {steps1.map((step, index) => (
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

  const StepDetail1 = ({ step }) => (
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

  const StepsList2 = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resume Guide</Text>
        <Text style={styles.headerSubtitle}>Master resume writing in 8 comprehensive steps</Text>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedSteps.size} / {steps2.length} 
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

  const StepDetai2 = ({ step }) => (
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
if(if2===0){
  return (
    <View style={{ flex: 1 }}>
      {currentStep ? <StepDetail step={currentStep} /> : <StepsList />}
    </View>
  );
};
  if(if2===1){
  return (
    <View style={{ flex: 1 }}>
      {currentStep ? <StepDetail1 step={currentStep} /> : <StepsList1 />}
    </View>
  );
};

if(if2===2){
  return (
    <View style={{ flex: 1 }}>
      {currentStep ? <StepDetail2 step={currentStep} /> : <StepsList2 />}
    </View>
  );
};}

export default ResumeGuideApp;
