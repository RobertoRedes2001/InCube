import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, Image, Alert, Modal } from 'react-native';
import { useContext, useState } from 'react';
import PantallasContext from '../components/PantallasContext';
import md5 from 'md5';

export default function Login({ navigation }) {
    const logo = require('../components/logo.jpg');
    const { user, setUser } = useContext(PantallasContext);
    const { ip, setIp } = useContext(PantallasContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [pass, setPass] = useState('');
    const [visible, setVisible] = useState(true);
    const [eye, setEye] = useState('eye-outline');
    let nombre = "";
    let password = "";

    const changeVisible = () => {
        if (visible === true) {
            setVisible(false);
            setEye('eye-off');
        } else {
            setVisible(true);
            setEye('eye-outline');
        }
    };

    const getUserApi = async () => {
        let link = "http://54.198.123.240:5000/api/users?user=";
        let url = link + user;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const dats = await response.json();
                nombre += dats[0].user;
                password += dats[0].pass;
                console.log(nombre);
                console.log(password);

                if (user === nombre) {
                    if (md5(pass) === password) {
                        return true;
                    }
                } else {
                    return false;
                }
                
            } else {
                Alert.alert('Error ❌', 'The name is incorrect', [
                    { text: 'OK' },
                ]);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const login = () => {
        if (getUserApi() && ip !== "") {
            navigation.navigate('Light');

        } else {
            Alert.alert('Error ❌', 'Make sure the information is correct', [
                { text: 'OK' },
            ]);
        }
    };

    const comprobarIp = (comp) => {
        let verdad = comp.split('.');
        if (verdad.length != 4)
            return false;
        for (i in verdad) {
            if (!/^\d+$/g.test(verdad[i])
                || +verdad[i] > 255
                || +verdad[i] < 0
                || /^[0][0-9]{1,2}/.test(verdad[i]))
                return false;
        }
        return true
    }

    const validar = () => {
        if (comprobarIp(ip)) {
            setModalVisible(!modalVisible);
        } else {
            Alert.alert('Error ❌', 'The IP is not valid', [
                { text: 'OK' },
            ]);
        }
    }

    return (
        <View style={styles.layout}>
            <View style={{ height: 20 }} />
            <View style={{ flex: 1.5, justifyContent: 'center' }}>

                <View
                    style={{
                        marginBottom: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={styles.fullcircle0} />
                    <View style={styles.fullcircle} />
                    <View style={styles.fullcircle05} />
                    <View style={styles.fullcircle1} />
                    <View style={styles.fullcircle15} />
                    <View style={styles.fullcircle2} />
                    <View style={styles.fullcircle25} />
                    <View style={styles.fullcircle3} />
                    <View style={styles.fullcircle35} />
                    <View style={styles.fullcircle40} />
                    <Image style={styles.image} source={logo} />
                </View>
                <View>
                    <View style={{ height: 5 }} />
                    <Text style={styles.titulo}>InCube</Text>
                    <View style={{ height: 10 }} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Introduce una ID: </Text>
                            <TextInput
                                style={styles.txtI2}
                                onChangeText={(text) => setIp(text)}
                                placeholder="Introduce la ID           "
                                underlineColor='transparent'
                                theme={{ colors: { text: '', primary: '' } }}
                            />
                            <Button style={styles.button} onPress={validar}>
                                Guardar
                            </Button>
                        </View>
                    </View>
                </Modal>
                <TextInput
                    style={styles.width}
                    onChangeText={(newText) => setUser(newText)}
                    left={<TextInput.Icon icon="account" iconColor="#F8B52C" />}
                    maxLength={20}
                    value={user}
                    underlineColor={'transparent'}
                    theme={{ colors: { text: '', primary: '' } }}
                    label="Username..."
                    placeholder="Write your username..."
                />
                <TextInput
                    style={styles.txtI2}
                    onChangeText={(newText) => setPass(newText)}
                    left={<TextInput.Icon icon="lock" iconColor="#F8B52C" />}
                    right={
                        <TextInput.Icon
                            icon={eye}
                            onPress={changeVisible}
                            iconColor="#F8B52C"
                        />
                    }
                    secureTextEntry={visible}
                    maxLength={20}
                    value={pass}
                    underlineColor={'transparent'}
                    theme={{ colors: { text: '', primary: '' } }}
                    label="Password..."
                    placeholder="Write your password..."
                />
                <View style={styles.botonesFinal}>
                    <Button
                        style={styles.buttonLogin}
                        alignSelf="center"
                        mode="contained"
                        buttonColor='orange'
                        dark={true}
                        onPress={() => {
                            login();
                            setPass("");

                        }}>
                        Enter
                    </Button>
                    <Button
                        style={styles.buttonLogin}
                        alignSelf="center"
                        mode="contained"
                        buttonColor='orange'
                        dark={true}
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    >
                        IP
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 8,
        backgroundColor: '#344955',
        textAlign: 'center',
    },
    botonesFinal: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    width: {
        marginLeft: 24,
        marginRight: 24,
        fontSize: 18,
        borderRadius: 30,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 3,
        borderColor: 'orange',
        height: 57,
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 40
    },
    txtI2: {
        marginLeft: 24,
        marginRight: 24,
        fontSize: 18,
        borderRadius: 30,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 3,
        borderColor: 'orange',
        height: 57,
        overflow: 'hidden',
        marginBottom: 20,
    },
    buttonLogin: {
        borderRadius: 30,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 3,
        borderColor: 'white',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Century Gothic',
        marginBottom: 20,

    },
    image: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'rgba(248,181,44,1)',
        elevation: 10,
    },
    fullcircle0: {
        backgroundColor: 'rgba(248,181,44,0.45)',
        borderRadius: 305 / 2,
        borderColor: 'white',
        height: 305,
        width: 305,
        position: 'absolute',
    },
    fullcircle: {
        backgroundColor: 'rgba(248,181,44,0.4)',
        borderRadius: 310 / 2,
        borderColor: 'white',
        height: 310,
        width: 310,
        position: 'absolute',
    },
    fullcircle05: {
        backgroundColor: 'rgba(248,181,44,0.35)',
        borderRadius: 315 / 2,
        borderColor: 'white',
        height: 315,
        width: 315,
        position: 'absolute',
    },
    fullcircle1: {
        backgroundColor: 'rgba(248,181,44,0.3)',
        borderRadius: 320 / 2,
        borderColor: 'white',
        height: 320,
        width: 320,
        position: 'absolute',
    },
    fullcircle15: {
        backgroundColor: 'rgba(248,181,44,0.25)',
        borderRadius: 325 / 2,
        borderColor: 'white',
        height: 325,
        width: 325,
        position: 'absolute',
    },
    fullcircle2: {
        backgroundColor: 'rgba(248,181,44,0.2)',
        borderRadius: 330 / 2,
        borderColor: 'white',
        height: 330,
        width: 330,
        position: 'absolute',
    },
    fullcircle25: {
        backgroundColor: 'rgba(248,181,44,0.15)',
        borderRadius: 335 / 2,
        borderColor: 'white',
        height: 335,
        width: 335,
        position: 'absolute',
    },
    fullcircle3: {
        backgroundColor: 'rgba(248,181,44,0.1)',
        borderRadius: 340 / 2,
        borderColor: 'white',
        height: 340,
        width: 340,
        position: 'absolute',
    },
    fullcircle35: {
        backgroundColor: 'rgba(248,181,44,0.05)',
        borderRadius: 345 / 2,
        borderColor: 'white',
        height: 345,
        width: 345,
        position: 'absolute',
    },
    fullcircle40: {
        backgroundColor: 'rgba(248,181,44,0.01)',
        borderRadius: 350 / 2,
        borderColor: 'white',
        height: 350,
        width: 350,
        position: 'absolute',
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'orange'
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
});