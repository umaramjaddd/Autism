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


const ClassG = () => {
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
      name: 'G I F T',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgift.jpg?alt=media&token=39e550f8-3011-4d6e-af00-4f57cd53d8be.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbag.mp3?alt=media&token=80babd07-1b9b-4624-92f9-f6b2e4f68c4f.mp3',
      obj_id: 'gift',
    },
    {
      name: 'G I R L',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgirl.jpg?alt=media&token=3db021c6-e43d-43f8-a063-933df083f5ea.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fball.mp3?alt=media&token=da3232ce-fb37-452b-b5fb-ba19b68d31e5.mp3',
      obj_id: 'girl',
    },
    {
      name: 'G L A S S',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fglass.jpg?alt=media&token=2f2e00e5-cece-4ec0-8937-d509ecdd9378.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'glass',
    },
    {
      name: 'G L O V E S',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgloves.jpg?alt=media&token=be186367-5b41-4c52-a764-6c00a9a621ed.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'gloves',  
    },
    {
      name: 'G O A T',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgoat.jpg?alt=media&token=531006f0-3ba7-4498-97a9-ea602424a2e6.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'goat',},
    {
      name: 'G O R I L L A',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgotilla.jpg?alt=media&token=d28b9972-0832-4206-8999-06f3a73f83f8.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'gorilla',
    },
    {
      name: 'G R A P E S',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgrapes.jpg?alt=media&token=8b146d58-ea5b-45a2-8fb1-a75ac4985384.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fboat.mp3?alt=media&token=a37f8017-1099-4a7f-8be2-92e9eb8f596e.mp3',
      obj_id: 'grapes',
    },
    {
      name: 'G R A S S',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgrass.jpg?alt=media&token=82d15881-1f8d-4544-afb5-0531d3cec4f6.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbottle.mp3?alt=media&token=6b802424-a590-447c-b879-83ada19c7dc7.mp3',
      obj_id: 'grass',
    },
    {
      name: 'G U I T A R',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fguitar.jpg?alt=media&token=a82f6699-9172-43fe-9dde-639705b90c3b.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbread.mp3?alt=media&token=7ffe25b5-5c42-4db5-8e25-8bcf81563f35.mp3',
      obj_id: 'guitar',
    },
    {
      name: 'G U N',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/G%20Pics%2Fgun.jpg?alt=media&token=aeba58e3-2bca-4df9-bd25-cee724ef9010.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbus.mp3?alt=media&token=970b188b-ea0e-4254-a668-d29d8db88e0b.mp3',
      obj_id: 'gun',
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


export default ClassG;
