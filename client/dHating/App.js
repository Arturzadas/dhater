import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Register from './components/register';
import Upload from './components/upload';
import Q1 from './components/Q1';
import Dashboard from './components/dashboard';
import Chat from './components/chat';
import { useFonts } from '@use-expo/font'


export default function App() {
  
  const [isLoaded] = useFonts({
    'ubuntu': require('./assets/fonts/Ubuntu-Regular.ttf'),
    'satisfy': require('./assets/fonts/Satisfy-Regular.ttf')
  });
  
  const Stack = createStackNavigator();

  const [userData, setUserData] = React.useState({})

  async function currentUser(user) {
    await setUserData(user);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="dHating"
          component={Login}
          options={title}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={navOptions}
        />
        <Stack.Screen
          name="Upload"
          component={Upload}
          options={upload}
        />
        <Stack.Screen
          name="Q1"
          component={Q1}
          options={Q1style}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={title2}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={navOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const noBackBtn = {
  headerLeft: () => {
    return null;
  },
  headerStyle: {backgroundColor: '#f4511e'},
  headerTintColor: '#fff',
  headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'},
  headerBackground: () => (
    <ImageBackground
    source={require('./assets/images/gradient.png')}
    imageStyle={{height : 65, width: width}}
    >
    </ImageBackground>
    ),
}

const navOptions = {
  headerStyle: {backgroundColor: '#f4511e'},
  headerTintColor: '#fff',
  headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center', fontFamily: 'ubuntu'},
  headerRight: () => {
    return <View></View>
  },
  headerBackground: () => (
    <ImageBackground
    source={require('./assets/images/gradient.png')}
    imageStyle={{height : 65, width: width}}
    >
    </ImageBackground>
    ),
}

const { width, height } = Dimensions.get('window');

const title = {
  headerStyle: {backgroundColor: '#f4511e'},
  headerBackground: () => (
    <ImageBackground
    source={require('./assets/images/gradient.png')}
    imageStyle={{height : 65, width: width}}
    >
    </ImageBackground>
    ),
    
  headerTintColor: '#fff',
  headerTitleStyle: {fontSize: 40, alignSelf: 'center', fontFamily: 'satisfy'},
}
const title2 = {
  headerStyle: {backgroundColor: '#f4511e'},
  headerLeft: () => {
    return null;
  },
  title: 'dHating',
  headerBackground: () => (
    <ImageBackground
    source={require('./assets/images/gradient.png')}
    imageStyle={{height : 65, width: width}}
    >
    </ImageBackground>
    ),
    
  headerTintColor: '#fff',
  headerTitleStyle: {fontSize: 40, alignSelf: 'center', fontFamily: 'satisfy'},
}
const Q1style = {
  headerStyle: {backgroundColor: '#f4511e',  fontSize: 10},
  headerLeft: () => {
    return null;
  },
  title: 'Dislikes',
  headerBackground: () => (
    <ImageBackground
    source={require('./assets/images/gradient.png')}
    imageStyle={{height : 65, width: width}}
    >
    </ImageBackground>
    ),
    
  headerTintColor: '#fff',
  headerTitleStyle: {fontSize: 40, alignSelf: 'center', fontFamily: 'ubuntu'},
}
const upload = {
  headerStyle: {backgroundColor: '#f4511e', fontSize: 10},
  headerLeft: () => {
    return null;
  },
  title: 'Upload',
  headerBackground: () => (
    <ImageBackground
    source={require('./assets/images/gradient.png')}
    imageStyle={{height : 65, width: width}}
    >
    </ImageBackground>
    ),
    
  headerTintColor: '#fff',
  headerTitleStyle: {fontSize: 40, alignSelf: 'center', fontFamily: 'ubuntu'},
}
