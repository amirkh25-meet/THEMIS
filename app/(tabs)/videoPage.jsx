import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const { height } = Dimensions.get('window');

const videos = [
  {
    id: '1',
    embedUrl: 'https://www.youtube.com/embed/13XU4fMlN3w?autoplay=1&mute=1',
    title: 'What people miss about the gender wage gap',
    description: "It's more complex than women earning 79 cents for every dollar a man makes."
  },
  {
    id: '2',
    embedUrl: 'https://www.youtube.com/embed/QsdakfRx9f0?autoplay=1&mute=1',
    title: 'Inspiring Stories of Women Making a Difference',
    description: 'Celebrating women who break barriers and lead with resilience.'
  },
  {
    id: '3',
    embedUrl: 'https://www.youtube.com/embed/VF4ZyJRUxk8?autoplay=1&mute=1',
    title: 'Empowering Women - Empowering Society',
    description: 'When the going gets tough, tough women adjust their crowns and keep going!'
  }
];

export default function VideoPage() {
  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <WebView
            source={{ uri: item.embedUrl }}
            style={styles.webview}
            javaScriptEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
          />
          <View style={styles.textBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    backgroundColor: '#041e42ff'
  },
  webview: {
    width: '100%',
    height: height * 0.6,
    alignContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    width: '95%',
    height: height * 0.1,
    padding: 14,
    backgroundColor: '#041e42ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#eaebff',
    marginBottom: 7,
    fontFamily: 'Alice',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
    fontStyle: 'bold',
    textAlign: 'center',
  }
});