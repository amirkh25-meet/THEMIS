import React, { use,useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function CompaniesIndex() {
  const router = useRouter();
  const [if2, setIf2] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);


  const navigateTo = (path) => router.push(`/companies/${path}`);
if (if2 === 0) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRightContainer}>
        <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      
        {showLangMenu && (
          <View style={styles.languageMenu}>
            <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
              <Text style={styles.menuItem}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
              <Text style={styles.menuItem}>العربية</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
              <Text style={styles.menuItem}>עברית</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Professional Gender Equity Assessment</Text>
      </View>

      {/* Hero Title */}
      <Text style={styles.title}>
        Build a More <Text style={styles.highlight}>Equitable Workplace</Text>
      </Text>

      {/* Subtext */}
      <Text style={styles.description}>
        Comprehensive assessment tool to evaluate your organization's gender equity practices across hiring, promotions, pay equity, and workplace culture.
        Get actionable insights and connect with industry peers.
      </Text>

      {/* Reports & Settings Buttons */}
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('GenderEquityAssessmentApp')}>
          <Ionicons name="bar-chart-outline" style={styles.menuIcon} />
          <Text style={styles.menuText}>Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Strategy')}>
          <Ionicons name="people-outline" style={styles.menuIcon} />
          <Text style={styles.menuText}>Consultation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

if (if2 === 1) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
  <View style={styles.topRightContainer}>
    <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
      <Text style={styles.menuIcon}>⋮</Text>
    </TouchableOpacity>

    {showLangMenu && (
      <View style={styles.languageMenu}>
        <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
          <Text style={styles.menuItem}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
          <Text style={styles.menuItem}>العربية</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
          <Text style={styles.menuItem}>עברית</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>

  {/* Badge */}
  <View style={styles.badge}>
    <Text style={styles.badgeText}>تقييم مهني للمساواة بين الجنسين</Text>
  </View>

  {/* Hero Title */}
  <Text style={styles.title}>
    أنشئ بيئة عمل <Text style={styles.highlight}>أكثر إنصافاً</Text>
  </Text>

  {/* Subtext */}
  <Text style={styles.description}>
    أداة تقييم شاملة لقياس ممارسات المساواة بين الجنسين في مؤسستك عبر مجالات التوظيف، الترقية، المساواة في الأجور، وثقافة مكان العمل.
    احصل على رؤى قابلة للتنفيذ وتواصل مع نظرائك في القطاع.
  </Text>

  {/* Reports & Settings Buttons */}
  <View style={styles.menuGrid}>
    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('GenderEquityAssessmentApp')}>
      <Ionicons name="bar-chart-outline" style={styles.menuIcon} />
      <Text style={styles.menuText}>التحليل</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Strategy')}>
      <Ionicons name="people-outline" style={styles.menuIcon} />
      <Text style={styles.menuText}>الاستشارة</Text>
    </TouchableOpacity>
  </View>
</ScrollView>

  );
}

if (if2 === 2) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRightContainer}>
        <TouchableOpacity onPress={() => setShowLangMenu(!showLangMenu)}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      
        {showLangMenu && (
          <View style={styles.languageMenu}>
            <TouchableOpacity onPress={() => { setIf2(0); setShowLangMenu(false); }}>
              <Text style={styles.menuItem}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIf2(1); setShowLangMenu(false); }}>
              <Text style={styles.menuItem}>العربية</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIf2(2); setShowLangMenu(false); }}>
              <Text style={styles.menuItem}>עברית</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Badge */}
      <View style={styles.badge}>
  <Text style={styles.badgeText}>הערכת שוויון מגדרי מקצועית</Text>
</View>

{/* Hero Title */}
<Text style={styles.title}>
  בנו סביבת עבודה <Text style={styles.highlight}>שוויונית יותר</Text>
</Text>

{/* Subtext */}
<Text style={styles.description}>
  כלי הערכה מקיף להערכת מדיניות השוויון המגדרי בארגון שלכם בתחומי גיוס, קידום, שכר ותרבות ארגונית.
  קבלו תובנות מעשיות והתחברו לעמיתים בענף.
</Text>

{/* Reports & Settings Buttons */}
<View style={styles.menuGrid}>
  <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('GenderEquityAssessmentApp')}>
    <Ionicons name="bar-chart-outline" style={styles.menuIcon} />
    <Text style={styles.menuText}>ניתוח</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Strategy')}>
    <Ionicons name="people-outline" style={styles.menuIcon} />
    <Text style={styles.menuText}>ייעוץ</Text>
  </TouchableOpacity>
</View>

    </ScrollView>
  );
}}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAF9FC',
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#7E57C2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 12,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    color: '#7E57C2',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 360,
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  menuItem: {
    backgroundColor: '#fff',
    width: '47%',
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#AAA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  menuIcon: {
    fontSize: 36,
    color: '#7E57C2',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  topRightContainer: {
    position: 'absolute',
    top: 60, // Increased to account for status bar
    right: 24, // Aligned with container padding
    zIndex: 999,
    alignItems: 'flex-end',
  },
  languageMenu: {
    backgroundColor: '#fff',
    borderRadius: 8, // Slightly larger for better appearance
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, // Reduced for subtler shadow
    shadowRadius: 4,
    minWidth: 120,
    marginTop: 4, // Small gap from trigger
  },
  langMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  langMenuItemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  // Additional utility styles you might need
  languageButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(126, 87, 194, 0.1)',
  },
  languageButtonText: {
    fontSize: 12,
    color: '#7E57C2',
    fontWeight: '600',
  },
});

