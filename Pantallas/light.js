import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import CircularPicker from 'react-native-circular-picker';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Light(props) {
  const handleChange = (v) => setNivelLuz((v / 2.5).toFixed(0));
  const [consultaLuz, setConsultaLuz] = React.useState('');
  const [modo, setModo] = React.useState('Off');
  const [colorBulb, setColorBulb] = React.useState('grey');
  const [nivelLuz, setNivelLuz] = React.useState(0);
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
          <IconButton
            style={styles.iconos}
            alignSelf="center"
            icon="home"
            color="white"
            size={35}
            onPress={() => props.navigation.navigate('Home')}
          />
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
        <View style={styles.zona1}>
          <Text style={styles.titulo}>Light</Text>
          <Text style={styles.titulo}>Regulator</Text>
          <View style={styles.separacion}>
            <CircularPicker
              size={200}
              steps={[15, 40, 70, 100]}
              gradients={{
                0: ['rgb(0, 122, 255)', 'rgb(0, 122, 255)'],
                15: ['rgb(255, 214, 10)', 'rgb(255, 214, 10)'],
                40: ['rgb(255, 164, 32)', 'rgb(255, 164, 32)'],
                70: ['rgb(247, 22, 0)', 'rgb(247, 22, 0)'],
              }}
              onChange={handleChange}>
              <>
                <Text style={styles.grados}>{nivelLuz}</Text>
              </>
            </CircularPicker>
          </View>
        </View>
        <View style={styles.zona2}>
          <View style={styles.viewNum}>
            <Text style={styles.text}>
              Introduce an hour to{'\n'}
              see the light level:
            </Text>
            <View>
              <TextInput
                style={styles.width}
                keyboardType="numeric"
                maxLength={20}
                value={horaLuz}
                onChangeText={(newText) => setHoraLuz(newText)}
                underlineColor={'transparent'}
                theme={{ colors: { text: '', primary: '' } }}
                placeholder="Write an hour"
              />
              <Button
                style={styles.button}
                alignSelf="center"
                mode="contained"
                color="orange"
                onPress={localizarNivel}>
                Show
              </Button>
            </View>
          </View>
          <View style={styles.viewLevel}>
            <Text style={styles.textLevel}>{consultaLuz}</Text>
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
  zona1: {
    flex: 1.5,
    justifyContent: 'center'
  },
  zona2: {
    flex: 1,
  },
  bot: {
    flex: 4,
  },
  width: {
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    height: 57,
    width: 135,
    overflow: 'hidden',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: 'black',
  },
  viewLevel: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textLevel: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },

  separacion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    justifyContent: 'space-between',
    flex: 0.5,
    height: screenHeight / 10,
    width: screenWidth,
    marginBottom: 50,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  grados: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  iconos: {
    marginBottom: -4,
    marginRight: -1,
  },
  viewNum: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  viewBulb: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textBulb: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});