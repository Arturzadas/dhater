import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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

    console.log(result);

    if (!result.cancelled) {
      const { uri, base64 } = result
      setImage(result);
      handleUpload(uri, base64);
    }
  };

  console.log(update, '---------------------')

  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'images');
    data.append('cloud_name', 'deyeajctv');

    fetch('https://api.cloudinary.com/v1_1/deyeajctv/image/upload', {
      method: 'POST',
      body: data,
    })
    .then(res=> res.json())
    .then(data=> setUpdate((prev) => ({
      ...prev,
      imgsrc: data.url
    })));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: update.imgsrc }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}


// function Upload({ route, navigation }) {

//   const { user } = route.params;
//   console.log(user);

//   console.log('upload files')
//   return (
//     <View>
//       <Text>{user.firstName}</Text>
//     </View>
//   )
// }

// export default Upload