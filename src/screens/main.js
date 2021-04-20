import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, FlatList, StyleSheet, TextInput, Alert } from 'react-native'
import FloatingButton from '../components/FloationgButton';
import RegionButton from "../components/regionButton"
import { useNavigation } from "@react-navigation/native"
import firestore from '@react-native-firebase/firestore'
import EquipoCard from "../components/EquipoCard"
import { getData } from "../global/functions"

const main = () => {

    const [NombreEquipo, setNombreEquipo] = useState("");
    const [pokemones, setPokemones] = useState([]);
    const [regions, setRegions] = useState();

    const navigator = useNavigation();

    useEffect(async () => {
        try {
            await fetch(`https://pokeapi.co/api/v2/region`, {
                method: 'GET',
            })
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    setRegions(res.results);
                }).catch(err => {
                    console.log(`Ocurrio este error: ${err.message}`);
                });

        } catch (error) {
            console.log(`Ocurrio este error: ${err.message}`);
        }
    }, []);

    const guardarPokemon = (pokemon) => {
        setPokemones(pokemones => [...pokemones, { name: pokemon.name, url: pokemon.url, pokedexNumber: pokemon.url.split('/')[6] }]);
    }

    const accionBoton = (item) => {
        Alert.alert("Estas seguro?", "Quieres eliminar este pokemon de tu equipo?", [
            {
                text: "Cancelar",
                onPress: () => console.log("No se hace"),
                style: 'cancel'
            },
            {
                text: 'Eliminar',
                onPress: () => {
                    const name = item.name;
                    setPokemones(pokemones.filter(item => item.name !== name));
                },
                style: 'destructive'
            }
        ])
    }

    const GuardarEquipo = async () => {
        const Entrenador = await getData();
        const Token = Math.floor(Math.random() * 1000000);
        if (pokemones.length > 2 && pokemones.length <= 6 && NombreEquipo != '') {
            firestore().collection("Equipos").add({
                NombreEquipo,
                pokemones,
                Entrenador,
                Token
            });
            navigator.goBack();
        } else {
            Alert.alert("Piensa bien tu equipo!", "Los equipos pokemon estan conformados de 3 a 6 pokemones!");
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer} >
            <View style={styles.mainContainer}>
                <View style={styles.nombreContainer}>
                    <Text style={styles.text}>Nombre del Equipo </Text>
                    <TextInput style={styles.equipoInput} onChangeText={setNombreEquipo} />
                    {pokemones.length == 0 ? (
                        <Text>Aun no hay miembros en tu equipo</Text>
                    ) : (
                        <EquipoCard pokemones={pokemones} NombreEquipo={NombreEquipo} onPress={accionBoton} />
                    )}
                </View>
                <FlatList
                    data={regions}
                    style={styles.list}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <RegionButton props={item} guardarPokemon={guardarPokemon} />
                            </>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />

                <View style={{ display: 'flex', flexDirection: 'row' }} >
                    <FloatingButton onPress={() => {
                        console.log(pokemones);
                        GuardarEquipo();
                    }} position={0} title={"Guardar"} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default main;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    list: {
        flex: 1,
    },
    nombreContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    equipoInput: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        width: '60%',
        margin: 4,
        color: 'black'
    },
    text: {
        fontSize: 15,
        marginTop: 8
    }
});
