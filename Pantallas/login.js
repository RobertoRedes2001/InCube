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
    <View style={styles.layout}>
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
          color="orange"
          dark={true}
          onPress={() => {
            login();
          }}>
          <Text style={{ fontFamily: 'Century Gothic', fontWeight: 'bold' }}>
            Login
          </Text>
        </Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
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
    borderColor: 'orange',
    height: 57,
    overflow: 'hidden',
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 3,
    width:150,
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
    width: 210,
    height: 210,
    alignSelf: 'center',
    borderRadius: 210 /2,
    borderWidth: 3,
    borderColor: 'rgba(255,165,0,1)',
    elevation: 10,
  },
  fullcircle0: {
    backgroundColor: 'rgba(255,165,0,0.45)',
    borderRadius: 215 / 2,
    borderColor: 'white',
    height: 215,
    width: 215,
    position: 'absolute',
  },
  fullcircle: {
    backgroundColor: 'rgba(255,165,0,0.4)',
    borderRadius: 220 / 2,
    borderColor: 'white',
    height: 220,
    width: 220,
    position: 'absolute',
  },
  fullcircle05: {
    backgroundColor: 'rgba(255,165,0,0.35)',
    borderRadius: 225 / 2,
    borderColor: 'white',
    height: 225,
    width: 225,
    position: 'absolute',
  },
  fullcircle1: {
    backgroundColor: 'rgba(255,165,0,0.3)',
    borderRadius: 230 / 2,
    borderColor: 'white',
    height: 230,
    width: 230,
    position: 'absolute',
  },
  fullcircle15: {
    backgroundColor: 'rgba(255,165,0,0.25)',
    borderRadius: 235 / 2,
    borderColor: 'white',
    height: 235,
    width: 235,
    position: 'absolute',
  },
  fullcircle2: {
    backgroundColor: 'rgba(255,165,0,0.2)',
    borderRadius: 240 / 2,
    borderColor: 'white',
    height: 240,
    width: 240,
    position: 'absolute',
  },
  fullcircle25: {
    backgroundColor: 'rgba(255,165,0,0.15)',
    borderRadius: 245 / 2,
    borderColor: 'white',
    height: 245,
    width: 245,
    position: 'absolute',
  },
  fullcircle3: {
    backgroundColor: 'rgba(255,165,0,0.1)',
    borderRadius: 250 / 2,
    borderColor: 'white',
    height: 250,
    width: 250,
    position: 'absolute',
  },
  fullcircle35: {
    backgroundColor: 'rgba(255,165,0,0.05)',
    borderRadius: 255 / 2,
    borderColor: 'white',
    height: 255,
    width: 255,
    position: 'absolute',
  },
  fullcircle40: {
    backgroundColor: 'rgba(255,165,0,0.01)',
    borderRadius: 260 / 2,
    borderColor: 'white',
    height: 260,
    width: 260,
    position: 'absolute',
  },
});
