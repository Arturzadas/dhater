import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';

function Register ( { navigation } ) {

  const [loginStatus, setLoginStatus] = React.useState({});

  const [register, setRegister] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const api = 'http://localhost:3080'

  const handleChange = (name, value) => {
    // const { name, value } = value.target;
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
    // console.log(value);
  };

  async function registerUser () {
    await fetch(`${api}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email,
        password: register.password,
        step: 0
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        setLoginStatus(response);
        // console.log(response)
        navigation.navigate('Upload', {user: response});
      })
  }

  return (
    <View style={styles.view}>
      <Text style={styles.loginLabel}>First Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>handleChange('firstName', text)}
        value={register.firstName}
        name="firstName"
        />
      <Text style={styles.loginLabel}>Last Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>handleChange('lastName', text)}
        value={register.lastName}
        name="lastName"
        />
      <Text style={styles.loginLabel}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>handleChange('email', text)}
        value={register.email}
        name="email"
        />
      <Text style={styles.loginLabel}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>handleChange('password', text)}
        value={register.password}
        name="password"
        secureTextEntry={true}
      />
      <Pressable
      title='Start dHating'
      style={styles.button}
      onPress={() => {registerUser(register)}}
      >
        <Text style={styles.buttonText}>Start dHating</Text>
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
    padding: 10,
    fontFamily: 'ubuntu',
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
    marginTop: '20%'
  }
});

export default Register;