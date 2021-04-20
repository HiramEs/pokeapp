import React, { useEffect } from 'react'
import MainStack from "./src/navigation/mainStack"
import AsyncStorage from '@react-native-community/async-storage'
import uuid from "react-native-uuid"

const App = () => {


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Entrenador')
      if (value !== null) {
        return value;
      }
      return null
    } catch (e) {
      // error reading value
    }
  }

  useEffect(async () => {
    try {
      const entrenador = await getData();
      
      if (entrenador === null) {
        const token = uuid.v4()
        await AsyncStorage.setItem("@Entrenador", token)
      }

      console.log(entrenador)
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <MainStack />
    </>
  )
}

export default App;
