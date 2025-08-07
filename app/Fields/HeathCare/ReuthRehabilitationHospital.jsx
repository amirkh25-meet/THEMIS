import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../../LanguageContext';

export default function ReuthRehabilitationHospital() {
  const {if2,setIf2} = useLanguage(); 
  
  if(if2===0){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="hospital-building" size={48} color="#2a5298" style={styles.icon} />
        <Text style={styles.header}>Reuth Rehabilitation Hospital</Text>
        <Text style={styles.subHeader}>Tel Aviv, Israel</Text>

        <Text style={styles.paragraph}>
          Reuth Rehabilitation Hospital in Tel Aviv offers an especially attractive workplace for women in healthcare, combining a <Text style={styles.highlight}>mission-driven environment</Text> with strong professional support. As Israel’s largest rehabilitation center, Reuth is dedicated to helping patients regain independence and dignity—making it a <Text style={styles.highlight}>deeply meaningful place to work.</Text>
        </Text>

        <Text style={styles.paragraph}>
          Many core roles at Reuth, including nursing, physiotherapy, and occupational therapy, are <Text style={styles.highlight}>female-majority professions</Text>, and the hospital’s collaborative, interdisciplinary care model ensures women’s voices are integral to patient outcomes.
        </Text>

        <Text style={styles.paragraph}>
          With a major new campus in development, there will be growing opportunities for <Text style={styles.highlight}>advancement, leadership, and professional development.</Text> Reuth is known for its warm, inclusive culture, often described as family-like, where cooperation and respect are highly valued.
        </Text>

        <Text style={styles.paragraph}>
          For women seeking work-life balance, many clinical roles offer <Text style={styles.highlight}>part-time or flexible scheduling options.</Text> As a nonprofit institution, Reuth prioritizes ethical practices and gender inclusivity more effectively than large bureaucratic systems.
        </Text>

        <Text style={styles.paragraph}>
          With its expanding vision, supportive environment, and commitment to human-centered care, Reuth presents a <Text style={styles.highlight}>compelling opportunity for women</Text> looking to make a real difference in healthcare while growing their careers.
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
        <Text style={styles.header}>مستشفى روث لإعادة التأهيل</Text>
        <Text style={styles.subHeader}>تل أبيب، إسرائيل</Text>

        <Text style={styles.paragraph}>
          يقدم مستشفى روث لإعادة التأهيل في تل أبيب بيئة عمل جذابة بشكل خاص للنساء في مجال الرعاية الصحية، حيث يجمع بين <Text style={styles.highlight}>بيئة مدفوعة بالمهمة</Text> ودعم مهني قوي. باعتباره أكبر مركز إعادة تأهيل في إسرائيل، يكرس روث جهوده لمساعدة المرضى على استعادة الاستقلالية والكرامة — مما يجعله <Text style={styles.highlight}>مكانًا ذا معنى عميق للعمل.</Text>
        </Text>

        <Text style={styles.paragraph}>
          العديد من الأدوار الأساسية في روث، بما في ذلك التمريض والعلاج الطبيعي والعلاج الوظيفي، هي <Text style={styles.highlight}>مهن يهيمن عليها النساء</Text>، ويضمن نموذج الرعاية التعاونية والمتعدد التخصصات أن تكون أصوات النساء جزءًا لا يتجزأ من نتائج المرضى.
        </Text>

        <Text style={styles.paragraph}>
          مع وجود حرم جامعي جديد قيد التطوير، ستتوسع فرص <Text style={styles.highlight}>التقدم والقيادة والتطوير المهني.</Text> يشتهر روث بثقافته الدافئة والشاملة، وغالبًا ما يوصف بأنها تشبه العائلة، حيث يُقدر التعاون والاحترام بشكل كبير.
        </Text>

        <Text style={styles.paragraph}>
          بالنسبة للنساء الباحثات عن توازن بين الحياة والعمل، تقدم العديد من الأدوار السريرية <Text style={styles.highlight}>خيارات دوام جزئي أو جداول زمنية مرنة.</Text> كمؤسسة غير ربحية، يولي روث الأولوية للممارسات الأخلاقية والشمولية بين الجنسين بشكل أكثر فعالية من الأنظمة البيروقراطية الكبيرة.
        </Text>

        <Text style={styles.paragraph}>
          برؤيتها المتوسعة وبيئتها الداعمة والتزامها بالرعاية المرتكزة على الإنسان، يقدم روث <Text style={styles.highlight}>فرصة جذابة للنساء</Text> اللواتي يرغبن في إحداث فرق حقيقي في مجال الرعاية الصحية مع تطوير مساراتهن المهنية.
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
        <Text style={styles.header}>מרכז רפואה שיקומית רות</Text>
        <Text style={styles.subHeader}>תל אביב, ישראל</Text>

        <Text style={styles.paragraph}>
          מרכז רפואה שיקומית רות בתל אביב מציע סביבת עבודה אטרקטיבית במיוחד לנשים בתחום הבריאות, המשלבת <Text style={styles.highlight}>סביבה ממוקדת מטרה</Text> עם תמיכה מקצועית חזקה. כרשת השיקום הגדולה בישראל, רות מחויב לעזור למטופלים להשיב לעצמאות ולכבוד – מה שהופך אותו ל-<Text style={styles.highlight}>מקום עבודה בעל משמעות עמוקה.</Text>
        </Text>

        <Text style={styles.paragraph}>
          תפקידים מרכזיים רבים ברות, כולל אחיות, פיזיותרפיה וטרפיה תעסוקתית, הם <Text style={styles.highlight}>מקצועות בהם נשים הן הרוב</Text>, ומודל הטיפול השיתופי והבין-תחומי של בית החולים מבטיח שקולם של הנשים הוא חלק בלתי נפרד מתוצאות הטיפול.
        </Text>

        <Text style={styles.paragraph}>
          עם קמפוס חדש משמעותי בפיתוח, צפויות הזדמנויות גוברת ל-<Text style={styles.highlight}>קידום, מנהיגות ופיתוח מקצועי.</Text> רות ידועה בתרבות החמה והכוללת שלה, המתוארת לעיתים קרובות כמשפחתית, שבה שיתופי פעולה וכבוד מוערכים מאוד.
        </Text>

        <Text style={styles.paragraph}>
          לנשים המחפשות איזון בין עבודה לחיים, תפקידים רבים בתחום הקליני מציעים <Text style={styles.highlight}>אפשרויות משרה חלקית או גמישות בשעות.</Text> בתור מוסד ללא מטרות רווח, רות מדגישה עקרונות אתיים ושוויון מגדרי בצורה יעילה יותר מאשר מערכות בירוקרטיות גדולות.
        </Text>

        <Text style={styles.paragraph}>
          עם חזון מתרחב, סביבה תומכת ומחויבות לטיפול ממוקד אדם, רות מציע <Text style={styles.highlight}>הזדמנות משמעותית לנשים</Text> המעוניינות לעשות שינוי אמיתי בתחום הבריאות תוך כדי התפתחות מקצועית.
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
