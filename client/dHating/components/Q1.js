import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'

export default function Upload({ route, navigation }) {


  const { nextUser } = route.params;

  const [currentTopic, setCurrentTopic] = useState({});

  const [topics, setTopics] = useState([]);

  const [i, setI] = useState(1);

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
      return response.json()
    })
    .then((data) => {
      setTopics(data)
      setCurrentTopic(data[0]);
    })
  }

  console.log(currentTopic, 'current');

  async function bundler () {
    await getQuestions();
    // displayNextTopic(true)
  }

  useEffect(() => {
    bundler();
  }, [])

  async function displayNextTopic(like) {
    if (like) {
      //go to next topic
      console.log(i)
      await setI((i) => i + 1);
      setCurrentTopic(topics[i])
    } else {
      console.log('notliked')
      fetch(`${api}/updatelike`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: nextUser,
          topic: currentTopic
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
      })
      await setI((i) => i + 1);
      setCurrentTopic(topics[i])
    }
    if (i === topics.length) {
      console.log('limit');
      //navigate to dashboard
      navigation.navigate('Dashboard', {user: nextUser});
    }
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {currentTopic &&
        <View>
          <Text>{currentTopic.topic}</Text>
          <Text>Disliked by (number)</Text>
          <Pressable
          onPress={() => displayNextTopic(true)}
          ><Text>✔</Text></Pressable>
          <Pressable
          onPress={() => displayNextTopic(false)}
          ><Text>✖</Text></Pressable>
        </View>

    }

    </View>
  );
}