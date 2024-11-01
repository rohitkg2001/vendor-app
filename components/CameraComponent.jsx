import React, { useRef } from "react";
import { View, Image } from "react-native";
import { CameraView } from "expo-camera";
import { layouts, styles, spacing } from "../styles";

export default function CameraComponent({
  photoUri,
  setPhotoUri,
  onTakePicture,
}) {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      if (onTakePicture) onTakePicture(photo.uri);
    }
  };

  return (
    <View
      style={[
        styles.cameraContainer,
        layouts.circle75,
        spacing.mv5,
        layouts.center,
      ]}
    >
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={layouts.circle75} />
      ) : (
        <CameraView style={layouts.circle75} ref={cameraRef} facing="back" />
      )}
    </View>
  );
}
