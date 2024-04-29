import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function ClassBsub() {
    const route = useRoute();
  const {  uid } = route.params;
  const navigation = useNavigation();

    // const goToClassB = () => {
    //     navigation.navigate('ClassB' , {uid});
    //  };
   
     const goToClassB = () => {
         navigation.navigate('ClassB' , { uid });
        console.log("Your User Id is: ",uid);
     };
     const goToClassD = () => {
      navigation.navigate('ClassD' , { uid });
     console.log("Your User Id is: ",uid);
  };
   
     const handleSeeAds = () => {
       navigation.navigate('Ads', {uid});
     };
   
     const zain = () => {
      navigation.navigate('coke');
    };

    const mustafa = () => {
      navigation.navigate('Ookk', {uid});
    };

    const Danish = () => {
      navigation.navigate('ClassZ', {uid});
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
      <Text style={styles.title}>Class B Components</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToClassB}>
          <Text style={styles.buttonText}>B Words</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={zain}>
          <Text style={styles.buttonText}>B Phrases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={mustafa}>
          <Text style={styles.buttonText}>B Sentences</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Danish}>
          <Text style={styles.buttonText}>Tatti</Text>
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


export default ClassBsub;
