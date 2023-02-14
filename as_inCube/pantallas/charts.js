import * as React from 'react';
import { Text } from 'react-native-paper';
import { useContext, useState } from 'react';
import PantallasContext from '../components/PantallasContext';
import { IconButton, Button, DataTable, RadioButton } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, Alert, TextInput, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Charts = (props) => {
  const { user, setUser } = useContext(PantallasContext);
  const [date, setDate] = useState('');
  const [dateIm, setDateIm] = useState('');
  const [light, setLight] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const [checked, setChecked] = useState('light');
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([0]);

  let lab = [];
  let datas = [];
  let totalLight = 0
  let totalTemp = 0


  const data = {
    labels: labels,
    datasets: [
      {
        data: datasets,
      },
    ],
  };

  /**
   * Hace una consulta a la pi, se guarda los primeros 6 registros los almecena en 2 
   * arrays de horas y valores, y los muestra en el gráfico
   */
  const getUserApi = async () => {
    try {
      const response = await fetch(
        'http://54.198.123.240:5000/api/' + checked + '?date=' + dateIm
      );
      if (response.ok) {
        const dats = await response.json();
        if (dats[0] == null) {
          Alert.alert("There is no values to show for the introduced date")
        } else {
          setDate(dateIm);
          setDatasets([]);
          setLabels([]);
          if (dateIm != date) {
            setLight(0);
            setTemperature(0);
          }
          for (let i = 0; i <= 6; i++) {
            if (checked === 'light') {

              datas.push(dats[i].level);
              lab.push(dats[i].register);
              totalLight += parseInt(dats[i].level)

            } else {
              datas.push(dats[i].temperature);
              lab.push(dats[i].register);
              totalTemp += parseInt(dats[i].temperature)
            }

          }
          if (totalTemp != 0) {
            setTemperature(Math.trunc(totalTemp / 7))
          } else {
            setLight(Math.trunc(totalLight / 7))
          }
          setDatasets(datas)
          setLabels(lab)
        }
      } else {
        Alert.alert("Cant acces the API")
      }

    } catch (error) {
      console.log(error);
    }
  };

  /**
    * If we click on yes we will navigate to the login screen
  */
  const exit = () => {
    Alert.alert('Log Out', 'Do you want to log out?', [
      { text: 'Yes', onPress: () => props.navigation.navigate('Login') },
      { text: 'No' },
    ]);
  };

  return (

    <SafeAreaView style={styles.layout}>
      <View style={styles.top}>
        <View style={styles.left}>
          <Text style={styles.textUser}> Hello {user} , Welcome</Text>
        </View>
        <View style={styles.right}>
          <IconButton
            style={styles.buttonBack}
            alignSelf="center"
            icon="exit-to-app"
            iconColor="white"
            size={35}
            onPress={exit}
          />
        </View>
      </View>
      <View style={styles.bot}>
        <ScrollView>
          <DataTable
            style={{
              width: screenWidth,
              color: 'white',
              borderColor: 'white',
              borderBottomWidth: 3,
            }}>
            <DataTable.Header
              style={{
                borderColor: 'white',
                borderBottomWidth: 3,
                backgroundColor: 'rgba(255,165,0,1)',
              }}>
              <DataTable.Title>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Data</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Light</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Temp</Text>
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row
              style={{
                borderBottomWidth: 3,
                borderBottomColor: 'rgba(255,165,0,0.8)',
              }}>
              <DataTable.Cell
                style={{
                  borderRightWidth: 3,
                  borderColor: 'rgba(255,165,0,0.8)',
                }}>
                <Text style={{ color: 'white' }}>{date}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ color: 'white' }}>{light} lm</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ color: 'white' }}>{temperature}°C</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row
              style={{
                backgroundColor: 'orange',
              }}>
              <DataTable.Cell></DataTable.Cell>
              <DataTable.Cell />
              <DataTable.Cell />
            </DataTable.Row>
          </DataTable>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.width}
              keyboardType="numeric"
              underlineColor={'transparent'}
              theme={{ colors: { text: '', primary: '' } }}
              placeholder="00-00-0000"
              onChangeText={(text) => setDateIm(text)}
            />
            <Text
              style={{
                color: 'white',
                fontWeight: '800',
                fontFamily: 'Century Gothic',
              }}>
              Light
            </Text>
            <RadioButton
              value="light"
              uncheckedColor="white"
              color="orange"
              status={checked === 'light' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('light')}
            />
            <Text
              style={{
                color: 'white',
                fontWeight: '800',
                fontFamily: 'Century Gothic',
              }}>
              Temp
            </Text>
            <RadioButton
              value="temperature"
              color="orange"
              uncheckedColor="white"
              status={checked === 'temperature' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('temperature')}
            />
            <IconButton
              style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "orange" }}
              size={20}
              icon="magnify"
              color="white"
              onPress={getUserApi}></IconButton>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -30,
            }}>
            <Text style={styles.textReg}> Records {date} </Text>
          </View>
          <View
            style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}>
            <LineChart
              data={data}
              width={Dimensions.get('window').width} // from react-native
              height={350}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: '#3c525b',
                backgroundGradientTo: '#3c525b',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: 'orange',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                marginRight: 20,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 5,
    backgroundColor: '#3c525b',
    alignItems: 'center',
  },
  width: {
    fontSize: 12,
    borderRadius: 35,
    borderColor: 'orange',
    height: 45,
    width: 100,
    overflow: 'hidden',
    backgroundColor: 'orange',
    textAlign: 'center',
    color: "white"
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    height: screenHeight / 10,
    width: screenWidth,
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    flex: 0.4,
    justifyContent: 'space-between',
  },
  bot: {
    flex: 4,
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
  textUser: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20
  },
  textReg: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 30,
    fontFamily: 'Century Gothic',
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
  },
  buttonBack: {
    marginBottom: -4,
    marginRight: -1,
  },
});

export default Charts;