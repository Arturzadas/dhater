import { StyleSheet } from 'react-native';


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
  },
  profileimg : {
    height: 300,
    width: 300,
    borderRadius: 300,
    margin: 20,
    borderWidth: 1,
    borderColor: '#F44336'
  },
  topicImg: {
    height: 150,
    width: 150,
    borderRadius: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: '#F44336'
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dashImg: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 150,
    width: 150,
    borderRadius: 300,
    margin: 20,
    borderWidth: 1,
    borderColor: '#F44336'
  },
  likesContainer: {
    backgroundColor: '#FCF7ED',
    height: 'auto',
    width: '90%',
    borderStyle: 'solid',
    borderWidth: 1,
    flexShrink: 1,
    borderRadius: 10,
  },
  matchedUser : {
    flex: 1,
    flexDirection: 'row'
  },
  matchImg: {
    height: 150,
    width: 150,
    borderRadius: 300,
    margin: 20,
    borderWidth: 1,
    borderColor: '#F44336'
  },
  messageInput : {
    height: 40,
    width: 280,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    bottom: 1,
    left : 1,
    fontFamily: 'ubuntu',
  },
  chatContainer : {
    flex: 1,
    justifyContent: 'flex-end'
  },
  messageInputContainer : {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  sendBtn: {
    margin: 2,
    height: 40,
    width: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: 'white',
    bottom: 1,
    left : 1,
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 9,
    fontFamily: 'ubuntu',
  },
  myMessage : {
    backgroundColor: 'blue',
    fontFamily: 'ubuntu',
  },
  startButton : {
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
  peopleImage: {
    height: 600,
    width: 350,
    borderRadius: 30,
    margin: 20,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  peopleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
  likeBtn : {
    margin: 30,
    height: 70,
    width: 70,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    color: 'white',
    borderWidth: 1,
    borderColor: '#F44336'
  },
  dislikeBtn : {
    margin: 30,
    height: 70,
    width: 70,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    color: 'white',
    borderWidth: 1,
    borderColor: '#F44336'
  },
  flexContainer : {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  dislikesView : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 50,
  },
  commonDislike : {
    margin: 10,
    height: 30,
    width: 'auto',
    // backgroundColor: '#f4511e',
    // opacity: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    color: 'white',
    borderWidth: 1,
    borderColor: '#F44336'
  },
  buttonImg: {
    height: 30,
    width: 'auto',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  }
});

export default styles;