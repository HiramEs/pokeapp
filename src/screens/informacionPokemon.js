import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const informacionPokemon = ({ route }) => {

    const { params } = route;
    const { item } = params;

    const [informacionPokemon, setInfoPokemon] = useState('');
    const [type, setType] = useState('')

    useEffect(async () => {
        await fetch(route.params.item.url)
            .then(res => {
                return res.json();
            }).then(res => {
                setInfoPokemon(res.flavor_text_entries[0].flavor_text)
            });

        await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.item.pokedexNumber}`)
            .then(res => {
                return res.json();
            }).then(res => {
                console.log(res);
                setType(res.types[0].type.name)
            })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.nombrePokemon}>{item.name.toUpperCase()} #{item.pokedexNumber}</Text>
            <View style={styles.imagesContainer}>
                <Image source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.pokedexNumber}.png`
                }} style={styles.images} />
                <Image source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${item.pokedexNumber}.png`
                }} style={styles.images} />
            </View>
            <Text styles={styles.description} >{informacionPokemon}</Text>
            <Text styles={styles.description} >Type: {type}</Text>
        </View>
    )
}

export default informacionPokemon;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        display: 'flex'
    },
    nombrePokemon: {
        margin: 15,
        fontSize: 25,
    },
    imagesContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    images: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    descriptionContainer: {
        height: 300,
        width: 300,
        alignSelf: 'center'
    },
    description: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10
    }
});
