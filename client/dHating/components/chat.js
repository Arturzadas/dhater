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


  const [currentMessage, setCurrentMessage] = useState('');
  // console.log(user, matched, chat)

  const handleChange = (value) => {
    setCurrentMessage(value);
  };

  console.log(currentMessage);


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
        onPress={()=> handleChange('')}
        >
        <Text
        style={styles.sendText}
        >Send</Text></Pressable>
      </View>
    </View>
  )
}

export default Chat;