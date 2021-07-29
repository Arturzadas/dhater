import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function Upload({ route, navigation }) {

  const { user } = route.params;
  console.log(user);

  console.log('upload files')
  return (
    <View>
      <Text>{user.firstName}</Text>
    </View>
  )
}

export default Upload
