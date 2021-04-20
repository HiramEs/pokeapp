import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Main from "../screens/main"
import Region from "../screens/region"
import ListaEquipos from "../screens/listaEquipos"
import ModificarEquipo from "../screens/modificarEquipo"
import DescargarEquipo from "../screens/descargarEquipo"
import InformacionPokemon from "../screens/informacionPokemon"

const Stack = createStackNavigator()

const mainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Lista Equipos" >
                <Stack.Screen
                    name="Crear Equipo"
                    component={Main}
                />
                <Stack.Screen
                    name="Region"
                    component={Region}
                />
                <Stack.Screen
                    name="Lista Equipos"
                    component={ListaEquipos}
                />
                <Stack.Screen
                    name="Modificar Equipo"
                    component={ModificarEquipo}
                />
                <Stack.Screen
                    name="Descargar Equipo"
                    component={DescargarEquipo}
                />
                <Stack.Screen
                    name="Informacion Pokemon"
                    component={InformacionPokemon}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default mainStack;