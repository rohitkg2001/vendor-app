import { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Snackbar } from "react-native-paper";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import { P } from "../components/text";
import { useDispatch, useSelector } from "react-redux";
import QRScanner from "../components/input/QRScanner";
import CameraInput from "../components/input/CameraInput";
import { Checkbox } from "react-native-paper";
import MyPickerInput from "../components/input/MyPickerInput";
import { submitStreetlightTasks } from "../redux/actions/taskActions";

export default function StartInstallationScreen({ navigation, route }) {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [poleNumber, setPoleNumber] = useState("");
  const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [batterySerialNumber, setBatterySerialNumber] = useState("");
  const [panelSerialNumber, setPanelSerialNumber] = useState("");
  const [locationRemarks, setLocationRemarks] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [networkAvailable, setNetworkAvailable] = useState(false);
  const { isSurvey, itemId } = route.params;
  const [wardOptions, setWardOptions] = useState([]);
  const [poleOptions, setPoleOptions] = useState([]);

  const [selectedWard, setSelectedWard] = useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Redux se beneficiaryName aur locationRemarks le rahe hain
  // const beneficiaryName = useSelector((state) => state.beneficiaryName);
  // const locationRemarks = useSelector((state) => state.locationRemarks);

  const dispatch = useDispatch();
  const { pendingStreetLights, pole_number } = useSelector(
    (state) => state.tasks
  );

  const handleLuminaryQR = (val) => {
    const values = val.split(";");
    setLuminarySerialNumber(values[0].toString());
    setSimNumber(values[1].toString());
  };

  // useEffect(() => {
  //   console.log(pole_number);
  //   if (Array.isArray(pendingStreetLights)) {
  //     const currentSite = pendingStreetLights.find(
  //       (task) => task.id === itemId
  //     );
  //     const wards = currentSite.site?.ward;
  //     setWardOptions(
  //       wards
  //         .split(",")
  //         .map((num) => ({ label: `Ward ${num}`, value: `${num}` }))
  //     );
  //     // List of surveyed poles
  //     const surveyedPoles = currentSite?.surveyedPoles || []; // Surveyed poles from API
  //     console.log("Surveyed Poles:", surveyedPoles); // Debugging

  //     setPoleOptions(
  //       [
  //         1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  //       ].map((num) => ({ label: `${num}`, value: `${num}` }))
  //     );
  //   }
  // }, [pendingStreetLights, poleNumber]);

  useEffect(() => {
    if (Array.isArray(pendingStreetLights)) {
      const currentSite = pendingStreetLights.find(
        (task) => task.id === itemId
      );
      if (currentSite) {
        const wards = currentSite.site?.ward;
        setWardOptions(
          wards
            .split(",")
            .map((num) => ({ label: `Ward ${num}`, value: `${num}` }))
        );

        // Surveyed poles list
        const surveyedPoles = currentSite?.surveyedPoles || [];

        setPoleOptions(
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((num) => ({
            label: `${num}`,
            value: `${num}`,
            color: surveyedPoles.includes(num) ? "red" : "black",
          }))
        );
      }
    }
  }, [pendingStreetLights, poleNumber]);

  const handleSubmission = async (images) => {
    if (!selectedWard || !poleNumber) {
      setSnackbarVisible(true); // Show Snackbar if validation fails
      return;
    }
    if (isSurvey) {
      const data = {
        task_id: itemId,
        complete_pole_number: [pole_number, selectedWard, poleNumber].join("/"),
        beneficiary: beneficiaryName,
        contact: contactNumber,
        remarks: locationRemarks,
        isNetworkAvailable: networkAvailable,
        lat: images[0].lat,
        lng: images[0].long,
        isSurveyDone: true,
        //survey_image: images.map((item) => item.uri),
        survey_image: images,
      };
      await dispatch(submitStreetlightTasks(data));
    } else {
      console.log("submitting");
      const data = {
        task_id: itemId,
        complete_pole_number: [pole_number, selectedWard, poleNumber].join("/"),
        luminary_qr: luminarySerialNumber,
        sim_number: simNumber,
        battery_qr: batterySerialNumber,
        panel_qr: panelSerialNumber,
        isInstallationDone: true,
        // survey_image: images.map((item) => item.uri),
        beneficiary: beneficiaryName,
        contact: contactNumber,
        remarks: locationRemarks,
      };
      console.log("working fine");
      await dispatch(submitStreetlightTasks(data));
    }
    // navigation.navigate("successScreen", {
    //   message: "Your task uploaded successfully",
    //   nextScreen: "welcomeScreen",
    // });
  };

  const handleTakePhoto = () => {
    if (isSurvey && (!selectedWard || !poleNumber)) {
      setSnackbarVisible(true);
      return;
    }
    setIsCameraVisible(true);
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title="Start Installation" hasIcon />
      <ScrollView
        contentContainerStyle={[spacing.mh2, { width: SCREEN_WIDTH - 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {isSurvey && (
          <MyPickerInput
            title="Ward"
            value={selectedWard}
            onChange={(value) => setSelectedWard(value)}
            options={wardOptions}
            style={spacing.mv2}
            placeholder="Select Ward" // Placeholder added
          />
        )}
        {isSurvey && (
          <MyPickerInput
            title="Pole Number"
            value={poleNumber}
            onChange={(value) => setPoleNumber(value)}
            // options={poleOptions}
            style={spacing.mv2}
            options={poleOptions.map((option) => ({
              label: option.label,
              value: option.value,
              style: { color: option.color }, // Apply color dynamically
            }))}
          />
        )}

        {!isSurvey && (
          <View
            style={[
              spacing.mv2,
              spacing.pv2,
              {
                backgroundColor: "#f0f0f0",
              },
            ]}
          >
            <>
              <QRScanner
                title="Scan Luminary QR"
                onScan={(val) => handleLuminaryQR(val)}
              />
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
            </>
          </View>
        )}
        {!isSurvey && (
          <View
            style={[
              spacing.mv2,
              spacing.pv2,
              {
                backgroundColor: "#f0f0f0",
              },
            ]}
          >
            <>
              <QRScanner
                title="Scan Battery QR"
                onScan={(val) => setBatterySerialNumber(val)}
              />
              <MyTextInput
                placeholder="Enter Battery Serial Number"
                value={batterySerialNumber}
                onChangeText={setBatterySerialNumber}
                keyboardType="numeric"
              />
            </>
          </View>
        )}

        {!isSurvey && (
          <View
            style={[
              spacing.mv2,
              spacing.pv2,
              {
                backgroundColor: "#f0f0f0",
              },
            ]}
          >
            <QRScanner
              title="Scan Panel QR"
              onScan={(val) => setPanelSerialNumber(val)}
            />
            <MyTextInput
              placeholder="Enter Panel Serial Number"
              value={panelSerialNumber}
              onChangeText={setPanelSerialNumber}
              keyboardType="numeric"
            />
          </View>
        )}

        <MyTextInput
          multiline={false}
          numberOfLines={1}
          value={beneficiaryName}
          onChangeText={setBeneficiaryName}
          placeholder="Beneficiary Name"
        />
        <MyTextInput
          multiline={false}
          numberOfLines={1}
          value={contactNumber}
          onChangeText={(text) => {
            const filteredText = text.replace(/[^0-9]/g, "");
            if (filteredText.length <= 10) {
              setContactNumber(filteredText);
            }
          }}
          placeholder="Contact Number"
          keyboardType="numeric"
        />

        <MyTextInput
          multiline={true}
          numberOfLines={4}
          value={locationRemarks}
          onChangeText={setLocationRemarks}
          placeholder="Enter Location Remarks"
        />

        {isSurvey && (
          <View
            style={[
              spacing.mv3,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Checkbox
              status={networkAvailable ? "checked" : "unchecked"}
              onPress={() => setNetworkAvailable((prev) => !prev)}
              color="#76885B"
            />
            <TouchableOpacity
              onPress={() => setNetworkAvailable((prev) => !prev)}
            >
              <P style={[typography.font18, typography.textBold]}>
                Network Availability
              </P>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {/* <TouchableOpacity
        style={[
          spacing.p4,
          spacing.br1,
          spacing.mb1,
          styles.bgPrimary,
          {
            width: SCREEN_WIDTH - 16,
            alignItems: "center",
          },
        ]}
        onPress={() => {
          if (!selectedWard || !poleNumber) {
            setSnackbarVisible(true);
          } else {
            setIsCameraVisible(true);
          }
        }}
      >
        <P
          style={[typography.font18, typography.textBold, typography.textLight]}
        >
          Take Photo
        </P>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[
          spacing.p4,
          spacing.br1,
          spacing.mb1,
          styles.bgPrimary,
          {
            width: SCREEN_WIDTH - 16,
            alignItems: "center",
          },
        ]}
        onPress={handleTakePhoto}
      >
        <P
          style={[typography.font18, typography.textBold, typography.textLight]}
        >
          Take Photo
        </P>
      </TouchableOpacity>
      ;
      <CameraInput
        isCameraOpen={isCameraVisible}
        setIsCameraOpen={setIsCameraVisible}
        handleImageCapture={(val) => console.log(val)}
        handleSubmission={handleSubmission}
      />
      {/* Snackbar for validation error */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Please select both Ward and Pole Number before taking a photo.
      </Snackbar>
    </ContainerComponent>
  );
}
