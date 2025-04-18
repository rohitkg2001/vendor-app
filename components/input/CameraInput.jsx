import { useState, useEffect, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import moment from 'moment';
import { ICON_LARGE } from "../../styles";
import * as ImageManipulator from "expo-image-manipulator";



export default function CameraInput({
  isCameraOpen,
  setIsCameraOpen,
  isSurvey,
  handleSubmission,
  complete_pole_number = ""
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const viewRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false)
  const [progress] = useState(new Animated.Value(0));

  // Add this effect to animate the progress bar
  useEffect(() => {
    if (saving) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 1000, // Duration of save operation
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      progress.setValue(0); // Reset when done
    }
  }, [saving]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getLastKnownPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  useEffect(() => {
    if (photos.length === 5) {
      handleSubmission(photos);
    }
  }, [photos]);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const handleCapture = async () => {
    if (cameraRef.current && !saving) {
      try {
        setSaving(true);
        // 1. First capture the camera image
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(photo.uri);
        // 2. Wait a brief moment for state to update
        await new Promise(resolve => setTimeout(resolve, 800));

        // 3. Capture the composed view with overlay
        if (viewRef.current) {
          const resultUri = await captureRef(viewRef, {
            quality: 1,
          });


          // 4. Save to gallery
          await MediaLibrary.saveToLibraryAsync(resultUri);
          const compressedPhoto = await ImageManipulator.manipulateAsync(
            resultUri,
            [{ resize: { width: 1080, height: 1920 } }],
            {
              compress: 0.5,
              format: ImageManipulator.SaveFormat.PNG
            }
          );
          const compressedInfo = await FileSystem.getInfoAsync(compressedPhoto.uri);
          const compressedSizeMB = (compressedInfo.size / (1024 * 1024)).toFixed(
            2
          );
          console.log("Compressed image:");
          console.log("   URI:", compressedPhoto.uri);
          console.log("   Size:", compressedSizeMB, "MB");
          const photoData = {
            uri: compressedPhoto.uri,
            lat: location.coords?.latitude,
            long: location.coords?.longitude,
            timestamp: new Date().toLocaleTimeString(),
          };

          setPhotos((prev) => [photoData, ...prev].slice(0, 5));

          // 5. Reset for next capture
          setCapturedPhoto(null);
        }
      } catch (error) {
        console.error('Error capturing image:', error);
      } finally {
        setSaving(false);
      }
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

  if (!permission) {
    return <View><Text>Requesting permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need camera permission</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal visible={isCameraOpen} animationType="slide">
      <View style={styles.cameraContainer}>
        {saving && (
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                }
              ]}
            />
          </View>
        )}
        {capturedPhoto ? (
          <View ref={viewRef} collapsable={false} style={styles.previewContainer}>
            <View style={[styles.topOverlay, { top: 120, right: 120 }]}>
              <Image source={require('../../assets/icon.png')} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
            </View>
            <Image source={{ uri: capturedPhoto }} style={styles.capturedImage} />
            <View style={[styles.overlay, { bottom: 40 }]}>
              <Text style={styles.overlayText}>
                {moment().format('DD MMM YYYY HH:mm:ss a')}
              </Text>
              <Text style={styles.overlayText}>
                {`${location?.coords.latitude?.toFixed(4) || 'N/A'}N`} {`${location?.coords.longitude?.toFixed(4) || 'N/A'}E`}
              </Text>
              <Text style={styles.overlayText}>
                {`Alt: ${location?.coords.altitude ? location.coords.altitude.toFixed(0) + 'm' : 'N/A'}`}
              </Text>
              <Text style={styles.overlayText}>
                {complete_pole_number || ""}
              </Text>
            </View>
          </View>
        ) : (

          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
          >
            <View style={styles.topOverlay}>
              <Image source={require('../../assets/icon.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
            </View>
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                {moment().format('DD MMM YYYY HH:mm:ss a')}
              </Text>
              <Text style={styles.overlayText}>
                {`${location?.coords.latitude?.toFixed(4) || 'N/A'}N`} {`${location?.coords.longitude?.toFixed(4) || 'N/A'}E`}
              </Text>
              <Text style={styles.overlayText}>
                {`Alt: ${location?.coords.altitude ? location.coords.altitude.toFixed(0) + 'm' : 'N/A'}`}
              </Text>
              <Text style={styles.overlayText}>
                {complete_pole_number || ""}
              </Text>
              <Text style={{ fontSize: 10, color: "red" }}>
                Powered By Dashandots Technology
              </Text>
            </View>
          </CameraView>
        )}

        <TouchableOpacity
          onPress={() => setIsCameraOpen(false)}
          style={styles.closeButton}
        >
          <Icon name="close" size={35} color="white" />
        </TouchableOpacity>
        {
          !saving && (
            <View style={styles.controls}>
              <TouchableOpacity onPress={handleRetake} style={styles.retakeButton}>
                <Icon name="refresh" size={35} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCapture}
                style={styles.captureButton}
              >
                <View style={styles.captureButtonInner} />
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
          )
        }

        {/* Captured Photo Preview */}
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={styles.photoList}
          renderItem={({ item }) => (
            <View style={styles.photoItem}>
              <Image source={{ uri: item.uri }} style={styles.photo} />
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
    backgroundColor: "transparent",
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  capturedImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 180,
    right: 10,
    backgroundColor: `rgba(0,0,0,0.4)`,
    padding: 8,
    borderRadius: 4
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
  },

  controls: {
    position: "absolute",
    width: "100%",
    bottom: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },

  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
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
  // Add this style to your stylesheet:
  progressBar: {
    height: 4,
    width: 60,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)', // Matching your green color
    borderRadius: 2,
  },
});
