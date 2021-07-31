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

  const [current, setCurrent] = useState({disliked: []}); //current displayed user to match

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

  const [commonDislikes, setCommonDislikes] = useState(null);

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
        setDashUser(response[0], getMatchProfiles());
      })
      .then((e) => {
        getMatchChats()
        if (!first) return;
        fetch(`${api}/getpeople`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            disliked: synced.disliked,
            id: synced._id
          })
        })
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            console.log(response)
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
        setMatches(response);
      })
  }

  useEffect(() => {
    fetchUserUpdates(true);
  }, [])

  async function handleMatching(like) {
    if (like) {
      let newMatch;
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
            fetchUserUpdates(false);
          } else {
          }
        })
    }
  }

  function displayNextUser() {
    if (i === people.users.length && i !== 0) {
      setCurrent(noUsers);
      return
    }
    let dislikes = [];
    
    for (let i = 0; i < current.disliked.length; i++) {
      for (let k = 0; k < dashUser.disliked.length; k++) {
        if (current.disliked[i].id === dashUser.disliked[k].id) {
          if (dislikes.includes(current.disliked[i].id)) {
            console.log('duplicate');
          } else {
            dislikes.push(current.disliked[i].id);
          }
        }
      }
    }
    fetch(`${api}/getdislikes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dislike: dislikes
      })
    })
      .then((response) => {
        return response.json()
      })
      .then(response=> {
        console.log(response, 'common dislikes');
        setCommonDislikes(response);
      })
    setCurrent(people.users[i]);
    setI((el) => el + 1);
  }

  function hidePressable() {
    setPressable(false);
  }

  async function getMatchProfiles() {
    const userArray = [];
    for (let k of synced.matches) {
      if (k.user2 === synced._id) {
        userArray.push(k.user1);
      } else {
        userArray.push(k.user2);
      }
    }
    await fetch(`${api}/getmatchprofiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        matches: userArray,
        user: dashUser._id
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

  async function openChat(id1, matchedUser) {
    let correctMatch;

    for (let k of matches) {
      if (id1 === k.user1 || id1 === k.user2) {
        correctMatch = k;
      }
    }

    navigation.navigate('Chat', {user: dashUser, matched: matchedUser, chat: correctMatch});
  }



  //! dashStyle had to be defined here in order to get the width property working correctly

  const { width } = Dimensions.get('window');
  const dashStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center' },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.05, textAlign: 'center' },
  });



  return (
    <View style={dashStyle.container}>
      <SwiperFlatList
        index={2}
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
            <View
            key={el._id}
            style={styles.matchedUser}
            >
              <Pressable
                onPress={() => {
                  openChat(el._id, el);
                }}
              >

                <Image
                  source={{ uri: el.imgsrc }}
                  style={styles.matchImg}

                >

                </Image>
                <Text
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
