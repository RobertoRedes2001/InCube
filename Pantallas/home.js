import * as React from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import Constants from 'expo-constants';
import Icon from 'react-native-ionicons';
import { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const home = (props) => {

  const [user, setUser] = useState("Paco");

const data = {
  labels: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
  datasets: [
    {
      data: [400, 425, 500, 550, 450, 470],
    },
  ],
};


  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.top}>
        <View style={styles.izquierda}>
          <Text style={styles.textoUser}> Hola {user}, Bienvenido</Text>
        </View>
        <View style={styles.derecha}>
          <IconButton
            style={styles.buttonBack}
            alignSelf="center"
            icon="backburger"
            color="white"
            size={35}
          />
        </View>
      </View>
      <BarChart
        data={data}
        width={screenWidth}
        height={200}
        
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: '#3c525b',
          backgroundGradientTo: '#3c525b', // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          decimalPlaces: 0,
        }}
        style={{
          marginRight: 24,
        }}
      />

      <LineChart
        data={data}
        width={Dimensions.get('window').width} // from react-native
        height={350}
        yAxisLabel=""
        yAxisSuffix=" A"
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
      <IconButton
        style={styles.button}
        alignSelf="center"
        icon="format-list-bulleted"
        color="white"
        size={40}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#3c525b',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    height: screenHeight / 10,
    width: screenWidth,
    marginBottom: 50,
  },
  izquierda: {
    flex: 1,
    justifyContent:"flex-end",
  },
  derecha: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textoUser: {
    color:"white",
    fontWeight:"bold",
    marginBottom:10,
    marginLeft:10,
  },

  button: {
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'orange',
  },
  buttonBack: { 
    marginBottom:-4,
    marginRight:-1,
  },
});

export default home;