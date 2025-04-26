import { useEffect, useState, useRef } from "react";
import ClickableCard1 from "../card/ClickableCard1";
import Icon from "react-native-vector-icons/Ionicons";
import {
  ICON_LARGE,
  LIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../../styles";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, TouchableOpacity, Modal } from "react-native";
import * as Location from "expo-location";
import { P, Span } from "../text";

export default function QRScanner({ title, onScan }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [status, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const cameraRef = useRef(null);
  const [photos, setPhotos] = useState([]);

  const CORNER_SIZE = 60;
  const BORDER_WIDTH = 8;

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
        <Icon
          name="qr-code-outline"
          size={ICON_LARGE}
          style={{ position: "absolute", top: 10, right: 10 }}
        />
      </ClickableCard1>

      <Modal
        visible={isCameraOpen}
        animationType="slide"
        onRequestClose={() => setIsCameraOpen(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <CameraView
            facing="back"
            style={{ flex: 1 }}
            onBarcodeScanned={scanned ? () => {} : handleBarCodeScanned}
          />

          <View
            style={{
              flex: 1,
              position: "absolute",
              top: 130,
              left: 40,
              width: SCREEN_WIDTH * 0.8,
              height: SCREEN_HEIGHT * 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Border Frame moved inside corners */}
            <View
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {/* Top Left Corner */}
              <View
                style={{
                  width: CORNER_SIZE,
                  height: CORNER_SIZE,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderWidth: BORDER_WIDTH,
                  borderColor: "red",
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  borderTopLeftRadius: 12,
                }}
              />
              {/* Top Right Corner */}
              <View
                style={{
                  width: CORNER_SIZE,
                  height: CORNER_SIZE,
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderWidth: BORDER_WIDTH,
                  borderColor: "orange",
                  borderLeftWidth: 0,
                  borderBottomWidth: 0,
                  borderTopRightRadius: 12,
                }}
              />
              {/* Bottom Left Corner */}
              <View
                style={{
                  width: CORNER_SIZE,
                  height: CORNER_SIZE,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  borderWidth: BORDER_WIDTH,
                  borderColor: "blue",
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  borderBottomLeftRadius: 12,
                }}
              />
              {/* Bottom Right Corner */}
              <View
                style={{
                  width: CORNER_SIZE,
                  height: CORNER_SIZE,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  borderWidth: BORDER_WIDTH,
                  borderColor: "green",
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderBottomRightRadius: 12,
                }}
              />

              <View
                style={{
                  flex: 1,
                  margin: BORDER_WIDTH + 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  borderWidth: 1,
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setIsCameraOpen(false)}
            style={{ position: "absolute", top: 20, left: 20 }}
          >
            <Icon name="close" size={35} color="white" />
          </TouchableOpacity>

          <View
            style={[
              styles.row,
              spacing.ph4,
              {
                bottom: 50,
                justifyContent: "space-around",
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={[
                spacing.p2,
                spacing.br5,
                {
                  backgroundColor: "rgba(0,0,0,0.6)",
                },
              ]}
            >
              <Icon
                name="refresh"
                size={35}
                color="white"
                accessibilityLabel="Retake"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCapture}
              style={[
                spacing.br6,
                spacing.bw1,
                {
                  width: 70,
                  height: 70,
                  backgroundColor: LIGHT,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <View
                style={[
                  spacing.br5,
                  {
                    width: 50,
                    height: 50,
                    backgroundColor: "red",
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={{ position: "absolute", bottom: 180, right: 20 }}>
            <P style={[typography.font12, { color: LIGHT }]}>
              Powered by Dashandots Technology
            </P>
            <Span style={[typography.font12, { color: LIGHT }]}>
              📍 {location?.latitude}, {location?.longitude}
            </Span>
            <Span style={[typography.font12, { color: LIGHT }]}>
              ⏰ {timestamp}
            </Span>
          </View>
        </View>
      </Modal>
    </>
  );
}
