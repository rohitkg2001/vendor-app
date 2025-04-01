import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute
import { Checkbox } from "react-native-paper";
import { LIGHT, spacing, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import QRScanner from "../components/input/QRScanner";
import CameraInput from "../components/input/CameraInput";
import { P } from "../components/text";
import { SCREEN_WIDTH, styles } from "../styles";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { submitStreetlightTasks } from "../redux/actions/taskActions";

const SubmitInstallationScreen = () => {
  const route = useRoute(); // Get route params using useRoute hook
  const [networkAvailable, setNetworkAvailable] = useState(false);
  const { data } = route.params || {}; // Safely access 'data' passed from the previous screen

  // Log the data coming from the previous screen to make sure it's passed correctly
  useEffect(() => {
    console.log("Received data:", data); // Debugging step to check if the data is correct
  }, [data]);

  // Check if 'data' exists, otherwise return null or an error message
  if (!data) {
    console.error("No data received from previous screen!");
    return null; // Or render an error message
  }

  const {
    beneficiaryName,
    locationRemarks,
    complete_pole_number,
    panchayat,
    block,
    // pole_number,
    ward,
  } = data; // Destructure the data passed

  // Use state only if you need to modify the values, otherwise, directly use data from route.params
  const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [batterySerialNumber, setBatterySerialNumber] = useState("");
  const [panelSerialNumber, setPanelSerialNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const handleTakePhoto = () => {
    setIsCameraVisible(true);
  };

  const handleLuminaryQR = (val) => {
    const values = val.split(";");
    setLuminarySerialNumber(values[0]?.toString() || "");
    setSimNumber(values[1]?.toString() || "");
  };

  // const handleSubmission = (image) => {
  //   console.log("Captured Image:", image);
  //   setIsCameraVisible(false); // Close the camera after capturing an image
  // };

  const dispatch = useDispatch();

  const handleSubmission = (image) => {
    console.log("Captured Image:", image);
    const submissionData = {
      beneficiaryName,
      locationRemarks,
      complete_pole_number,
      panchayat,
      block,
      ward,
      luminarySerialNumber,
      simNumber,
      batterySerialNumber,
      panelSerialNumber,
      contactNumber,
      networkAvailable,
      capturedImage: image,
    };

    dispatch(submitStreetlightTasks(submissionData));
    console.log("Submitting Data:", submissionData);
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
          {/* <P style={[typography.font14]}>{data.pole_number}</P> */}
          {/* <P style={[typography.font14]}>{data.ward}</P> */}
        </View>

        <MyTextInput
          placeholder="Complete Pole Number"
          value={complete_pole_number}
          editable={false}
          style={{ backgroundColor: "#5D92F4", color: LIGHT }}
        />

        {/* Luminary QR and Serial Number */}
        <View style={[spacing.pv2, { backgroundColor: "#f0f0f0" }]}>
          <QRScanner title="Scan Luminary QR" onScan={handleLuminaryQR} />
          <MyTextInput
            placeholder="Enter Luminary Serial Number"
            value={luminarySerialNumber}
            onChangeText={setLuminarySerialNumber}
            keyboardType="numeric"
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
          <QRScanner title="Scan Battery QR" onScan={setBatterySerialNumber} />
          <MyTextInput
            placeholder="Enter Battery Serial Number"
            value={batterySerialNumber}
            onChangeText={setBatterySerialNumber}
            keyboardType="numeric"
          />
        </View>

        {/* Panel QR and Serial Number */}
        <View
          style={[spacing.mv2, spacing.pv2, { backgroundColor: "#f0f0f0" }]}
        >
          <QRScanner title="Scan Panel QR" onScan={setPanelSerialNumber} />
          <MyTextInput
            placeholder="Enter Panel Serial Number"
            value={panelSerialNumber}
            onChangeText={setPanelSerialNumber}
            keyboardType="numeric"
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5,
            marginBottom: -16,
          }}
        >
          Beneficiary Name
        </Text>
        {/* Beneficiary and Contact Details */}

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5,
            marginBottom: -16,
          }}
        >
          Beneficiary Name
        </Text>
        <MyTextInput
          placeholder="Beneficiary Name"
          value={beneficiaryName} // Directly use beneficiaryName from data
          onChangeText={(text) => console.log("Beneficiary changed:", text)} // Example change handler
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5,
            marginBottom: -16,
          }}
        >
          Contact Number
        </Text>
        <MyTextInput
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
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5,
            marginBottom: -16,
          }}
        >
          Location Remarks
        </Text>
        <MyTextInput
          placeholder="Enter Location Remarks"
          value={locationRemarks} // Directly use locationRemarks from data
          onChangeText={(text) => console.log("Remarks changed:", text)} // Example change handler
          multiline
          numberOfLines={4}
        />

        <View
          style={[spacing.mv3, { flexDirection: "row", alignItems: "center" }]}
        >
          {/* <Checkbox
            status={networkAvailable ? "checked" : "unchecked"}
            onPress={() => setNetworkAvailable((prev) => !prev)}
            color="#76885B"
          /> */}
          <TouchableOpacity
          // onPress={() => setNetworkAvailable((prev) => !prev)}
          >
            <P style={[typography.font18, typography.textBold]}>
              Network Availability (Airtel)
            </P>
          </TouchableOpacity>
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
