import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { doc, getDoc, setDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from './screens/firebase';
import GetDocs from './screens/GetDoc';

import { useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from './screens/firebase';
import { signOut } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import SignUpScreen from './screens/Signup';
import AccountScreen from './screens/Profile';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import SplashScreen from './screens/Splash';
import AdUploadScreen from './screens/UploadAd';
import YourScreen from './screens/Classes';
import RecordingScreen from './screens/Upload Audio';
import ListenAudio from './screens/ListenAudio';
import { useNavigation } from '@react-navigation/native';
import Class1 from './screens/Class1';
import ClassB from './screens/ClassB';
import ClassD from './screens/ClassD';
import Class2 from './screens/Class2';
import ClassF from './screens/ClassF';

// import laptop from './laptop';
import Laptop from './screens/laptop';
import ClassG from './screens/ClassG';
import ClassBsub from './screens/ClassBsub';
import Ok from './screens/ok';
import Notok from './screens/Comp';
import ClassZ from './screens/ClassZ';
// import ClassBsub from './ClassBsub';
// import SignOut from './SignOut';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

  const HandleSignOut = () => {
    const navigation = useNavigation ();
    
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
        // Navigate to the desired screen upon successful sign out
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log('Error signing out:', error);
        // Handle the error if signing out fails
      });
  };

  // const navigation = useNavigation ();
export default function App() {
  const [myData, setMyData] = useState(null);

  
  const AppDrawer = ({ route }) => {
    const { userData, uid } = route.params;
  
    return (
      <Drawer.Navigator initialRouteName="Home" initialParams={route.params}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
          initialParams={{ userData, uid }} // Pass userData and uid as initialParams
        />
        <Drawer.Screen
          name="My Profile"
          component={AccountScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="person" color={color} size={size} />
            ),
          }}
          initialParams={{ userData, uid }} // Pass userData and uid as initialParams
        />
                <Drawer.Screen
          name="Sign Out"
          component={HandleSignOut}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="logout" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };
  
  const AuthStack = () => {
    return (
      <Stack.Navigator  screenOptions={{
             headerShown: false
         }}>
         <Stack.Screen name="Splash" component={SplashScreen} />

         <Stack.Screen name="Login" component={LoginScreen} />
                
        <Stack.Screen name="Signup" component={SignUpScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Laptop" component={Laptop}  />
        <Stack.Screen name="Class1" component={Class1}  /> 
        <Stack.Screen name="ClassA" component={YourScreen}  />
        <Stack.Screen name="ClassB" component={ClassB}  />
        <Stack.Screen name="ClassD" component={ClassD}  />
        <Stack.Screen name="Class2" component={Class2}  />
        <Stack.Screen name="ClassF" component={ClassF}  />
        <Stack.Screen name="ClassG" component={ClassG}  />
        <Stack.Screen name="Ookk" component={Notok}  />
        <Stack.Screen name="ClassZ" component={ClassZ}  />
        <Stack.Screen name="ClassBsub" component={ClassBsub}  />
        <Stack.Screen name="mySeeAudio" component={ListenAudio}  />
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      </Stack.Navigator>
    );
  };

  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>


    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
