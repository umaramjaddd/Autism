import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { auth } from './firebase';
import { signOut } from 'firebase/auth';

import AdUploadScreen from './UploadAd';
function HomeScreen() {

  const route = useRoute();
  const { userData, uid } = route.params;
  console.log(route.params);
  const navigation = useNavigation();

  const goToClass1 = () => {
     navigation.navigate('Class1' , {uid});
  };

  const goToCLass2 = () => {
      navigation.navigate('Class2' , { uid });
     console.log("Your User Id is: ",uid);
  };

  const goToClass3 = () => {
    navigation.navigate('Laptop');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToClass1}>
          <Text style={styles.buttonText}>Age 2-4</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToCLass2}>
          <Text style={styles.buttonText}>Age 5-7</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToClass3}>
        <Text style={styles.buttonText}>Age 8-10</Text>
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


export default HomeScreen;
