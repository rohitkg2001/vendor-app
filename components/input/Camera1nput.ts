import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import moment from 'moment';

export default function CameraInput(props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState(null);
  const cameraRef = useRef(null);
  const viewRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [saving, setSaving] = useState(false);

  // Get location data
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getLastKnownPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const takePicture = async () => {
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
            format: 'jpg',
            quality: 0.9,
          });

          // 4. Save to gallery
          await MediaLibrary.saveToLibraryAsync(resultUri);

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
    <View style={styles.container}>
      {/* This will show either the live camera or captured photo */}
      {capturedPhoto ? (
        <View ref={viewRef} collapsable={false} style={styles.previewContainer}>
          <View style={styles.topOverlay}>
            <Image source={require('./assets/icon.png')} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
          </View>
          <Image source={{ uri: capturedPhoto }} style={styles.capturedImage} />
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
              {props.complete_pole_number || ""}
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
            <Image source={require('./assets/icon.png')} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
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
              {props.complete_pole_number || ""}
            </Text>
            <Text style={{ fontSize: 10, color: "red" }}>
              Powered By Dashandots Technology
            </Text>
          </View>
        </CameraView>
      )}

      {!capturedPhoto && (
        <TouchableOpacity
          onPress={takePicture}
          style={styles.captureButton}
          disabled={saving}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  overlay: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: "#7DC240",
    fontSize: 14,
    lineHeight: 18,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
});