import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import styles from '../styles/styles'
import { SwiperFlatList } from 'react-native-swiper-flatlist';


export default function Upload({ route, navigation }) {

  const { user } = route.params;

  const [dashUser, setDashUser] = useState({});

  const [people, setPeople] = useState([]);

  const api = 'http://localhost:3080'

  async function fetchUserUpdates() {
    await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setDashUser(response[0]);
    })
  }

  console.log(dashUser, 'dashUser');

  useEffect(()=> {
    fetchUserUpdates();
  }, [])

  const colors = [dashUser.firstName, dashUser.lastName, 'skyblue'];

  const { width } = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.1, textAlign: 'center' },
  });

  return (
    // <View style={styles.view}>
    //   <Image source={{ uri: dashUser.imgsrc }} style={styles.profileimg} />
    //   <Text>Hey {dashUser.firstName}, time to start swiping!</Text>
    // </View>
    <View style={styles.container}>
      <SwiperFlatList index={0} showPagination>
        <View style={styles.child}>
          <Text>1st child</Text>
        </View>
        <View style={styles.child}>
          <Text>2nd child</Text>
        </View>
        <View style={styles.child}>
          <Text>3rd child</Text>
        </View>
      </SwiperFlatList>
    </View>
  )
}
