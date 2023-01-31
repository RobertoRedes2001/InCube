import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, Image } from 'react-native';

const Home = (props) => {
  const logo = require('./logo.jpg');

  return (
    <View style={styles.layout}>
      <Image style={styles.image} source={logo} />
      <Text style={styles.titulo}>InCube</Text>
      <TextInput
        style={styles.width}
        left={<TextInput.Icon icon="account" />}
        maxLength={20}
        underlineColor={'transparent'}
        theme={{colors: {primary: 'transparent'}}}
        label="Username..."
        placeholder="Write your username..."
      />
      <TextInput
        style={styles.width}
        left={<TextInput.Icon icon="lock" />}
        secureTextEntry={true}
        maxLength={20}
        underlineColor={'transparent'}
        outlineColor={'transparent'}
        label="Password..."
        placeholder="Write your password..."
      />
      <Button
        style={styles.button}
        alignSelf="center"
        mode="contained"
        color="#dba534"
        textColor="black"
        onPress={() => props.navigation.navigate('screenChart')}>
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#3c525b',
  },
  width: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 18,
    marginBottom: 24,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  button: {
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Candara',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default Home;
