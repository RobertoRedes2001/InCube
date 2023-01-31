import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function Home(props) {
  return (
    <View style={styles.layout}>
    <View flexDirection='row'>
      <Button
        style={styles.width}
        alignSelf="center"
        mode='contained'
        color='#f0ead6'
        textColor="black"
        onPress={() => props.navigation.navigate('screenChart')}>
        Entrar
      </Button>
      <Button
        style={styles.width}
        alignSelf="center"
        mode='contained'
        color='#f0ead6'
        textColor="black"
        onPress={() => props.navigation.navigate('screenChart')}>
        Entrar
      </Button>
    </View>
    <View flexDirection='row'>
      <Button
        style={styles.width}
        alignSelf="center"
        mode='contained'
        color='#f0ead6'
        textColor="black"
        onPress={() => props.navigation.navigate('screenChart')}>
        Entrar
      </Button>
      <Button
        style={styles.width}
        alignSelf="center"
        mode='contained'
        color='#f0ead6'
        textColor="black"
        onPress={() => props.navigation.navigate('screenChart')}>
        Entrar
      </Button>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'orange',
    alignItems: 'center'
  },
  width: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 18,
    marginBottom: 24,
  },
});