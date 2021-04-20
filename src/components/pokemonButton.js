import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'

const pokemonButton = ({ pokemon, guardarPokemon }) => {

    const pokedexNumber = pokemon.url;

    return (
        <View style={styles.pokemonButtonContainer}>
            <TouchableOpacity style={styles.pokemonButton} onPress={() => {
                Alert.alert(    
                    pokemon.name.toUpperCase(),
                    "Guardar Pokemon?",
                    [
                        {
                            text: 'Guardar',
                            onPress: () => {
                                guardarPokemon(pokemon);
                            }
                        },
                        {
                            text: 'Cancelar',
                            onPress: () => console.log('No guardar')
                        },
                    ]
                )
            }}>
                <Image source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber.split('/')[6]}.png`
                }}
                    style={styles.Image}
                />
                <Text> {pokemon.name.toUpperCase()} </Text>
            </TouchableOpacity>
        </View>
    )
}

export default pokemonButton;

const styles = StyleSheet.create({
    pokemonButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    pokemonButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "75%",
        height: 145,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
    },
    Image: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain'
    }
})
