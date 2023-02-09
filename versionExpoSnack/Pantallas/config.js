import * as React from 'react';
import { useContext } from 'react';
import PantallasContext from '../components/PantallasContext';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { IconButton, Switch } from 'react-native-paper';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Config(props) {
  const { user, setUser } = useContext(PantallasContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [mode, setMode] = React.useState(' Off');

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn === false) {
      setMode(' On ');
    } else {
      setMode(' Off');
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
        <View style={styles.viewTitulo}>
          <Text style={styles.titulo}>Developer mode </Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="orange"
          />
          <Text style={styles.titulo}>{mode}</Text>
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
  viewTitulo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textoUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  bot: {
    flex: 4,
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'orange',
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
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
});