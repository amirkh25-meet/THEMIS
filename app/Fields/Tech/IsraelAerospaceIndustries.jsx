import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function IsraelAerospaceIndustries() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.decorativeLine} />
        {/* אין אייקון ספציפי - אפשר להוסיף אייקון לפי הצורך */}
        <Text style={styles.header}>Israel Aerospace Industries (IAI)</Text>
        <View style={styles.decorativeLine} />

        <Text style={styles.subHeader}>Lod, Israel</Text>

        <Text style={styles.paragraph}>
          IAI, Israel’s flagship aerospace and defense company, is actively working to break gender stereotypes in one of the most male-dominated industries. The company supports women engineers, scientists, and managers through internal networks, educational partnerships, and outreach programs aimed at increasing female representation in STEM.
        </Text>

        <Text style={styles.paragraph}>
          IAI promotes <Text style={styles.highlight}>equal pay</Text>, flexible scheduling, and advancement opportunities that make it a strong option for women seeking long-term career development in high-impact roles.
        </Text>

        <Text style={styles.paragraph}>
          For women who aspire to shape the future of aerospace and innovation, IAI offers a stable yet dynamic platform for professional success.
        </Text>
      </View>
    </ScrollView>
  );
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
