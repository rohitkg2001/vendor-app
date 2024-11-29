import React from "react";
import { View, Image } from "react-native";
import { CameraView } from "expo-camera";
import { layouts, styles, spacing } from "../styles";

export default function CameraComponent({ photoUri, cameraRef }) {
  return (
    <View style={[spacing.br1, spacing.bw1, layouts.hidden, spacing.mv5, layouts.center]}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={layouts.rec75} />
      ) : (
        <CameraView style={layouts.rec75} ref={cameraRef} facing="back" />
      )}
    </View>
  );
}
