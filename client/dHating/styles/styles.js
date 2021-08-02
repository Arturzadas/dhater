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
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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
    justifyContent: 'center'
  },
  likeBtn : {
    margin: 12,
    marginTop: 25,
    height: 40,
    width: 150,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: 'white',
  },
  dislikeBtn : {
    margin: 12,
    marginTop: 25,
    height: 40,
    width: 150,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: 'white',
  }
});

export default styles;