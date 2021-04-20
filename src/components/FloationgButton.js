import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FloatingButton = ({onPress, position, title}) => {
  return (
    <TouchableOpacity style={{...styles.fab, right: position }} onPress={() => onPress()} >
        <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#ECB649',
    position: 'absolute',
    margin: 16,
    bottom: 15,
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
})

export default FloatingButton;