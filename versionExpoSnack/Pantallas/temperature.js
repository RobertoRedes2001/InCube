import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';
import { Dimensions } from 'react-native';
import CircularPicker from 'react-native-circular-picker';
import { DateTimePickerModal } from 'react-native-paper-datetimepicker';
import 'intl';
import 'intl/locale-data/jsonp/en';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Temperature(props) {
  const [grados, setGrados] = React.useState(0);
  const handleChange = (v) => setGrados((v / 2.5).toFixed(0));
  const [visible, setVisible] = React.useState(false);
  const date = new Date();
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

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onChange = React.useCallback(({ date }) => {
    setVisible(false);
    console.log({ date });
  }, []);

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
      <View>
        <Text style={styles.titulo}>Temperature</Text>
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
              <Text style={styles.grados}>{grados} º</Text>
            </>
          </CircularPicker>
        </View>
        <View style={styles.viewDate}>
          <>
            <DateTimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              date={date}
              onConfirm={onChange}
              label="Pick A Date"
            />
            <TextInput
              style={styles.date}
              value={date.toLocaleString()}
              theme={{ colors: { text: '', primary: '' } }}
              underlineColor={'transparent'}
            />
            <Button
              style={styles.button}
              mode="contained"
              color="orange"
              onPress={() => setVisible(true)}>
              Select Date
            </Button>
          </>
        </View>
        <View style={styles.viewLevel}>
          <Text style={styles.textLevel}>17º</Text>
        </View>
        <View style={styles.viewLevel2}>
          <Text style={styles.textLevel}>Actual Level:</Text>
          <Text style={styles.textLevel}>{grados} º</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#3c525b',
  },
  viewLevel: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  viewDate: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  viewLevel2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  textLevel: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    height: 57,
    width: 200,
    overflow: 'hidden',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
  },
  separacion: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    height: screenHeight / 10,
    width: screenWidth,
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
  grados: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
