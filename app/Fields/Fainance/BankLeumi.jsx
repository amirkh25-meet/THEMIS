import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function BankLeumi() {
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
