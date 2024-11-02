import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";
import CameraComponent from "../components/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";

const FileUploadScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [photoMessage, setPhotoMessage] = useState("");

  const cameraRef = useRef(null);

  const handleTakePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, photo.uri]);
      setPhotoMessage("Photo has been taken!");
      console.log("Photo taken:", photo.uri);
    } else if (photos.length >= 5) {
      setPhotoMessage("Maximum of 5 photos reached.");
    }
  };

  const handleUpload = () => {
    if (photos.length > 0) {
      console.log("Uploading photos:", photos);
    } else {
      console.log("No photos to upload");
    }
  };

  const handleCancel = () => {
    setPhotos([]);
    setPhotoMessage("");
    console.log("Upload canceled");
  };

  const removePhoto = (uri) => {
    setPhotos(photos.filter((photoUri) => photoUri !== uri));
    console.log("Photo removed:", uri);
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh5, { width: SCREEN_WIDTH - 10 }]}>
        <Card>
          <Card.Title
            title="Upload Photos"
            subtitle="Take up to 5 pictures to upload"
          />
          <Card.Content>
            <CameraComponent cameraRef={cameraRef} />
            <Button mode="outlined" onPress={handleTakePicture}>
              Take Photo
            </Button>

            {photoMessage && (
              <Text style={styles.uploadText}>{photoMessage}</Text>
            )}

            <View style={styles.photoRow}>
              {photos.map((photoUri, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photoUri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePhoto(photoUri)}
                  >
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button onPress={handleCancel}>Cancel</Button>
            <Button mode="contained" onPress={handleUpload}>
              Upload Files
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  uploadText: {
    marginTop: 10,
    color: "green",
  },
  photoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  photoContainer: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 70,
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

export default FileUploadScreen;
