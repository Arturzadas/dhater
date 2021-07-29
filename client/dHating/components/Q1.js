import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'

export default function Upload({ route, navigation }) {


  const { nextUser } = route.params;




  return (
    <View>

    <Text>{nextUser._id}</Text>

    </View>
  );
}