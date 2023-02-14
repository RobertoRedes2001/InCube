import { TextInput, Button, IconButton } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert, Dimensions, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import PantallasContext from '../components/PantallasContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Data(props) {
  const { user, setUser } = useContext(PantallasContext);
  const [iconBulb, setIconBulb] = useState('lightbulb-variant-outline');
  const [colorBulb, setColorBulb] = useState('white');
  const [consultationLight, setConsultationLight] = useState('');
  const [consultationTemp, setConsultationTemp] = useState('');
  const [interval, setInterval] = useState('');
  const [register, setRegister] = useState('');
  let dateObj = new Date();
  let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  let day = ('0' + dateObj.getDate()).slice(-2);
  let year = dateObj.getUTCFullYear();
  let newdate = day + '-' + month + '-' + year;

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
   * We make a request to the api to return the light level that the arduino has read
   */
  const getLight = async () => {
    try {
      const response = await fetch('http://54.198.123.240:5000/api?codigo=9');
      if (response.ok) {
        try {
          const response2 = await fetch(
            'http://54.198.123.240:5000/api/light?date=' + newdate
          );
          if (response2.ok) {
            const dats = await response2.json();
            setConsultationLight(dats[dats.length - 1].level + " lm");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * We make a request to the api to return the temperature level that the arduino has read
   */
  const getTemp = async () => {
    try {
      const response = await fetch('http://54.198.123.240:5000/api?codigo=10');
      if (response.ok) {
        try {
          const response2 = await fetch(
            'http://54.198.123.240:5000/api/temperature?date=' + newdate
          );
          if (response2.ok) {
            const dats = await response2.json();
            setConsultationTemp(dats[dats.length - 1].temperature + " °C");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * The light bulb icon turns yellow
   */
  const start = () => {
    if (iconBulb === 'lightbulb-variant-outline') {
      setIconBulb('lightbulb-variant');
      setColorBulb('yellow');
    }
  };

  /**
   * We make a request to the api to store in the database the number 
   * of records and the time between records
   * @returns 
   */
  const postApi = async () => {
    let result = await fetch("http://54.198.123.240:5000/api/enviaDatos", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/html',
      },

      body: (interval * 1000) + ";" + (register * 2)
    })
      .then(response => checkStatus(response))
      .then(response => response.json())
      .catch(e => { throw e; });

    return result;
  }

  return (
    <SafeAreaView style={styles.layout}>
      <ScrollView>
        <View style={styles.top}>
          <View style={styles.left}>
            <View style={styles.left}>
              <Text style={styles.textUser}> Hello {user}, Welcome</Text>
            </View>
          </View>
          <View style={styles.right}>
            <IconButton
              style={styles.icon}
              alignSelf="center"
              icon="exit-to-app"
              iconColor="white"
              size={35}
              onPress={exit}
            />
          </View>
        </View>
        <View style={styles.bot}>
          <View style={styles.light}>
            <Text style={styles.title}>Current</Text>
            <IconButton
              style={styles.icon2}
              icon="lightbulb-variant-outline"
              iconColor="white"
              size={30}
            />
            <Button
              style={styles.button}
              alignSelf="center"
              mode="contained"
              buttonColor="orange"
              onPress={getLight}>
              Show
            </Button>
          </View>
          <Text style={styles.title}>{consultationLight}</Text>
          <View style={styles.light}>
            <Text style={styles.title}>Current</Text>
            <IconButton
              icon="thermometer"
              iconColor="white"
              size={30}
            />
            <Button
              style={styles.button}
              alignSelf="center"
              mode="contained"
              buttonColor="orange"
              onPress={getTemp}>
              Show
            </Button>
          </View>
          <Text style={styles.title}>{consultationTemp}</Text>
          <View style={styles.data}>
            <Text style={styles.historical}>Historical</Text>
            <TextInput
              style={styles.width}
              keyboardType="numeric"
              defaultValue={register}
              onChangeText={(newText) => setRegister(newText)}
              underlineColor={'transparent'}
              theme={{ colors: { text: '', primary: '' } }}
              placeholder="Write how many records you want"
            />
            <TextInput
              style={styles.width}
              keyboardType="numeric"
              defaultValue={interval}
              onChangeText={(newText) => setInterval(newText)}
              underlineColor={'transparent'}
              theme={{ colors: { text: '', primary: '' } }}
              placeholder="Write the interval between records"
            />
          </View>
          <View style={styles.dataButtons}>
            <Button
              style={styles.button}
              alignSelf="center"
              mode="contained"
              buttonColor="orange"
              dark={true}
              onPress={() => { postApi(); start(); }}>
              Start
            </Button>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              style={styles.bombilla}
              animated="true"
              icon={iconBulb}
              iconColor={colorBulb}
              size={80}
            />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 5,
    backgroundColor: '#3c525b',
  },
  data: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 5,
    borderColor: 'orange'
  },
  bombilla: {
    alignSelf: 'center',
  },
  dataButtons: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  width: {
    marginTop: 30,
    fontSize: 18,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    height: 57,
    width: 320,
    overflow: 'hidden',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  icon2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  historical: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
  viewLevel: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button2: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  textUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20
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
    width: 130,
    height: 50,
    justifyContent: 'center',
  },
  bot: {
    flex: 4,
  },
  light: {
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
    flex: 0.4,
    marginBottom: 50,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  icon: {
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
    alignItems: 'flex-end',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
  },
});
