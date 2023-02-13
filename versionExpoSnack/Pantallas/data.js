import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert,TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { useContext, useState } from 'react';
import PantallasContext from '../components/PantallasContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Data(props) {
  const { user, setUser } = useContext(PantallasContext);
  const [iconBulb, setIconBulb] = React.useState('lightbulb-variant-outline');
  const [colorBulb, setColorBulb] = React.useState('white');
  const [consultaLuz, setConsultaLuz] = React.useState('');
  const [consultaTemp, setConsultaTemp] = React.useState('');
  const [interval, setInterval] = useState('');
  const [registro, setRegistro] = React.useState('');
  var date = new Date().getDate();

  const getLight = async () => {
    try {
      const response = await fetch('http://54.198.123.240:5000/api?codigo=9');
      if (response.ok) {
        try {
          const response2 = await fetch(
            'http://54.198.123.240:5000/api/light?date=10-02-2023'
          );
          if (response2.ok) {
            const dats = await response2.json();
            setConsultaLuz(dats[dats.length - 1].level + " lm");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTemp = async () => {
    try {
      const response = await fetch('http://54.198.123.240:5000/api?codigo=10');
      if (response.ok) {
        try {
          const response2 = await fetch(
            'http://54.198.123.240:5000/api/temperature?date=10-02-2023'
          );
          if (response2.ok) {
            const dats = await response2.json();
            setConsultaTemp(dats[dats.length - 1].temperature + " °C");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const intervalo = () => {
    if (interval < 10 || registro === '') {
      Alert.alert(
        'Error ❌',
        'Make sure the number of requests isn´t empty and the interval is 10 or higher',
        [{ text: 'OK' }]
      );
    } else {
      start();
    }
  };

  const historico = (reg) => {
    let cont = 0;
    while (cont !== reg) {
      setTimeout(() => {
        console.log('Sending request');
        cont++;
      }, tiempoEspera);
    }
  };

  const start = () => {
    if (iconBulb === 'lightbulb-variant-outline') {
      setIconBulb('lightbulb-variant');
      setColorBulb('orange');
    }
  };

  const stop = () => {
    if (iconBulb === 'lightbulb-variant') {
      setIconBulb('lightbulb-variant-outline');
      setColorBulb('white');
    }
  };

  const exit = () => {
    Alert.alert('Log Out', 'Do you want to log out?', [
      { text: 'Yes', onPress: () => props.navigation.navigate('Login') },
      { text: 'No' },
    ]);
  };

  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.top}>
        <View style={styles.izquierda}>
          <View style={styles.izquierda}>
            <Text style={styles.textoUser}> Hello {user}, Welcome</Text>
          </View>
        </View>
        <View style={styles.derecha}>
          <IconButton
            style={styles.iconos}
            alignSelf="center"
            icon="exit-to-app"
            color="white"
            size={35}
            onPress={exit}
          />
        </View>
      </View>
      <View style={styles.bot}>
        <View style={styles.luz}>
          <Text style={styles.titulo}>
            Current
            </Text>
            <IconButton
              style={styles.iconos2}
              icon="lightbulb-variant-outline"
              color="white"
              size={30}
            />
          <Button
            style={styles.button}
            alignSelf="center"
            mode="contained"
            color="orange"
            dark={true}
            onPress={getLight}>
            Show
          </Button>
        </View>
        <Text style={styles.titulo}>{consultaLuz}</Text>
        <View style={styles.luz}>
          <Text style={styles.titulo}>
            Current
             </Text>
            <IconButton
              icon="thermometer"
              color="white"
              size={30}
            /> 
          <Button
            style={styles.button}
            alignSelf="center"
            mode="contained"
            color="orange"
            dark={true}
            onPress={getTemp}>
            Show
          </Button>
        </View>
        <Text style={styles.titulo}>{consultaTemp}</Text>
        <View style={styles.data}>
          <Text style={styles.historical}>Historical</Text>
          <TextInput
            style={styles.width}
            keyboardType="numeric"
            defaultValue={registro}
            onChangeText={(newText) => setRegistro(newText)}
            underlineColor={'transparent'}
            theme={{ colors: { text: '', primary: '' } }}
            placeholder="Write how many records you want"
          />
          <TextInput
            style={styles.width}
            keyboardType="numeric"
            defaultValue={interval}
            onChangeText={(newText) => setInterval(newText)}
            underlineColor={'transparent'}
            theme={{ colors: { text: '', primary: '' } }}
            placeholder="Write the interval between records"
          />
        </View>
        <View style={styles.dataButtons}>
          <Button
            style={styles.button2}
            mode="contained"
            color="orange"
            dark={true}
            onPress={intervalo}>
            Start
          </Button>
          <Button
            style={styles.button2}
            mode="contained"
            color="orange"
            dark={true}
            onPress={stop}>
            Stop
          </Button>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <IconButton
            alignSelf="center"
            icon={iconBulb}
            color={colorBulb}
            size={80}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 5,
    backgroundColor: '#3c525b',
  },
  textoUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  dataButtons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,

  },
  data: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
  },
  button2: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: 'white',
    borderWidth:3,
  },
  width: {
    marginTop: 30,
    color:"white",
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    height: 57,
    width: 320,
    overflow: 'hidden',
    backgroundColor: 'orange',
    textAlign: 'center',
  },
  bot: {
    flex: 4,
  },
  luz: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    height: screenHeight / 10,
    width: screenWidth,
    flex: 0.5,
    marginBottom: 30,
    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },
  iconos: {
    marginBottom: -4,
    marginRight: -1,
  },
  iconos2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  izquierda: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  derecha: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  historical: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
});
