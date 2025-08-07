import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../LanguageContext';

export default function IntelIsrael() {
  const {if2,setIf2} = useLanguage(); 
if(if2===0){  // English
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.decorativeLine} />
        <MaterialIcons name="memory" size={48} color="#2e7d32" style={styles.icon} />
        <Text style={styles.header}>Intel Israel</Text>
        <View style={styles.decorativeLine} />

        <Text style={styles.subHeader}>Haifa, Israel</Text>

        <Text style={styles.paragraph}>
          Intel Israel is one of the country’s largest and most influential tech employers, placing a strong emphasis on <Text style={styles.highlight}>diversity, equity, and inclusion</Text>.
        </Text>

        <Text style={styles.paragraph}>
          Women at Intel benefit from mentorship programs, professional development tracks, and a company culture that actively supports <Text style={styles.highlight}>work-life balance</Text>. Intel Israel runs dedicated initiatives to recruit and promote women in engineering, R&D, and leadership roles.
        </Text>

        <Text style={styles.paragraph}>
          As a woman working at Intel Haifa, you’ll join a collaborative and forward-thinking environment that respects your voice, invests in your growth, and encourages you to lead innovation at the forefront of global technology.
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
        <MaterialIcons name="memory" size={48} color="#2e7d32" style={styles.icon} />
        <Text style={styles.header}>إنتل إسرائيل</Text>
        <View style={styles.decorativeLine} />

        <Text style={styles.subHeader}>حيفا، إسرائيل</Text>

        <Text style={styles.paragraph}>
          تُعد إنتل إسرائيل واحدة من أكبر وأبرز أصحاب العمل في مجال التكنولوجيا في البلاد، مع تركيز قوي على <Text style={styles.highlight}>التنوع والإنصاف والشمول.</Text>
        </Text>

        <Text style={styles.paragraph}>
          تستفيد النساء في إنتل من برامج التوجيه ومسارات التطوير المهني وثقافة الشركة التي تدعم بنشاط <Text style={styles.highlight}>التوازن بين العمل والحياة الشخصية.</Text> تُدير إنتل إسرائيل مبادرات مخصصة لتوظيف النساء وترقيتهن في مجالات الهندسة والبحث والتطوير والأدوار القيادية.
        </Text>

        <Text style={styles.paragraph}>
          كإمرأة تعمل في إنتل حيفا، ستنضمين إلى بيئة تعاونية ومستقبلية تحترم صوتك، وتستثمر في نموك، وتشجعك على قيادة الابتكار في طليعة التكنولوجيا العالمية.
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
        <MaterialIcons name="memory" size={48} color="#2e7d32" style={styles.icon} />
        <Text style={styles.header}>אינטל ישראל</Text>
        <View style={styles.decorativeLine} />

        <Text style={styles.subHeader}>חיפה, ישראל</Text>

        <Text style={styles.paragraph}>
          אינטל ישראל היא אחת מחברות הטכנולוגיה הגדולות והמשפיעות ביותר בארץ, עם דגש חזק על <Text style={styles.highlight}>גיוון, שוויון והכלה</Text>.
        </Text>

        <Text style={styles.paragraph}>
          נשים באינטל נהנות מתוכניות חונכות, מסלולי פיתוח מקצועי ותרבות ארגונית התומכת באופן פעיל ב-<Text style={styles.highlight}>איזון בין עבודה לחיים פרטיים</Text>. אינטל ישראל מפעילה יוזמות ייעודיות לגיוס ולקידום נשים בהנדסה, במחקר ופיתוח ובתפקידי מנהיגות.
        </Text>

        <Text style={styles.paragraph}>
          כאישה העובדת באינטל חיפה, תצטרפי לסביבה שיתופית וחדשנית המכבדת את קולך, משקיעה בצמיחתך ומעודדת אותך להוביל חדשנות בחזית הטכנולוגיה העולמית.
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
  icon: {
    alignSelf: 'center',
    marginBottom: 15,
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
