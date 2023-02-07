import * as React from 'react';
import { TextInput, Button, IconButton, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, Alert, Dimensions } from 'react-native';
import CircularPicker from 'react-native-circular-picker';
import { useContext } from 'react';
import PantallasContext from '../components/PantallasContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Light(props) {
    const { user, setUser } = useContext(PantallasContext);
    const handleChange = (v) => setNivelLuz((v + 50).toFixed(0));
    const [consultaLuz, setConsultaLuz] = React.useState('');
    const [nivelLuz, setNivelLuz] = React.useState(0);
    const [horaLuz, setHoraLuz] = React.useState('');
    const arrNivelesLuz = [
        { hora: '16', luz: '3' },
        { hora: '11', luz: '7' },
    ];

    const exit = () => {
        Alert.alert('Log Out', 'Do you want to log out?', [
            { text: 'Yes', onPress: () => { props.navigation.navigate('Login'); setUser(""); }},
            { text: 'No' },
        ]);
    };

    const localizarNivel = () => {
        let registro = '';

        for (let i = 0; i < arrNivelesLuz.length; i++) {
            if (arrNivelesLuz[i].hora === horaLuz) {
                registro += arrNivelesLuz[i].luz;
            }
        }

        if (registro !== '') {
            setConsultaLuz(registro);
        } else {
            Alert.alert(
                'Error ❌',
                'There is no record of light at the time ' + horaLuz,
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <PaperProvider>
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
                    <View style={styles.zona1}>
                        <Text style={styles.titulo}>Light</Text>
                        <Text style={styles.titulo}>Regulator</Text>
                        <View style={styles.separacion}>
                            <CircularPicker
                                size={200}
                                steps={[20, 45, 75, 100]}
                                gradients={{
                                    0: ['rgb(0, 122, 255)', 'rgb(0, 122, 255)'],
                                    20: ['rgb(255, 214, 10)', 'rgb(255, 214, 10)'],
                                    45: ['rgb(255, 164, 32)', 'rgb(255, 164, 32)'],
                                    75: ['rgb(247, 22, 0)', 'rgb(247, 22, 0)'],
                                }}
                                onChange={handleChange}>
                                <>
                                    <Text style={styles.grados}>{nivelLuz}</Text>
                                </>
                            </CircularPicker>
                        </View>
                    </View>
                    <View style={styles.zona2}>
                        <View style={styles.viewNum}>
                            <Text style={styles.text}>
                                Introduce an hour to{'\n'}
                                see the light level:
                            </Text>
                            <View>
                                <TextInput
                                    style={styles.width}
                                    keyboardType="numeric"
                                    maxLength={20}
                                    value={horaLuz}
                                    onChangeText={(newText) => setHoraLuz(newText)}
                                    underlineColor={'transparent'}
                                    theme={{ colors: { text: '', primary: '' } }}
                                    placeholder="Write an hour"
                                />
                                <Button
                                    style={styles.button}
                                    alignSelf="center"
                                    mode="contained"
                                    buttonColor="orange"
                                    onPress={localizarNivel}>
                                    Show
                                </Button>
                            </View>
                        </View>
                        <View style={styles.viewLevel}>
                            <Text style={styles.textLevel}>{consultaLuz}</Text>
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
    zona1: {
        flex: 1.5,
        justifyContent: 'center',
    },
    zona2: {
        flex: 1,
    },
    bot: {
        flex: 4,
    },
    textoUser: {
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
        borderColor: 'black',
        borderWidth: 2,
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
    separacion: {
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
    grados: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    iconos: {
        marginBottom: -4,
        marginRight: -1,
    },
    viewNum: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
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
    },
    text: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});
