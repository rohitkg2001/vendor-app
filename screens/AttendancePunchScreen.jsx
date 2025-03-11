// import react native
import { useState, useRef } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { CameraView } from "expo-camera";
// import components
import ContainerComponent from "../components/ContainerComponent";
import { styles, spacing, typography, SCREEN_WIDTH, layouts } from "../styles";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import { useSelector } from "react-redux";
import { H2 } from "../components/text";
import usePermissions from "../hooks/usePermissions";
import { updatePicture } from "../redux/actions/vendorActions";

export default function AttendancePunchScreen({ navigation }) {
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const { permissions, requestPermission } = usePermissions();
  const { id } = useSelector((state) => state.vendor);

  if (!permissions.camera || !permissions.location) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          This feature requires camera and location permissions.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

<<<<<<< HEAD
=======
  // const takePictureAndNavigate = async () => {
  //   if (cameraRef.current) {
  //     const photo = await cameraRef.current.takePictureAsync();

  //     if (photo) {
  //       console.log(id, photo);
  //       await updatePicture(id, photo);
  //     }
  //   }
  // };

>>>>>>> 143ff8f3e310b5ec255e192e24dcc38e99bfe3e5
  const takePictureAndNavigate = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7, // Optional: reduce size
          base64: false, // No need for base64 when uploading
        });

        if (photo) {
          console.log("Captured Photo:", photo);
          await updatePicture(id, photo); // Upload the image
        }
      } catch (err) {
        console.error("Camera Error:", err);
      }
    } else {
      console.error("Camera not initialized.");
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title="Record Your Face" hasIcon={true} isBack={true} />
      <ScrollView
        style={{ flex: 1, width: SCREEN_WIDTH - 20 }}
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
      >
        <View style={layouts.center}>
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
              <CameraView
                style={[layouts.circle75]}
                ref={cameraRef}
                facing="front"
              />
            )}
          </View>
        </View>

        <Button
          style={[styles.btn, styles.bgPrimary, { justifyContent: "center" }]}
          onPress={takePictureAndNavigate}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            Punch In
          </H2>
        </Button>
      </ScrollView>
    </ContainerComponent>
  );
}
