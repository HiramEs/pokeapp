import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'

const EquipoCard = ({ pokemones, NombreEquipo, onPress, Token }) => {

    return (
        <View style={styles.CardContainer} >
            <Text style={styles.title}>{NombreEquipo} #{Token}</Text>
            <FlatList
                data={pokemones}
                horizontal={true}
                keyExtractor={(item) => item.pokedexNumber}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.pokemonButtonContainer}>
                            <TouchableOpacity style={styles.pokemonButton} onPress={() => onPress(item)}>
                                <Image source={{
                                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`
                                }}
                                    style={styles.Image}
                                />
                                <Text> {item.name.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default EquipoCard;

const styles = StyleSheet.create({
    CardContainer: {
        width: '90%',
        height: 150,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        margin: 10
    },
    pokemonButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 13,
        paddingBottom: 15,
        paddingLeft: 4,
        paddingRight: 4
    },
    pokemonButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 100,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
    },
    Image: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain'
    },
    title: {
        alignSelf: 'center',
        margin: 5,
        fontSize: 16,
    }
})
