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
  }
});

export default styles;