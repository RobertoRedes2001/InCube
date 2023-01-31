import * as React from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';

export default function Login({ navigation }) {
  const logo = require('./logo.jpg');
  const [mal, setMal] = React.useState(true);
  const [mal2, setMal2] = React.useState(true);
  const [text, setText] = React.useState('');
  const [text2, setText2] = React.useState('');

  const handleOnChange = (nom) => {
    if (text === '') {
      alert('Introduce un nombre de usuario');
      return false;
    } else {
      if (text === nom) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleOnChange2 = (nom) => {
    if (text === '') {
      alert('Introduce una contraseña');
      return false;
    } else {
      if (text2 === nom) {
        return true;
      } else {
        return false;
      }
    }
  };

  const login = () => {
    if (handleOnChange('Rafa') && handleOnChange2('1234')) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Datos incorrectos', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
      setMal(true);
    }
  };

  return (
    <View style={styles.layout}>
      <Image style={styles.image} source={logo} />
      <Text style={styles.titulo}>InCube</Text>
      <TextInput
        style={styles.width}
        onChangeText={(newText) => setText(newText)}
        left={<TextInput.Icon icon="account" />}
        maxLength={20}
        value={text}
        underlineColor={'transparent'}
        theme={{ colors: { text: '', primary: '' } }}
        label="Username..."
        placeholder="Write your username..."
      />
      <TextInput
        style={styles.width}
        onChangeText={(newText) => setText2(newText)}
        left={<TextInput.Icon icon="lock" />}
        secureTextEntry={true}
        maxLength={20}
        value={text2}
        underlineColor={'transparent'}
        theme={{ colors: { text: '', primary: '' } }}
        label="Password..."
        placeholder="Write your password..."
      />
      <Button
        style={styles.button}
        alignSelf="center"
        mode="contained"
        color="#dba534"
        textColor="black"
        onPress={() => {
          login();
        }}>
        Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#3c525b',
    textAlign: 'center',
  },
  width: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    height: 57,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
});