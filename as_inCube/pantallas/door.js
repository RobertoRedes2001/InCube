import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useContext, useState } from 'react';
import PantallasContext from '../components/PantallasContext';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Door(props) {
  const { user, setUser } = useContext(PantallasContext);
  const [door, setDoor] = useState('garage-variant');
  const [open, setOpen] = useState('Door Closed');
  const [buttonDoor, setButtonDoor] = useState('Open');
  const [colorIcon, setColorIcon] = useState('white');
  const [doorStatus, setDoorStatus] = useState(false);

  /**
    * If we click on yes we will navigate to the login screen
  */
  const exit = () => {
    Alert.alert('Log Out', 'Do you want to log out?', [
      { text: 'Yes', onPress: () => { props.navigation.navigate('Login'); setUser(""); } },
      { text: 'No' },
    ]);
  };

  /**
   * If we click on the door icon, the icon changes, the color changes 
   * and a request is sent to the api for the motor to rotate
   */
  const abrir = async () => {
    if (door === 'garage-variant') {
      setDoor('garage-open-variant');
      setOpen('Door Opened');
      setColorIcon('orange');
      setDoorStatus(!doorStatus);
      try {
        const response = await fetch("http://54.198.123.240:5000/api?codigo=3");
        if (response.ok) {
          Alert.alert('OPEN 🚪', 'The door is opening', [
            { text: 'OK' },
          ]);
        }
      } catch (error) {
        console.log(error + " puerta");
      }
    } else {
      setDoor('garage-variant');
      setOpen('Door Closed');
      setColorIcon('white');
      setDoorStatus(!doorStatus);
      try {
        const response = await fetch("http://54.198.123.240:5000/api?codigo=4");
        if (response.ok) {
          Alert.alert('CLOSE 🚪', 'The door is closing', [
            { text: 'OK' },
          ]);
        }
      } catch (error) {
        console.log(error + " puerta");
      }
    }
    console.log(doorStatus)
  };

  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.top}>
        <View style={styles.left}>
          <View style={styles.left}>
            <Text style={styles.textUser}> Hello {user}, Welcome</Text>
          </View>
        </View>
        <View style={styles.right}>
          <IconButton
            style={styles.icons}
            alignSelf="center"
            icon="exit-to-app"
            iconColor='white'
            size={35}
            onPress={exit}
          />
        </View>
      </View>
      <View style={styles.bot}>
        <View style={styles.content}>
          <Text style={styles.title}>Open/Close</Text>
          <View style={styles.icon}>
            <IconButton
              animated='true'
              style={styles.icons}
              icon={door}
              iconColor={colorIcon}
              size={100}
              onPress={abrir}
            />
            <Text style={styles.title}>{open}</Text>
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
  content: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20
  },
  icon: {
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
  icons: {
    marginBottom: -4,
    marginRight: -1,
  },
  left: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
});