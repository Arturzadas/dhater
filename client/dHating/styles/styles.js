import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F5F0'
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
    height: 70,
    width: 70,
    borderRadius: 300,
    margin: 10,
    borderWidth: 3,
    borderColor: '#F44336'
  },
  messageInput : {
    height: 40,
    width: 280,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontFamily: 'ubuntu',
  },
  chatContainer : {
    flex: 1,
    justifyContent: 'flex-end'
  },
  messageInputContainer : {
    flexDirection:'row',
    flexWrap:'wrap',
    margin: 20,
    height: 40,
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
    margin: 20
  },
  commonDislike : {
    margin: 20,
    height: 30,
    width: 'auto',
    // backgroundColor: '#f4511e',
    // opacity: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    color: 'white',
    borderWidth: 1,
    borderColor: '#F44336',
    padding: 0,
  },
  buttonImg: {
    margin: 5,
    marginBottom: 15,
    height: 30,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'flex-end',
    color: 'white',
    padding: 15,
  },
  loginBtn : {
    margin: 20,
    flex: 1,
    marginTop: 25,
    height: 40,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'flex-end',
    color: 'white',
    padding: 15,
  },
  topicImage: {
    height: 500,
    width: 350,
    borderRadius: 30,
    margin: 20,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  matchContainer: {
    flex: 0.13,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E2E0DB',

  },
  matchView : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  matchNames : {
    fontFamily: 'ubuntu',
    fontWeight: 'bold'
  },
  sent: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#fb7844',
    width: 'auto',
    padding: 10,
    margin: 5,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'white'
  },
  received: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    borderRadius: 10,
    backgroundColor: '#ca335e',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white'
  },
  currentNameDisplay : {
    backgroundColor: 'black',
    borderRadius: 10,
    color: 'white',
    borderWidth: 1,
    borderColor: '#F44336',
    fontSize: 20,
    margin: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  }
});

export default styles;