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
     <View style={{ height: 20 }} />
      <View
        style={{
          marginBottom: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.fullcircle0} />
        <View style={styles.fullcircle} />
        <View style={styles.fullcircle05} />
        <View style={styles.fullcircle1} />
        <View style={styles.fullcircle15} />
        <View style={styles.fullcircle2} />
        <View style={styles.fullcircle25} />
        <View style={styles.fullcircle3} />
        <View style={styles.fullcircle35} />
        <View style={styles.fullcircle40} />
        <Image style={styles.image} source={logo} />
      </View>
      <View>
        <View style={{ height: 10 }} />
        <Text style={styles.titulo}>InCube</Text>
        <View style={{ height: 10 }} />
         <TextInput
        style={styles.width}
        onChangeText={(newText) => setUser(newText)}
        left={<TextInput.Icon icon="account" color="#F8B52C" />}
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
        left={<TextInput.Icon icon="lock" color="#F8B52C" />}
        right={<TextInput.Icon icon={eye} onPress={changeVisible} color="#F8B52C"  />}
        secureTextEntry={visible}
        maxLength={20}
        value={pass}
        underlineColor={'transparent'}
        theme={{ colors: { text: '', primary: '' } }}
        label="Password..."
        placeholder="Write your password..."
      />
        <View style={{ height: 20 }} />
        <Button
          style={styles.button}
          alignSelf="center"
          mode="contained"
          color="#F8B52C"
          dark={true}
          onPress={() => {
            login();
          }}>
          <Text style={{ fontFamily: 'Century Gothic', fontWeight: 'bold' }}>
            Entrar
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#344955',
    textAlign: 'center',
  },
  width: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 3,
    borderColor: '#F8B52C',
    height: 57,
    overflow: 'hidden',
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Century Gothic',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'rgba(248,181,44,1)',
    elevation: 10,
  },
  fullcircle0: {
    backgroundColor: 'rgba(248,181,44,0.45)',
    borderRadius: 305 / 2,
    borderColor: 'white',
    height: 305,
    width: 305,
    position: 'absolute',
  },
  fullcircle: {
    backgroundColor: 'rgba(248,181,44,0.4)',
    borderRadius: 310 / 2,
    borderColor: 'white',
    height: 310,
    width: 310,
    position: 'absolute',
  },
  fullcircle05: {
    backgroundColor: 'rgba(248,181,44,0.35)',
    borderRadius: 315 / 2,
    borderColor: 'white',
    height: 315,
    width: 315,
    position: 'absolute',
  },
  fullcircle1: {
    backgroundColor: 'rgba(248,181,44,0.3)',
    borderRadius: 320 / 2,
    borderColor: 'white',
    height: 320,
    width: 320,
    position: 'absolute',
  },
  fullcircle15: {
    backgroundColor: 'rgba(248,181,44,0.25)',
    borderRadius: 325 / 2,
    borderColor: 'white',
    height: 325,
    width: 325,
    position: 'absolute',
  },
  fullcircle2: {
    backgroundColor: 'rgba(248,181,44,0.2)',
    borderRadius: 330 / 2,
    borderColor: 'white',
    height: 330,
    width: 330,
    position: 'absolute',
  },
  fullcircle25: {
    backgroundColor: 'rgba(248,181,44,0.15)',
    borderRadius: 335 / 2,
    borderColor: 'white',
    height: 335,
    width: 335,
    position: 'absolute',
  },
  fullcircle3: {
    backgroundColor: 'rgba(248,181,44,0.1)',
    borderRadius: 340 / 2,
    borderColor: 'white',
    height: 340,
    width: 340,
    position: 'absolute',
  },
  fullcircle35: {
    backgroundColor: 'rgba(248,181,44,0.05)',
    borderRadius: 345 / 2,
    borderColor: 'white',
    height: 345,
    width: 345,
    position: 'absolute',
  },
  fullcircle40: {
    backgroundColor: 'rgba(248,181,44,0.01)',
    borderRadius: 350 / 2,
    borderColor: 'white',
    height: 350,
    width: 350,
    position: 'absolute',
  },
});
