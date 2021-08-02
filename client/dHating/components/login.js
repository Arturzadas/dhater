import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Upload from './upload';

function Login ({ navigation }) {

  const [loginStatus, setLoginStatus] = React.useState({});

  const [login, setLogin] = React.useState({
    email: '',
    password: ''
  });

  const api = 'http://localhost:3080'

  const handleChange = (name, value) => {
    // const { name, value } = value.target;
    setLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  async function userLogin () {
    await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setLoginStatus(response);
      // console.log(response, 'here----------------------------------');
      if(response[0].step === 1) {
        // console.log('ifstatement entered')
        navigation.navigate('Dashboard', {user: response[0]});
      } else {
        navigation.navigate('Upload', {user: response[0]});
      }
    })
  }


      // const user = log.json();
      // if (log.status === 201) {
      //   console.log('log', user)
      //   //TODO set {user} to App.js status in order to make it accessible from every component
      //   setLoginStatus(log);
      // } else if (log.status === 500) {
      //   console.log('wrong credentials');
      // }

  return (
    <View style={styles.view}>
      <Text style={styles.loginLabel}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('email', text)}
        value={login.email}
        name="email"
      />
      <Text style={styles.loginLabel}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('password', text)}
        value={login.password}
        name="password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        title='Start dHating'
        onPress={() => { userLogin(login) }}
        style={styles.button}
      >
          <Text style={styles.buttonText}>Start dHating</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title='Register'
        style={styles.button}
        onPress={() => { navigation.navigate('Register') }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  loginLabel: {
    margin: 12,
    marginBottom: 0,
    textAlign: 'left',
    fontFamily: 'ubuntu',
  },
  button: {
    margin: 12,
    marginTop: 25,
    height: 40,
    width: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'ubuntu',
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '33%'
  }
});

export default Login;