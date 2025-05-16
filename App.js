import 'react-native-gesture-handler';
import React, { useState, useRef, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MarkerModal from "./src/components/MarkerModal";

export default function App() {
  // State for storing markers
  const [markers, setMarkers] = useState([
    { 
      id: 1, 
      latitude: 59.437, 
      longitude: 24.7536, 
      title: "Tallinn", 
      description: "Estonia", 
      images: [],
      tags: []
    },
  ]);

  // Current map region state
  const [region, setRegion] = useState({
    latitude: 59.437,
    longitude: 24.7536,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Selected marker and modal visibility
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);

  // Add new marker to the map
  const addMarker = useCallback(() => {
    const newMarker = {
      id: Date.now(),
      latitude: region.latitude,
      longitude: region.longitude,
      title: `Marker ${markers.length + 1}`,
      description: "New marker",
      images: [],
      tags: []
    };
    setMarkers(prev => [...prev, newMarker]);
    setSelectedMarker(newMarker);
    setModalVisible(true);
  }, [region, markers.length]);

  // Save marker changes
  const saveChanges = useCallback((updatedMarker) => {
    setMarkers(prev => prev.map(marker => 
      marker.id === updatedMarker.id ? updatedMarker : marker
    ));
    setModalVisible(false);
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <View style={styles.container}>
        {/* Main Map Component */}
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
          ref={mapRef}
          provider="google"
          mapType="standard"
          showsUserLocation={true}
        >
          {/* Render all markers */}
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={marker.title}
              description={marker.description}
              tracksViewChanges={false}
              zIndex={1000}
              onPress={() => {
                console.log("Marker pressed:", marker.id);
                setSelectedMarker(marker);
                setModalVisible(true);
              }}
              onCalloutPress={() => {
                setSelectedMarker(marker);
                setModalVisible(true);
              }}
            >
              <View style={styles.markerPin}>
                <Text style={styles.markerText}>📍</Text>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Floating action button */}
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={addMarker}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Marker details modal */}
        <MarkerModal
          visible={modalVisible}
          marker={selectedMarker}
          onClose={() => setModalVisible(false)}
          onSave={saveChanges}
        />
      </View>
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    position: 'relative'
  },
  map: {
    flex: 1,
    zIndex: 0
  },
  markerPin: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    fontSize: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  }
});