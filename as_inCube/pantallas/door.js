import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useContext } from 'react';
import PantallasContext from '../components/PantallasContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Door(props) {
  const { user, setUser } = useContext(PantallasContext);
  const [door, setDoor] = React.useState('garage-variant');
  const [open, setOpen] = React.useState('Door Closed');
  const [boton, setBoton] = React.useState('Open');
  const [estadoPuerta, setEstadoPuerta] = React.useState(false);
  const exit = () => {
    Alert.alert('Log Out', 'Do you want to log out?', [
      { text: 'Yes', onPress: () => { props.navigation.navigate('Login'); setUser(""); } },
      { text: 'No' },
    ]);
  };

  const abrir = () => {
    if (door === 'garage-variant') {
      setDoor('garage-open-variant');
      setOpen('Door Opened');
      setBoton('Close');
      setEstadoPuerta(!estadoPuerta);
    } else {
      setDoor('garage-variant');
      setOpen('Door Closed');
      setBoton('Open');
      setEstadoPuerta(!estadoPuerta);
    }
    console.log(estadoPuerta)
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
        <View style={styles.contenido}>
          <Text style={styles.titulo}>Open/Close</Text>
          <View style={styles.icono}>
            <IconButton
              animated='true'
              style={styles.iconos}
              icon={door}
              iconColor={'white'}
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
  textoUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20
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
    flex: 0.4,
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