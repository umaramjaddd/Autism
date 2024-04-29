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


const YourScreen = () => {
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
      name: 'T I G E R',
      url: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/hello.jpg?alt=media&token=fdb3bdea-13d1-4f55-a176-17df33d90f48&_gl=1*xi74ye*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTQ2NzkxNS4zNS4xLjE2ODU0NjgzNzYuMC4wLjA.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
      obj_id: 'tiger01',
    },
    {
      name: 'P A N D A',
      url: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/website.jpg?alt=media&token=53157994-53d8-4d0e-9b5a-1b19dbd14edb&_gl=1*1mxopen*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTQ2NzkxNS4zNS4xLjE2ODU0Njg2NzcuMC4wLjA.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/Free_Test_Data_500KB_MP3.mp3?alt=media&token=5b954885-0f83-4ee7-8ffc-8428140b4c2f&_gl=1*1sffam7*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTYxMzYwMS4zNy4xLjE2ODU2MTM3ODguMC4wLjA..mp3',
      obj_id: 'panda01',
    },
    // {
    //   name: 'Panda',
    //   url: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/website.jpg?alt=media&token=53157994-53d8-4d0e-9b5a-1b19dbd14edb&_gl=1*1mxopen*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTQ2NzkxNS4zNS4xLjE2ODU0Njg2NzcuMC4wLjA.jpg',
    //   audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
    // },
    // {
    //   name: 'Panda',
    //   url: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/website.jpg?alt=media&token=53157994-53d8-4d0e-9b5a-1b19dbd14edb&_gl=1*1mxopen*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTQ2NzkxNS4zNS4xLjE2ODU0Njg2NzcuMC4wLjA.jpg',
    //   audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
    // },
    // {
    //   name: 'Panda',
    //   url: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/website.jpg?alt=media&token=53157994-53d8-4d0e-9b5a-1b19dbd14edb&_gl=1*1mxopen*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTQ2NzkxNS4zNS4xLjE2ODU0Njg2NzcuMC4wLjA.jpg',
    //   audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
    // },
    // {
    //   name: 'Panda',
    //   url: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/website.jpg?alt=media&token=53157994-53d8-4d0e-9b5a-1b19dbd14edb&_gl=1*1mxopen*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTQ2NzkxNS4zNS4xLjE2ODU0Njg2NzcuMC4wLjA.jpg',
    //   audioURL: 'https://firebasestorage.googleapis.com/v0/b/okay-57997.appspot.com/o/sample-3s.mp3?alt=media&token=9409d5a5-651d-4381-ab2b-d9bff33dadaf&_gl=1*orcftt*_ga*MzYzMDE2MjQ4LjE2ODEzODEwNjc.*_ga_CW55HF8NVT*MTY4NTU0NDQzNS4zNi4xLjE2ODU1NDQ0NzEuMC4wLjA.mp3',
    // }
    // Add more image objects with their respective audioURLs
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

  // const route = useRoute();
  // const { userData, uid } = route.params;
   const navigation = useNavigation();

  // const handleListenAudio = () => {
  //   // const obj_iddd = objId2;

  //   navigation.navigate('mySeeAudio', {uid});
  //   console.log("Your User Id is: ",uid);
  //   console.log("Your Obj Id is: ",objId2);
  // };
  // useEffect(() => {
  //   console.log("Updated Obj Id:", objId2);
  // }, [objId2]);
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
      
        <TouchableOpacity style={styles.button}  onPress={()=>{setObjId(image.obj_id);
        recording ? stopRecording() : startRecording()}} 
      
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
      
        <TouchableOpacity style={styles.button} onPress={() => playSound(image.audioURL)}>
        <MaterialIcons name="play-arrow" size={24} color="black" />
          
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


export default YourScreen;
