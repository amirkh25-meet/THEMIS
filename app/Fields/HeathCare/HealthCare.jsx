import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLanguage } from '../../LanguageContext';
const companies = [
  {
    name: 'Raphael Hospitals',
    city: 'Tel Aviv',
    description: [
      'Modern private hospital with advanced technologies.',
      'Offers robotic surgery and high-tech facilities.',
      'Collaborative team culture with focus on compassion.',
      'Supportive of women in tech-focused roles.',
      'Promotes work-life balance and emotional intelligence.',
    ],
  },
  {
    name: 'Reuth Rehabilitation Hospital',
    city: 'Tel Aviv',
    description: [
      'Mission-driven nonprofit with inclusive culture.',
      'Women hold key roles in nursing, therapy, and rehab.',
      'Warm, family-like environment and interdisciplinary teamwork.',
      'Flexible hours for better work-life balance.',
      'Major new campus brings growth and leadership paths.',
    ],
  },
  {
    name: 'Shaare Zedek Medical Center',
    city: 'Jerusalem',
    description: [
      'Offers clinical excellence and academic growth.',
      'Inclusive culture with strong female leadership.',
      'Dr. Paluch-Shimon leads Oncology while raising 3 kids.',
      'Promotes Jewish-Arab staff coexistence and respect.',
      'Expanding pediatric, neonatal, and women’s health units.',
      'Flexible roles support work-life balance for women.',
      'Collaborative, mission-driven atmosphere with real purpose.',
    ],
  },
  {
    name: 'Herzliya Medical Center',
    city: 'Herzliya',
    description: [
      'Leading private hospital known for patient care.',
      'Attracts international patients and elite doctors.',
      'Modern facilities and minimally invasive surgery.',
      'Supportive atmosphere for women professionals.',
      'Competitive benefits and career development.',
    ],
  },
  {
    name: 'Assuta Medical Center',
    city: 'Tel Aviv',
    description: [
      'Israel’s largest private hospital network.',
      'Focus on innovation and personalized care.',
      'Women lead in radiology, fertility, and research.',
      'Diverse, high-performing medical teams.',
      'Values collaboration, equity, and advancement.',
    ],
  },
  {
    name: 'Ramat Aviv Medical Center',
    city: 'Ramat Aviv',
    description: [
      'Upscale medical center with private specialists.',
      'Emphasis on discretion and comfort for patients.',
      'Work culture supports professional mothers.',
      'Opportunities in dermatology, wellness, diagnostics.',
    ],
  },
  {
    name: 'Be Well Clinics',
    city: 'Herzliya',
    description: [
      'Boutique health clinics with holistic approach.',
      'Flexible hours and part-time work options.',
      'Female leadership in administrative and care roles.',
      'Comfortable, wellness-focused work environment.',
    ],
  },
  {
    name: 'Harel Insurance - Health Division',
    city: 'Ramat Gan',
    description: [
      'Insurance provider with a strong healthcare unit.',
      'Offers telemedicine and advanced patient services.',
      'Women lead product design and client services.',
      'Promotes flexibility and hybrid work culture.',
    ],
  },
  {
    name: 'Phoenix Insurance - Health Division',
    city: 'Givatayim',
    description: [
      'Top insurer with growing digital health services.',
      'Focus on innovation, data science, and patient apps.',
      'Women are central in R&D and health tech design.',
      'Encourages mentorship and hybrid schedules.',
    ],
  },
  {
    name: 'Menora Mivtachim Health Insurance',
    city: 'Tel Aviv',
    description: [
      'Health insurance division within major firm.',
      'Offers employee wellness and fitness programs.',
      'Women involved in health plans and outreach.',
      'Balanced corporate structure with growth paths.',
    ],
  },
  {
    name: 'Bikur Rofeh Clinics',
    city: 'Nationwide',
    description: [
      'Walk-in clinic chain across Israel.',
      'Fast-paced, practical environment for all staff.',
      'Female physicians in urgent care and pediatrics.',
      'Part-time options for working mothers.',
    ],
  },
  {
    name: 'Terem - Emergency Care Centers',
    city: 'Nationwide',
    description: [
      'Emergency care centers offering quick service.',
      'Run by a diverse group of clinicians.',
      'Supportive for nurses and administrative staff.',
      '24/7 shifts allow flexible scheduling.',
    ],
  },
  {
    name: 'Mayanei Hayeshua Medical Center',
    city: 'Bnei Brak',
    description: [
      'Hospital with focus on halachic medicine.',
      'Respected OB-GYN and mental health departments.',
      'Supportive of ultra-Orthodox women professionals.',
      'Community-centered, mission-driven care.',
    ],
  },
  {
    name: 'Italian Hospital',
    city: 'Nazareth',
    description: [
      'Christian hospital with long-standing legacy.',
      'Small, compassionate care teams.',
      'Inclusive environment for Arab and Jewish staff.',
      'Strong nursing and pediatric programs.',
    ],
  },
  {
    name: 'French Hospital',
    city: 'Nazareth',
    description: [
      'Faith-based hospital serving diverse communities.',
      'Known for women-led midwifery and pediatrics.',
      'Warm, inclusive culture across departments.',
      'Mentorship programs for Arab women professionals.',
    ],
  },
  {
    name: 'English Hospital',
    city: 'Nazareth',
    description: [
      'Historic hospital with missionary roots.',
      'Offers internships and training for women.',
      'Focus on compassionate, holistic patient care.',
      'Respected surgical and internal medicine teams.',
    ],
  },
];

const companies2 = [
  {
    name: 'בתי החולים רפאל',
    city: 'תל אביב',
    description: [
      'בית חולים פרטי מודרני עם טכנולוגיות מתקדמות.',
      'מציע ניתוחים רובוטיים ומתקנים מתקדמים.',
      'תרבות צוות שיתופית עם דגש על חמלה.',
      'תומך בנשים בתפקידים טכנולוגיים.',
      'מקדם איזון בין עבודה לחיים ואינטליגנציה רגשית.',
    ],
  },
  {
    name: 'בית חולים שיקום רעות',
    city: 'תל אביב',
    description: [
      'עמותה עם משימה ותרבות מקיפה.',
      'נשים תופסות תפקידים מרכזיים בסיעוד, טיפול ושיקום.',
      'סביבה חמה כמו משפחה ועבודת צוות בין-תחומית.',
      'שעות עבודה גמישות לאיזון טוב יותר בין עבודה לחיים.',
      'קמפוס חדש גדול מביא הזדמנויות לצמיחה ומנהיגות.',
    ],
  },
  {
    name: 'מרכז רפואי שערי צדק',
    city: 'ירושלים',
    description: [
      'מציע מצוינות קלינית וצמיחה אקדמית.',
      'תרבות כוללת עם הנהגה נשית חזקה.',
      'ד"ר פאלוך-שימון מנהלת אונקולוגיה תוך כדי גידול של 3 ילדים.',
      'מקדם דו-קיום וכבוד בין עובדים יהודים וערבים.',
      'מוסיף יחידות ילדים, יילודים ובריאות נשים.',
      'תפקידים גמישים תומכים באיזון בין עבודה לחיים לנשים.',
      'אווירה שיתופית, מונעת משימה עם משמעות אמיתית.',
    ],
  },
  {
    name: 'מרכז רפואי הרצליה',
    city: 'הרצליה',
    description: [
      'בית חולים פרטי מוביל הידוע בטיפול בחולים.',
      'מושך חולים בינלאומיים ורופאים מובילים.',
      'מתקנים מודרניים וניתוחים פולשניים מינימליים.',
      'אווירה תומכת לנשים מקצועיות.',
      'הטבות תחרותיות ופיתוח קריירה.',
    ],
  },
  {
    name: 'מרכז רפואי אסותא',
    city: 'תל אביב',
    description: [
      'רשת בתי החולים הפרטית הגדולה בישראל.',
      'מתמקד בחדשנות וטיפול מותאם אישית.',
      'נשים מובילות ברדיולוגיה, פוריות ומחקר.',
      'צוותים רפואיים מגוונים ובעלי ביצועים גבוהים.',
      'מעריך שיתוף פעולה, שוויון וקידום.',
    ],
  },
  {
    name: 'מרכז רפואי רמת אביב',
    city: 'רמת אביב',
    description: [
      'מרכז רפואי יוקרתי עם מומחים פרטיים.',
      'דגש על דיסקרטיות ונוחות למטופלים.',
      'תרבות עבודה התומכת באימהות מקצועיות.',
      'הזדמנויות בתחום הדרמטולוגיה, בריאות ואבחון.',
    ],
  },
  {
    name: 'מרפאות Be Well',
    city: 'הרצליה',
    description: [
      'מרפאות בוטיק בגישה הוליסטית.',
      'שעות גמישות ואפשרויות עבודה חלקית.',
      'הנהגה נשית בתפקידים מנהליים וטיפוליים.',
      'סביבת עבודה נוחה המתמקדת ברווחה.',
    ],
  },
  {
    name: 'הראל ביטוח – מחלקת בריאות',
    city: 'רמת גן',
    description: [
      'ספק ביטוח עם יחידת בריאות חזקה.',
      'מציע טלרפואה ושירותי מטופלים מתקדמים.',
      'נשים מובילות בעיצוב מוצרים ושירות לקוחות.',
      'מקדם גמישות ותרבות עבודה היברידית.',
    ],
  },
  {
    name: 'פיניקס ביטוח – מחלקת בריאות',
    city: 'גבעתיים',
    description: [
      'מבטח מוביל עם שירותי בריאות דיגיטליים מתפתחים.',
      'מתמקד בחדשנות, מדעי נתונים ואפליקציות מטופלים.',
      'נשים מרכזיות במחקר ופיתוח ועיצוב טכנולוגיות בריאות.',
      'מעודד מנטורינג ולוחות זמנים היברידיים.',
    ],
  },
  {
    name: 'מנורה מבטחים ביטוח בריאות',
    city: 'תל אביב',
    description: [
      'מחלקת ביטוח בריאות בתוך חברה גדולה.',
      'מציעה תוכניות רווחה וכושר לעובדים.',
      'נשים מעורבות בתוכניות בריאות והסברה.',
      'מבנה ארגוני מאוזן עם אפשרויות קידום.',
    ],
  },
  {
    name: 'מרפאות ביקור רופא',
    city: 'ארצי',
    description: [
      'רשת מרפאות ללא תור בכל רחבי ישראל.',
      'סביבה מהירה ומעשית לכל הצוות.',
      'רופאות נשים בטיפול דחוף וילדים.',
      'אפשרויות עבודה חלקית לאמהות עובדות.',
    ],
  },
  {
    name: 'טרם – מרכזי טיפול חירום',
    city: 'ארצי',
    description: [
      'מרכזי טיפול חירום עם שירות מהיר.',
      'מופעלים על ידי צוות מגוון של קלינאים.',
      'תומכים באחיות וצוות מנהלתי.',
      'משמרות 24/7 מאפשרות תזמון גמיש.',
    ],
  },
  {
    name: 'מרכז רפואי מיאני הישועה',
    city: 'בני ברק',
    description: [
      'בית חולים המתמקד ברפואה הלכתית.',
      'מחלקות יולדות ובריאות הנפש מכובדות.',
      'תומך בנשים חרדיות מקצועיות.',
      'טיפול קהילתי ומונחה משימה.',
    ],
  },
  {
    name: 'בית החולים האיטלקי',
    city: 'נצרת',
    description: [
      'בית חולים נוצרי עם מסורת ארוכת שנים.',
      'צוותי טיפול קטנים ומלאי חמלה.',
      'סביבה מקיפה לעובדים ערבים ויהודים.',
      'תוכניות חזקות לסיעוד ולרפואת ילדים.',
    ],
  },
  {
    name: 'בית החולים הצרפתי',
    city: 'נצרת',
    description: [
      'בית חולים דתי המשרת קהילות מגוונות.',
      'ידוע במיילדות וילדים בהובלת נשים.',
      'תרבות חמה ומכילה בכל המחלקות.',
      'תוכניות מנטורינג לנשים ערביות מקצועיות.',
    ],
  },
  {
    name: 'בית החולים האנגלי',
    city: 'נצרת',
    description: [
      'בית חולים היסטורי עם שורשים מיסיונריים.',
      'מציע התמחות והכשרה לנשים.',
      'מתמקד בטיפול חומל ושלם למטופלים.',
      'צוותי ניתוח ורפואה פנימית מכובדים.',
    ],
  },
];


const companies1 = [
  {
    name: 'مستشفيات رافائيل',
    city: 'تل أبيب',
    description: [
      'مستشفى خاص حديث مع تقنيات متقدمة.',
      'يقدم جراحة روبوتية ومرافق عالية التقنية.',
      'ثقافة فريق تعاونية مع التركيز على التعاطف.',
      'داعم للنساء في الأدوار التقنية.',
      'يروج لتوازن الحياة والعمل والذكاء العاطفي.',
    ],
  },
  {
    name: 'مستشفى روث لإعادة التأهيل',
    city: 'تل أبيب',
    description: [
      'مؤسسة غير ربحية ذات مهمة وثقافة شاملة.',
      'النساء يشغلن أدوارًا رئيسية في التمريض والعلاج وإعادة التأهيل.',
      'بيئة دافئة تشبه العائلة وعمل فريق متعدد التخصصات.',
      'ساعات عمل مرنة لتحقيق توازن أفضل بين الحياة والعمل.',
      'حرم جديد كبير يجلب فرص نمو ومسارات قيادية.',
    ],
  },
  {
    name: 'مركز شعاريه صيدق الطبي',
    city: 'القدس',
    description: [
      'يقدم التميز السريري والنمو الأكاديمي.',
      'ثقافة شاملة مع قيادة نسائية قوية.',
      'الدكتورة بالوخ شيمون تقود قسم الأورام بينما تربي 3 أطفال.',
      'يروج لتعايش واحترام الموظفين اليهود والعرب.',
      'توسيع وحدات الأطفال، حديثي الولادة وصحة المرأة.',
      'الأدوار المرنة تدعم توازن الحياة والعمل للنساء.',
      'جو تعاوني وموجه بالمهمة ذات غاية حقيقية.',
    ],
  },
  {
    name: 'مركز هرتسليا الطبي',
    city: 'هرتسليا',
    description: [
      'مستشفى خاص رائد معروف برعاية المرضى.',
      'يجذب مرضى دوليين وأطباء نخبة.',
      'مرافق حديثة وجراحة قليلة التوغل.',
      'جو داعم للنساء المحترفات.',
      'مزايا تنافسية وتطوير مهني.',
    ],
  },
  {
    name: 'مركز أسوتا الطبي',
    city: 'تل أبيب',
    description: [
      'أكبر شبكة مستشفيات خاصة في إسرائيل.',
      'يركز على الابتكار والرعاية الشخصية.',
      'النساء يقودن في الأشعة والخصوبة والبحوث.',
      'فرق طبية متنوعة وعالية الأداء.',
      'يقدر التعاون، العدالة والتقدم.',
    ],
  },
  {
    name: 'مركز رamat Aviv الطبي',
    city: 'رامات أفيف',
    description: [
      'مركز طبي راقٍ مع أخصائيين خاصين.',
      'التركيز على الخصوصية وراحة المرضى.',
      'ثقافة عمل تدعم الأمهات المحترفات.',
      'فرص في الجلدية والعافية والتشخيص.',
    ],
  },
  {
    name: 'عيادات Be Well',
    city: 'هرتسليا',
    description: [
      'عيادات صحية بوتيكية ذات نهج شامل.',
      'ساعات عمل مرنة وخيارات دوام جزئي.',
      'قيادة نسائية في الأدوار الإدارية والرعائية.',
      'بيئة عمل مريحة تركز على العافية.',
    ],
  },
  {
    name: 'هاريل للتأمين – قسم الصحة',
    city: 'رامات غان',
    description: [
      'مزود تأمين مع وحدة رعاية صحية قوية.',
      'يقدم خدمات الطب عن بُعد وخدمات متقدمة للمرضى.',
      'النساء يقودن تصميم المنتجات وخدمات العملاء.',
      'يروج للمرونة وثقافة العمل الهجينة.',
    ],
  },
  {
    name: 'فونكس للتأمين – قسم الصحة',
    city: 'جفعاتايم',
    description: [
      'شركة تأمين رائدة مع خدمات صحية رقمية متنامية.',
      'يركز على الابتكار وعلوم البيانات وتطبيقات المرضى.',
      'النساء محوريات في البحث والتطوير وتصميم التكنولوجيا الصحية.',
      'يشجع برامج التوجيه والجداول الهجينة.',
    ],
  },
  {
    name: 'مينورا ميفتاحيم للتأمين الصحي',
    city: 'تل أبيب',
    description: [
      'قسم التأمين الصحي ضمن شركة كبيرة.',
      'يقدم برامج صحة ولياقة للموظفين.',
      'النساء مشاركات في خطط الصحة والتواصل.',
      'هيكل مؤسسي متوازن مع فرص نمو.',
    ],
  },
  {
    name: 'عيادات بیکور روفيه',
    city: 'في جميع أنحاء البلاد',
    description: [
      'سلسلة عيادات بدون موعد مسبق في إسرائيل.',
      'بيئة عمل سريعة وعملية لجميع الموظفين.',
      'طبيبات نساء في الرعاية العاجلة وطب الأطفال.',
      'خيارات دوام جزئي للأمهات العاملات.',
    ],
  },
  {
    name: 'مراكز الطوارئ ترم',
    city: 'في جميع أنحاء البلاد',
    description: [
      'مراكز رعاية طارئة تقدم خدمة سريعة.',
      'تدار من قبل مجموعة متنوعة من الأطباء.',
      'داعم للممرضات وطاقم الإدارة.',
      'نوبات 24/7 تسمح بجدولة مرنة.',
    ],
  },
  {
    name: 'مركز مایاني هيشوع الطبي',
    city: 'بني براك',
    description: [
      'مستشفى يركز على الطب الحلالي.',
      'أقسام نسائية وتوليد وصحة نفسية محترمة.',
      'داعم للنساء المحترفات من ultra-Orthodox.',
      'رعاية مجتمعية موجهة بالمهمة.',
    ],
  },
  {
    name: 'المستشفى الإيطالي',
    city: 'الناصرة',
    description: [
      'مستشفى مسيحي ذو إرث طويل.',
      'فرق رعاية صغيرة ومتعاطفة.',
      'بيئة شاملة للموظفين العرب واليهود.',
      'برامج قوية للتمريض وطب الأطفال.',
    ],
  },
  {
    name: 'المستشفى الفرنسي',
    city: 'الناصرة',
    description: [
      'مستشفى ديني يخدم مجتمعات متنوعة.',
      'معروف بقيادة نسائية في التوليد وطب الأطفال.',
      'ثقافة دافئة وشاملة عبر الأقسام.',
      'برامج توجيه للنساء العربيات المحترفات.',
    ],
  },
  {
    name: 'المستشفى الإنجليزي',
    city: 'الناصرة',
    description: [
      'مستشفى تاريخي بجذور تبشيرية.',
      'يقدم تدريبًا وفرص تدريبية للنساء.',
      'يركز على رعاية شاملة وتعاطفية للمرضى.',
      'فرق جراحة وطب داخلي محترمة.',
    ],
  },
];


export default function HealthCare() {
  const [expanded, setExpanded] = useState({});
  const [animations] = useState(companies.map(() => new Animated.Value(1)));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const {if2,setIf2} = useLanguage(); 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCardPress = (idx, route) => {
    Animated.sequence([
      Animated.timing(animations[idx], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations[idx], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
      if (route) router.push(route);
    });
  };
if(if2===0){
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')}
            style={styles.photoHeader}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardsContainer}>
          {companies.map((company, idx) => (
            <Animated.View
              key={company.name}
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: animations[idx] }],
                marginBottom: 20,
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={styles.companyCard}
                activeOpacity={0.9}
                onPress={() => handleCardPress(idx, company.route)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.logoContainer}>
                    <MaterialIcons name="local-hospital" size={32} color="#003366" />
                  </View>
                  <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{company.name}</Text>
                    <View style={styles.locationContainer}>
                      <Ionicons name="location" size={14} color="#6c757d" />
                      <Text style={styles.city}>{company.city}</Text>
                    </View>
                  </View>
                </View>

                {expanded[idx] && (
                  <View style={styles.expandedContent}>
                    {company.description.map((point, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <View style={styles.bulletCircle} />
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
if(if2===1){
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')}
            style={styles.photoHeader}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardsContainer}>
          {companies1.map((company, idx) => (
            <Animated.View
              key={company.name}
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: animations[idx] }],
                marginBottom: 20,
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={styles.companyCard}
                activeOpacity={0.9}
                onPress={() => handleCardPress(idx, company.route)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.logoContainer}>
                    <MaterialIcons name="local-hospital" size={32} color="#003366" />
                  </View>
                  <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{company.name}</Text>
                    <View style={styles.locationContainer}>
                      <Ionicons name="location" size={14} color="#6c757d" />
                      <Text style={styles.city}>{company.city}</Text>
                    </View>
                  </View>
                </View>

                {expanded[idx] && (
                  <View style={styles.expandedContent}>
                    {company.description.map((point, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <View style={styles.bulletCircle} />
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
if(if2===2){
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.photoHeaderContainer}>
          <Image
            source={require('../../../assets/images/nobackgroundlogo.png')}
            style={styles.photoHeader}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardsContainer}>
          {companies2.map((company, idx) => (
            <Animated.View
              key={company.name}
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: animations[idx] }],
                marginBottom: 20,
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={styles.companyCard}
                activeOpacity={0.9}
                onPress={() => handleCardPress(idx, company.route)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.logoContainer}>
                    <MaterialIcons name="local-hospital" size={32} color="#003366" />
                  </View>
                  <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{company.name}</Text>
                    <View style={styles.locationContainer}>
                      <Ionicons name="location" size={14} color="#6c757d" />
                      <Text style={styles.city}>{company.city}</Text>
                    </View>
                  </View>
                </View>

                {expanded[idx] && (
                  <View style={styles.expandedContent}>
                    {company.description.map((point, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <View style={styles.bulletCircle} />
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  photoHeaderContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 90,
    marginBottom: 20,
  },
  photoHeader: {
    width: '100%',
    height: '100%',
  },
  cardsContainer: {
    paddingHorizontal: 24,
  },
  companyCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#041E42',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#e9f1fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  city: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 4,
  },
  expandedContent: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
  },
  bulletItem: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 8,
},
bulletCircle: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#003366',
  marginTop: 6,
  marginRight: 10,
},
bulletText: {
  flex: 1,
  fontSize: 17,
  color: '#444',
  lineHeight: 22,
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

});
