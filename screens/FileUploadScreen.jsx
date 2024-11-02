import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";
import CameraComponent from "../components/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, SCREEN_HEIGHT, spacing } from "../styles";
import { typography, PRIMARY_COLOR } from "../styles";
import { styles } from "../styles/components.styles";
import { H4, H5, H2, H6, P } from "../components/text";

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
      <View style={[spacing.mb5, { width: SCREEN_WIDTH - 14 }]}>
        <Card style={[{ height: SCREEN_HEIGHT - 16 }]}>
          <View style={styles.cardTitle}>
            <H4 style={[typography.textBold]}>Upload Photos</H4>
            <H6>Take up to 5 pictures to upload</H6>
          </View>
          <Card.Content>
            <CameraComponent cameraRef={cameraRef} />
            <Button
              style={[
                styles.btn,
                styles.bgPrimary,
                { justifyContent: "center" },
              ]}
              mode="outlined"
              onPress={handleTakePicture}
            >
              <H4
                style={[styles.btnText, styles.textLarge, typography.textDark]}
              >
                Take Photo
              </H4>
            </Button>

            {photoMessage && <P>{photoMessage}</P>}

            <View style={styles.photoRow}>
              {photos.map((photoUri, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photoUri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePhoto(photoUri)}
                  >
                   <P
                      style={{
                        fontSize: 14,
                        color: "white",
                        marginLeft: 2,
                      }}
                      onPress={() => console.log("Remove button pressed")}
                    >
                      X
                    </P>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button
              onPress={handleCancel}
              style={{
                paddingVertical: 4,
                alignSelf: "flex-start",
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={handleUpload}
              style={{
                paddingVertical: 4,
                alignSelf: "flex-end",
                backgroundColor: PRIMARY_COLOR,
              }}
            >
              Upload Files
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ContainerComponent>
  );
};

export default FileUploadScreen;
