import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Calculator, GraduationCap, Clock, MapPin, DollarSign } from 'lucide-react-native';


const IsraelSalaryCalculator = () => {
  const [experience, setExperience] = useState(0);
  const [education, setEducation] = useState('bachelor');
  const [field, setField] = useState('software');
  const [baseSalary, setBaseSalary] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [taxes, setTaxes] = useState({
    incomeTax: 0,
    nationalInsurance: 0,
    healthTax: 0,
    total: 0
  });

  const salaryRanges = {
    software: {
      highschool: { base: 8000, experienceBonus: 800 },
      bachelor: { base: 12000, experienceBonus: 1200 },
      master: { base: 15000, experienceBonus: 1500 },
      phd: { base: 18000, experienceBonus: 1800 }
    },
    engineering: {
      highschool: { base: 7000, experienceBonus: 600 },
      bachelor: { base: 11000, experienceBonus: 1000 },
      master: { base: 14000, experienceBonus: 1300 },
      phd: { base: 17000, experienceBonus: 1600 }
    },
    marketing: {
      highschool: { base: 6000, experienceBonus: 500 },
      bachelor: { base: 9000, experienceBonus: 800 },
      master: { base: 12000, experienceBonus: 1100 },
      phd: { base: 15000, experienceBonus: 1400 }
    },
    finance: {
      highschool: { base: 7000, experienceBonus: 600 },
      bachelor: { base: 10000, experienceBonus: 900 },
      master: { base: 13000, experienceBonus: 1200 },
      phd: { base: 16000, experienceBonus: 1500 }
    },
    healthcare: {
      highschool: { base: 6500, experienceBonus: 550 },
      bachelor: { base: 10500, experienceBonus: 950 },
      master: { base: 13500, experienceBonus: 1250 },
      phd: { base: 16500, experienceBonus: 1550 }
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
    const calculatedGross = range.base + (experience * range.experienceBonus);
    setBaseSalary(calculatedGross);

    const calculatedTaxes = calculateTaxes(calculatedGross);
    setTaxes(calculatedTaxes);
    setNetSalary(calculatedGross - calculatedTaxes.total);
  }, [experience, education, field]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };


  


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Calculator size={28} color="white" />
          <Text style={styles.headerTitle}>Israel Salary Calculator</Text>
        </View>
        <View style={styles.headerSubRow}>
          <MapPin size={16} color="white" />
          <Text style={styles.headerSubtitle}>Including Israeli Tax Calculations</Text>
        </View>
      </View>
          <Text style={styles.intro}>
            Know your worth.
Enter your info to see what   {""}

            <Text style={styles.highlight}>salary</Text> .{" "}
            you should aim for - and walk in with confidence.{" "}
          </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Details</Text>

        <Text style={styles.label}>Professional Field</Text>
      <Picker 
  selectedValue={field} 
  onValueChange={(value) => setField(value)}
  style={styles.picker}
>
  <Picker.Item label="Software Development" value="software" />
  <Picker.Item label="Engineering" value="engineering" />
  <Picker.Item label="Marketing" value="marketing" />
  <Picker.Item label="Finance" value="finance" />
  <Picker.Item label="Healthcare" value="healthcare" />
</Picker>

<Picker 
  selectedValue={education} 
  onValueChange={(value) => setEducation(value)}
  style={styles.picker}
>
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
          onValueChange={(value) => setExperience(value)}
        />
      </View>

      <View style={styles.tableContainer}>
  <Text style={styles.tableTitle}>Salary Breakdown</Text>

  <View style={styles.tableRow}>
    <Text style={styles.tableHeader}>Item</Text>
    <Text style={styles.tableHeader}>Amount</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Gross Monthly Salary</Text>
    <Text style={styles.tableCell}>{formatCurrency(baseSalary)}</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Income Tax</Text>
    <Text style={styles.tableCell}>{formatCurrency(taxes.incomeTax)}</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>National Insurance</Text>
    <Text style={styles.tableCell}>{formatCurrency(taxes.nationalInsurance)}</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Health Tax</Text>
    <Text style={styles.tableCell}>{formatCurrency(taxes.healthTax)}</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Total Deductions</Text>
    <Text style={styles.tableCell}>{formatCurrency(taxes.total)}</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Net Monthly Salary</Text>
    <Text style={styles.tableCell}>{formatCurrency(netSalary)}</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Annual Net Salary</Text>
    <Text style={styles.tableCell}>{formatCurrency(netSalary * 12)}</Text>
  </View>

  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Effective Tax Rate</Text>
    <Text style={styles.tableCell}>
      {((taxes.total / baseSalary) * 100).toFixed(1)}%
    </Text>
  </View>
</View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEBFF', // main background
    padding: 16,
  },
  header: {
    backgroundColor: '#EAEBFF', // section background
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#041E42FF', // all text color
    marginLeft: 8,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    color: '#041E42FF', // all text color
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#EAEBFF', // section background
    padding: 12,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#041E42FF', // all text color
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    color: '#041E42FF', // all text color
  },
  salaryLabel: {
    fontSize: 16,
    marginVertical: 4,
    color: '#041E42FF', // all text color
  },
  picker: {
    backgroundColor: '#EAEBFF', // picker background
    color: '#041E42FF', // picker text color
  },tableContainer: {
  marginTop: 30,
  backgroundColor: '#F8FAFC',
  borderRadius: 8,
  padding: 10,
  borderWidth: 1,
  borderColor: '#CBD5E1',
},
tableTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#041E42FF',
  textAlign: 'center',
},
tableRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 6,
  borderBottomWidth: 1,
  borderBottomColor: '#E2E8F0',
},
tableHeader: {
  fontWeight: 'bold',
  fontSize: 16,
  color: '#041E42FF',
  flex: 1,
  textAlign: 'left',
},
tableCell: {
  fontSize: 15,
  color: '#041E42FF',
  flex: 1,
  textAlign: 'left',
},
tableTotal: {
  fontWeight: 'bold',
  fontSize: 16,
  color: '#041E42FF',
  flex: 1,
  textAlign: 'left',
},
intro: {
  fontSize: 15,
  lineHeight: 20,
  textAlign: 'center',
  color: '#495057',
  marginBottom: 20,
  paddingHorizontal: 10,
},

highlight: {
  fontWeight: '600',
  color: '#d63384',
},
});


export default IsraelSalaryCalculator;
