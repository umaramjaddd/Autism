import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from './firebase';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';

const AdUploadScreen = () => {
  const route = useRoute();
  const { uid } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    try {
      const imageRef = ref(storage, `ad_images/${Date.now().toString()}`);
      await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(imageRef);
      return imageURL;
    } catch (error) {
      console.log('Image upload error:', error);
      throw new Error('Failed to upload image.');
    }
  };

  const handleAdUpload = async () => {

    try {
      if (!uid) {
        console.log('User ID (uid) is undefined.');
        return;
      }
  
      // Rest of the code
    } catch (error) {
      console.log('Ad upload error:', error);
      // Handle error
    }

    try {
      const imageURL = await handleImageUpload();

      const adData = {
        userId: uid, // Replace with the actual user ID
        title,
        description,
        image: imageURL,
        // Add other relevant ad data
      };

      await addDoc(collection(db, 'ads'), adData);

      setTitle('');
      setDescription('');
      setImage(null);

      alert("Ad Uploaded Successfully!");

      // Show success message or navigate to another screen
      // ...
    } catch (error) {
      console.log('Ad upload error:', error);
      // Handle error
    }
  };

  const handleImageSelection = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.cancelled) {
        setImage(pickerResult.uri);
      }
    } catch (error) {
      console.log('Image selection error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload an Ad</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <TouchableOpacity style={styles.button} onPress={handleImageSelection}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}

      <TouchableOpacity style={styles.button} onPress={handleAdUpload}>
        <Text style={styles.buttonText}>Upload Ad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    width: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 45,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default AdUploadScreen;
