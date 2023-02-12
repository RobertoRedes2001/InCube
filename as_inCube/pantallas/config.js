import * as React from 'react';
import { useContext, useState } from 'react';
import PantallasContext from '../components/PantallasContext';
import { StyleSheet, View, Text, SafeAreaView, Alert, Dimensions } from 'react-native';
import { Button, IconButton, Switch, TextInput } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Config(props) {
    const { user, setUser } = useContext(PantallasContext);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [mode, setMode] = useState(' Off');
    const [pass1, setPass1] = useState("");
    const [visiblePass1, setVisiblePass1] = useState(true);
    const [pass2, setPass2] = useState("");
    const [visiblePass2, setVisiblePass2] = useState(true);
    const [nomUser, setNomUser] = useState("");
    const [eye1, setEye1] = useState('eye-outline');
    const [eye2, setEye2] = useState('eye-outline');
    const [form, setForm] = useState(false);


    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if (isSwitchOn === false) {
            setMode(' On ');
        } else {
            setMode(' Off');
        }
    };
    const exit = () => {
        Alert.alert('Log Out', 'Do you want to log out?', [
            { text: 'Yes', onPress: () => { props.navigation.navigate('Login'); setUser(""); } },
            { text: 'No' },
        ]);
    };

    const changeVisible1 = () => {
        if (visible === true) {
            setVisiblePass1(false);
            setEye1('eye-off');
        } else {
            setVisiblePass1(true);
            setEye1('eye-outline');
        }
    };

    const changeVisible2 = () => {
        if (visible === true) {
            setVisiblePass2(false);
            setEye2('eye-off');
        } else {
            setVisiblePass2(true);
            setEye2('eye-outline');
        }
    };

    const verificarAdmin = () => {
        if (user === "roberto") {
            setForm(true);
        } else {
            Alert.alert(
                //Ponerlo en ingles
                'Error ❌',
                'The ' + user + ' no tiene permiso para registrar a usuarios',
                [{ text: 'OK' }]
            );
        }
    }

    const postApi = async () => {
        if (pass1 === pass2) {
            let result = await fetch("http://54.198.123.240:5000/api/enviarDatos", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/html',
                },

                body: nomUser + ";" + pass1 + ";" + "false"
            })
                .then(response => checkStatus(response))
                .then(response => response.json())
                .catch(e => { throw e; });

            Alert.alert(
                'Registered 🧒 / 👩',
                'The ' + nomUser + 'has been created',
                [{ text: 'OK' }]
            );

            return result;
        } else {
            Alert.alert(
                'Error ❌',
                'The password is not same',
                [{ text: 'OK' }]
            );
        }
    }

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.top}>
                <View style={styles.izquierda}>
                    <View style={styles.izquierda}>
                        <Text style={styles.textoUser}> Hello {user}, Welcome</Text>
                    </View>
                </View>
                <View style={styles.derecha}>
                    <IconButton
                        style={styles.iconos}
                        alignSelf="center"
                        icon="exit-to-app"
                        iconColor="white"
                        size={35}
                        onPress={exit}
                    />
                </View>
            </View>
            <View style={styles.bot}>
                <View style={{ borderWidth: 5, borderColor: 'orange', borderRadius: 30 }}>
                    <Text style={styles.titulo} onPress={verificarAdmin}>REGISTER</Text>
                </View>
                {form && (
                    <View>
                        <TextInput
                            style={styles.width}
                            onChangeText={(newText) => setNomUser(newText)}
                            left={<TextInput.Icon icon="account" iconColor="#F8B52C" />}
                            maxLength={20}
                            value={nomUser}
                            underlineColor={'transparent'}
                            theme={{ colors: { text: '', primary: '' } }}
                            label="Username..."
                            placeholder="Write your username..."
                        />
                        <TextInput
                            style={styles.txtI2}
                            onChangeText={(newText) => setPass1(newText)}
                            left={<TextInput.Icon icon="lock" iconColor="#F8B52C" />}
                            right={
                                <TextInput.Icon
                                    icon={eye1}
                                    onPress={changeVisible1}
                                    iconColor="#F8B52C"
                                />
                            }
                            secureTextEntry={visiblePass1}
                            maxLength={20}
                            value={pass1}
                            underlineColor={'transparent'}
                            theme={{ colors: { text: '', primary: '' } }}
                            label="Password..."
                            placeholder="Write your password..."
                        />
                        <TextInput
                            style={styles.txtI2}
                            onChangeText={(newText) => setPass2(newText)}
                            left={<TextInput.Icon icon="lock" iconColor="#F8B52C" />}
                            right={
                                <TextInput.Icon
                                    icon={eye2}
                                    onPress={changeVisible2}
                                    iconColor="#F8B52C"
                                />
                            }
                            secureTextEntry={visiblePass2}
                            maxLength={20}
                            value={pass2}
                            underlineColor={'transparent'}
                            theme={{ colors: { text: '', primary: '' } }}
                            label="Confirm password..."
                            placeholder="Confirm your password..."
                        />
                        <View>
                            <Button style={styles.button}
                                alignSelf="center"
                                mode="contained"
                                buttonColor='orange'
                                dark={true}
                                onPress={postApi}
                            >
                                Save
                            </Button>
                        </View>
                    </View>
                )}

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 5,
        backgroundColor: '#3c525b',
    },
    viewTitulo: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
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
    textoUser: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 20
    },
    bot: {
        flex: 4,
    },
    top: {
        flexDirection: 'row',
        backgroundColor: 'orange',
        flex: 0.4,
        height: screenHeight / 10,
        width: screenWidth,
        marginBottom: 50,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    iconos: {
        marginBottom: -4,
        marginRight: -1,
    },
    izquierda: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    derecha: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Candara',
        margin: 10
    },
});