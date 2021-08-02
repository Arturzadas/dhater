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
    handleChat();
    chatRefresh();
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

  const chatRefresh = async (stop) => {
    if (stop) {
      return;
    }
    setTimeout(() => {
      fetch(`${api}/getmatchchat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id : chat._id
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        // console.log(response)
        setCurrentChat(response)
      })
      chatRefresh();
    }, 5000);
  }


  return (
    <View
      style={styles.chatContainer}
    >
      <View>
        {currentChat && currentChat.chat.map((el) => {
          if (el.sender === user._id) {
            return (
              <View key={el._id}><Text style={styles.myMessage}>{el.content}</Text></View>
            )
          } else {
            return (
              <View key={el._id}><Text>{el.content}</Text></View>
            )
          }
        })}
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