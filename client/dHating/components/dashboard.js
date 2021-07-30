import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Image, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'
import { SwiperFlatList } from 'react-native-swiper-flatlist';


export default function Upload({ route, navigation }) {

  const { user } = route.params;

  const [dashUser, setDashUser] = useState({}); //info of user from api, in order to update status and dislikes

  const [people, setPeople] = useState([]); //all the dislikes you have and people with the same dislikes
  
  const [dislikes, setDislikes] = useState([]); //current common disliked with each user
  
  const [current, setCurrent] = useState({}); //current displayed user to match

  const [noUsers, setNoUsers] = useState({
    _id: "6103cf811c02c605c66cd400",
    firstName: "test4",
    lastName: "test4",
    email: "test4",
    password: "",
    step: 1,
    disliked: [
      {
        _id: "6103cf881c02c605c66cd407",
        id: "6103ce411c02c605c66cd3a8"
      },
      {
        _id: "6103cf881c02c605c66cd40b",
        id: "6103ce691c02c605c66cd3aa"
      }
    ],
    __v: 0,
    imgsrc: "https://i2.wp.com/cdn3.iconfinder.com/data/icons/pictomisc/100/sadface-512.png",
    message: `There's no one left to match`
  })

  const [pressable, setPressable] = useState(true);

  const api = 'http://localhost:3080'

  let synced;

  const [i, setI] = useState(0)

  async function fetchUserUpdates() {
    await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      synced = response[0];
      setDashUser(response[0]);
    })
    .then((e) => {
      // console.log(synced, 'sent body');
      fetch(`${api}/getpeople`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          disliked: synced.disliked
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        // console.log(response, 'response')
        setPeople(response);
      })
    })
  }

  useEffect(()=> {
    fetchUserUpdates();
  }, [])

  async function handleMatching (like) {
    if (like) {
      let newMatch;
      // console.log(current._id,'currentid',  dashUser._id, 'dashid')
      await fetch(`${api}/sendlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          liked: current._id,
          user: dashUser._id
        })
      })
      .then((response) => {
        return response.json()
      })
      .then(response => {
        if (response) {
          newMatch = response;
        } else {
          console.log('no match');
        }
      })
      //check if user liked us
      if (user.likedback) {
        // create match
        // next user
        // return
      }
      //send like to api
      //next user
      //return
    } else {
      //send api request to blacklist user (not liked) - do this later
      //next user
    }
  }

  function displayNextUser() {
    if (i === people.users.length) {
      setCurrent(noUsers);
      return
    }
    // console.log('here', i)
    setCurrent(people.users[i]);
    setI((el) => el + 1);
  }

  function hidePressable() {
    setPressable(false);
  }

  //! dashStyle had to be defined here in order to get the width property working correctly

  const { width } = Dimensions.get('window');
  const dashStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center'},
    child: { width, justifyContent: 'center'},
    text: { fontSize: width * 0.05, textAlign: 'center' },
  });

  // console.log(current, 'current')

  return (
    <View style={dashStyle.container}>
      <SwiperFlatList
        index={1}
        showPagination={false}
        renderAll={true}
      >
        <View style={[dashStyle.child, styles.view]}>
          <Image
            source={{ uri: dashUser.imgsrc }}
            style={styles.dashImg} />
          <Text
            style={dashStyle.text}>
            Hey {dashUser.firstName}, time to start swiping!
          </Text>
        </View>
        <View style={[dashStyle.child, styles.view]}>
          {pressable && <Pressable onPress={() => {
            displayNextUser();
            hidePressable();
          }}
          >
            <Text>Click here to start</Text></Pressable>}
          {current.imgsrc &&
            <View>

              <Image
                source={{ uri: current.imgsrc }}
                style={styles.dashImg}
              ></Image>
              <Pressable
              onPress={() => {
                  displayNextUser();
                  handleMatching(true);
                }}
              ><Text>Like</Text></Pressable>
              <Pressable
              onPress={() => displayNextUser()}
              ><Text>Dislike</Text></Pressable>
            </View>
          }
          {current.message &&
            <Text>{current.message}</Text>
          }
        </View>
        <View style={dashStyle.child}>
          <Text style={dashStyle.text}>3rd child</Text>
        </View>
      </SwiperFlatList>
    </View>
  )
}
