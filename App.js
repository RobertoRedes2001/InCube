import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PantallasProvider } from './Pantallas/PantallasContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Login from './Pantallas/login';
import Home from './Pantallas/home';
import Light from './Pantallas/light';
import Temperature from './Pantallas/temperature';
import Door from './Pantallas/door';
import Config from './Pantallas/config';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PantallasProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Light" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
    </PantallasProvider>
  );
}

const Tabs = () => (
  <Tab.Navigator initialRouteName="Light" screenOptions={{ headerShown: false }}>
    <Tab.Screen options={{ tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="lightbulb-variant-outline" color={'black'} size={size} />
          )}} name="Light" component={Light} />
    <Tab.Screen options={{ tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="thermometer" color={'black'} size={size} />
          )}} name="Temperature" component={Temperature} />
    <Tab.Screen options={{ tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="garage" color={'black'} size={size} />
          )}} name="Door" component={Door} />
    <Tab.Screen options={{ tabBarIcon: ({ size }) => (
            <FontAwesome name="gear" color={'black'} size={size} />
          )}} name="Config" component={Config} />
  </Tab.Navigator>
);