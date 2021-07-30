import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'

export default function Upload({ route, navigation }) {

  const { user } = route.params;

  const [dashUser, setDashUser] = useState({});

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


  return (
    <View style={styles.view}>
      <Image source={{ uri: dashUser.imgsrc }} style={styles.profileimg} />
      <Text>Hey {dashUser.firstName}, time to start swiping!</Text>
    </View>
  )
}
