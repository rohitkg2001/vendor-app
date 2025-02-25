// import { useEffect, useState } from "react";
// //import * as Notifications from "expo-notifications";
// import * as Location from "expo-location";
// import { Camera } from "expo-camera";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function usePermissions() {
//   const [permissions, setPermissions] = useState({
//     push: false,
//     camera: false,
//     location: false,
//   });
//   const [permissionsLoading, setPermissionsLoading] = useState(true); // NEW: Track permission loading

//   useEffect(() => {
//     checkAndRequestPermissions();
//   }, []);

//   async function checkAndRequestPermissions() {
//     setPermissionsLoading(true); // Start loading
//     const storedPermissions = await AsyncStorage.getItem("permissions");
//     console.log("Checking Permissions");
//     if (storedPermissions) {
//       console.log("Permissions in the mind");
//       setPermissions(JSON.parse(storedPermissions));
//       setPermissionsLoading(false);
//       return;
//     }

//     let camera = await requestCameraPermission();
//     let location = await requestLocationPermission();
//     let push = await requestPushNotificationPermission();

//     const newPermissions = { push, camera, location };
//     console.log(`New Permissions found ${push} ${camera} ${location}`);
//     await AsyncStorage.setItem("permissions", JSON.stringify(newPermissions));
//     setPermissions(newPermissions);
//     setPermissionsLoading(false); // Done loading
//   }

//   async function requestPushNotificationPermission() {
//     console.log("Running permission checks for notification");
//     const { status } = await Notifications.getPermissionsAsync();
//     if (status !== "granted") {
//       const { status: newStatus } =
//         await Notifications.requestPermissionsAsync();
//       status = newStatus;
//       return false;
//     }
//     return true;
//   }

//   async function requestCameraPermission() {
//     console.log("Running permission checks for camera");
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       return false;
//     }
//     return true;
//   }

//   async function requestLocationPermission() {
//     console.log("Running Permission checks for location");
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       return false;
//     }
//     return true;
//   }

//   return { permissions }; // NEW: Expose loading state
// }

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
      console.log("Checking Permissions");
      if (storedPermissions) {
        console.log("Loaded stored permissions");
        setPermissions(JSON.parse(storedPermissions));
      } else {
        let camera = await requestCameraPermission();
        let location = await requestLocationPermission();
        let push = await requestPushNotificationPermission();

        const newPermissions = { push, camera, location };
        console.log(`New Permissions:`, newPermissions);

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
    console.log("Requesting camera permission");
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Camera permission error:", error);
      return false;
    }
  }

  async function requestLocationPermission() {
    console.log("Requesting location permission");
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
