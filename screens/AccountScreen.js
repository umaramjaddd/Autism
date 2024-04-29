import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, addDoc, updateDoc, collection } from 'firebase/firestore';

function AccountScreen() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      {userEmail ? (
        <View>
          <Text style={styles.subtitle}>Logged in as:</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      ) : (
        <Text style={styles.subtitle}>Not logged in</Text>
      )}
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default AccountScreen;
