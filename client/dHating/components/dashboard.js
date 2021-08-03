import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Image, Pressable, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles'
import { SwiperFlatList } from 'react-native-swiper-flatlist';


export default function Upload({ route, navigation }) {

  const { user } = route.params;

  const [dashUser, setDashUser] = useState({}); //info of user from api, in order to update status and dislikes

  const [people, setPeople] = useState([]); //all the dislikes you have and people with the same dislikes

  const [current, setCurrent] = useState({ disliked: [] }); //current displayed user to match

  const [noUsers, setNoUsers] = useState({
    _id: "6103cf811c02c605c66cd400",
    firstName: ":(",
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
    imgsrc: "https://i1.sndcdn.com/avatars-ogZ6belzWBS4NT9t-NLLydw-t500x500.jpg",
    message: `There's no one left to match`
  })

  const [newTopics, setNewTopics] = useState([]);

  const [pressable, setPressable] = useState(true);

  const [matches, setMatches] = useState({
    chats: []
  });

  const [matchProfiles, setMatchProfiles] = useState({
    profiles: []
  })

  const [commonDislikes, setCommonDislikes] = useState(null);

  const api = 'http://127.0.1.1:3080'

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
        getNewTopics()
        if (!first) return;
        fetch(`${api}/getpeople`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            disliked: synced.disliked,
            id: synced._id,
            blacklist: synced.blacklist
          })
        })
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            const test = response;
            console.log(test.users, 'test')
            for (let k = 0; k < response.users.length; k++) {
              if (response.users[k]._id === user._id) {
                console.log('here')
                response.users.splice(k, 1);
              }
            }
            const result = [];
            const filter = [];
            for (let d = 0; d < user.blacklist.length; d++) {
              filter.push(user.blacklist[d].id);
            }
            console.log(response.users, 'res')
            for (let u = 0; u < response.users.length; u++) {
              for (let k = 0; k < response.users[u].blacklist.length; k++) {
                console.log('found dupe')
                if (filter.includes(response.users[u].blacklist[k].id)) {
                  result.push(response.users[u]);
                }
              }
            }
            console.log(response.users, 'people')
            setPeople(response);
          })
      })
    // console.log(people, 'people');
  }


  async function displayCommonDislikes(userSync) {
    let dislikes = [];
    for (let j = 0; j < userSync.disliked.length; j++) {
      // console.log('here')
      for (let k = 0; k < dashUser.disliked.length; k++) {
        if (userSync.disliked[j].id === dashUser.disliked[k].id) {
          if (dislikes.includes(userSync.disliked[j].id)) {
            // console.log('duplicate');
          } else {
            dislikes.push(userSync.disliked[j].id);
          }
        }
      }
    }

    let result = [];

    for (let k = 0; k < people.dislikes.length; k++) {
      for (let h = 0; h < dislikes.length; h++) {
        if (dislikes[h] === people.dislikes[k]._id) {
          result.push(people.dislikes[k]);
        }
      }
    }

    // console.log(result)
    setCommonDislikes(result);
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
          }
        })
    } else {
      await fetch(`${api}/sendblacklist`, {
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
          }
        })
    }
  }

  // console.log(people, 'people');

  function displayNextUser() {
    if (i === people.users.length) {
      setCurrent(noUsers);
      setCommonDislikes([]);
      return
    }
    setCurrent(people.users[i]);

    let userSync = people.users[i];

    displayCommonDislikes(userSync)

    setI((el) => el + 1);
  }

  function hidePressable() {
    setPressable(false);
  }

  function hideDislikes() {
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

  async function newDislike(el) {
    fetch(`${api}/updatelike`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: dashUser,
        topic: el
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        fetchUserUpdates()
      })
  }

  async function openChat(id1, matchedUser) {
    let correctMatch;

    for (let k of matches) {
      if (id1 === k.user1 || id1 === k.user2) {
        correctMatch = k;
      }
    }

    navigation.navigate('Chat', { user: dashUser, matched: matchedUser, chat: correctMatch });
  }

  async function getNewTopics() {
    fetch(`${api}/getnewtopics`, {
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
        // console.log(response, 'here')
        setNewTopics(response);
      })
  }





  //! dashStyle had to be defined here in order to get the width property working correctly

  const { width } = Dimensions.get('window');
  const dashStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center' },
    child: { width, justifyContent: 'center', backgroundColor: '#F7F5F0' },
    text: { fontSize: width * 0.05, textAlign: 'center', fontFamily: 'ubuntu', },
    text2: { fontSize: width * 0.04, textAlign: 'center', fontFamily: 'ubuntu', },
  });



  return (
    <View style={dashStyle.container}>
      <SwiperFlatList
        index={1}
        showPagination={true}
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
          <Text style={dashStyle.text2}>Things you may dislike...</Text>
          <View style={styles.profileDislikes}>

          <View style={styles.dislikesView}>
            <ScrollView horizontal={true} vertical={false}>


              {newTopics && newTopics.map(el => {
                let id = el._id + current._id;
                return (
                  <TouchableOpacity
                  key={id}
                  onPress={() => newDislike(el)}
                  >
                    <View
                    // style={styles.commonDislike}
                    >
                      <ImageBackground
                        source={require('../assets/images/gradient.png')}
                        style={styles.buttonImg}
                        imageStyle={{ borderRadius: 30 }}
                        >
                        <Text style={dashStyle.text2}>{el.topic}</Text>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
              </View>

        </View>
        {/* second screen */}
        {/* second screen */}
        {/* second screen */}
        <View style={[dashStyle.child, styles.view]}>
          {pressable &&
            <View style={styles.peopleContainer}>
              <Image source={{ uri: dashUser.imgsrc }} style={styles.peopleImage}></Image>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  displayNextUser();
                  hidePressable();
                }}
              >
                <Text style={styles.buttonText}>Start matching here!</Text></TouchableOpacity>
            </View>
          }
          {current.imgsrc &&
            <View>
              <ImageBackground
                source={{ uri: current.imgsrc }}
                style={styles.peopleImage}
                imageStyle={{ borderRadius: 30, width: 348, height: 597 }}
              >
                <View
                  style={styles.dislikesView}
                >

                  <ScrollView horizontal={true} vertical={false}
                  >

                    {commonDislikes && commonDislikes.map(el => {
                      let id = el._id + current._id;
                      return (
                        <TouchableOpacity
                          key={id}
                        >
                          <View
                          // style={styles.commonDislike}
                          >
                            <ImageBackground
                              source={require('../assets/images/gradient.png')}
                              style={styles.buttonImg}
                              imageStyle={{ borderRadius: 30 }}
                            >
                              <Text style={dashStyle.text2}>{el.topic}</Text>
                            </ImageBackground>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                </View>
                <View
                  style={styles.flexContainer}
                >

                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => {
                      displayNextUser();
                      handleMatching(true);
                    }}
                  ><Text style={styles.buttonText}>✔
                    </Text></TouchableOpacity>
                  <Text style={styles.currentNameDisplay}>{current.firstName}</Text>
                <TouchableOpacity
                  onPress={() => {
                    displayNextUser();
                    handleMatching(false);
                    }
                  }
                  style={styles.dislikeBtn}
                ><Text style={styles.buttonText}>✖
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          }
          {current.message &&
            <Text style={dashStyle.text2}>{current.message}</Text>
          }
        </View>
        {/* third screen */}
        {/* third screen */}
        {/* third screen */}
        <View style={dashStyle.child}>
          <View style={styles.matchView}>


            {matchProfiles.profiles && matchProfiles.profiles.map(el => (
              <TouchableOpacity
                key={el._id}
                style={styles.matchContainer}
                onPress={() => {
                  openChat(el._id, el);
                }}
              >

                <TouchableOpacity
                  onPress={() => {
                    openChat(el._id, el);
                  }}>
                  <Image
                    source={el.imgsrc}
                    style={styles.matchImg}
                  ></Image>
                </TouchableOpacity>

                <Text
                style={dashStyle.text2}
                  onPress={() => {
                    openChat(el._id, el);
                  }}>
                  {el.firstName} {el.lastName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SwiperFlatList>
    </View>
  )
}
