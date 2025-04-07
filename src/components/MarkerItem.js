import React from "react";
import { Marker } from "react-native-maps";

const MarkerItem = ({ marker, onPress }) => {
  return (
    <Marker
      key={marker.id}
      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      title={marker.title}
      description={marker.description}
      onPress={() => onPress(marker)}
    />
  );
};

export default MarkerItem;
