import React, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { styles, spacing, typography, SCREEN_WIDTH, layouts } from "../styles";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { H2 } from "../components/text";
import { punchIn } from "../redux/actions";
import moment from "moment";
import CameraComponent from "../components/CameraComponent";

export default function AttendancePunchScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  // Request location permission and fetch location
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  useEffect(() => {
    if (location) {
      setMarkerLocation(location);
    }
  }, [location]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleTakePicture = (uri) => {
    setPhotoUri(uri);
  };

  const takePictureAndNavigate = () => {
    if (!location || !photoUri) return;
    punchIn(photoUri, location, moment().format("DD-MM-YYYY HH:mm:ss A"));
    navigation.navigate("homeScreen");
  };

  return (
    <ContainerComponent>
      <MyHeader title="Record Your Face" />
      <ScrollView
        style={{ flex: 1, width: SCREEN_WIDTH - 20 }}
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
      >
        <View style={layouts.center}>
          <CameraComponent
            photoUri={photoUri}
            setPhotoUri={setPhotoUri}
            onTakePicture={handleTakePicture}
          />
        </View>

        {markerLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: markerLocation.latitude,
              longitude: markerLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={markerLocation} title="Your Location" />
          </MapView>
        ) : (
          <Text>Fetching location...</Text>
        )}
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
