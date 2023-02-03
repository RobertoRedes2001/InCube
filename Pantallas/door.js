import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Door(props) {
  const [door, setDoor] = React.useState('garage-variant');
  const [open, setOpen] = React.useState('Door Closed');
  const [boton, setBoton] = React.useState('Open');
  const exit = () => {
    Alert.alert('Log Out', 'Do you want to log out?', [
      { text: 'Yes', onPress: () => props.navigation.navigate('Login') },
      { text: 'No' },
    ]);
  };

  const abrir = () => {
    if (door === 'garage-variant') {
      setDoor('garage-open-variant');
      setOpen('Door Opened');
      setBoton('Close');
    } else {
      setDoor('garage-variant');
      setOpen('Door Closed');
      setBoton('Open');
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
        <View style={styles.contenido}>
          <Text style={styles.titulo}>Open/Close</Text>
          <View style={styles.icono}>
            <IconButton
              style={styles.iconos}
              icon={door}
              color={'white'}
              size={100}
              onPress={abrir}
            />
            <Text style={styles.titulo}>{open}</Text>
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
  bot: {
    flex: 4,
  },
  contenido: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: {
    marginTop: 40,
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
    marginTop: 40,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
});