import React, { useState } from "react";
import { View } from "react-native";
import { spacing } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import QRScanner from "../components/input/QRScanner";

const SubmitInstallationScreen = () => {
  const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [batterySerialNumber, setBatterySerialNumber] = useState("");
  const [panelSerialNumber, setPanelSerialNumber] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [locationRemarks, setLocationRemarks] = useState("");

  return (
    <View style={spacing.mv2}>
      {/* Luminary QR and Serial Number */}
      <View style={[spacing.pv2, { backgroundColor: "#f0f0f0" }]}>
        <QRScanner title="Scan Luminary QR" onScan={setLuminarySerialNumber} />
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
      <View style={[spacing.mv2, spacing.pv2, { backgroundColor: "#f0f0f0" }]}>
        <QRScanner title="Scan Battery QR" onScan={setBatterySerialNumber} />
        <MyTextInput
          placeholder="Enter Battery Serial Number"
          value={batterySerialNumber}
          onChangeText={setBatterySerialNumber}
          keyboardType="numeric"
        />
      </View>

      {/* Panel QR and Serial Number */}
      <View style={[spacing.mv2, spacing.pv2, { backgroundColor: "#f0f0f0" }]}>
        <QRScanner title="Scan Panel QR" onScan={setPanelSerialNumber} />
        <MyTextInput
          placeholder="Enter Panel Serial Number"
          value={panelSerialNumber}
          onChangeText={setPanelSerialNumber}
          keyboardType="numeric"
        />
      </View>

      {/* Beneficiary and Contact Details */}
      <MyTextInput
        placeholder="Beneficiary Name"
        value={beneficiaryName}
        onChangeText={setBeneficiaryName}
      />
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
      <MyTextInput
        placeholder="Enter Location Remarks"
        value={locationRemarks}
        onChangeText={setLocationRemarks}
        multiline
        numberOfLines={4}
      />
    </View>
  );
};

export default SubmitInstallationScreen;
