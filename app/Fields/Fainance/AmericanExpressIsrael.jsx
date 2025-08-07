import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useLanguage } from '../../LanguageContext';

export default function AmericanExpressIsrael() {
 const {if2, setIf2}= useLanguage()
 if(if2===0){ 
 return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>American Express Israel</Text>
        <Text style={styles.paragraph}>
          American Express Israel offers a workplace culture built on trust, flexibility, and fairness.
          Recognized consistently as one of the top employers for women, the company nurtures a supportive
          environment through internal networks and mentoring programs that uplift women at every stage
          of their careers.
        </Text>
        <Text style={styles.paragraph}>
          Women at AmEx benefit from career development initiatives, wellness programs, and flexible work
          arrangements that help them balance personal and professional growth. It’s a place where women
          are empowered to lead, grow, and thrive — supported by a global culture of inclusion and equity.
        </Text>
      </View>
    </ScrollView>
  );
}
if(if2 === 1){ 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>أمريكان إكسبريس إسرائيل</Text>
        <Text style={styles.paragraph}>
          تقدم أمريكان إكسبريس إسرائيل ثقافة عمل مبنية على الثقة والمرونة والعدالة.
          تُعترف بها باستمرار كواحدة من أفضل أصحاب العمل للنساء، حيث ترعى الشركة بيئة داعمة من خلال
          الشبكات الداخلية وبرامج التوجيه التي ترفع من مكانة النساء في كل مرحلة من مراحل حياتهن المهنية.
        </Text>
        <Text style={styles.paragraph}>
          تستفيد النساء في أمريكان إكسبريس من مبادرات تطوير المسار المهني، وبرامج العافية، وترتيبات العمل المرنة التي تساعدهن على موازنة النمو الشخصي والمهني.
          إنه مكان تمكّن فيه النساء من القيادة والنمو والازدهار — مدعوم بثقافة عالمية من الشمول والعدالة.
        </Text>
      </View>
    </ScrollView>
  );
}

if(if2 === 2){ 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>אמריקן אקספרס ישראל</Text>
        <Text style={styles.paragraph}>
          אמריקן אקספרס ישראל מציעה תרבות עבודה המבוססת על אמון, גמישות והוגנות.
          החברה מוכרת בעקביות כאחת המעסיקים הטובים ביותר לנשים, ומטפחת סביבה תומכת דרך רשתות פנימיות ותוכניות חונכות שמעצימות נשים בכל שלב בקריירה שלהן.
        </Text>
        <Text style={styles.paragraph}>
          נשים באמריקן אקספרס נהנות מיוזמות לפיתוח קריירה, תוכניות רווחה וסידורי עבודה גמישים שעוזרים להן לאזן בין צמיחה אישית ומקצועית.
          זהו מקום בו נשים מועצמות להוביל, לצמוח ולשגשג — נתמך על ידי תרבות עולמית של הכללה ושוויון.
        </Text>
      </View>
    </ScrollView>
  );
}

}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#e9ecef',
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
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#003087',
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

