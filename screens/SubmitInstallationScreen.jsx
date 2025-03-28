// import React, { useState } from "react";
// import { View, TouchableOpacity, ScrollView } from "react-native";
// import { spacing, typography } from "../styles"; // Ensure typography is imported
// import MyTextInput from "../components/input/MyTextInput";
// import QRScanner from "../components/input/QRScanner";
// import CameraInput from "../components/input/CameraInput";
// import { P } from "../components/text";
// import { SCREEN_WIDTH, styles } from "../styles";

// const SubmitInstallationScreen = () => {
//   const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
//   const [simNumber, setSimNumber] = useState("");
//   const [batterySerialNumber, setBatterySerialNumber] = useState("");
//   const [panelSerialNumber, setPanelSerialNumber] = useState("");
//   const [beneficiaryName, setBeneficiaryName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [locationRemarks, setLocationRemarks] = useState("");

//   const [isCameraVisible, setIsCameraVisible] = useState(false);

//   const handleTakePhoto = () => {
//     setIsCameraVisible(true);
//   };

//   const handleLuminaryQR = (val) => {
//     const values = val.split(";");
//     setLuminarySerialNumber(values[0].toString());
//     setSimNumber(values[1].toString());
//   };

//   // const handleSubmission = (image) => {
//   //   console.log("Captured Image:", image);
//   //   setIsCameraVisible(false);
//   // };

//   const handleSubmission = (image) => {
//     const payload = {
//       luminarySerialNumber,
//       simNumber,
//       batterySerialNumber,
//       panelSerialNumber,
//       beneficiaryName,
//       contactNumber,
//       locationRemarks,
//       capturedImage: image,
//     };

//     console.log("Submitting data:", payload);

//     setIsCameraVisible(false);

//     // submitData(payload);
//   };

//   return (
//     <ScrollView style={spacing.mv2} keyboardShouldPersistTaps="handled">
//       <View>
//         {/* Luminary QR and Serial Number */}
//         <View style={[spacing.pv2, { backgroundColor: "#f0f0f0" }]}>
//           <QRScanner
//             title="Scan Luminary QR"
//             onScan={(val) => handleLuminaryQR(val)}
//           />

//           <MyTextInput
//             placeholder="Enter Luminary Serial Number"
//             value={luminarySerialNumber}
//             onChangeText={setLuminarySerialNumber}
//             keyboardType="numeric"
//           />
//           <MyTextInput
//             placeholder="Enter SIM Number"
//             value={simNumber}
//             onChangeText={setSimNumber}
//             keyboardType="numeric"
//           />
//         </View>

//         {/* Battery QR and Serial Number */}
//         <View
//           style={[spacing.mv2, spacing.pv2, { backgroundColor: "#f0f0f0" }]}
//         >
//           <QRScanner title="Scan Battery QR" onScan={setBatterySerialNumber} />
//           <MyTextInput
//             placeholder="Enter Battery Serial Number"
//             value={batterySerialNumber}
//             onChangeText={setBatterySerialNumber}
//             keyboardType="numeric"
//           />
//         </View>

//         {/* Panel QR and Serial Number */}
//         <View
//           style={[spacing.mv2, spacing.pv2, { backgroundColor: "#f0f0f0" }]}
//         >
//           <QRScanner title="Scan Panel QR" onScan={setPanelSerialNumber} />
//           <MyTextInput
//             placeholder="Enter Panel Serial Number"
//             value={panelSerialNumber}
//             onChangeText={setPanelSerialNumber}
//             keyboardType="numeric"
//           />
//         </View>

//         {/* Beneficiary and Contact Details */}
//         <MyTextInput
//           placeholder="Beneficiary Name"
//           value={beneficiaryName}
//           onChangeText={setBeneficiaryName}
//         />
//         <MyTextInput
//           placeholder="Contact Number"
//           value={contactNumber}
//           onChangeText={(text) => {
//             const filteredText = text.replace(/[^0-9]/g, "");
//             if (filteredText.length <= 10) {
//               setContactNumber(filteredText);
//             }
//           }}
//           keyboardType="numeric"
//         />
//         <MyTextInput
//           placeholder="Enter Location Remarks"
//           value={locationRemarks}
//           onChangeText={setLocationRemarks}
//           multiline
//           numberOfLines={4}
//         />

//         {/* Take Photo Button */}
//         <TouchableOpacity
//           style={[
//             spacing.p4,
//             spacing.br1,
//             spacing.mb1,
//             styles.bgPrimary,
//             {
//               width: SCREEN_WIDTH - 16,
//               alignItems: "center",
//             },
//           ]}
//           onPress={handleTakePhoto}
//         >
//           <P
//             style={[
//               typography.font18,
//               typography.textBold,
//               typography.textLight,
//             ]}
//           >
//             Take Photo
//           </P>
//         </TouchableOpacity>

//         {/* Camera Input */}
//         <CameraInput
//           isCameraOpen={isCameraVisible}
//           setIsCameraOpen={setIsCameraVisible}
//           handleImageCapture={(image) => console.log(image)}
//           handleSubmission={handleSubmission}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default SubmitInstallationScreen;

import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { spacing, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import QRScanner from "../components/input/QRScanner";
import CameraInput from "../components/input/CameraInput";
import { P } from "../components/text";
import { SCREEN_WIDTH, styles } from "../styles";

const SubmitInstallationScreen = () => {
  const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [batterySerialNumber, setBatterySerialNumber] = useState("");
  const [panelSerialNumber, setPanelSerialNumber] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [locationRemarks, setLocationRemarks] = useState("");
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const handleTakePhoto = () => {
    setIsCameraVisible(true);
  };

  const handleLuminaryQR = (val) => {
    const values = val.split(";");
    setLuminarySerialNumber(values[0]?.toString() || "");
    setSimNumber(values[1]?.toString() || "");
  };

  const handleSubmission = (image) => {
    const payload = {
      luminarySerialNumber,
      simNumber,
      batterySerialNumber,
      panelSerialNumber,
      beneficiaryName,
      contactNumber,
      locationRemarks,
      capturedImage: image,
    };

    console.log("Submitting data:", payload);
    setIsCameraVisible(false);
  };

  return (
    <ScrollView style={spacing.mv2} keyboardShouldPersistTaps="handled">
      <View>
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
