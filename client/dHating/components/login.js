import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Login ({ navigation }) {

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
    console.log(value);
  };

  async function userLogin () {
    console.log(login);
    await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      })
    })
    .then(console.log(login))
  }

  return (
    <View style={styles.view}>
      <Text style={styles.loginLabel}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>handleChange('email', text)}
        value={login.email}
        name="email"
      />
      <Text style={styles.loginLabel}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>handleChange('password', text)}
        value={login.password}
        name="password"
        secureTextEntry={true}
      />
      <Pressable
      title='Start dHating'
      style={styles.button}
      onPress={() => {userLogin(login)}}
      >
        <Text style={styles.buttonText}>Start dHating</Text>
      </Pressable>
      <Pressable
      title='Register'
      style={styles.button}
      onPress={() => {navigation.navigate('Register')}}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
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
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '33%'
  }
});

export default Login;