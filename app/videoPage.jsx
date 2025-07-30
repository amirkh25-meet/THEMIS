// Install all required libraries with this single command:
// npm install react-native-youtube-iframe react-native-vector-icons react-native-webview react-native-orientation-locker

import { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');

const videoPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
const videos = [
  {
    id: 'Tt08KmFfIYQ',
    title: 'TEDx: The future of work for women',
    thumbnail: 'https://img.youtube.com/vi/Tt08KmFfIYQ/maxresdefault.jpg',
    duration: '11:23',
    views: '500K views',
    channel: 'TEDx Talks'
  },
  {
    id: 'HBKmdGzAt68',
    title: 'Empowering Women - Shorts',
    thumbnail: 'https://img.youtube.com/vi/HBKmdGzAt68/maxresdefault.jpg',
    duration: '0:58',
    views: '1.2M views',
    channel: 'Inspiration Hub'
  },
  {
    id: 'LWz57CpcSnE',
    title: 'Negotiating Your Worth',
    thumbnail: 'https://img.youtube.com/vi/LWz57CpcSnE/maxresdefault.jpg',
    duration: '6:45',
    views: '750K views',
    channel: 'Career Talks'
  },
  {
    id: 'Fr9a3F29JJA',
    title: 'How to Ask for a Raise',
    thumbnail: 'https://img.youtube.com/vi/Fr9a3F29JJA/maxresdefault.jpg',
    duration: '5:22',
    views: '1M views',
    channel: 'Money Talks'
  },
  {
    id: 'a43Je1KQY3s',
    title: 'Women in Tech: Pay Gap Reality',
    thumbnail: 'https://img.youtube.com/vi/a43Je1KQY3s/maxresdefault.jpg',
    duration: '9:10',
    views: '820K views',
    channel: 'Equality Now'
  },
  {
    id: 'XYuXmAwUuyk',
    title: 'Why Women Don’t Apply for Jobs',
    thumbnail: 'https://img.youtube.com/vi/XYuXmAwUuyk/maxresdefault.jpg',
    duration: '7:01',
    views: '610K views',
    channel: 'Workplace Studies'
  },
  {
    id: 'u0s9Z-RinoA',
    title: 'How to Beat Impostor Syndrome',
    thumbnail: 'https://img.youtube.com/vi/u0s9Z-RinoA/maxresdefault.jpg',
    duration: '4:50',
    views: '900K views',
    channel: 'Motivation Daily'
  },
  {
    id: 'bgz2vNMTpxQ',
    title: '5 Ways to Boost Confidence at Work',
    thumbnail: 'https://img.youtube.com/vi/bgz2vNMTpxQ/maxresdefault.jpg',
    duration: '8:12',
    views: '1.1M views',
    channel: 'CareerBoost'
  }
];


  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
    setPlaying(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setPlaying(false);
    setSelectedVideo(null);
  };

  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  };

  const VideoCard = ({ video }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => openVideoModal(video)}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Icon name="play-arrow" size={24} color="#fff" />
        </View>
        <View style={styles.duration}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
      
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={styles.channelName}>{video.channel}</Text>
        <Text style={styles.videoStats}>{video.views}</Text>
      </View>
    </TouchableOpacity>
  );

  const VideoModal = () => (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={closeModal}
    >
      <SafeAreaView style={styles.modalContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Icon name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.modalTitle} numberOfLines={1}>
            {selectedVideo?.title}
          </Text>
        </View>

        {/* Video Player */}
        <View style={styles.playerContainer}>
          {selectedVideo && (
            <YoutubePlayer
              height={220}
              play={playing}
              videoId={selectedVideo.id}
              onChangeState={onStateChange}
              webViewStyle={styles.webView}
              webViewProps={{
                injectedJavaScript: `
                  const meta = document.createElement('meta'); 
                  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); 
                  meta.setAttribute('name', 'viewport'); 
                  document.getElementsByTagName('head')[0].appendChild(meta);
                `,
              }}
            />
          )}
        </View>

        {/* Video Details */}
        <View style={styles.videoDetails}>
          <Text style={styles.modalVideoTitle}>{selectedVideo?.title}</Text>
          <View style={styles.videoMeta}>
            <Text style={styles.channelNameModal}>{selectedVideo?.channel}</Text>
            <Text style={styles.videoStatsModal}>{selectedVideo?.views}</Text>
          </View>
        </View>

      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Video Grid */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.gridContainer}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </View>
      </ScrollView>

      <VideoModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    width: (width - 48) / 2, // Two cards per row with margins
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 120, // Reduced height for grid layout
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
    lineHeight: 18,
  },
  channelName: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  videoStats: {
    fontSize: 11,
    color: '#adb5bd',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
  playerContainer: {
    backgroundColor: '#000',
  },
  webView: {
    backgroundColor: '#000',
  },
  videoDetails: {
    padding: 20,
    backgroundColor: '#000',
  },
  modalVideoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 26,
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelNameModal: {
    fontSize: 16,
    color: '#adb5bd',
    fontWeight: '500',
  },
  videoStatsModal: {
    fontSize: 14,
    color: '#6c757d',
  },
  controls: {
    padding: 20,
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  playPauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default videoPage;