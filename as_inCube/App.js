/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PantallasProvider } from './components/PantallasContext';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
import Login from './pantallas/login';
import Light from './pantallas/light';
import Data from './pantallas/data';
import Charts from './pantallas/charts';
import Door from './pantallas/door';
import Config from './pantallas/config';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PantallasProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Light" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PantallasProvider>
  );
}

const Tabs = () => (
  <Tab.Navigator
    options={{ headerShown: false }}
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: 'orange',
        height: Dimensions.get('window').height / 11,
        borderTopWidth: 2,
        borderTopColor: 'white',
      },
      tabBarIcon: ({ color }) => {
        let iconName;

        switch (route.name) {
          case 'Light':
            iconName = 'lightbulb-o';
            break;

          case 'Data':
            iconName = 'database';
            break;

          case 'Door':
            iconName = 'cube';
            break;
          case 'Config':
            iconName = 'gear';
            break;
          case 'Charts':
            iconName = 'bar-chart';
            break;
        }
        return <FontAwesome name={iconName} size={40} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#344955',
      tabBarShowLabel: false,
    })}>
    <Tab.Screen
      name="Light"
      component={Light}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Data"
      component={Data}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Door" component={Door} options={{ headerShown: false }} />
    <Tab.Screen
      name="Charts"
      component={Charts}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Config"
      component={Config}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);
