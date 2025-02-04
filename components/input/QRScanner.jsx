import { useEffect, useState } from "react";
import ClickableCard1 from "../card/ClickableCard1";
import Icon from "react-native-vector-icons/Ionicons";
import { ICON_LARGE } from "../../styles";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

export default function QRScanner({ title, onScan }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [status, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (status === null) {
      requestPermission();
    }
  }, []);

  const handleQr = () => {
    setIsCameraOpen(true);
    setScanned(false);
  };

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      onScan(data);
      setTimeout(() => setIsCameraOpen(false), 1000); // Delay to close modal after scanning
    }
  };

  return (
    <>
      <ClickableCard1 title={title} onPress={handleQr}>
        <Icon name="qr-code-outline" size={ICON_LARGE} style={styles.icon} />
      </ClickableCard1>

      <Modal
        visible={isCameraOpen}
        animationType="slide"
        onRequestClose={() => setIsCameraOpen(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView
            facing="back"
            style={styles.camera}
            onBarcodeScanned={scanned ? () => {} : handleBarCodeScanned}
          />

          {/* Buttons Overlay */}
          <TouchableOpacity
            onPress={() => setIsCameraOpen(false)}
            style={styles.closeButton}
          >
            <Icon name="close" size={35} color="white" />
          </TouchableOpacity>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={styles.retakeButton}
            >
              <Icon
                name="refresh"
                size={35}
                color="white"
                accessibilityLabel="Retake"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Capture Button Pressed")}
              style={styles.shutterButton}
            >
              <View style={styles.innerShutter} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: -60,
    right: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    width: "100%",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  retakeButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
  },
  shutterButton: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  innerShutter: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 25,
  },
});
