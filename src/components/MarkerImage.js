import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Image, Text, StyleSheet } from 'react-native';

export const MarkerItem = ({ marker }) => (
  <Marker coordinate={marker.coords}>
    <View style={styles.container}>
      {marker.images?.[0] && (
        <Image source={{ uri: marker.images[0] }} style={styles.image} />
      )}
      <Text style={styles.title}>{marker.title}</Text>
    </View>
  </Marker>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  image: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'white' },
  title: { fontWeight: 'bold', fontSize: 12 }
});