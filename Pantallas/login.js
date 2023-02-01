import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, Image, Alert, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import PantallasContext from './PantallasContext';

export default function Login({ navigation }) {
  const logo = require('./logo.jpg');
  const { user, setUser } = useContext(PantallasContext);
  const [pass, setPass] = useState('');
  const [visible, setVisible] = useState(true);
  const [eye, setEye] = useState('eye-outline');

  const changeVisible = () => {
    if (visible === true) {
      setVisible(false);
      setEye('eye-off');
    } else {
      setVisible(true);
      setEye('eye-outline');
    }
  };

  const handleOnChange = (nom, con) => {
    if (user === nom) {
      if (pass === con) {
        return true;
      }
    } else {
      return false;
    }
  };

  const login = () => {
    if (handleOnChange('Rafa', '1234')) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error ❌', 'Make sure the information is correct', [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <ScrollView style={styles.layout}>
      <Image style={styles.image} source={logo} />
      <Text style={styles.titulo}>InCube</Text>
      <TextInput
        style={styles.width}
        onChangeText={(newText) => setUser(newText)}
        left={<TextInput.Icon icon="account" />}
        maxLength={20}
        defaultValue={user}
        underlineColor={'transparent'}
        theme={{ colors: { text: '', primary: '' } }}
        label="Username..."
        placeholder="Write your username..."
      />
      <TextInput
        style={styles.width}
        onChangeText={(newText) => setPass(newText)}
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon={eye} onPress={changeVisible} />}
        secureTextEntry={visible}
        maxLength={20}
        value={pass}
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
        onPress={() => {
          login();
        }}>
        Entrar
      </Button>
    </ScrollView>
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