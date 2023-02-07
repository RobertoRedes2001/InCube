import * as React from 'react';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert, Dimensions } from 'react-native';
import CircularPicker from 'react-native-circular-picker';
import { useContext } from 'react';
import PantallasContext from '../components/PantallasContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Data(props) {
  const { user, setUser } = useContext(PantallasContext);
  const [iconBulb, setIconBulb] = React.useState('lightbulb-variant-outline');
  const [colorBulb, setColorBulb] = React.useState('white');
  const [consultaLuz, setConsultaLuz] = React.useState('');
  const [consultaTemp, setConsultaTemp] = React.useState('');
  const [horaLuz, setHoraLuz] = React.useState('');
  const [horaTemp, setHoraTemp] = React.useState('');

  const exit = () => {
    Alert.alert('Log Out', 'Do you want to log out?', [
      { text: 'Yes', onPress: () => { props.navigation.navigate('Login'); setUser(""); }},
      { text: 'No' },
    ]);
  };

  const start = () => {
    if (iconBulb === 'lightbulb-variant-outline') {
      setIconBulb('lightbulb-variant');
      setColorBulb('yellow');
    }
  };

  const stop = () => {
    if (iconBulb === 'lightbulb-variant') {
      setIconBulb('lightbulb-variant-outline');
      setColorBulb('white');
    }
  };

  const localizarNivel = () => {
    let registro = '';

    for (let i = 0; i < arrNivelesLuz.length; i++) {
      registro = arrNivelesLuz[0].luz;
    }

    if (registro !== '') {
      setConsultaLuz(registro);
    } else {
      Alert.alert(
        'Error ❌',
        'There is no record of light at the time ' + horaLuz,
        [{ text: 'OK' }]
      );
    }
  };

  const localizarNivelTemp = () => {
    let registroTemp = '';

    for (let i = 0; i < arrNivelesTemp.length; i++) {
      registroTemp = arrNivelesTemp[0].luz;
    }

    if (registroTemp !== '') {
      setConsultaTemp(registroTemp);
    } else {
      Alert.alert(
        'Error ❌',
        'There is no record of temperature at the time ' + horaTemp,
        [{ text: 'OK' }]
      );
    }
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
            iconColor="white"
            size={35}
            onPress={exit}
          />
        </View>
      </View>
      <View style={styles.bot}>
        <View style={styles.luz}>
          <Text style={styles.titulo}>Actual light</Text>
          <Button
            style={styles.button}
            alignSelf="center"
            mode="contained"
            buttonColor="orange"
            onPress={localizarNivel}>
            Show
          </Button>
        </View>
        <Text style={styles.titulo}>{consultaLuz}</Text>
        <View style={styles.luz}>
          <Text style={styles.titulo}>Actual temperature</Text>
          <Button
            style={styles.button}
            alignSelf="center"
            mode="contained"
            buttonColor="orange"
            onPress={localizarNivelTemp}>
            Show
          </Button>
        </View>
        <Text style={styles.titulo}>{consultaTemp}</Text>
        <View style={styles.data}>
          <Text style={styles.historical}>Historical</Text>
          <TextInput
            style={styles.width}
            keyboardType="numeric"
            underlineColor={'transparent'}
            theme={{ colors: { text: '', primary: '' } }}
            placeholder="Write how many records you want"
          />
          <TextInput
            style={styles.width}
            keyboardType="numeric"
            underlineColor={'transparent'}
            theme={{ colors: { text: '', primary: '' } }}
            placeholder="Write the interval between records"
          />
        </View>
        <View style={styles.dataButtons}>
          <Button
            style={styles.button2}
            alignSelf="center"
            mode="contained"
            buttonColor="orange"
            onPress={start}>
            Start
          </Button>
          <Button
            style={styles.button2}
            alignSelf="center"
            mode="contained"
            buttonColor="orange"
            onPress={stop}>
            Stop
          </Button>
        </View>
        <View>
          <IconButton
            style={styles.bombilla}
            animated="true"
            icon={iconBulb}
            iconColor={colorBulb}
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
  data: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 5,
    borderColor: 'orange'
  },
  bombilla: {
    alignSelf: 'center',
  },
  dataButtons: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  width: {
    marginTop: 30,
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    height: 57,
    width: 320,
    overflow: 'hidden',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  historical: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
  viewLevel: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button2: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  textoUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20
  },
  zona2: {
    flex: 1,
  },
  textLevel: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    marginLeft: 15,
  },
  bot: {
    flex: 4,
  },
  luz: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    height: screenHeight / 10,
    width: screenWidth,
    flex: 0.4,
    marginBottom: 50,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  iconos: {
    marginBottom: -4,
    marginRight: -1,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
});
