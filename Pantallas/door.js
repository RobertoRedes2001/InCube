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
      <View>
        <Text style={styles.titulo}>Open/Close</Text>
        <Text style={styles.titulo}>Door</Text>
        <View style={styles.viewNum}>
          <IconButton
            style={styles.iconos}
            icon={door}
            color={'white'}
            size={100}
          />
          <View style={styles.contenido}>
            <Text style={styles.titulo}>{open}</Text>
            <Button
              style={styles.button}
              alignSelf="center"
              mode="contained"
              color="#dba534"
              onPress={abrir}>
              {boton}
            </Button>
          </View>
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
  contenido: {
    marginTop: 40
  },
  button: {
    marginTop: 30,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
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
  viewNum: {
    marginTop: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
});
