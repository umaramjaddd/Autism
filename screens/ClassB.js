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


const ClassB = () => {
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
      name: 'B A G',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fbag.jpeg?alt=media&token=c044198d-f8fa-4e27-a45c-88aeb79149e1.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbag.mp3?alt=media&token=80babd07-1b9b-4624-92f9-f6b2e4f68c4f.mp3',
      obj_id: 'bag',
    },
    {
      name: 'B A L L',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fball.jpeg?alt=media&token=9eafd501-a342-4eca-9929-6341860d4395.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fball.mp3?alt=media&token=da3232ce-fb37-452b-b5fb-ba19b68d31e5.mp3',
      obj_id: 'ball',
    },
    {
      name: 'B A L L O O N',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fballon.jpeg?alt=media&token=9b8b6160-a81c-4852-b0ed-828d4a1ad393.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fballoon.mp3?alt=media&token=07088bc3-286b-4a55-be9b-085c196f099d.mp3',
      obj_id: 'balloon',
    },
    {
      name: 'B A S K E T',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fbasket.jpeg?alt=media&token=b4e95dd5-b84e-47eb-8bed-c0dab93a1897.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbasket.mp3?alt=media&token=cb7a72c5-f3ac-4a73-97a1-c9ba0187dd2c.mp3',
      obj_id: 'basket',
    },
    {
      name: 'B A T',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fbat.jpeg?alt=media&token=a48957cf-bde6-4622-98bb-95c110d2c65a.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbat.mp3?alt=media&token=6455ee54-8af9-4483-ae9a-356ab4613bbd.mp3',
      obj_id: 'bat',
    },
    {
      name: 'B I C Y C L E',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fbi.jpeg?alt=media&token=bc4c6344-2b46-4137-b1ec-208e75436991.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbicycle.mp3?alt=media&token=441bf401-4e68-46ea-85d1-a22072c3%200562.mp3',
      obj_id: 'bicycle',
    },
    {
      name: 'B O A T',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fboat.jpeg?alt=media&token=5f0087c1-6e85-4b41-811d-e29f46ea0533.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fboat.mp3?alt=media&token=a37f8017-1099-4a7f-8be2-92e9eb8f596e.mp3',
      obj_id: 'baoat',
    },
    {
      name: 'B O T T L E ',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fbottle.jpeg?alt=media&token=88aea72b-8139-4501-8b44-3423a06f163c.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbottle.mp3?alt=media&token=6b802424-a590-447c-b879-83ada19c7dc7.mp3',
      obj_id: 'bottle',
    },
    {
      name: 'B R E A D',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fbread.jpeg?alt=media&token=1f5668a6-642b-4ddc-a036-623fcd788820.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbread.mp3?alt=media&token=7ffe25b5-5c42-4db5-8e25-8bcf81563f35.mp3',
      obj_id: 'bread',
    },
    {
      name: 'B U S',
      url: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20pics%2Fbus.jpeg?alt=media&token=c258a71f-65af-4fac-b11a-ebf7c07af81d.jpg',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/aurtism-cca25.appspot.com/o/B%20Recordings%2Fbus.mp3?alt=media&token=970b188b-ea0e-4254-a668-d29d8db88e0b.mp3',
      obj_id: 'bus',
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
    console.log("button pressed");
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


export default ClassB;
