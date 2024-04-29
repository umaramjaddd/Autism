import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Font from 'expo-font';



import * as FileSystem from 'expo-file-system';

import { storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';


const ClassF	 = () => {
  const [objId, setObjId] = useState('');
  const [objId2, setObjId2] = useState('');
  useEffect(() => {
    console.log("Your Obj Id is: ", objId2);
  }, [objId2]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setObjId2('');
    });

    return unsubscribe;
  }, [navigation]);
  const images = [
    {
      name: 'FA M I L Y',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffamily.jpg?alt=media&token=0f6980b8-3987-40a4-bcf2-1651abadcc72.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffamily.mp3?alt=media&token=eb849d45-10b7-4d66-9988-0b740265c41c.mp3',
      obj_id: 'family',
    },
    {
      name: 'F A N',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffan.jpg?alt=media&token=d8982a78-595b-4f20-87db-0aeb4a8520bb.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffan.mp3?alt=media&token=a4001acb-8660-4ae6-9533-cd7b1a59fe5e.mp3',
      obj_id: 'ball',
    },
    {
      name: 'F A R M E R',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffarmer.jpg?alt=media&token=e3ab7988-5dd0-418e-a1be-c5648e2e94cb.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffarmer.mp3?alt=media&token=834171b2-3f32-471a-8806-066cc8a04937.mp3',
    },
    {
      name: 'F I S H',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffish.jpg?alt=media&token=a08de7e7-7f82-46ea-aeed-108919a505ee.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffish.mp3?alt=media&token=8a3425f9-bea8-4e6f-994f-96ad9c4f0394.mp3',
    },
    {
      name: 'F L A G',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Fflag.jpg?alt=media&token=9fb97931-a9f8-47fc-8d37-eb8dbf86a471.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Fflag.mp3?alt=media&token=f8a93081-66ed-4a1c-b3b4-07349c863619.mp3',
    },
    {
      name: 'F L O W E R',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Fflower.jpg?alt=media&token=9259e0fd-e1fb-4825-aa87-3b30cb1a1c15.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Fflower.mp3?alt=media&token=22b8a398-e018-4511-bd62-3bbaa3279fe9.mp3',
    },
    {
      name: 'F O O T B A L L',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffootball.jpg?alt=media&token=0e51f84b-cc05-412e-8c62-7b2133ad8653.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffootball.mp3?alt=media&token=ab5ce44a-23c2-4a0a-8480-cdd280fe3dcd.mp3',
    },
    {
      name: 'F O X',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffox.jpg?alt=media&token=471d5ae4-c023-4c20-ac57-06e4d36ce659.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffox.mp3?alt=media&token=016e6a21-23bf-480a-bf7e-8b7b54306e2e.mp3',
    },
    {
      name: 'F R I D G E',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffridge.jpg?alt=media&token=a515b7b1-2631-45a2-a36e-bb3425aa4d0a.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffridge.mp3?alt=media&token=c94d0db7-e44e-4f40-90a6-0f099309a278.mp3',
    },
    {
      name: 'F R U I T',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Pics%2Ffruit.jpg?alt=media&token=ceac2230-7ed0-4667-ad60-b9c99b18942a.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/F%20Recordings%2Ffruit.mp3?alt=media&token=9402ed7e-b3b8-46b3-84bb-3ea430812eb5.mp3',
    }
  ];
  

  const route = useRoute();
  const { uid } = route.params;

  const [recording, setRecording] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

   async function stopRecording() {
     console.log('Stopping recording..');
     setRecording(undefined);
     await recording.stopAndUnloadAsync();
     await Audio.setAudioModeAsync({
       allowsRecordingIOS: false,
     });
     const uri = recording.getURI();
     console.log('Recording stopped and stored at', uri);

     // Upload the recorded audio file to Firebase Storage
     const response = await fetch(uri);
     const blob = await response.blob();

     const timestamp = new Date().getTime(); // Generate a timestamp
     const filename = 'Audio'  + timestamp + '.mp3';



     const storageRef = ref(storage, filename);
     // Upload the audio file to Firebase Storage

     await uploadBytes(storageRef, blob);
     console.log('Recording uploaded to Firebase Storage');

     // Get the download URL of the uploaded file
     const downloadURL = await getDownloadURL(storageRef);

     // Check if the document already exists in Firestor

     // Check if the document already exists in Firestore
    //  const docRef = doc(db, 'recordings', uid);
    const docRef = doc(db, 'recordings', uid, 'data', objId); 
    const docSnapshot = await getDoc(docRef);

     const obj_idd = objId;
     if (docSnapshot.exists()) {
       // If the document exists, update it by appending new data
       const previousData = docSnapshot.data();
       const recordings = previousData.recordings || {}; // Retrieve existing recordings or initialize empty object

       // Merge the new recording with the existing recordings
       const updatedRecordings = {
         ...recordings,
         [timestamp]: {
           downloadURL: downloadURL,
           uid: uid,
           obj_id: obj_idd,
           
         },
       };

       await updateDoc(docRef, {
         recordings: updatedRecordings,
       });
       console.log('New recording data appended to Firestore with object ID: ', obj_idd);
     } else {
       // If the document does not exist, create a new document
       await setDoc(docRef, {
         recordings: {
           [timestamp]: {
             downloadURL: downloadURL,
             uid: uid,
             obj_id: obj_idd,
           },
         },
       });
       console.log('New document with recording data created in Firestore');
     }
    }
  

  const [currentAudio, setCurrentAudio] = useState(null);
  const playSound = async (audioURL) => {
    try {
      if (currentAudio) {
        await currentAudio.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: audioURL });
      await sound.playAsync();
      setCurrentAudio(sound);
    } catch (error) {
      console.log('Error playing sound: ', error);
    }
  };

  React.useEffect(() => {
    // Unload the audio when the component is unmounted
    return () => {
      if (currentAudio) {
        currentAudio.unloadAsync();
      }
    };
  }, [currentAudio]);


   const navigation = useNavigation();

  const handleListenAudio = async () => {
    // const obj_iddd = objId2;
    await navigation.navigate('mySeeAudio', { uid, objId2 });
    console.log("Your User Id is: ", uid);
    console.log("Your Obj Id is: ", objId2);
  };
  
  useEffect(() => {
    if (objId2 !== '') {
      handleListenAudio();
    }
  }, [objId2]);
  return (

    <ScrollView contentContainerStyle={styles.container}>

      {images.map((image, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image.url }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{image.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => playSound(image.audioURL)}>
              <MaterialIcons name="play-arrow" size={24} color="black" />

            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {
              setObjId(image.obj_id);
              recording ? stopRecording() : startRecording()
            }}

            >
              {recording ? (
                <MaterialIcons name="stop" size={24} color="red" />
              ) : (
                <MaterialIcons name="mic" size={24} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={() => {
                setObjId2(image.obj_id);
              }}>
              <MaterialIcons name="folder" size={24} color="yellow" />
            </TouchableOpacity>


          </View>
        </View>
      ))}
    </ScrollView>

  );
};

const styles = {
  container: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
  },
  imageContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  button: {
    width: 160,
    height: 35,
    // backgroundColor: 'black',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};


export default ClassF;
