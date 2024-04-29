import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import { storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
 RecordingScreen = () => {
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
     const filename = 'Audio' + timestamp + '.mp3';



     const storageRef = ref(storage, filename);
     // Upload the audio file to Firebase Storage

     await uploadBytes(storageRef, blob);
     console.log('Recording uploaded to Firebase Storage');

     // Get the download URL of the uploaded file
     const downloadURL = await getDownloadURL(storageRef);

     // Check if the document already exists in Firestor

     // Check if the document already exists in Firestore
     const docRef = doc(db, 'recordings', uid);
     const docSnapshot = await getDoc(docRef);

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
         },
       };

       await updateDoc(docRef, {
         recordings: updatedRecordings,
       });
       console.log('New recording data appended to Firestore');
     } else {
       // If the document does not exist, create a new document
       await setDoc(docRef, {
         recordings: {
           [timestamp]: {
             downloadURL: downloadURL,
             uid: uid,
           },
         },
       });
       console.log('New document with recording data created in Firestore');
     }
    }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};

export default RecordingScreen;
