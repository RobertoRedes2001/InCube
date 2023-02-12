import * as React from 'react';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { StyleSheet, View, Text, Image, Alert, Modal, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import PantallasContext from '../components/PantallasContext';
import md5 from 'md5';

export default function Login({ navigation }) {
    const logo = require('../components/logo.jpg');
    const { user, setUser } = useContext(PantallasContext);
    const [pass, setPass] = useState('');
    const [visible, setVisible] = useState(true);
    const [eye, setEye] = useState('eye-outline');
    const [checked, setChecked] = useState(false);
    const [showModal, setShowModal] = useState(true);
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
                        if (checked === true) {
                            return true;
                        }
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
        if (getUserApi()) {
            navigation.navigate('Light');

        } else {
            Alert.alert('Error ❌', 'Make sure the information is correct', [
                { text: 'OK' },
            ]);
        }
    };

    return (
        <View style={styles.layout}>
            <View style={{ height: 20 }} />
            <View style={{ flex: 1.5, justifyContent: 'center' }}>

                <View
                    style={{
                        marginBottom: 30,
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
                    <Text style={styles.titulo}>InCube</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginTop: 30 }}>
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
                <View style={styles.checkPolicy}>
                    <View>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            color={'orange'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                    </View>
                    <Text
                        style={styles.policy}
                        onPress={() => {
                            setShowModal(!showModal);
                        }}>
                        Privacy Policy
                    </Text>
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={showModal}
                        onRequestClose={() => {
                            console.log('Modal has been closed.');
                        }}>
                        <View style={styles.modal2}>
                            <ScrollView>
                                <Text style={styles.privacyTitle}>Privacy Policy:</Text>
                                <Text style={styles.text}>
                                    Effective date: 2023-02-10 Updated on: 2023-02-10 This Privacy
                                    Policy explains the policies of InCube on the collection and
                                    use of the information we collect when you access
                                    https://www.InCube.com (the “Service”). This Privacy Policy
                                    describes your privacy rights and how you are protected under
                                    privacy laws. By using our Service, you are consenting to the
                                    collection and use of your information in accordance with this
                                    Privacy Policy. Please do not access or use our Service if you
                                    do not consent to the collection and use of your information
                                    as outlined in this Privacy Policy. This Privacy Policy has
                                    been created with the help of CookieScript Privacy Policy
                                    Generator. InCube is authorized to modify this Privacy Policy
                                    at any time. This may occur without prior notice. InCube will
                                    post the revised Privacy Policy on the https://www.InCube.com
                                    website
                                </Text>
                                <Button
                                    style={styles.button}
                                    alignSelf="center"
                                    mode="contained"
                                    buttonColor="orange"
                                    dark={true}
                                    onPress={() => {
                                        setShowModal(!showModal);
                                    }}>
                                    Close
                                </Button>
                            </ScrollView>
                        </View>
                    </Modal>
                </View>
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
    policy: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Century Gothic',
        textDecorationLine: 'underline',
    },
    privacyTitle: {
        color: 'white',
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        marginBottom: 20,
    },
    text: {
        color: 'white',
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        marginBottom: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#344955',
        padding: 35,
    },
    modal2: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#344955',
    },
    privacyTitle: {
        color: 'white',
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        marginBottom: 20,
    },
    text: {
        color: 'white',
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic',
        marginBottom: 20,
    },
    checkPolicy: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 10
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
        marginBottom: 3,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Century Gothic',
        marginBottom: 20,
        marginTop: 10
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
    buttonLogin: {
        borderRadius: 30,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 3,
        borderColor: 'white',
        width: 130,
        height: 50,
        margin: 5
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

});