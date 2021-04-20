import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import firestore from "@react-native-firebase/firestore"
import EquipoCard from "../components/EquipoCard"
import { getData } from '../global/functions'
import { useNavigation } from "@react-navigation/native"


const descargarEquipo = () => {

    const [codigo, setCodigo] = useState('');
    const [pokemones, setEquipo] = useState(null);
    const [NombreEquipo, setNombreEquipo] = useState('');

    const navigator = useNavigation();


    const buscarEquipo = async () => {
        try {
            // console.log(codigo);
            const res = await firestore().collection('Equipos').where('Token', '==', parseInt(codigo)).get();
            // console.log(res.docs[0]._data.pokemones);
            setEquipo(res.docs[0]._data.pokemones);
            setNombreEquipo(res.docs[0]._data.NombreEquipo);
        } catch (error) {
            console.log(error);
        }
    }

    const GuardarEquipo = async () => {
        try {
            const Entrenador = await getData();
            const Token = Math.floor(Math.random() * 1000000);
            firestore().collection('Equipos').add({
                NombreEquipo,
                pokemones,
                Entrenador,
                Token
            });
            navigator.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Clave del equipo</Text>
            <TextInput style={styles.Input} onChangeText={setCodigo} value={codigo} keyboardType={'numeric'} />
            <TouchableOpacity style={styles.button} onPress={() => buscarEquipo()}>
                <Text>Buscar</Text>
            </TouchableOpacity>
            {
                pokemones ? (
                    (
                        <View style={styles.container}>
                            <EquipoCard pokemones={pokemones} NombreEquipo={NombreEquipo} onPress={() => console.log("Cosa")} />
                            <TouchableOpacity style={styles.buttonGuardar} onPress={async () => {
                                await GuardarEquipo();
                            }}>
                                <Text>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    )
                ) : (
                    (
                        null
                    )
                )
            }
        </View>
    )
}

export default descargarEquipo;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    Input: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        width: '70%',
        margin: 8,
        color: 'black'
    },
    text: {
        fontSize: 18,
        marginTop: 10
    },
    button: {
        width: '40%',
        height: 50,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonGuardar: {
        width: 100,
        height: 50,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})