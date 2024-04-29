import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function GetDocs() {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      // const docRef = doc(db, 'testing', '9i76JLv36nDIARX27Y0Z');
      // const docSnap = await getDoc(docRef);
      
      // this can also be written as 
      const student = await getDoc(doc(db, 'testing', '9i76JLv36nDIARX27Y0Z'));

      if (student.exists()) {
        setMyData(student.data());
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {myData ? myData.name : 'Loading...'}</Text>
      <Text style={styles.text}>Age: {myData ? myData.age : 'Loading...'}</Text>
      {/* <Text style={styles.text}>
        Hobby: {myData ? myData.hobby.map(list => `  ${list}`) : 'Loading...'}
      </Text> */}
    </View>
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
