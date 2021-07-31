import { StyleSheet } from 'react-native';


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
  },
  myMessage : {
    backgroundColor: 'black'
  }
});

export default styles;