import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../../LanguageContext';

export default function IsraelAerospaceIndustries() {
  const {if2,useIf2} = useLanguage(); 
if(if2===0){  // English
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.decorativeLine} />
        {/* No specific icon - can add one if needed */}
        <Text style={styles.header}>Israel Aerospace Industries (IAI)</Text>
        <View style={styles.decorativeLine} />

        <Text style={styles.subHeader}>Lod, Israel</Text>

        <Text style={styles.paragraph}>
          IAI, Israel’s flagship aerospace and defense company, is actively working to break gender stereotypes in one of the most male-dominated industries. The company supports women engineers, scientists, and managers through internal networks, educational partnerships, and outreach programs aimed at increasing female representation in STEM.
        </Text>

        <Text style={styles.paragraph}>
          IAI promotes <Text style={styles.highlight}>equal pay</Text>, flexible scheduling, and advancement opportunities that make it a strong option for women seeking long-term career development in high-impact roles.
        </Text>

        <Text style={styles.paragraph}>
          For women who aspire to shape the future of aerospace and innovation, IAI offers a stable yet dynamic platform for professional success.
        </Text>
      </View>
    </ScrollView>
  );
}

if(if2===1){  // Arabic
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.decorativeLine} />
        {/* لا يوجد أيقونة محددة - يمكن إضافة واحدة إذا لزم الأمر */}
        <Text style={styles.header}>الصناعات الجوية الفضائية الإسرائيلية (IAI)</Text>
        <View style={styles.decorativeLine} />

        <Text style={styles.subHeader}>لود، إسرائيل</Text>

        <Text style={styles.paragraph}>
          تعمل IAI، الشركة الرائدة في مجال الطيران والدفاع في إسرائيل، بنشاط على كسر الصور النمطية المتعلقة بالجنس في واحدة من أكثر الصناعات التي يهيمن عليها الرجال. تدعم الشركة المهندسات والعالمات والمديرات من خلال الشبكات الداخلية والشراكات التعليمية وبرامج التوعية التي تهدف إلى زيادة تمثيل النساء في مجالات العلوم والتكنولوجيا والهندسة والرياضيات.
        </Text>

        <Text style={styles.paragraph}>
          تشجع IAI على <Text style={styles.highlight}>المساواة في الأجور</Text>، وتنظيم جداول عمل مرنة، وفرص التقدم الوظيفي، مما يجعلها خيارًا قويًا للنساء الساعيات لتطوير مهني طويل الأمد في أدوار ذات تأثير كبير.
        </Text>

        <Text style={styles.paragraph}>
          للنساء اللواتي يطمحن إلى تشكيل مستقبل الطيران والابتكار، تقدم IAI منصة مستقرة وديناميكية للنجاح المهني.
        </Text>
      </View>
    </ScrollView>
  );
}

if(if2===2){  // Hebrew
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.decorativeLine} />
        {/* אין אייקון ספציפי - אפשר להוסיף אייקון לפי הצורך */}
        <Text style={styles.header}>התעשייה האווירית לישראל (IAI)</Text>
        <View style={styles.decorativeLine} />

        <Text style={styles.subHeader}>לוד, ישראל</Text>

        <Text style={styles.paragraph}>
          התעשייה האווירית לישראל, החברה המובילה בתחום התעופה והביטחון, פועלת באופן פעיל לשבור סטריאוטיפים מגדריים באחת התעשיות הנשלטות בעיקר על ידי גברים. החברה תומכת במהנדסות, מדעניות ומנהלות באמצעות רשתות פנימיות, שותפויות חינוכיות ותכניות הגעה שמטרתן להגדיל את נציגות הנשים בתחומי STEM.
        </Text>

        <Text style={styles.paragraph}>
          IAI מקדמת <Text style={styles.highlight}>תשלום שווה</Text>, גמישות בשעות העבודה, והזדמנויות קידום שהופכות אותה לאפשרות חזקה לנשים המחפשות התפתחות מקצועית ארוכת טווח בתפקידים בעלי השפעה משמעותית.
        </Text>

        <Text style={styles.paragraph}>
          לנשים השואפות לעצב את עתיד התעופה והחדשנות, IAI מציעה פלטפורמה יציבה ודינמית להצלחה מקצועית.
        </Text>
      </View>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f5e9',  // light green background
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    maxWidth: 700,
    shadowColor: '#388e3c', // darker green shadow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  decorativeLine: {
    height: 4,
    width: 60,
    backgroundColor: '#2e7d32',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 18,
    color: '#43a047',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    color: '#1b5e20',
    lineHeight: 26,
    marginBottom: 18,
    textAlign: 'justify',
  },
  highlight: {
    color: '#33691e',
    fontWeight: '600',
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
