import { useEffect, useState, useRef } from "react";
import ClickableCard1 from "../card/ClickableCard1";
import Icon from "react-native-vector-icons/Ionicons";
import { ICON_LARGE } from "../../styles";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function QRScanner({ title, onScan }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [status, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const cameraRef = useRef(null);
  const [photos, setPhotos] = useState([]);

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
      setTimeout(() => setIsCameraOpen(false), 1000);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation(loc.coords);
      }
    })();

    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current && location) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
      });

      const photoData = {
        uri: photo.uri,
        lat: location.latitude,
        long: location.longitude,
        timestamp: new Date().toLocaleTimeString(),
      };

      setPhotos((prev) => [photoData, ...prev].slice(0, 5));
      setTimestamp(photoData.timestamp);
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
          <View style={styles.scannerFrame} />
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
              // onPress={() => console.log("Capture Button Pressed")}
              onPress={handleCapture}
              style={styles.shutterButton}
            >
              <View style={styles.innerShutter} />
            </TouchableOpacity>
          </View>
          <View style={styles.watermark}>
            <Text style={styles.watermarkText}>
              Powered by Dashandots Technology
            </Text>
            <Text style={styles.watermarkText}>
              📍 {location?.latitude}, {location?.longitude}
            </Text>
            <Text style={styles.watermarkText}>⏰ {timestamp}</Text>
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

  watermark: {
    position: "absolute",
    bottom: 180,
    right: 20,
  },
  watermarkText: {
    color: "white",
    fontSize: 12,
  },
  scannerFrame: {
    position: "absolute",
    top: "30%",
    left: "15%",
    width: "70%",
    height: "30%",
    borderWidth: 3,
    borderColor: "green",
    borderRadius: 10,
  },
});
