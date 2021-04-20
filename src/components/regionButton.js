import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native"

const regionButton = ({ props, guardarPokemon }) => {

    const [pokemons, setPokemons] = useState([]);
    const [JName, setJName] = useState('');

    const { name } = props;

    const navigator = useNavigation();


    useEffect(async () => {
        try {
            const res = await fetch(props.url, {
                method: 'GET',
            }).then(res => {
                return res.json();
            }).then(res => {
                // console.log(res);
                return res;
            }).catch(err => {
                console.log(`Ocurrio este error: ${err.message}`);
            });

            setJName(res.names[0].name);

            const poke = await fetch(res.pokedexes[0].url, {
                method: 'GET',
            }).then(res => {
                return res.json();
            }).then(res => {
                return res;
            }).catch(err => {
                console.log(`Ocurrio este error: ${err.message}`);
            });

            setPokemons(poke.pokemon_entries);


        } catch (error) {
            Alert.alert("Parece que hubo un error al conseguir los datos")
        }
    }, []);

    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigator.navigate('Region', {
                    screen: 'Region',
                    pokemons: pokemons,
                    guardarPokemon: guardarPokemon,
                });
            }}>
                <Text style={styles.MainText} >{name.toUpperCase()}</Text>
                <Text style={styles.JName} >{JName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default regionButton;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "65%",
        height: '75%',
        backgroundColor: 'red',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black'
    },
    MainText: {
        fontSize: 14,
        color: '#fff'
    },
    JName: {
        fontSize: 12,
        color: '#fff'
    }
});
