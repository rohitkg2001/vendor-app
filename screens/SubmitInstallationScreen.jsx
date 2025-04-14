import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LIGHT, spacing, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import QRScanner from "../components/input/QRScanner";
import CameraInput from "../components/input/CameraInput";
import { P } from "../components/text";
import { SCREEN_WIDTH, styles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { submitStreetlightTasks } from "../redux/actions/taskActions";
import * as DocumentPicker from "expo-document-picker";

const SubmitInstallationScreen = ({ navigation }) => {
  const route = useRoute();
  const { data } = route.params || {}; // Fetch data from route params

  const { complete_pole_number, pole } = data || {}; // Ensure data is present

  // Log the data to ensure it is passed correctly
  useEffect(() => {
    console.log("Received data:", data); // Debugging step
  }, [data]);

  if (!data) {
    console.error("No data received from previous screen!");
    return null; // Or render an error message if the data is missing
  }

  // State for serial numbers and validation
  const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [batterySerialNumber, setBatterySerialNumber] = useState("");
  const [panelSerialNumber, setPanelSerialNumber] = useState("");
  const [luminaryValid, setLuminaryValid] = useState(false);
  const [batteryValid, setBatteryValid] = useState(false);
  const [panelValid, setPanelValid] = useState(false);
  const [beneficiary, setbeneficiary] = useState(pole.beneficiary);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [luminaryError, setLuminaryError] = useState(false); // CHANGED
  const [batteryError, setBatteryError] = useState(false); // CHANGED
  const [panelError, setPanelError] = useState(false); // CHANGED

  const [contactNumber, setContactNumber] = useState(
    pole.beneficiary_contact || ""
  ); // Use contact from pole data
  const [locationRemarks, setLocationRemarks] = useState(pole.remarks || ""); // Use remarks from pole data

  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.inventory);

  // Check if a serial number exists in the inventory
  const isSerialNumberInStock = (serialNumber) => {
    if (!inventory || !inventory.in_stock) {
      console.warn("Inventory or in_stock data is not available yet.");
      return false;
    }

    // Loop through the inventory items and check if the serial number exists in the serial_number array
    return inventory.in_stock?.some(
      (item) => item.serial_number && item.serial_number.includes(serialNumber)
    );
  };

  // Handle QR scan for Luminary
  const handleLuminaryQR = (val) => {
    const luminarySerial = val.split(";")[0]?.toString() || "";


    if (isSerialNumberInStock(luminarySerial)) {
      setLuminarySerialNumber(luminarySerial);
      setSimNumber(val.split(";")[1].toString());
      setLuminaryValid(true);
      setLuminaryError(false); // CHANGED
    } else {
      setLuminaryValid(false);
      setLuminaryError(true); // CHANGED
      // Alert removed here // CHANGED
    }
  };

  // Handle QR scan for Battery
  const handleBatteryQR = (val) => {
    const batterySerial = val.split(";")[0]?.toString() || "";
    // if (isSerialNumberInStock(batterySerial)) {
    //   setBatterySerialNumber(batterySerial);
    //   setBatteryValid(true);
    // } else {
    //   setBatteryValid(false);
    //   Alert.alert(
    //     "Invalid Serial Number",
    //     "This Battery serial number is not valid."
    //   );
    // }

    if (isSerialNumberInStock(batterySerial)) {
      setBatterySerialNumber(batterySerial);
      setBatteryValid(true);
      setBatteryError(false); // CHANGED
    } else {
      setBatteryValid(false);
      setBatteryError(true); // CHANGED
      // Alert removed here // CHANGED
    }
  };

  // Handle QR scan for Panel
  const handlePanelQR = (val) => {
    const panelSerial = val.split(";")[0]?.toString() || "";
    // if (isSerialNumberInStock(panelSerial)) {
    //   setPanelSerialNumber(panelSerial);
    //   setPanelValid(true);
    // } else {
    //   setPanelValid(false);
    //   Alert.alert(
    //     "Invalid Serial Number",
    //     "This Panel serial number is not valid."
    //   );
    // }

    if (isSerialNumberInStock(panelSerial)) {
      setPanelSerialNumber(panelSerial);
      setPanelValid(true);
      setPanelError(false); // CHANGED
    } else {
      setPanelValid(false);
      setPanelError(true); // CHANGED
      // Alert removed here // CHANGED
    }
  };

  // Handle manual input for serial numbers
  const handleManualInput = (value, type) => {
    const serialNumber = value.trim(); // Clean up input
    // if (isSerialNumberInStock(serialNumber)) {
    //   if (type === "luminary") {
    //     setLuminarySerialNumber(serialNumber);
    //     setLuminaryValid(true);
    //   }
    //   if (type === "battery") {
    //     setBatterySerialNumber(serialNumber);
    //     setBatteryValid(true);
    //   }
    //   if (type === "panel") {
    //     setPanelSerialNumber(serialNumber);
    //     setPanelValid(true);
    //   }
    // } else {
    //   setLuminaryValid(false);
    //   setBatteryValid(false);
    //   setPanelValid(false);
    //   Alert.alert("Invalid Serial Number", "This serial number is not valid.");
    // }

    if (isSerialNumberInStock(serialNumber)) {
      if (type === "luminary") {
        setLuminarySerialNumber(serialNumber);
        setLuminaryValid(true);
        setLuminaryError(false); // CHANGED
      }
      if (type === "battery") {
        setBatterySerialNumber(serialNumber);
        setBatteryValid(true);
        setBatteryError(false); // CHANGED
      }
      if (type === "panel") {
        setPanelSerialNumber(serialNumber);
        setPanelValid(true);
        setPanelError(false); // CHANGED
      }
    } else {
      if (type === "luminary") {
        setLuminaryValid(false);
        setLuminaryError(true); // CHANGED
      }
      if (type === "battery") {
        setBatteryValid(false);
        setBatteryError(true); // CHANGED
      }
      if (type === "panel") {
        setPanelValid(false);
        setPanelError(true); // CHANGED
      }
      // Alert removed here // CHANGED
    }
  };

  // Handle Take Photo button click
  const handleTakePhoto = () => {
    if (!luminaryValid || !batteryValid || !panelValid) {
      Alert.alert(
        "Invalid Data",
        "Please ensure all serial numbers are valid before taking a photo."
      );
      return; // Prevent opening camera if serial numbers are not valid
    }
    if (!simNumber || simNumber.trim() === "") {
      Alert.alert(
        "Missing SIM Number",
        "SIM number is required before taking a photo."
      );
      return;
    }
    setIsCameraVisible(true);
  };

  // TO UPLOAD FROM GALLERY
  const handleUploadFromGallery = async () => {
    // Check for all validations before proceeding
    if (!luminaryValid || !batteryValid || !panelValid) {
      Alert.alert(
        "Invalid Data",
        "Please ensure all serial numbers are valid before uploading."
      );
      return; // Block upload if invalid serials
    }

    if (!simNumber || simNumber.trim() === "") {
      Alert.alert("Missing SIM Number", "SIM number is required.");
      return;
    }

    if (!beneficiary || beneficiary.trim() === "") {
      Alert.alert("Missing Beneficiary", "Please enter beneficiary name.");
      return;
    }

    if (!contactNumber || contactNumber.trim().length !== 10) {
      Alert.alert(
        "Invalid Contact",
        "Please enter a valid 10-digit contact number."
      );
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const imageObj = [
        {
          uri: selectedImage.uri,
          lat: pole?.latitude || 0,
          long: pole?.longitude || 0,
          name: selectedImage.name || "uploaded_image.jpg",
          type: selectedImage.mimeType || "image/jpeg",
        },
      ];

      console.log("Gallery image selected:", imageObj);
      await handleSubmission(imageObj);
    }
  };

  // Handle form submission
  const handleSubmission = async (image) => {
    const submissionData = {
      task_id: pole.task_id,
      complete_pole_number,
      luminary_qr: luminarySerialNumber,
      battery_qr: batterySerialNumber,
      panel_qr: panelSerialNumber,
      sim_number: simNumber,
      submission_image: image,
      lat: image[0].lat,
      lng: image[0].long,
      isSurvey: false,
    };
    console.log("Submitting data:", submissionData);
    const result = await dispatch(submitStreetlightTasks(submissionData));
    if (result == 200) {
      navigation.navigate("successScreen", {
        message: "Your task uploaded successfully",
        nextScreen: "streetLightPendingTask",
      });
    }
    setIsCameraVisible(false);
  };

  return (
    <ScrollView style={spacing.mv2} keyboardShouldPersistTaps="handled">
      <View style={{ marginLeft: 8 }}>
        <View>
          <View style={[styles.row, { alignItems: "center" }]}>
            <P style={[typography.font14]}>Panchayat:</P>
            <P style={[typography.font14, { right: 10 }]}>{data.panchayat}</P>
          </View>

          <View style={[styles.row, { alignItems: "center" }]}>
            <P style={[typography.font14]}>Block:</P>
            <P style={[typography.font14, { right: 10 }]}>{data.block}</P>
          </View>
        </View>

        <MyTextInput
          placeholder="Complete Pole Number"
          value={complete_pole_number}
          editable={false}
          style={{ backgroundColor: "#5D92F4", color: LIGHT }}
        />

        {/* Luminary QR and Serial Number */}
        <View style={[spacing.pv2, { backgroundColor: "#f0f0f0" }]}>
          <QRScanner
            title="Scan Luminary QR"
            onScan={handleLuminaryQR}
            disabled={!luminaryValid} // Disable QR scanner if serial number is not valid
          />
          {/* <MyTextInput
            title="Luminary Serial Number"
            placeholder="Enter Luminary Serial Number"
            value={luminarySerialNumber}
            onChangeText={(text) => handleManualInput(text, "luminary")}
            keyboardType="numeric"
            editable={true} // Disable input if serial number is not valid
          /> */}

          <MyTextInput
            title="Luminary Serial Number"
            placeholder="Enter Luminary Serial Number"
            value={luminarySerialNumber}
            onChangeText={(text) => handleManualInput(text, "luminary")}
            keyboardType="numeric"
            editable={true}
            style={{
              borderColor: luminaryError ? "red" : "#ccc", // CHANGED
              borderWidth: 1, // CHANGED
            }}
          />
          {luminaryError && (
            <P style={{ color: "red", marginLeft: 5, bottom: 10 }}>
              Get correct luminary serial number
            </P> // CHANGED
          )}

          <MyTextInput
            title="SIM NUMBER"
            placeholder="Enter SIM Number"
            value={simNumber}
            onChangeText={setSimNumber}
            keyboardType="numeric"
            editable={true}
          />
        </View>

        {/* Battery QR and Serial Number */}
        <View
          style={[spacing.mv2, spacing.pv2, { backgroundColor: "#f0f0f0" }]}
        >
          <QRScanner
            title="Scan Battery QR"
            onScan={handleBatteryQR}
            disabled={!batteryValid} // Disable QR scanner if serial number is not valid
          />
          {/* <MyTextInput
            title="Battery Serial Number"
            placeholder="Enter Battery Serial Number"
            value={batterySerialNumber}
            onChangeText={(text) => handleManualInput(text, "battery")}
            keyboardType="numeric"
            editable={true} // Disable input if serial number is not valid
          /> */}
          <MyTextInput
            title="Battery Serial Number"
            placeholder="Enter Battery Serial Number"
            value={batterySerialNumber}
            onChangeText={(text) => handleManualInput(text, "battery")}
            keyboardType="numeric"
            editable={true}
            style={{
              borderColor: batteryError ? "red" : "#ccc", // CHANGED
              borderWidth: 1, // CHANGED
            }}
          />
          {batteryError && (
            <P style={{ color: "red", marginLeft: 5, bottom: 10 }}>
              Get correct battery serial number
            </P> // CHANGED
          )}
        </View>

        {/* Panel QR and Serial Number */}
        <View
          style={[spacing.mv2, spacing.pv2, { backgroundColor: "#f0f0f0" }]}
        >
          <QRScanner
            title="Scan Panel QR"
            onScan={handlePanelQR}
            disabled={!panelValid} // Disable QR scanner if serial number is not valid
          />
          {/* <MyTextInput
            title="Panel Serial Number"
            placeholder="Enter Panel Serial Number"
            value={panelSerialNumber}
            onChangeText={(text) => handleManualInput(text, "panel")}
            keyboardType="numeric"
            editable={true} // Disable input if serial number is not valid
          /> */}
          <MyTextInput
            title="Panel Serial Number"
            placeholder="Enter Panel Serial Number"
            value={panelSerialNumber}
            onChangeText={(text) => handleManualInput(text, "panel")}
            keyboardType="numeric"
            editable={true}
            style={{
              borderColor: panelError ? "red" : "#ccc", // CHANGED
              borderWidth: 1, // CHANGED
            }}
          />
          {panelError && (
            <P style={{ color: "red", marginLeft: 5, bottom: 10 }}>
              Get correct panel serial number
            </P> // CHANGED
          )}
        </View>

        {/* Beneficiary and Contact Details */}
        <MyTextInput
          title="Beneficiary Name"
          placeholder="Beneficiary Name"
          value={beneficiary}
          onChangeText={(val) => setbeneficiary(val)}
        />
        <MyTextInput
          title="Contact Number"
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={(text) => {
            const filteredText = text.replace(/[^0-9]/g, "");
            if (filteredText.length <= 10) {
              setContactNumber(filteredText);
            }
          }}
          keyboardType="numeric"
        />
        <MyTextInput
          title="Location Remarks"
          placeholder="Enter Location Remarks"
          value={locationRemarks}
          onChangeText={setLocationRemarks}
          multiline
          numberOfLines={4}
        />

        {/* Network Availability */}
        <View
          style={[
            spacing.m2,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 4,
            },
          ]}
        >
          <P style={[typography.font14, typography.textBold]}>
            Network Availability (Airtel)
          </P>
          <View
            style={[
              spacing.p1,
              spacing.ph2,
              spacing.br2,
              {
                backgroundColor: pole.isNetworkAvailable
                  ? "#d4edda"
                  : "#f8d7da",
              },
            ]}
          >
            <P
              style={[
                typography.font12,
                typography.textBold,
                { color: pole.isNetworkAvailable ? "green" : "red" },
              ]}
            >
              {pole.isNetworkAvailable ? "Available" : "Not Available"}
            </P>
          </View>
        </View>

        {/* Take Photo Button */}
        <TouchableOpacity
          style={[
            spacing.p4,
            spacing.br1,
            spacing.mb1,
            styles.bgPrimary,
            { width: SCREEN_WIDTH - 16, alignItems: "center" },
          ]}
          onPress={handleTakePhoto}
        >
          <P
            style={[
              typography.font18,
              typography.textBold,
              typography.textLight,
            ]}
          >
            Take Photo
          </P>
        </TouchableOpacity>

        {/* UPLOAD FROM GALLERY */}
        <TouchableOpacity
          style={[
            spacing.p4,
            spacing.br1,
            spacing.mb2,
            styles.bgSecondary,
            { width: SCREEN_WIDTH - 16, alignItems: "center" },
          ]}
          onPress={handleUploadFromGallery}
        >
          <P
            style={[
              typography.font18,
              typography.textBold,
              typography.textLight,
            ]}
          >
            Upload From Gallery
          </P>
        </TouchableOpacity>

        {/* Camera Input */}
        <CameraInput
          isCameraOpen={isCameraVisible}
          setIsCameraOpen={setIsCameraVisible}
          handleImageCapture={(image) => console.log(image)}
          handleSubmission={handleSubmission}
        />
      </View>
    </ScrollView>
  );
};

export default SubmitInstallationScreen;
