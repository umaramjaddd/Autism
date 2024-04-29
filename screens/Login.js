import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Image, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginScreen({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { uid } = user;
        const userRef = doc(db, 'users', uid);

        getDoc(userRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              // navigation.navigate('AppDrawer', { screen: 'Home' , userData, uid  });
              navigation.navigate('AppDrawer', { userData, uid  });

              // navigation.navigate('AppDrawer', { params: { userData, uid } });


              console.log("Login Success!Your User Id is: ", uid);
              console.log("& Your User data is: ", userData);
            } else {
              console.log("No such user exists in the database!");
            }
          })
          .catch((error) => {
            console.log("Error getting user document:", error);
          });
      })
      .catch((error) => {
        console.log("Error signing in:", error);
      });
  };
  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
    <Image style={styles.logo} source={require('../assets/f.jpeg')} />
      <Text style={styles.title}>Log In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Log In</Text>
        
      </TouchableOpacity> 
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>Register here</Text> 
      </TouchableOpacity>
      {/*  <Text></Text> onPress={handleSignUp} */}
    </View>
  );
}

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
    color: '#4CAF50',
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  
  },
  buttonTextt: {
    color: 'black',
    fontSize: 18,
  
  },
  logo: {
    width: 150,
    height: 150,
    // marginBottom: ,
  },
});
