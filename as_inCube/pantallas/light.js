import * as React from 'react';
import { TextInput, Button, IconButton, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert, Dimensions, Modal } from 'react-native';
import CircularPicker from 'react-native-circular-picker';
import { useContext, useState, useEffect } from 'react';
import PantallasContext from '../components/PantallasContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Light(props) {
    const { user, setUser } = useContext(PantallasContext);
    const handleChange = (v) => setNivelLuz((v + 50).toFixed(0));
    const [consultaLuz, setConsultaLuz] = useState('');
    const [nivelLuz, setNivelLuz] = useState(0);
    const [horaLuz, setHoraLuz] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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
     * Depending on the number of the circular picker, it will 
     * make an api query so that the led on the arduino changes color
     */
    const colorLuz = async () => {
        try {
            if (nivelLuz >= 0 && nivelLuz <= 70) {
                const response = await fetch('http://54.198.123.240:5000/api?codigo=5');
                if (response.ok) {
                    Alert.alert('Light 💡', 'The light is BLUE, you should increase the power', [
                        { text: 'OK' },
                      ]);
                }
            } else if (nivelLuz >= 71 && nivelLuz <= 95) {
                const response = await fetch('http://54.198.123.240:5000/api?codigo=6');
                if (response.ok) {
                    Alert.alert('Light 💡', 'The light is YELLOW', [
                        { text: 'OK' },
                      ]);
                }
            } else if (nivelLuz >= 96 && nivelLuz <= 125) {
                const response = await fetch('http://54.198.123.240:5000/api?codigo=7');
                if (response.ok) {
                    Alert.alert('Light 💡', 'The light is ORANGE', [
                        { text: 'OK' },
                      ]);
                }
            } else {
                const response = await fetch('http://54.198.123.240:5000/api?codigo=8');
                if (response.ok) {
                    Alert.alert('Light 💡', 'The light is RED, you should reduce the power', [
                        { text: 'OK' },
                      ]);
                }
            }
            Alert.alert('Light 💡', 'The door is closing', [
                { text: 'OK' },
              ]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PaperProvider>
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
                            iconColor="white"
                            size={35}
                            onPress={exit}
                        />
                    </View>
                </View>
                <View style={styles.bot}>

                    <View style={styles.zone1}>
                        <Text style={styles.title}>Light</Text>
                        <Text style={styles.title}>Regulator</Text>
                        <View style={styles.separation}>
                            <CircularPicker
                                size={240}
                                steps={[20, 45, 75, 100]}
                                gradients={{
                                    0: ['rgb(0, 122, 255)', 'rgb(0, 122, 255)'],
                                    20: ['rgb(255, 214, 10)', 'rgb(255, 214, 10)'],
                                    45: ['rgb(255, 164, 32)', 'rgb(255, 164, 32)'],
                                    75: ['rgb(247, 22, 0)', 'rgb(247, 22, 0)'],
                                }}
                                onChange={handleChange}>
                                <>
                                    <Text style={styles.degrees}>{nivelLuz}</Text>
                                </>
                            </CircularPicker>
                            <Button
                                style={styles.button}
                                alignSelf="center"
                                mode="contained"
                                buttonColor="orange"
                                onPress={colorLuz}>
                                Send
                            </Button>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 5,
        backgroundColor: '#3c525b',
    },
    zone1: {
        flex: 1.5,
        justifyContent: 'center',
    },
    bot: {
        flex: 4,
    },
    textUser: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 20
    },
    width: {
        marginBottom: 10,
        fontSize: 18,
        borderRadius: 30,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        borderColor: 'black',
        height: 57,
        width: 135,
        overflow: 'hidden',
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    button: {
        borderRadius: 30,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 30,
        width: 130,
        height: 50,
        justifyContent: 'center',
    },
    viewLevel: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    textLevel: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    separation: {
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
    degrees: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
    },
    icons: {
        marginBottom: -4,
        marginRight: -1,
    },
    viewNum: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
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
        fontSize: 35,
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
});
