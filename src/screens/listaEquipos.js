import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import EquipoCard from "../components/EquipoCard"
import FloatingButton from '../components/FloationgButton'
import { useNavigation } from "@react-navigation/native"
import { getData } from "../global/functions"

const listaEquipos = () => {

    const [Equipos, setEquipos] = useState([]);

    const navigator = useNavigation();

    useEffect(async () => {
        try {
            firestore()
                .collection('Equipos')
                .where('Entrenador', "==", await getData())
                .onSnapshot(docs => {
                    let equipos = [];
                    docs.forEach(doc => {
                        equipos.push(doc.data())
                    });

                    setEquipos(equipos);
                })
        } catch (error) {
            console.log(`Ocurrio este error: ${err.message}`);
        }
    }, []);

    // console.log(Equipos);

    const getId = async (item) => {
        try {
            let id;
            const entrenador = await getData();
            const response = await firestore().collection("Equipos").get().then(querySnapshot => {
                querySnapshot.forEach(documentSnap => {
                    if (documentSnap.data().NombreEquipo === item.NombreEquipo && documentSnap.data().Entrenador === entrenador) {
                        id = documentSnap.id;
                    }
                });
            });

            return id;
        } catch (error) {
            console.log(error)
        }
    }

    const accionBoton = async (item) => {
        const { pokemones, NombreEquipo } = item;
        Alert.alert("Estas seguro?", "Quieres eliminar este pokemon de tu equipo?", [
            {
                text: "Cancelar",
                onPress: () => console.log("No se hace"),
                style: 'cancel'
            },
            {
                text: 'Modificar',
                onPress: async () => {
                    const ID = await getId(item);
                    Alert.alert("Seguro?", "Cualquier cambio es irreversible", [
                        {
                            text: "Cancelar",
                            onPress: () => console.log("No"),
                            style: 'cancel'
                        },
                        {
                            text: 'Modificar',
                            onPress: () => {
                                console.log(ID);
                                navigator.navigate('Modificar Equipo', {
                                    screen: 'Modificar Equipo',
                                    ID: ID
                                });
                            },
                            style: 'destructive'
                        }
                    ])
                },
                style: 'destructive'
            },
            {
                text: 'Eliminar',
                onPress: async () => {
                    try {
                        const ID = await getId(item);
                        Alert.alert("Estas seguro?", "Se eliminara el equipo permanentemente", [
                            {
                                text: 'Cancerlar',
                                onPress: () => console.log('Nel'),
                                style: 'cancel'
                            },
                            {
                                text: "Estoy seguro",
                                onPress: async () => {
                                    await firestore().collection('Equipos').doc(ID).delete().then(() => console.log("Eliminado"))
                                },
                                style: 'destructive'
                            }
                        ])

                    } catch (error) {
                        console.log(error)
                    }
                },
                style: 'destructive'
            }
        ])
    }

    const InformacionPokemon = (item) => {
        navigator.navigate('Informacion Pokemon', {
            item,
        });
    }

    return (
        <SafeAreaView style={styles.safeArea} >
            <View style={styles.container}>
                {Equipos.length == 0 ? (
                    <Text>Aun no hay Equipos</Text>
                ) : (
                    <FlatList
                        style={styles.lista}
                        data={Equipos}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => accionBoton(item)} >
                                    <EquipoCard pokemones={item.pokemones} NombreEquipo={item.NombreEquipo} onPress={InformacionPokemon} Token={item.Token} />
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.NombreEquipo}
                    />
                )}
                <FloatingButton onPress={() => {
                    navigator.navigate('Crear Equipo', {
                        screen: 'Crear Equipo',
                    });
                }} position={0} title={"Crear Equipo"} />
                <FloatingButton onPress={() => {
                    navigator.navigate('Descargar Equipo', {
                        screen: 'Descargar Equipo',
                    });
                }} position={70} title={"Descargar Equipo"} />
            </View>
        </SafeAreaView>
    )
}

export default listaEquipos;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lista: {
        flex: 1,
        display: 'flex',
        width: "100%"
    }
})
