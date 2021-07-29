import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'

export default function Upload({ route, navigation }) {

  const api = 'http://localhost:3080'

  const { user } = route.params;

  const [image, setImage] = useState(null);

  const [update, setUpdate] = useState(user);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      const { uri, base64 } = result
      setImage(result);
      handleUpload(uri, base64);
    }
  };

  console.log(update, '---------------------')

  const handleUpload = async (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'images');
    data.append('cloud_name', 'deyeajctv');

    await fetch('https://api.cloudinary.com/v1_1/deyeajctv/image/upload', {
      method: 'POST',
      body: data,
    })
    .then(res=> res.json())
    .then(data=> setUpdate((prev) => ({
      ...prev,
      imgsrc: data.url
    })))
    console.log(update, 'update');
  }

  function updateUrl () {
    fetch(`${api}/updatepic`, {
      method: 'PUT',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: update._id,
        imgsrc: update.imgsrc
      })
    })
    .then((response) => {
      response.json()
    })
    .then(response => console.log(response));
  }

  useEffect(()=> {
    updateUrl();
  },[update])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: update.imgsrc }} style={styles.profileimg} />}
      {update.imgsrc &&
        <Pressable
          title='Continue'
          style={styles.button}
          // onPress={() => { navigation.navigate('Q1') }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>}
    </View>
  );
}
