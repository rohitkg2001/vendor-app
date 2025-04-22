import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function usePermissions() {
  const [permissions, setPermissions] = useState({
    push: false,
    camera: false,
    location: false,
  });
  const [permissionsLoading, setPermissionsLoading] = useState(true);

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  async function checkAndRequestPermissions() {
    setPermissionsLoading(true);
    try {
      const storedPermissions = await AsyncStorage.getItem("permissions");

      if (storedPermissions) {
        setPermissions(JSON.parse(storedPermissions));
      } else {
        let camera = await requestCameraPermission();
        let location = await requestLocationPermission();
        let push = await requestPushNotificationPermission();

        const newPermissions = { push, camera, location };

        await AsyncStorage.setItem(
          "permissions",
          JSON.stringify(newPermissions)
        );
        setPermissions(newPermissions);
      }
    } catch (error) {
      console.error("Permission check error:", error);
    } finally {
      setPermissionsLoading(false);
    }
  }

  async function requestPushNotificationPermission() {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        return newStatus === "granted";
      }
      return true;
    } catch (error) {
      console.error("Push notification permission error:", error);
      return false;
    }
  }

  async function requestCameraPermission() {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Camera permission error:", error);
      return false;
    }
  }

  async function requestLocationPermission() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Location permission error:", error);
      return false;
    }
  }

  return { permissions, permissionsLoading };
}
