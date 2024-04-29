import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export function Card(props) {
    <View key={index} style={styles.sectionContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.url }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{props.name}</Text>
        {/* setObjId(image.obj_id); */}
      
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={()=>{setObjId(props.obj_id);
        recording ? stopRecording() : startRecording()}}
      /> 
      
        <TouchableOpacity style={styles.button} 
        onPress={() => {
          console.log("Your Obj Id is: " + props.obj_id);
          // handleListenAudio();
        }}>
        <Text style={styles.buttonText}>See Your Audio Notes</Text>
      </TouchableOpacity>

      
        <TouchableOpacity style={styles.button} onPress={() => playSound(props.audioURL)}>
          <Text style={styles.buttonText}>Play Sound</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={() => playSound(image.audioURL)}>
  <Text style={styles.buttonText}>Play Sound</Text>
  <FontAwesomeIcon icon={faPlay} style={styles.playIcon} />
</TouchableOpacity> */}
      </View>
    </View>
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
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
    button: {
      width: 150,
      height: 40,
      backgroundColor: '#007AFF',
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