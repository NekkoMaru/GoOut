import React, { useState, useRef, useEffect, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MarkerItem from "./src/components/MarkerItem";
import MarkerModal from "./src/components/MarkerModal";

export default function App() {
  const [markers, setMarkers] = useState([
    { id: 1, latitude: 59.437, longitude: 24.7536, title: "Tallinn", description: "Estonia", owner: "admin" },
  ]);
  const [region, setRegion] = useState({
    latitude: 59.437,
    longitude: 24.7536,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = "Nekko";
  const mapRef = useRef(null);

  // Инициализация карты
  useEffect(() => {
    if (mapRef.current) {
      console.log("Карта инициализирована");
    }
  }, [mapRef]);

  // Функция добавления новой метки
  const addMarker = useCallback(() => {
    const newMarker = {
      id: Date.now(), 
      latitude: region.latitude,
      longitude: region.longitude,
      title: `Метка ${markers.length + 1}`,
      description: "Новая метка",
      owner: currentUser,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  }, [region, markers.length, currentUser]);

  // Открытие модального окна с деталями метки
  const openMarkerDetails = useCallback((marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  }, []);

  // Сохранение изменений в метке
  const saveChanges = useCallback((updatedMarker) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === updatedMarker.id ? updatedMarker : marker
      )
    );
    setModalVisible(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          apiKey="AIzaSyAPE4OcqOT-SRWJTCLyTo2NwBsgip-MLcQ"
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          ref={mapRef}
        >
          {markers.map((marker) => (
            <MarkerItem key={marker.id} marker={marker} onPress={openMarkerDetails} />
          ))}
        </MapView>

        <TouchableOpacity style={styles.addButton} onPress={addMarker}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
