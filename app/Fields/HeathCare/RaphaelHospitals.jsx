import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../LanguageContext';

export default function RaphaelHospitals() {
  const {if2,setIf2} = useLanguage(); 
 
 if(if2===0){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="hospital-building" size={48} color="#2a5298" style={styles.icon} />
        <Text style={styles.header}>Raphael Hospitals</Text>
        <Text style={styles.subHeader}>Tel Aviv, Israel</Text>
        
        <Text style={styles.paragraph}>
          Raphael Hospitals in Tel Aviv is a <Text style={styles.highlight}>modern, privately operated medical center</Text> known for its <Text style={styles.highlight}>advanced technologies</Text>, personalized care, and emphasis on innovation. It offers state-of-the-art surgical tools like <Text style={styles.highlight}>robotic systems</Text> for orthopedic and laparoscopic procedures, creating a cutting-edge environment.
        </Text>
        
        <Text style={styles.paragraph}>
          While smaller in scale than major public hospitals, Raphael fosters a <Text style={styles.highlight}>close-knit multidisciplinary team culture</Text> combining clinical precision with deep attention to patient well-being.
        </Text>

        <Text style={styles.paragraph}>
          For women in healthcare, Raphael presents an environment valuing <Text style={styles.highlight}>compassion, collaboration, and clinical excellence</Text>, with opportunities for growth in high-tech and specialized fields.
        </Text>

        <Text style={styles.paragraph}>
          Its boutique size and private setting allow for <Text style={styles.highlight}>flexibility, personalized recognition,</Text> and better work-life balance. Women in nursing, anesthesia, diagnostics, and surgical assistance roles thrive in a culture emphasizing <Text style={styles.highlight}>teamwork and emotional intelligence.</Text>
        </Text>

        <Text style={styles.paragraph}>
          Though gender equality policies are not publicly disclosed, Raphael’s holistic and respectful approach suggests a culture where <Text style={styles.highlight}>women’s contributions are essential and respected.</Text>
        </Text>

        <Text style={styles.paragraph}>
          For women seeking a <Text style={styles.highlight}>fulfilling, progressive, and supportive workplace</Text> in a forward-looking medical institution, Raphael Hospitals offers a compelling opportunity.
        </Text>
      </View>
    </ScrollView>
  );
}

if(if2 === 1){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="hospital-building" size={48} color="#2a5298" style={styles.icon} />
        <Text style={styles.header}>مستشفيات رافائيل</Text>
        <Text style={styles.subHeader}>تل أبيب، إسرائيل</Text>

        <Text style={styles.paragraph}>
          مستشفيات رافائيل في تل أبيب هي <Text style={styles.highlight}>مركز طبي خاص حديث</Text> معروف بـ <Text style={styles.highlight}>التقنيات المتقدمة</Text> والرعاية الشخصية والتركيز على الابتكار. يقدم أدوات جراحية متطورة مثل <Text style={styles.highlight}>الأنظمة الروبوتية</Text> لإجراءات العظام والتنظير البطني، مما يخلق بيئة متقدمة للغاية.
        </Text>

        <Text style={styles.paragraph}>
          على الرغم من صغر حجمه مقارنة بالمستشفيات العامة الكبرى، تعزز رافائيل <Text style={styles.highlight}>ثقافة فريق متعدد التخصصات مترابطة</Text> تجمع بين الدقة السريرية والاهتمام العميق برفاهية المرضى.
        </Text>

        <Text style={styles.paragraph}>
          بالنسبة للنساء في مجال الرعاية الصحية، تقدم رافائيل بيئة تقدر <Text style={styles.highlight}>التعاطف، التعاون، والتفوق السريري</Text>، مع فرص للنمو في المجالات التقنية والمتخصصة.
        </Text>

        <Text style={styles.paragraph}>
          حجمها البوتيكي وإعدادها الخاص يسمحان بـ <Text style={styles.highlight}>المرونة، التقدير الشخصي،</Text> وتوازن أفضل بين الحياة والعمل. تزدهر النساء في التمريض والتخدير والتشخيص والمساعدة الجراحية في ثقافة تؤكد على <Text style={styles.highlight}>العمل الجماعي والذكاء العاطفي.</Text>
        </Text>

        <Text style={styles.paragraph}>
          رغم أن سياسات المساواة بين الجنسين غير معلنة علنًا، فإن النهج الشامل والمحترم لرافائيل يشير إلى ثقافة حيث <Text style={styles.highlight}>مساهمات النساء ضرورية وتحظى بالاحترام.</Text>
        </Text>

        <Text style={styles.paragraph}>
          للنساء الباحثات عن <Text style={styles.highlight}>مكان عمل مرضٍ، تقدمي، وداعم</Text> في مؤسسة طبية متطلعة للمستقبل، تقدم مستشفيات رافائيل فرصة جذابة.
        </Text>
      </View>
    </ScrollView>
  );
}


if(if2 === 2){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="hospital-building" size={48} color="#2a5298" style={styles.icon} />
        <Text style={styles.header}>בתי החולים רפאל</Text>
        <Text style={styles.subHeader}>תל אביב, ישראל</Text>

        <Text style={styles.paragraph}>
          בתי החולים רפאל בתל אביב הם <Text style={styles.highlight}>מרכז רפואי פרטי מודרני</Text> הידוע ב-<Text style={styles.highlight}>טכנולוגיות מתקדמות</Text>, טיפול מותאם אישית ודגש על חדשנות. הוא מציע כלים כירורגיים מתקדמים כגון <Text style={styles.highlight}>מערכות רובוטיות</Text> לניתוחים אורטופדיים ולפרוסקופיים, היוצרים סביבה חדשנית.
        </Text>

        <Text style={styles.paragraph}>
          למרות היותו קטן יותר בהיקפו מבתי חולים ציבוריים גדולים, רפאל מקדם <Text style={styles.highlight}>תרבות צוות רב-תחומית מלוכדת</Text> שמשלבת דיוק קליני עם תשומת לב עמוקה לרווחת המטופלים.
        </Text>

        <Text style={styles.paragraph}>
          לנשים בתחום הבריאות, רפאל מציע סביבה המעריכה <Text style={styles.highlight}>חמלה, שיתוף פעולה ומצוינות קלינית</Text>, עם הזדמנויות לצמיחה בתחומים טכנולוגיים ומיוחדים.
        </Text>

        <Text style={styles.paragraph}>
          גודלו הבוטיקי וההקשר הפרטי מאפשרים <Text style={styles.highlight}>גמישות, הכרה אישית</Text> ואיזון טוב יותר בין עבודה לחיים. נשים בתפקידים כמו סיעוד, הרדמה, אבחון וסיוע כירורגי פורחות בתרבות המדגישה <Text style={styles.highlight}>עבודת צוות ואינטליגנציה רגשית.</Text>
        </Text>

        <Text style={styles.paragraph}>
          למרות שעדיין לא פורסמו מדיניות שוויון מגדרי, הגישה הכוללת והמורכבת של רפאל מציעה תרבות שבה <Text style={styles.highlight}>התרומות של נשים הן חיוניות ומכובדות.</Text>
        </Text>

        <Text style={styles.paragraph}>
          לנשים המחפשות <Text style={styles.highlight}>מקום עבודה מספק, מתקדם ותומך</Text> במוסד רפואי מבטיח, בתי החולים רפאל מציעים הזדמנות משמעותית.
        </Text>
      </View>
    </ScrollView>
  );
}



}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f0fe',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    maxWidth: 700,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2a5298',
    textAlign: 'center',
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 18,
    color: '#6b7a99',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    color: '#3a3f58',
    lineHeight: 28,
    marginBottom: 18,
    textAlign: 'justify',
  },
  highlight: {
    color: '#1f3c88',
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
