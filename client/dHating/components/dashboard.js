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

  const [matches, setMatches] = useState({
    chats: []
  });

  const [matchProfiles, setMatchProfiles] = useState({
    profiles: []
  })

  const api = 'http://localhost:3080'

  let synced;

  const [i, setI] = useState(0)

  async function fetchUserUpdates(first) {
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
        getMatchChats()
        getMatchProfiles()
        if (!first) return;
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

  async function getMatchChats() {
    fetch(`${api}/getchats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: synced._id
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        console.log(response, 'matches')
        setMatches(response);
      })
  }

  useEffect(() => {
    fetchUserUpdates(true);
  }, [])

  async function handleMatching(like) {
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
            //congratulations screen lmao you just fake matched someone
            // setMatches({
            //   chats: [...matches.chats, response]
            // });
            fetchUserUpdates(false);
          } else {
            console.log('no match');
          }
        })
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

  async function getMatchProfiles() {
    const userArray = [];
    for (let k of synced.matches) {
      userArray.push(k.user2);
    }
    await fetch(`${api}/getmatchprofiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        matches: userArray
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        setMatchProfiles({
          profiles: [...response]
        });
      })
  }



  //! dashStyle had to be defined here in order to get the width property working correctly

  const { width } = Dimensions.get('window');
  const dashStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center' },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.05, textAlign: 'center' },
  });

  console.log(dashUser, 'dashUser')
  // console.log(matches, 'matches')

  return (
    <View style={dashStyle.container}>
      <SwiperFlatList
        index={1}
        showPagination={false}
        renderAll={true}
      >
        {/* first screen */}
        <View style={[dashStyle.child, styles.view]}>
          <Image
            source={{ uri: dashUser.imgsrc }}
            style={styles.dashImg} />
          <Text
            style={dashStyle.text}>
            Hey {dashUser.firstName}, time to start swiping!
          </Text>
          {/* second screen */}
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
        {/* third screen */}
        <View style={dashStyle.child}>
          {matchProfiles.profiles && matchProfiles.profiles.map(el => (
            <View key={el._id}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Chat', { user: dashUser })
                }}
              >

                <Image
                  source={{ uri: el.imgsrc }}
                  style={styles.dashImg}

                >

                </Image>
                <Text
                  style={dashStyle.text}
                >{el.firstName} {el.lastName}
                </Text>
              </Pressable>
            </View>
          ))}

        </View>
      </SwiperFlatList>
    </View>
  )
}
