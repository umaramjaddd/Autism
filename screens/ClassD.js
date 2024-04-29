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


const ClassD = () => {
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
      name: 'D A D',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdad.jpg?alt=media&token=dea7cc4d-fea5-4f13-a701-dcbf30722485.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbag.mp3?alt=media&token=80babd07-1b9b-4624-92f9-f6b2e4f68c4f.mp3',
      obj_id: 'dad',
    },
    {
      name: 'D E E R',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdeer.jpg?alt=media&token=31622fd5-efb9-4ba0-b3a4-9d28e60781c1.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fball.mp3?alt=media&token=da3232ce-fb37-452b-b5fb-ba19b68d31e5.mp3',
      obj_id: 'deer',
    },
    {
      name: 'D I C E',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdice.jpg?alt=media&token=707ac0df-dfcc-4a43-88d2-ff863c4ef48a.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'dice',
    },
    {
      name: 'D I N O S A U R',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdinosaur.jpg?alt=media&token=b5bfdb19-26c0-4460-bb39-b3f8f9f9338d.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'dinosaur',  
    },
    {
      name: 'D I V E R',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdiver.jpg?alt=media&token=759796a0-647d-45f4-a98a-bfefc58fedf9.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'diver',},
    {
      name: 'D O L P H I N',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdolphin.jpg?alt=media&token=19505c18-01cf-472c-a80d-163f7c3b0c98.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'dolphin',
    },
    {
      name: 'D O N K E Y',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdonkey.jpg?alt=media&token=58316d41-0fa8-43b4-998e-be085a0d05b4.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fboat.mp3?alt=media&token=a37f8017-1099-4a7f-8be2-92e9eb8f596e.mp3',
      obj_id: 'donkey',
    },
    {
      name: 'D O O R',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdoor.jpg?alt=media&token=1f90c234-6023-4cae-8046-12f4549864b0.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbottle.mp3?alt=media&token=6b802424-a590-447c-b879-83ada19c7dc7.mp3',
      obj_id: 'door',
    },
    {
      name: 'D R A G O N',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fdragon.jpg?alt=media&token=cca35b34-c100-4693-bf85-db8b19a3b370.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbread.mp3?alt=media&token=7ffe25b5-5c42-4db5-8e25-8bcf81563f35.mp3',
      obj_id: 'dragon',
    },
    {
      name: 'D U C K',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/D%20Pics%2Fduck.jpg?alt=media&token=359f193c-16fc-426f-8c14-de2c9a36a5a2.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbus.mp3?alt=media&token=970b188b-ea0e-4254-a668-d29d8db88e0b.mp3',
      obj_id: 'duck',
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


export default ClassD;
