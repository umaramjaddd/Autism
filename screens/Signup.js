// import React from 'react';
// import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, setDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import AccountScreen from './Profile';
import { FontAwesome } from '@expo/vector-icons';

export default function SignUpScreen() {
  const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    }
    const handleSignup = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const { uid } = user;

        const userData = {
            email,
            name,
            gender,
            number,
          };

          // add the user data to the Firestore database
    const userRef = doc(db, 'users', uid);
    setDoc(userRef, userData);

    //  navigate to the account screen
     navigation.navigate('Login', { userData });
        
      })
      
      .catch(error => alert(error))
      .finally(() => setLoading(false));
    };
    
    // const handleSignIn = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       const user = userCredential.user;
    //       console.log("sign in success");
    //       alert("signedin successfully!!!");
    //     })
  
    //     .catch(error => alert(error))
    //     .finally(() => setLoading(false));
    // };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputContainer}>
          
        <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Gender"
            onChangeText={(text) =>  setGender(text)}
            value={gender}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

             <TextInput
            style={styles.input}
            placeholder="Phone No."
            onChangeText={(text) => setNumber(text)}
            value={number}
          /> 
          <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="#888" />
          </TouchableOpacity>
        </View>
        </View>
        {/* <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity> */}
  
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
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
      color: '#007AFF',
      marginBottom: 30,
    },
    inputContainer: {
      width: '80%',
      marginBottom: 30,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D3D3D3',
      borderRadius: 4,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#FFFFFF',
    },
    passwordInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
    },
    eyeIcon: {
      marginLeft: 10,
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
      backgroundColor: '#007AFF',
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 45,
      paddingTop: 10,
      marginTop: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  

// export default NewScreen;
