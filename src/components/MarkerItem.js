import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Image, StyleSheet, Text } from "react-native";

const MarkerItem = ({ marker, onPress }) => {
  console.log(`Marker at: ${marker.latitude}, ${marker.longitude}`);

  return (
    <Marker
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      onPress={() => onPress?.(marker)}
      tracksViewChanges={false}
    >
      <View style={styles.simpleMarker}>
        <Text style={styles.markerText}>📍</Text>
      </View>

      <Callout tooltip>
        <View style={styles.callout}>
          <Text style={styles.title}>{marker.title}</Text>
          <Text style={styles.description}>{marker.description || ""}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  simpleMarker: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  markerText: {
    fontSize: 24,
    backgroundColor: "transparent", // Важно для Android
  },
  callout: {
    width: 200,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 6,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#666",
    fontSize: 12,
  },
});

export default MarkerItem;