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
import { getAllItems } from "../redux/actions/inventoryActions";

const SubmitInstallationScreen = ({ navigation }) => {
  const route = useRoute();
  const { data } = route.params || {}; // Fetch data from route params

  const { complete_pole_number, panchayat, block, ward, pole } = data || {}; // Ensure data is present

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
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [contactNumber, setContactNumber] = useState(
    pole.beneficiary_contact || ""
  ); // Use contact from pole data
  const [locationRemarks, setLocationRemarks] = useState(pole.remarks || ""); // Use remarks from pole data

  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.inventory);

  // Check if a serial number exists in the inventory
  const isSerialNumberValid = (serialNumber) => {
    if (!inventory || inventory.length === 0) {
      console.warn("Inventory is not available yet.");
      return false;
    }

    // Loop through the inventory items and check if the serial number exists in the serial_number array
    return inventory.some(
      (item) => item.serial_number && item.serial_number.includes(serialNumber)
    );
  };

  // Handle QR scan for Luminary
  const handleLuminaryQR = (val) => {
    const luminarySerial = val.split(";")[0]?.toString() || "";
    if (isSerialNumberValid(luminarySerial)) {
      setLuminarySerialNumber(luminarySerial);
      setSimNumber(val[1].toString());
      setLuminaryValid(true);
    } else {
      setLuminaryValid(false);
      Alert.alert(
        "Invalid Serial Number",
        "This Luminary serial number is not valid."
      );
    }
  };

  // Handle QR scan for Battery
  const handleBatteryQR = (val) => {
    const batterySerial = val.split(";")[0]?.toString() || "";
    if (isSerialNumberValid(batterySerial)) {
      setBatterySerialNumber(batterySerial);
      setBatteryValid(true);
    } else {
      setBatteryValid(false);
      Alert.alert(
        "Invalid Serial Number",
        "This Battery serial number is not valid."
      );
    }
  };

  // Handle QR scan for Panel
  const handlePanelQR = (val) => {
    const panelSerial = val.split(";")[0]?.toString() || "";
    if (isSerialNumberValid(panelSerial)) {
      setPanelSerialNumber(panelSerial);
      setPanelValid(true);
    } else {
      setPanelValid(false);
      Alert.alert(
        "Invalid Serial Number",
        "This Panel serial number is not valid."
      );
    }
  };

  // Handle manual input for serial numbers
  const handleManualInput = (value, type) => {
    const serialNumber = value.trim(); // Clean up input
    if (isSerialNumberValid(serialNumber)) {
      if (type === "luminary") {
        setLuminarySerialNumber(serialNumber);
        setLuminaryValid(true);
      }
      if (type === "battery") {
        setBatterySerialNumber(serialNumber);
        setBatteryValid(true);
      }
      if (type === "panel") {
        setPanelSerialNumber(serialNumber);
        setPanelValid(true);
      }
    } else {
      setLuminaryValid(false);
      setBatteryValid(false);
      setPanelValid(false);
      Alert.alert("Invalid Serial Number", "This serial number is not valid.");
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
    setIsCameraVisible(true);
  };

  // Handle form submission
  const handleSubmission = async (image) => {
    const submissionData = {
      task_id: pole.task_id,
      complete_pole_number,
      luminary_qr: luminarySerialNumber,
      battery_qr: batterySerialNumber,
      panel_qr: panelSerialNumber,
      submission_image: image,
      lat: image[0].lat,
      lng: image[0].long,
      isSurvey: false,
    };
    const result = await dispatch(submitStreetlightTasks(submissionData));
    if (result == 200) {
      navigation.navigate("successScreen", {
        message: "Your task uploaded successfully",
        nextScreen: "welcomeScreen",
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
          <MyTextInput
            title="Luminary Serial Number"
            placeholder="Enter Luminary Serial Number"
            value={luminarySerialNumber}
            onChangeText={(text) => handleManualInput(text, "luminary")}
            keyboardType="numeric"
            editable={true} // Disable input if serial number is not valid
          />
          <MyTextInput
            placeholder="Enter SIM Number"
            value={simNumber}
            onChangeText={setSimNumber}
            keyboardType="numeric"
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
          <MyTextInput
            title="Battery Serial Number"
            placeholder="Enter Battery Serial Number"
            value={batterySerialNumber}
            onChangeText={(text) => handleManualInput(text, "battery")}
            keyboardType="numeric"
            editable={true} // Disable input if serial number is not valid
          />
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
          <MyTextInput
            title="Panel Serial Number"
            placeholder="Enter Panel Serial Number"
            value={panelSerialNumber}
            onChangeText={(text) => handleManualInput(text, "panel")}
            keyboardType="numeric"
            editable={true} // Disable input if serial number is not valid
          />
        </View>

        {/* Beneficiary and Contact Details */}
        <MyTextInput
          title="Beneficiary Name"
          placeholder="Beneficiary Name"
          value={pole.beneficiary}
          editable={false} // Prevent editing beneficiary name
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
