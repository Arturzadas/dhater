import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Image, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'
import { SwiperFlatList } from 'react-native-swiper-flatlist';


export default function Upload({ route, navigation }) {

  const { user } = route.params;

  const [dashUser, setDashUser] = useState({}); //info of user from api, in order to update status and dislikes

  const [people, setPeople] = useState([]); //all the dislikes you have and people with the same dislikes
  
  const [dislikes, setDislikes] = useState([]); //current common disliked with each user

  const api = 'http://localhost:3080'

  let synced;

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
      synced = response[0];
      setDashUser(response[0]);
    })
    .then((e) => {

      console.log(synced, 'sent body');
      fetch(`${api}/getpeople`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          disliked: synced.disliked
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        console.log(response, 'response')
        setPeople(response);
      })
    })
  }

  console.log(dashUser.disliked, 'dashUser');
  console.log(people, 'people')

  useEffect(()=> {
    fetchUserUpdates();
  }, [])

  const colors = [dashUser.firstName, dashUser.lastName, 'skyblue'];

  //! dashStyle had to be defined here in order to get the width property working correctly

  const { width } = Dimensions.get('window');
  const dashStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.1, textAlign: 'center' },
  });

  return (
    <View style={dashStyle.container}>
      <SwiperFlatList index={0} showPagination>
        <View style={dashStyle.child}>
          <Image source={{ uri: dashUser.imgsrc }} style={styles.profileimg} />
          <Text>Hey {dashUser.firstName}, time to start swiping!</Text>
        </View>
        <View style={dashStyle.child}>
          <Text>2nd child</Text>
        </View>
        <View style={dashStyle.child}>
          <Text>3rd child</Text>
        </View>
      </SwiperFlatList>
    </View>
  )
}
