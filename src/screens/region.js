import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import PokemonButton from "../components/pokemonButton"

const region = ({ route }) => {

    const { params } = route;
    const { pokemons, guardarPokemon } = params;


    return (
        <View style={styles.listContainer}>
            <FlatList
                data={pokemons}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <>
                            <PokemonButton pokemon={item.pokemon_species} guardarPokemon={guardarPokemon} />
                        </>
                    )
                }}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

export default region;

const styles = StyleSheet.create({
    listContainer: {
        display: 'flex',
        flex: 1
    }
});
