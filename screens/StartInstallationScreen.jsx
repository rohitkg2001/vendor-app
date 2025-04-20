import { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import { P } from "../components/text";
import { useDispatch, useSelector } from "react-redux";
import CameraInput from "../components/input/CameraInput";
import { Checkbox } from "react-native-paper";
import MyPickerInput from "../components/input/MyPickerInput";
import { submitStreetlightTasks } from "../redux/actions/taskActions";

export default function StartInstallationScreen({ navigation, route }) {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [poleNumber, setPoleNumber] = useState("");
  const [locationRemarks, setLocationRemarks] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [networkAvailable, setNetworkAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isSurvey, itemId } = route.params;
  const [wardOptions, setWardOptions] = useState([]);
  const [poleOptions, setPoleOptions] = useState([]);
  const [panchayat, setPanchayat] = useState("");
  const [block, setBlock] = useState("");
  const [district, setDistrict] = useState("");

  const [selectedWard, setSelectedWard] = useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [formattedPole, setFormattedPoleNumber] = useState("");

  const dispatch = useDispatch();
  const { pendingStreetLights } = useSelector((state) => state.tasks);

  // Format the first 3 letters of the first word of each component
  const formatComponent = (str) => {
    const firstWord = str.split(" ")[0] || "";
    return firstWord.substring(0, 3).toUpperCase();
  };

  // Main formatting function
  const formatPoleNumber = () => {
    const baseParts = [district, block, panchayat].map(formatComponent);
    const additionalParts = [selectedWard, poleNumber]
      .filter((part) => part) // Only include if exists
      .map(formatComponent);

    return [...baseParts, ...additionalParts].join("/");
  };

  // Update formatted pole number when dependencies change
  useEffect(() => {
    setFormattedPoleNumber(formatPoleNumber());
  }, [district, block, panchayat, selectedWard, poleNumber]);

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
        const { panchayat, block, district } = currentSite.site;
        setDistrict(district);
        setBlock(block);
        setPanchayat(panchayat);
      }
    }
    setLoading(false); // set loading
  }, [pendingStreetLights, poleNumber]);

  const handleSubmission = async (images) => {
    if (!selectedWard || !poleNumber) {
      setSnackbarVisible(true); // Show Snackbar if validation fails
      return;
    }
    setLoading(true);
    const data = {
      task_id: itemId,
      complete_pole_number: formattedPole,
      ward_name: `Ward ${selectedWard}`,
      beneficiary: beneficiaryName,
      beneficiary_contact: contactNumber,
      remarks: locationRemarks,
      isNetworkAvailable: networkAvailable,
      lat: images[0].lat,
      lng: images[0].long,
      isSurveyDone: true,
      survey_image: images,
      isSurvey: true,
    };
    const result = await dispatch(submitStreetlightTasks(data));
    if (result === 200) {
      setLoading(false);
      navigation.navigate("successScreen", {
        message: "Your task uploaded successfully",
        nextScreen: "streetLightPendingTask",
      });
    }
  };

  const handleTakePhoto = () => {
    if (isSurvey && (!selectedWard || !poleNumber)) {
      setSnackbarVisible(true);
      return;
    }
    setIsCameraVisible(true);
  };

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <ContainerComponent>
      <MyHeader
        isBack
        title={isSurvey ? "Start Survey" : "Start Installation"}
        hasIcon
      />
      <ScrollView
        contentContainerStyle={[spacing.mh2, { width: SCREEN_WIDTH - 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <MyPickerInput
          title="Ward"
          value={selectedWard}
          onChange={(value) => setSelectedWard(value)}
          options={wardOptions}
          style={spacing.mv2}
          placeholder="Select Ward" // Placeholder added
        />
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
        <MyTextInput
          title="Beneficiary Name"
          multiline={false}
          numberOfLines={1}
          value={beneficiaryName}
          onChangeText={setBeneficiaryName}
          placeholder="Beneficiary Name"
        />
        <MyTextInput
          title="Contact Number"
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
          title="Location"
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
                Network Availability (Airtel)
              </P>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
      <CameraInput
        isCameraOpen={isCameraVisible}
        setIsCameraOpen={setIsCameraVisible}
        handleImageCapture={(val) => console.log(val)}
        handleSubmission={handleSubmission}
        complete_pole_number={formattedPole}
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
