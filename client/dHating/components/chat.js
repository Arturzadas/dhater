import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles/styles'
// import Upload from './upload';

function Chat ({ navigation, route }) {

  const { user } = route.params;
  const { matched } = route.params;
  const { chat } = route.params;

  // console.log(user, matched, chat)




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
        ></TextInput>
        <Pressable 
        style={styles.sendBtn}
        >
        <Text
        style={styles.sendText}
        >Send</Text></Pressable>
      </View>
    </View>
  )
}

export default Chat;