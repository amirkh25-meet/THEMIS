import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../../LanguageContext';

export default function BankLeumi() {
  const {if2,useIf2} = useLanguage(); 
 if(if2===0){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bank Leumi</Text>
        <Text style={styles.paragraph}>
          Bank Leumi is one of Israel’s leading banking institutions and a pioneer in promoting gender
          equality in the finance sector. The bank has a strong history of female leadership and is widely
          recognized for its efforts to modernize and digitize the banking experience.
        </Text>
        <Text style={styles.paragraph}>
          Bank Leumi invests in employee development through innovative programs that encourage career
          growth — especially for women seeking to transition into high-tech roles or advance into
          leadership positions. As a woman working at Leumi, you’ll find an inclusive culture that values
          your voice, supports your professional development, and provides meaningful opportunities for
          advancement.
        </Text>
      </View>
    </ScrollView>
  );
}if(if2 === 1){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>بنك لئومي</Text>
        <Text style={styles.paragraph}>
          بنك لئومي هو أحد المؤسسات المصرفية الرائدة في إسرائيل ورائد في تعزيز المساواة بين الجنسين في قطاع المالية.
          يمتلك البنك تاريخًا قويًا من القيادة النسائية ويُعترف به على نطاق واسع لجهوده في تحديث ورقمنة تجربة البنوك.
        </Text>
        <Text style={styles.paragraph}>
          يستثمر بنك لئومي في تطوير الموظفين من خلال برامج مبتكرة تشجع على نمو المسار المهني — خاصةً للنساء اللاتي يسعين للانتقال إلى أدوار التكنولوجيا العالية أو التقدم إلى مناصب قيادية.
          كامرأة تعمل في لئومي، ستجدين ثقافة شاملة تقدر صوتك، وتدعم تطورك المهني، وتوفر فرصًا ذات معنى للتقدم.
        </Text>
      </View>
    </ScrollView>
  );
}
if(if2 === 2){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>בנק לאומי</Text>
        <Text style={styles.paragraph}>
          בנק לאומי הוא אחד המוסדות הבנקאיים המובילים בישראל וחלוץ בקידום שוויון מגדרי במגזר הפיננסים.
          לבנק היסטוריה חזקה של הנהגה נשית ומוכר רחבה על מאמציו למודרניזציה ודיגיטציה של חוויית הבנקאות.
        </Text>
        <Text style={styles.paragraph}>
          בנק לאומי משקיע בפיתוח העובדים דרך תוכניות חדשניות שמעודדות צמיחה מקצועית — במיוחד לנשים המחפשות לעבור לתפקידים בהייטק או להתקדם לתפקידי מנהיגות.
          כאישה העובדת בליאומי, תמצאי תרבות כוללנית שמעריכה את קולך, תומכת בהתפתחותך המקצועית ומספקת הזדמנויות משמעותיות לקידום.
        </Text>
      </View>
    </ScrollView>
  );
}

}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#003366', // Leumi brand-like color
    marginBottom: 18,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#343a40',
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'left',
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
