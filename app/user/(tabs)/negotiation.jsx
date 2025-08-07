import { Ionicons } from '@expo/vector-icons';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../LanguageContext';


export default function NegotiationSimulatorPage() {
  const openSimulator = () => {
    Linking.openURL('https://app.cesura.ai/sim/4d091003-9abc-4700-8686-cb29c97fb88e');
  };
const {if2,setIf2} = useLanguage(); 
if (if2 === 0) {
  // English
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../../assets/images/pinklogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.heading}>Ready to Get What You Deserve?</Text>
      <Text style={styles.subheading}>
        Now that you know your target salary and conditions, it's time to practice how to ask for them.
      </Text>

      <Text style={styles.description}>
        Our AI-powered negotiation simulator helps you practice conversations with a virtual employer, improve your strategy, and build confidence — so when it's time to negotiate for real, you’ll be ready.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openSimulator}>
        <Ionicons name="rocket-outline" size={20} color="#ff7c8a" />
        <Text style={styles.buttonText}>Start Simulating</Text>
      </TouchableOpacity>
    </ScrollView>
  );
} else if (if2 === 1) {
  // Arabic
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../../assets/images/pinklogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.heading}>هل أنت مستعدة للحصول على ما تستحقينه؟</Text>
      <Text style={styles.subheading}>
        الآن بعد أن تعرفت على راتبك المستهدف وشروطه، حان الوقت لممارسة كيفية طلبها.
      </Text>

      <Text style={styles.description}>
        تساعدك محاكاة التفاوض المدعومة بالذكاء الاصطناعي على ممارسة المحادثات مع صاحب عمل افتراضي، تحسين استراتيجيتك، وبناء الثقة — حتى تكوني جاهزة عند التفاوض الحقيقي.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openSimulator}>
        <Ionicons name="rocket-outline" size={20} color="#ff7c8a" />
        <Text style={styles.buttonText}>ابدأي المحاكاة</Text>
      </TouchableOpacity>
    </ScrollView>
  );
} else if (if2 === 2) {
  // Hebrew
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../../assets/images/pinklogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.heading}>מוכנה לקבל את מה שאת ראויה לו?</Text>
      <Text style={styles.subheading}>
        עכשיו כשאת יודעת מה שכר היעד והתנאים שלך, הגיע הזמן לתרגל איך לבקש אותם.
      </Text>

      <Text style={styles.description}>
        סימולטור המשא ומתן המופעל על ידי AI שלנו עוזר לך לתרגל שיחות עם מעסיק וירטואלי, לשפר את האסטרטגיה ולבנות ביטחון — כך שכשתגיעי למשא ומתן אמיתי, תהיי מוכנה.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openSimulator}>
        <Ionicons name="rocket-outline" size={20} color="#ff7c8a" />
        <Text style={styles.buttonText}>התחילי סימולציה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
    logo: {
    width: 500,
    height: 250,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#041E42FF',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 1,
  },
  subheading: {
    fontSize: 22,
    color: '#041E42FF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#041E42FF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 25,
    marginTop: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#041E42FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ff7c8a',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 20,
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