import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { IconButton, Switch } from 'react-native-paper';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Config(props) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [mode, setMode] = React.useState(' Off');

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn === false) {
      setMode(' On ');
    } else {
      setMode(' Off');
    }
  }
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
      <View style={styles.viewTitulo}>
        <Text style={styles.titulo}>Developer mode </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color="orange"
        />
        <Text style={styles.titulo}>{mode}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#3c525b',
  },
  viewTitulo: {
    flexDirection: 'row',
    justifyContent: 'center',
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
});
