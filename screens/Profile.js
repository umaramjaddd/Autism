import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from './firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

function AccountScreen() {

  const route = useRoute();
  const { userData } = route.params;

  // const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } else {
          // User is not authenticated, navigate to the login screen
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      {userData ? (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataText}>Name: {userData.name}</Text>
          <Text style={styles.userDataText}>Email: {userData.email}</Text>
          <Text style={styles.userDataText}>Gender: {userData.gender}</Text>
          <Text style={styles.userDataText}>Phone No.: {userData.number}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user data...</Text>
      )}
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
  userDataContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 20,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#555555',
  },
});

export default AccountScreen;