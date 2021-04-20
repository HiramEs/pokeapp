import AsyncStorage from "@react-native-community/async-storage";

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@Entrenador');
        if (value !== null) {
            return value;
        }
        return null;
    } catch (e) {
        // error reading value
    }
}