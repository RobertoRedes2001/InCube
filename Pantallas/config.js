import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Config(props) {
  const max = 35;
  const [barra, setBarra] = React.useState(0);
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
      <View>
        <Text style={styles.titulo}>Light</Text>
        <Text style={styles.titulo}>Regulator</Text>
        <View style={styles.separacion}>
          <Slider
            style={styles.bar}
            animateTransitions={true}
            maximumValue={max}
            value={barra}
            maximumTrackTintColor="white"
            minimumTrackTintColor="white"
            thumbTintColor="black"
            step={1}
          />
        </View>
        <View style={styles.viewNum}>
          <Text style={styles.numeros}>0</Text>
          <Text style={styles.numeros}>5</Text>
          <Text style={styles.numeros}>10</Text>
          <Text style={styles.numeros}>15</Text>
          <Text style={styles.numeros}>20</Text>
          <Text style={styles.numeros}>25</Text>
          <Text style={styles.numeros}>30</Text>
          <Text style={styles.numeros}>35</Text>
        </View>
        <View style={styles.viewNum}>
          <Text style={styles.text}>
            Introduce an hour to{'\n'}
            see the light level:
          </Text>
          <View>
            <TextInput
              style={styles.width}
              keyboardType='numeric'
              maxLength={20}
              underlineColor={'transparent'}
              theme={{ colors: { text: '', primary: '' } }}
              placeholder="Write an hour"
            />
            <Button
              style={styles.button}
              alignSelf="center"
              mode="contained"
              color="#dba534">
              See
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
  width: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    height: 57,
    width: 160,
    overflow: 'hidden',
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  bar: {
    backgroundColor: '#191414',
    paddingHorizontal: 10,
  },
  separacion: {
    marginLeft: 24,
    marginRight: 24,
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  numeros: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  text: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
