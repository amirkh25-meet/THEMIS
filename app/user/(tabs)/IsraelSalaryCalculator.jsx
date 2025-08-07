import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useLanguage } from '../../LanguageContext';

const IsraelSalaryCalculator = () => {
  const [experience, setExperience] = useState(0);
  const [education, setEducation] = useState('bachelor');
  const [field, setField] = useState('software');
  const [baseSalary, setBaseSalary] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const {if2,useIf2} = useLanguage(); 
  const [taxes, setTaxes] = useState({
    incomeTax: 0,
    nationalInsurance: 0,
    healthTax: 0,
    total: 0
  });
  const [jobPercentage, setJobPercentage] = useState(100); 


  const salaryRanges = {
    software: {
      highschool: { base: 8000, experienceBonus: 500 },
      bachelor: { base: 15800, experienceBonus: 1300 },
      master: { base: 18000, experienceBonus: 1500 },
      phd: { base: 20000, experienceBonus: 1600 }
    },
    engineering: {
      highschool: { base: 7000, experienceBonus: 500 },
      bachelor: { base: 14500, experienceBonus: 1100 },
      master: { base: 16500, experienceBonus: 1300 },
      phd: { base: 18500, experienceBonus: 1450 }
    },
    marketing: {
      highschool: { base: 6000, experienceBonus: 400 },
      bachelor: { base: 11500, experienceBonus: 950 },
      master: { base: 13500, experienceBonus: 1100 },
      phd: { base: 15500, experienceBonus: 1250 }
    },
    finance: {
      highschool: { base: 7000, experienceBonus: 500 },
      bachelor: { base: 12000, experienceBonus: 1000 },
      master: { base: 14500, experienceBonus: 1200 },
      phd: { base: 17000, experienceBonus: 1400 }
    },
    healthcare: {
      highschool: { base: 6500, experienceBonus: 450 },
      bachelor: { base: 11000, experienceBonus: 950 },
      master: { base: 13000, experienceBonus: 1150 },
      phd: { base: 15000, experienceBonus: 1300 }
    }
  };

  const calculateTaxes = (grossSalary) => {
    const yearlyGross = grossSalary * 12;
    let incomeTax = 0;
    let nationalInsurance = 0;
    let healthTax = 0;

    if (yearlyGross <= 81480) {
      incomeTax = yearlyGross * 0.10;
    } else if (yearlyGross <= 116760) {
      incomeTax = 81480 * 0.10 + (yearlyGross - 81480) * 0.14;
    } else if (yearlyGross <= 187440) {
      incomeTax = 81480 * 0.10 + (116760 - 81480) * 0.14 + (yearlyGross - 116760) * 0.20;
    } else if (yearlyGross <= 241680) {
      incomeTax = 81480 * 0.10 + (116760 - 81480) * 0.14 + (187440 - 116760) * 0.20 + (yearlyGross - 187440) * 0.31;
    } else if (yearlyGross <= 498360) {
      incomeTax = 81480 * 0.10 + (116760 - 81480) * 0.14 + (187440 - 116760) * 0.20 + (241680 - 187440) * 0.31 + (yearlyGross - 241680) * 0.35;
    } else {
      incomeTax = 81480 * 0.10 + (116760 - 81480) * 0.14 + (187440 - 116760) * 0.20 + (241680 - 187440) * 0.31 + (498360 - 241680) * 0.35 + (yearlyGross - 498360) * 0.47;
    }

    const niCeiling = 486840;
    nationalInsurance = Math.min(yearlyGross, niCeiling) * 0.07;
    healthTax = yearlyGross * 0.031;

    const totalTaxes = incomeTax + nationalInsurance + healthTax;

    return {
      incomeTax: incomeTax / 12,
      nationalInsurance: nationalInsurance / 12,
      healthTax: healthTax / 12,
      total: totalTaxes / 12
    };
  };

  useEffect(() => {
  const range = salaryRanges[field][education];
  const grossFullTime = range.base + (experience * range.experienceBonus);
  const adjustedGross = grossFullTime * (jobPercentage / 100);
  
  setBaseSalary(adjustedGross);

  const calculatedTaxes = calculateTaxes(adjustedGross);
  setTaxes(calculatedTaxes);
  setNetSalary(adjustedGross - calculatedTaxes.total);
}, [experience, education, field, jobPercentage]);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
if (if2 === 0) {
  // English
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Salary Calculator</Text>
        </View>
        <View style={styles.headerSubRow}>
          <Text style={styles.intro}>
            Know your worth. Enter your info to see what <Text style={styles.highlight}>salary</Text> you should aim for – and walk in with confidence.
          </Text>
          <Text style={styles.headerSubtitle}>* Including Israeli Tax Calculations</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Details</Text>

        <Text style={styles.label}>Professional Field</Text>
        <Picker selectedValue={field} onValueChange={setField} style={styles.picker}>
          <Picker.Item label="Software Development" value="software" />
          <Picker.Item label="Engineering" value="engineering" />
          <Picker.Item label="Marketing" value="marketing" />
          <Picker.Item label="Finance" value="finance" />
          <Picker.Item label="Healthcare" value="healthcare" />
        </Picker>

        <Text style={styles.label}>Education Level</Text>
        <Picker selectedValue={education} onValueChange={setEducation} style={styles.picker}>
          <Picker.Item label="High School" value="highschool" />
          <Picker.Item label="Bachelor's Degree" value="bachelor" />
          <Picker.Item label="Master's Degree" value="master" />
          <Picker.Item label="PhD" value="phd" />
        </Picker>

        <Text style={styles.label}>Years of Experience: {experience}</Text>
        <Slider
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={experience}
          onValueChange={setExperience}
          minimumTrackTintColor="#ff7c8a"
          maximumTrackTintColor="#adb5bd"
          thumbTintColor="#ff7c8a"
        />
      </View>

      <Text style={styles.label}>Job Load: {jobPercentage}%</Text>
      <Slider
        minimumValue={10}
        maximumValue={100}
        step={10}
        value={jobPercentage}
        onValueChange={setJobPercentage}
        minimumTrackTintColor="#ff7c8a"
        maximumTrackTintColor="#adb5bd"
        thumbTintColor="#ff7c8a"
      />

      <Text style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
        Adjust to calculate part-time salaries based on job load.
      </Text>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Salary Breakdown</Text>

        {[
          ['Gross Monthly Salary', baseSalary],
          ['Income Tax', taxes.incomeTax],
          ['National Insurance', taxes.nationalInsurance],
          ['Health Tax', taxes.healthTax],
          ['Total Deductions', taxes.total],
          ['Net Monthly Salary', netSalary],
          ['Annual Net Salary', netSalary * 12],
          ['Effective Tax Rate', `${((taxes.total / baseSalary) * 100).toFixed(1)}%`],
        ].map(([label, value], index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{label}</Text>
            <Text style={styles.tableCell}>
              {typeof value === 'number' ? formatCurrency(value) : value}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
} else if (if2 === 1) {
  // Arabic
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>حاسبة الرواتب</Text>
        </View>
        <View style={styles.headerSubRow}>
          <Text style={styles.intro}>
            اعرف قيمتك. أدخل معلوماتك لمعرفة الراتب الذي يجب أن تستهدفه – وادخل بثقة.
          </Text>
          <Text style={styles.headerSubtitle}>* يشمل حسابات الضرائب الإسرائيلية</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>تفاصيلك</Text>

        <Text style={styles.label}>المجال المهني</Text>
        <Picker selectedValue={field} onValueChange={setField} style={styles.picker}>
          <Picker.Item label="تطوير البرمجيات" value="software" />
          <Picker.Item label="الهندسة" value="engineering" />
          <Picker.Item label="التسويق" value="marketing" />
          <Picker.Item label="المالية" value="finance" />
          <Picker.Item label="الرعاية الصحية" value="healthcare" />
        </Picker>

        <Text style={styles.label}>المستوى التعليمي</Text>
        <Picker selectedValue={education} onValueChange={setEducation} style={styles.picker}>
          <Picker.Item label="الثانوية العامة" value="highschool" />
          <Picker.Item label="بكالوريوس" value="bachelor" />
          <Picker.Item label="ماجستير" value="master" />
          <Picker.Item label="دكتوراه" value="phd" />
        </Picker>

        <Text style={styles.label}>سنوات الخبرة: {experience}</Text>
        <Slider
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={experience}
          onValueChange={setExperience}
          minimumTrackTintColor="#ff7c8a"
          maximumTrackTintColor="#adb5bd"
          thumbTintColor="#ff7c8a"
        />
      </View>

      <Text style={styles.label}>نسبة عبء العمل: {jobPercentage}%</Text>
      <Slider
        minimumValue={10}
        maximumValue={100}
        step={10}
        value={jobPercentage}
        onValueChange={setJobPercentage}
        minimumTrackTintColor="#ff7c8a"
        maximumTrackTintColor="#adb5bd"
        thumbTintColor="#ff7c8a"
      />

      <Text style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
        اضبط لحساب الرواتب الجزئية بناءً على عبء العمل.
      </Text>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>تفصيل الراتب</Text>

        {[
          ['الراتب الشهري الإجمالي', baseSalary],
          ['ضريبة الدخل', taxes.incomeTax],
          ['التأمين الوطني', taxes.nationalInsurance],
          ['ضريبة الصحة', taxes.healthTax],
          ['إجمالي الخصومات', taxes.total],
          ['صافي الراتب الشهري', netSalary],
          ['صافي الراتب السنوي', netSalary * 12],
          ['نسبة الضريبة الفعالة', `${((taxes.total / baseSalary) * 100).toFixed(1)}%`],
        ].map(([label, value], index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{label}</Text>
            <Text style={styles.tableCell}>
              {typeof value === 'number' ? formatCurrency(value) : value}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
} else if (if2 === 2) {
  // Hebrew
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>מחשבון שכר</Text>
        </View>
        <View style={styles.headerSubRow}>
          <Text style={styles.intro}>
            דע את הערך שלך. הזן את הפרטים שלך כדי לראות איזה <Text style={styles.highlight}>שכר</Text> כדאי לשאוף אליו – ולצאת עם ביטחון.
          </Text>
          <Text style={styles.headerSubtitle}>* כולל חישובי מס ישראליים</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>הפרטים שלך</Text>

        <Text style={styles.label}>תחום מקצועי</Text>
        <Picker selectedValue={field} onValueChange={setField} style={styles.picker}>
          <Picker.Item label="פיתוח תוכנה" value="software" />
          <Picker.Item label="הנדסה" value="engineering" />
          <Picker.Item label="שיווק" value="marketing" />
          <Picker.Item label="פיננסים" value="finance" />
          <Picker.Item label="בריאות" value="healthcare" />
        </Picker>

        <Text style={styles.label}>רמת השכלה</Text>
        <Picker selectedValue={education} onValueChange={setEducation} style={styles.picker}>
          <Picker.Item label="תיכון" value="highschool" />
          <Picker.Item label="תואר ראשון" value="bachelor" />
          <Picker.Item label="תואר שני" value="master" />
          <Picker.Item label="דוקטורט" value="phd" />
        </Picker>

        <Text style={styles.label}>שנות ניסיון: {experience}</Text>
        <Slider
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={experience}
          onValueChange={setExperience}
          minimumTrackTintColor="#ff7c8a"
          maximumTrackTintColor="#adb5bd"
          thumbTintColor="#ff7c8a"
        />
      </View>

      <Text style={styles.label}>עומס עבודה: {jobPercentage}%</Text>
      <Slider
        minimumValue={10}
        maximumValue={100}
        step={10}
        value={jobPercentage}
        onValueChange={setJobPercentage}
        minimumTrackTintColor="#ff7c8a"
        maximumTrackTintColor="#adb5bd"
        thumbTintColor="#ff7c8a"
      />

      <Text style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
        כוונן לחישוב שכר חלקי בהתבסס על עומס העבודה.
      </Text>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>פירוט שכר</Text>

        {[
          ['שכר חודשי ברוטו', baseSalary],
          ['מס הכנסה', taxes.incomeTax],
          ['ביטוח לאומי', taxes.nationalInsurance],
          ['מס בריאות', taxes.healthTax],
          ['סך הניכויים', taxes.total],
          ['שכר חודשי נטו', netSalary],
          ['שכר שנתי נטו', netSalary * 12],
          ['אחוז מס אפקטיבי', `${((taxes.total / baseSalary) * 100).toFixed(1)}%`],
        ].map(([label, value], index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{label}</Text>
            <Text style={styles.tableCell}>
              {typeof value === 'number' ? formatCurrency(value) : value}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
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
    textAlign: 'center',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 4,
    fontStyle: 'italic',
  },
  intro: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 10,
  },
  highlight: {
    fontWeight: '700',
    color: '#ff7c8a',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#041E42',
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 18,
    color: '#555',
    fontWeight: '500',
  },
  picker: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff7c8a',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: Platform.OS === 'android' ? 0 : 12,
  },
  tableContainer: {

    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#ff7c8a',
    marginBottom: 32,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#041E42',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ff7c8a',
  },
  tableCell: {
    fontSize: 18,
    color: '#041E42',
    flex: 1,
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

export default IsraelSalaryCalculator;