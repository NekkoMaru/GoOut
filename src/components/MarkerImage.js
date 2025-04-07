import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

const MarkerImage = ({ imageUri, onRemove }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MarkerImage;
