import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function Class2() {
    const route = useRoute();
  const {  uid } = route.params;
  const navigation = useNavigation();

    const goToClassF = () => {
        navigation.navigate('ClassF' , {uid});
     };
   
     const goToClassG = () => {
      navigation.navigate('ClassG' , {uid});
   };

 
return (
    <View style={styles.container}>
      <Text style={styles.title}>Age 5-7</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToClassF}>
          <Text style={styles.buttonText}>Class F</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}  onPress={goToClassG}>
          <Text style={styles.buttonText}>Class G</Text>
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


export default Class2;
