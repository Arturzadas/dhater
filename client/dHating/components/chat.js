import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Upload from './upload';

function Chat ({ navigation, route }) {

  const { user } = route.params;
  const { matched } = route.params;
  const { chat } = route.params;

  console.log(user, matched, chat)




  return (
    <View>
      <Text>Chat here!</Text>
    </View>
  )
}

export default Chat;