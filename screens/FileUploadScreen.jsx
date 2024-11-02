import React, { useState, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Button } from "react-native-paper";
import CameraComponent from "../components/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";

const FileUploadScreen = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [photoMessage, setPhotoMessage] = useState("");

  const cameraRef = useRef(null);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setPhotoMessage("Photo has been taken!");
      console.log("Photo taken:", photo.uri);
    }
  };

  const handleUpload = () => {
    if (photoUri) {
      console.log("Uploading photo:", photoUri);
    } else {
      console.log("No photo to upload");
    }
  };

  const handleCancel = () => {
    setPhotoUri(null);
    setPhotoMessage("");
    console.log("Upload canceled");
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 10 }]}>
        <Card style={styles.card}>
          <Card.Title
            title="Upload Photo"
            subtitle="Take a picture to upload"
          />
          <Card.Content>
            <CameraComponent photoUri={photoUri} cameraRef={cameraRef} />
            <Button mode="outlined" onPress={handleTakePicture}>
              Take Photo
            </Button>
            {photoMessage && (
              <Text style={styles.uploadText}>
                {photoMessage}
              </Text>
            )}
            {photoUri && (
              <Text style={styles.uploadText}>
                Photo ready to upload: {photoUri}
              </Text>
            )}
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button onPress={handleCancel}>Cancel</Button>
            <Button mode="contained" onPress={handleUpload}>
              Upload File
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: spacing.m,
    padding: spacing.m,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  uploadText: {
    marginTop: spacing.m,
    color: "green",
  },
});

export default FileUploadScreen;
