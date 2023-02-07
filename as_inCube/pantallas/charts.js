import * as React from 'react';
import { useContext } from 'react';
import PantallasContext from '../components/PantallasContext';
import { IconButton, Text, DataTable } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, Alert, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const optionsPerPage = [2, 3, 4];

export default function Charts(props) {
    const { user, setUser } = useContext(PantallasContext);
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    const data = {
        labels: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
        datasets: [
            {
                data: [400, 425, 500, 550, 450, 470],
            },
        ],
    };

    const exit = () => {
        Alert.alert('Log Out', 'Do you want to log out?', [
            { text: 'Yes', onPress: () => { props.navigation.navigate('Login'); setUser(""); } },
            { text: 'No' },
        ]);
    };

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.top}>
                <View style={styles.izquierda}>
                    <Text style={styles.textoUser}> Hello {user}, Welcome</Text>
                </View>
                <View style={styles.derecha}>
                    <IconButton
                        style={styles.buttonBack}
                        alignSelf="center"
                        icon="exit-to-app"
                        iconColor="white"
                        size={35}
                        onPress={exit}
                    />
                </View>
            </View>
            <View style={styles.bot}>
                <DataTable
                    style={{ width: screenWidth, color: 'white', borderColor: 'white' }}>
                    <DataTable.Header
                        style={{
                            borderColor: 'white',
                            borderBottomWidth: 3,
                            backgroundColor: 'rgba(255,165,0,1)',
                        }}>
                        <DataTable.Title
                            style={{ borderRightWidth: 0, borderColor: 'white' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Fecha</Text>
                        </DataTable.Title>
                        <DataTable.Title numeric>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Luz</Text>
                        </DataTable.Title>
                        <DataTable.Title numeric>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Temperatura
                            </Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell
                            style={{
                                borderRightWidth: 3,
                                borderColor: 'rgba(255,165,0,0.8)',
                            }}>
                            <Text style={{ color: 'white', }}>Agosto-12</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text style={{ color: 'white' }}>159 A</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text style={{ color: 'white' }}>14°C</Text>
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row
                        style={{
                            borderBottomWidth: 3,
                            borderBottomColor: 'rgba(255,165,0,0.8)',
                        }}>
                        <DataTable.Cell
                            style={{
                                borderRightWidth: 3,
                                borderColor: 'rgba(255,165,0,0.8)',
                            }}>
                            <Text style={{ color: 'white' }}>Agosto-13</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text style={{ color: 'white' }}>130 A</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text style={{ color: 'white' }}>17°C</Text>
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Pagination
                        style={{
                            backgroundColor: 'rgba(255,165,0,1)',
                            borderColor: 'white',
                            borderBottomWidth: 3,
                        }}
                        page={page}
                        numberOfPages={3}
                        onPageChange={(page) => setPage(page)}
                        label=<Text style={{ color: 'white', fontWeight: "bold" }}>{page}</Text>
                        optionsPerPage={optionsPerPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        showFastPagination
                        optionsLabel={'Rows per page'}
                    />
                </DataTable>

                <LineChart
                    data={data}
                    width={Dimensions.get('window').width} // from react-native
                    height={350}
                    yAxisLabel=""
                    yAxisSuffix=" A"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: '#3c525b',
                        backgroundGradientTo: '#3c525b',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: 'orange',
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        marginRight: 20,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 5,
        backgroundColor: '#3c525b',
        alignItems: 'center',
    },
    top: {
        flexDirection: 'row',
        backgroundColor: 'orange',
        flex: 0.4,
        height: screenHeight / 10,
        width: screenWidth,
        borderBottomColor: 'white',
        borderBottomWidth: 3,
        justifyContent: 'space-between',
    },
    bot: {
        flex: 4,
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
    textoUser: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 20
    },
    buttonBack: {
        marginBottom: -4,
        marginRight: -1,
    },
});