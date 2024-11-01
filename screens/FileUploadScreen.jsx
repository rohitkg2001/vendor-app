import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Button } from "react-native-paper";
import CameraComponent from "../components/CameraComponent";
import { useNavigation } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";

const FileUploadScreen = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(true);

  const handleTakePicture = (uri) => {
    setPhotoUri(uri);
    setCameraVisible(true);
    console.log("Photo taken:", uri);
  };
  const openCamera = () => {
    setCameraVisible(true);
  };
  const handleCancel = () => {
    setPhotoUri(null);
    console.log("Upload canceled");
  };

  const handleUpload = () => {
    if (photoUri) {
      console.log("Uploading photo:", photoUri);
    } else {
      console.log("No photo to upload");
    }
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
            {cameraVisible && (
              <CameraComponent
                photoUri={photoUri}
                setPhotoUri={setPhotoUri}
                onTakePicture={handleTakePicture}
              />
            )}
            <Button mode="outlined" onPress={openCamera}>
              Take Photo
            </Button>
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
