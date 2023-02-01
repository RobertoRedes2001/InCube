import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PantallasProvider } from './Pantallas/PantallasContext';
import { Dimensions } from 'react-native';
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
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
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

          case 'Temperature':
            iconName = 'thermometer';
            break;

          case 'Door':
            iconName = 'cube';
            break;
          case 'Config':
            iconName = 'gear';
            break;
        }
        return (
          <FontAwesome name={iconName} size={40} color={color} />
        );
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
      name="Temperature"
      component={Temperature}
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Door" 
      component={Door} 
      options={{ headerShown: false }} 
    />
    <Tab.Screen
      name="Config"
      component={Config}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);