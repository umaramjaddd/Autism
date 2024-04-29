import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { db } from './firebase';
import { useRoute } from '@react-navigation/native';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { Query } from 'firebase/firestore';
export default function AudioScreen() {
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const route = useRoute();
  const { uid, objId2 } = route.params;

  useEffect(() => {
    console.log("This IS New Screen & Your User ID is: ", uid);
    console.log("This IS New Screen & Your Obj ID is: ", objId2);
  }, [objId2]);

  useEffect(() => {
    const fetchRecordings = async () => {
      
      // Retrieve the document from Firestore based on UID
      //  const docRef = doc(db, 'recordings', uid, objId2);
      const docRef = doc(db, 'recordings', uid, 'data', objId2);
        
      
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // The document exists, retrieve the recordings object
        const recordings = docSnapshot.data().recordings;

        // Fetch the download URLs for each recording
        const urls = [];
        for (const timestamp in recordings) {
          const recording = recordings[timestamp];
          const downloadURL = recording.downloadURL;
          urls.push(downloadURL);
        }

        setDownloadURLs(urls);
        console.log('Downloaded audio URLs:');
        // console.log('Downloaded audio URLs:', urls);
      } else {
        alert("No Recordings Added Yet !!!");
        console.log('No audio recordings found for the provided UID');
      }
    };

    fetchRecordings();
  }, [uid]);
  
  // useEffect(() => {
  //   const fetchRecordings = async () => {
  //     const querySnapshot = await getDocs(
  //       query(
  //         collection(db, 'recordings'),
  //         where('uid', '==', uid),
  //         where('obj_id', '==', objId2)
  //       )
  //     );
  
  //     if (!querySnapshot.empty) {
  //       const urls = [];
  
  //       querySnapshot.forEach((docSnapshot) => {
  //         const recording = docSnapshot.data();
  //         const downloadURL = recording.url;
  //         urls.push(downloadURL);
  //       });
  
  //       setDownloadURLs(urls);
  //       console.log('Downloaded audio URLs:', urls);
  //     } else {
  //       console.log('No audio recordings found for the provided UID and obj_id');
  //     }
  //   };
  
  //   fetchRecordings();
  // }, [uid, objId2]);
  
  const playSound = async (audioURL) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioURL });
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound: ', error);
    }
  };

  const handlePlayAudio = async (audioURL) => {
    await playSound(audioURL);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {downloadURLs.map((url, index) => (
        <TouchableOpacity
          key={index}
          style={styles.touchableContainer}
          onPress={() => handlePlayAudio(url)}
        >
          <View style={styles.greyContainer} />
          <Ionicons name="musical-notes-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Play Audio {index + 1}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingVertical: 16,
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    elevation: 2,
  },
  greyContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F5F5', // Adjust the color as needed
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});