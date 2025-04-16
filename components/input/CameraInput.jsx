import { useState, useEffect, useRef } from "react";
import { CameraView } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import Marker, { TextBackgroundType } from "react-native-image-marker";

import { ICON_LARGE } from "../../styles";
// import * as ImageManipulator from 'expo-image-manipulator';

export default function CameraInput({
  isCameraOpen,
  setIsCameraOpen,
  isSurvey,
  handleSubmission,
}) {
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      }
    })();

    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (photos.length === 5) {
      handleSubmission(photos);
    }
  }, [photos]);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  // const handleCapture = async () => {
  //   if (cameraRef.current && isCameraReady && location) {
  //     try {
  //       const photo = await cameraRef.current.takePictureAsync({
  //         quality: 0.8,
  //         skipProcessing: true,
  //       });
  //      // console.log(photo);
  //        console.log("Original size:", photo.uri);

  //       // Step 1: Compress photo (resize + compress to reduce size <1MB)
  //       const compressedPhoto = await ImageManipulator.manipulateAsync(
  //         photo.uri,
  //         [{ resize: { width: 1080 } }], // resize if needed
  //         {
  //           compress: 0.7, // 0-1 range (0.7 usually gives <1MB)
  //           format: ImageManipulator.SaveFormat.JPEG,
  //         }
  //       );

  //       console.log("Compressed size:", compressedPhoto.uri);
  //       const markedPhotoUri = await addWatermark(photo.uri);

  //       const photoData = {
  //         uri: markedPhotoUri,
  //         lat: location.latitude,
  //         long: location.longitude,
  //         timestamp: new Date().toLocaleTimeString(),
  //       };

  //       setPhotos((prev) => [photoData, ...prev].slice(0, 5));
  //     } catch (err) {
  //       console.error("Error capturing or watermarking photo:", err);
  //     }
  //   }
  // };

  const handleCapture = async () => {
    if (cameraRef.current && isCameraReady && location) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: true,
        });

        // Get original file size
        const originalInfo = await FileSystem.getInfoAsync(photo.uri);
        const originalSizeMB = (originalInfo.size / (1024 * 1024)).toFixed(2);
        console.log("Original image:");
        console.log("   URI:", photo.uri);
        console.log("   Size:", originalSizeMB, "MB");

        // Step 1: Compress photo
        const compressedPhoto = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 1080 } }],
          {
            compress: 0.7,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        // Get compressed file size
        const compressedInfo = await FileSystem.getInfoAsync(
          compressedPhoto.uri
        );
        const compressedSizeMB = (compressedInfo.size / (1024 * 1024)).toFixed(
          2
        );
        console.log("Compressed image:");
        console.log("   URI:", compressedPhoto.uri);
        console.log("   Size:", compressedSizeMB, "MB");

        // Step 2: Add watermark on compressed image
        const markedPhotoUri = await addWatermark(compressedPhoto.uri);

        const photoData = {
          uri: markedPhotoUri,
          lat: location.latitude,
          long: location.longitude,
          timestamp: new Date().toLocaleTimeString(),
        };

        setPhotos((prev) => [photoData, ...prev].slice(0, 5));
      } catch (err) {
        console.error("Error capturing or watermarking photo:", err);
      }
    }
  };

  const addWatermark = async (imagePath) => {
    try {
      const watermarkText = `Dashnadots Technology\n📍 ${location.latitude.toFixed(
        4
      )}, ${location.longitude.toFixed(4)} ${new Date().toLocaleTimeString()}`;

      const markedImagePath = await Marker.markText({
        backgroundImage: {
          src: imagePath,
        },
        watermarkTexts: [
          {
            text: "hello",
            position: { x: 20, y: 20 },
          },
        ],
      });

      return markedImagePath;
    } catch (error) {
      console.error("Watermarking or compression failed:", error);
      return imagePath;
    }
  };

  const handleRetake = () => {
    setPhotos([]);
  };

  const handleSubmitConfirmation = () => {
    Alert.alert("Confirm Submission", "Are you sure you want to submit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Submit",
        onPress: () => {
          handleSubmission(photos);
          setIsCameraOpen(false);
        },
      },
    ]);
  };

  return (
    <Modal visible={isCameraOpen} animationType="slide">
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          facing="back"
          style={styles.camera}
          onCameraReady={handleCameraReady}
        />

        {/* Live On-Screen Watermark */}
        <View style={styles.watermark}>
          <Text style={styles.watermarkText}>
            Powered by Dashnadots Technology
          </Text>
          <Text style={styles.watermarkText}>
            📍 {location?.latitude?.toFixed(4)},{" "}
            {location?.longitude?.toFixed(4)}
          </Text>
          <Text style={styles.watermarkText}>⏰ {timestamp}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsCameraOpen(false)}
          style={styles.closeButton}
        >
          <Icon name="close" size={35} color="white" />
        </TouchableOpacity>

        <View style={styles.controls}>
          <TouchableOpacity onPress={handleRetake} style={styles.retakeButton}>
            <Icon name="refresh" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCapture}
            style={styles.shutterButton}
          >
            <View style={styles.innerShutter} />
          </TouchableOpacity>

          {!isSurvey && photos.length >= 2 && (
            <TouchableOpacity
              onPress={handleSubmitConfirmation}
              style={styles.retakeButton}
            >
              <Icon name="arrow-forward" size={ICON_LARGE} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Captured Photo Preview */}
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={styles.photoList}
          renderItem={({ item }) => (
            <View style={styles.photoItem}>
              <Image source={{ uri: item.uri }} style={styles.photo} />
              <Text style={styles.photoText}>
                {item.lat.toFixed(4)}, {item.long.toFixed(4)}
              </Text>
              <Text style={styles.photoText}>{item.timestamp}</Text>
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  watermark: {
    position: "absolute",
    bottom: 220,
    right: 20,
  },
  watermarkText: {
    color: "white",
    fontSize: 12,
  },
  controls: {
    position: "absolute",
    width: "100%",
    bottom: 140,
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
  photoList: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
  },
  photoItem: {
    marginHorizontal: 5,
    alignItems: "flex-start",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  photoText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});
