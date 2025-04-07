import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MarkerImage from "./MarkerImage";

const MarkerModal = ({ visible, marker, onClose, onSave }) => {
  const [newTitle, setNewTitle] = useState(marker?.title || "");
  const [newDescription, setNewDescription] = useState(marker?.description || "");
  const [images, setImages] = useState(marker?.images || []);

  useEffect(() => {
    setNewTitle(marker?.title || "");
    setNewDescription(marker?.description || "");
    setImages(marker?.images || []);
  }, [marker]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };

  const handleSave = () => {
    onSave({ ...marker, title: newTitle, description: newDescription, images });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Информация о метке</Text>
          <TextInput style={styles.input} value={newTitle} onChangeText={setNewTitle} />
          <TextInput
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
            multiline
          />

          <Button title="Добавить фото" onPress={pickImage} />

          <ScrollView style={styles.imageScroll}>
            {images.map((uri, index) => (
              <MarkerImage
                key={index}
                imageUri={uri}
                onRemove={() => removeImage(uri)}
              />
            ))}
          </ScrollView>

          <Button title="Сохранить" onPress={handleSave} />
          <Button title="Закрыть" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  imageScroll: {
    width: "100%",
    marginVertical: 10,
  },
});

export default MarkerModal;
