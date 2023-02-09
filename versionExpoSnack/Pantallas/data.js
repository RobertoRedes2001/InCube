import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Dimensions } from 'react-native';
import CircularPicker from 'react-native-circular-picker';
import { useContext } from 'react';
import PantallasContext from '../components/PantallasContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Data(props) {
  const { user, setUser } = useContext(PantallasContext);
  const [grados, setGrados] = React.useState(0);
  const [consultaLuz, setConsultaLuz] = React.useState('');
  const handleChange = (v) => setGrados((v * 20000).toFixed(0));
  const [horaLuz, setHoraLuz] = React.useState('');

  const arrNivelesLuz = [
    { hora: '16', luz: '3' },
    { hora: '11', luz: '7' },
  ];

  const exit = () => {
    Alert.alert('Log Out', 'Do you want to log out?', [
      { text: 'Yes', onPress: () => props.navigation.navigate('Login') },
      { text: 'No' },
    ]);
  };

  const localizarNivel = () => {
    let registro = '';

    for (let i = 0; i < arrNivelesLuz.length; i++) {
      if (arrNivelesLuz[i].hora === horaLuz) {
        registro += arrNivelesLuz[i].luz;
      }
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
          <Text style={styles.titulo}>Temperature</Text>
          <Button
            style={styles.button}
            alignSelf="center"
            mode="contained"
            color="orange"
            onPress={localizarNivel}>
            Show
          </Button>
        </View>
        <View style={styles.luz}>
          <Text style={styles.titulo}>Temperature</Text>
          <Button
            style={styles.button}
            alignSelf="center"
            mode="contained"
            color="orange"
            onPress={localizarNivel}>
            Show
          </Button>
        </View>
        <View style={styles.zona2}>
          <View style={styles.viewLevel}>
            <Text style={styles.textLevel}>1{consultaLuz}</Text>
          </View>
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
  viewLevel: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textoUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
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
    flex: 0.5,
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
