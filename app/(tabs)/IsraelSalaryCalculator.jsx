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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Details</Text>

        <Text style={styles.label}>Professional Field</Text>
        <Picker selectedValue={field} onValueChange={(value) => setField(value)}>
          <Picker.Item label="Software Development" value="software" />
          <Picker.Item label="Engineering" value="engineering" />
          <Picker.Item label="Marketing" value="marketing" />
          <Picker.Item label="Finance" value="finance" />
          <Picker.Item label="Healthcare" value="healthcare" />
        </Picker>

        <Text style={styles.label}>Education Level</Text>
        <Picker selectedValue={education} onValueChange={(value) => setEducation(value)}>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Salary Breakdown</Text>
        <Text style={styles.salaryLabel}>Gross Monthly Salary: {formatCurrency(baseSalary)}</Text>
        <Text style={styles.salaryLabel}>Income Tax: {formatCurrency(taxes.incomeTax)}</Text>
        <Text style={styles.salaryLabel}>National Insurance: {formatCurrency(taxes.nationalInsurance)}</Text>
        <Text style={styles.salaryLabel}>Health Tax: {formatCurrency(taxes.healthTax)}</Text>
        <Text style={styles.salaryLabel}>Total Deductions: {formatCurrency(taxes.total)}</Text>
        <Text style={styles.salaryLabel}>Net Monthly Salary: {formatCurrency(netSalary)}</Text>
        <Text style={styles.salaryLabel}>Annual Net Salary: {formatCurrency(netSalary * 12)}</Text>
        <Text style={styles.salaryLabel}>Effective Tax Rate: {((taxes.total / baseSalary) * 100).toFixed(1)}%</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  header: {
    backgroundColor: '#3b82f6',
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
    color: 'white',
    marginLeft: 8,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    color: 'white',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
  },
  salaryLabel: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default IsraelSalaryCalculator;
