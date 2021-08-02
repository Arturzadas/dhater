import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'

export default function Upload({ route, navigation }) {


  const { nextUser } = route.params;

  const [currentTopic, setCurrentTopic] = useState({});

  const [topics, setTopics] = useState([]);

  const [i, setI] = useState(1);

  const api = 'http://127.0.1.1:3080'

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
      const sliced = data.slice(0, 5);
      setTopics(sliced)
      setCurrentTopic(sliced[0]);
    })
  }

  // console.log(currentTopic, 'current');

  async function bundler () {
    await getQuestions();
    // displayNextTopic(true)
  }

  useEffect(() => {
    bundler();
  }, [])

  let synced;
  let dislikeNumber;
  
  async function displayNextTopic(like) {
    if (like) {
      //go to next topic
      // console.log(i)
      await setI((i) => i + 1);
      synced = topics[i];
      setCurrentTopic(topics[i])
      dislikeNumber = currentTopic.disliked.length
      console.log(dislikeNumber)
    } else {
      // console.log('notliked')
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
          // console.log(data);
        })
      await setI((i) => i + 1);
      synced = topics[i];
      setCurrentTopic(topics[i])
    }
    if (i === topics.length) {
      // console.log('limit');
      fetch(`${api}/updatestep`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nextUser)
      })
      navigation.navigate('Dashboard', { user: nextUser });
    }
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {currentTopic &&
        <View style={styles.view}>
          <Text>{currentTopic.topic}</Text>
          <Image source={{ uri: currentTopic.imgsrc }} style={styles.topicImage} />
          <View
                  style={styles.flexContainer}
                >
          <TouchableOpacity
          onPress={() => displayNextTopic(true)}
          style={styles.likeBtn}
          ><Text style={styles.buttonText}>✔</Text></TouchableOpacity>
          <TouchableOpacity
          onPress={() => displayNextTopic(false)}
          style={styles.dislikeBtn}
          ><Text style={styles.buttonText}>✖</Text></TouchableOpacity>
          </View>
        </View>

    }

    </View>
  );
}