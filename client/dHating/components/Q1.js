import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'

export default function Upload({ route, navigation }) {


  const { nextUser } = route.params;

  const [answer, setAnswer] = useState(null);

  const [topics, setTopics] = useState([]);

  const id = nextUser._id;

  const api = 'http://localhost:3080'

  function getQuestions () {
    fetch(`${api}/topics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response, 'res')
      return response.json()
    })
    .then((data) => {
      console.log(data, 'response')
      setTopics(data)
    })
  }

  useEffect(() => {
    getQuestions();
  }, [])


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <Text>Question 1</Text>
    <Pressable><Text>✔</Text></Pressable>
    <Pressable><Text>✖</Text></Pressable>
    

    </View>
  );
}