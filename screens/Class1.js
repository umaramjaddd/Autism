import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function Class1() {
    const route = useRoute();
  const {  uid } = route.params;
  const navigation = useNavigation();

    const goToClassA = () => {
        navigation.navigate('ClassA' , {uid});
     };
   
     const goToClassBsub = () => {
         navigation.navigate('ClassBsub' , { uid });
        console.log("Your User Id is: ",uid);
     };
     const goToClassD = () => {
      navigation.navigate('ClassD' , { uid });
     console.log("Your User Id is: ",uid);
  };
   
     const handleSeeAds = () => {
       navigation.navigate('Ads', {uid});
     };
   
     const handleClasses = () => {
      navigation.navigate('Classes', {uid});
    };
   
    const handleUploadAudio = () => {
     navigation.navigate('myAudioUpload', {uid});
     console.log("Your User Id is: ",uid);
   };
   
   const handleListenAudio = () => {
     navigation.navigate('mySeeAudio', {uid});
     console.log("Your User Id is: ",uid);
   };
return (
    <View style={styles.container}>
      <Text style={styles.title}>Class 2-4</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToClassA}>
          <Text style={styles.buttonText}>Class A</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToClassBsub}>
          <Text style={styles.buttonText}>Class B</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Class C</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToClassD}>
          <Text style={styles.buttonText}>Class D</Text>
        </TouchableOpacity>

      </View>
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
    color: 'black',
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 45,
    marginBottom: 10,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default Class1;
