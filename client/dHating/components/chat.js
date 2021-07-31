import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles/styles'
// import Upload from './upload';

function Chat ({ navigation, route }) {

  const { user } = route.params;
  const { matched } = route.params;
  const { chat } = route.params;

  const api = 'http://localhost:3080'

  const [currentChat, setCurrentChat] = useState(null)

  const [currentMessage, setCurrentMessage] = useState('');

  const handleChange = (value) => {
    setCurrentMessage(value);
  };

  const handleChat = () => {
    setCurrentChat(chat);
  }

  useEffect(()=> {
    handleChat()
  }, [])

  const handleSubmit = async (sentMessage) => {

    if (sentMessage === '') return
    fetch(`${api}/postmessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id : currentChat._id,
        content: sentMessage,
        timestamp: Date.now().toString(),
        sender: user._id
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
      setCurrentChat(response)
    })
  }


  return (
    <View
      style={styles.chatContainer}
    >
      <View>
        <Text>Chat here!</Text>
      </View>
      <View
        style={styles.messageInputContainer}
      >
        <TextInput
          style={styles.messageInput}
          name="message"
          value={currentMessage}
          onChangeText={(text) => handleChange(text)}
        ></TextInput>
        <Pressable
          style={styles.sendBtn}
          onPress={() => {
            handleSubmit(currentMessage)
            handleChange('');
          }}
        >
          <Text style={styles.sendText}>Send</Text></Pressable>
      </View>
    </View>
  )
}

export default Chat;