import { useState, useEffect, useMemo, useCallback } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, Snackbar, Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { P } from "../components/text";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import CameraInput from "../components/input/CameraInput";
import { submitStreetlightTasks } from "../redux/actions/taskActions";

const formatComponent = (str) => (str?.split(" ")[0] || "").substring(0, 3).toUpperCase();

export default function StartInstallationScreen({ navigation, route }) {
  const { isSurvey, itemId } = route.params;
  const dispatch = useDispatch();
  const { pendingStreetLights } = useSelector((state) => state.tasks);

  // Form state
  const [formData, setFormData] = useState({
    isCameraVisible: false,
    poleNumber: "",
    locationRemarks: "",
    beneficiaryName: "",
    contactNumber: "",
    networkAvailable: false,
    selectedWard: "",
    panchayat: "",
    block: "",
    district: "",
    loading: false,
    snackbarVisible: false
  });

  // Options state
  const [options, setOptions] = useState({
    wardOptions: [],
    poleOptions: Array.from({ length: 20 }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
      color: "black"
    }))
  });

  // Derived state
  const formattedPole = useMemo(() => {
    const baseParts = [formData.district, formData.block, formData.panchayat].map(formatComponent);
    const additionalParts = [`WARD${formData.selectedWard}`, formData.poleNumber].filter(Boolean);
    return [...baseParts, ...additionalParts].join("/");
  }, [formData.district, formData.block, formData.panchayat, formData.selectedWard, formData.poleNumber]);

  // Initialize form data from pendingStreetLights
  useEffect(() => {
    if (!Array.isArray(pendingStreetLights)) return;

    const currentSite = pendingStreetLights.find(task => task.id === itemId);
    if (!currentSite) return;

    const { panchayat, block, district, ward } = currentSite.site;
    const surveyedPoles = currentSite?.surveyedPoles || [];

    setFormData(prev => ({
      ...prev,
      panchayat,
      block,
      district,
      loading: false
    }));

    setOptions(prev => ({
      ...prev,
      wardOptions: ward.split(",").map(num => ({ label: `Ward ${num}`, value: num })),
      poleOptions: prev.poleOptions.map(opt => ({
        ...opt,
        color: surveyedPoles.includes(Number(opt.value)) ? "red" : "black"
      }))
    }));
  }, [pendingStreetLights, itemId]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmission = useCallback(async (images) => {
    if (!formData.selectedWard || !formData.poleNumber) {
      handleInputChange('snackbarVisible', true);
      return;
    }

    handleInputChange('loading', true);

    const data = {
      task_id: itemId,
      complete_pole_number: formattedPole,
      ward_name: `Ward ${formData.selectedWard}`,
      beneficiary: formData.beneficiaryName,
      beneficiary_contact: formData.contactNumber,
      remarks: formData.locationRemarks,
      isNetworkAvailable: formData.networkAvailable,
      lat: images[0].lat,
      lng: images[0].long,
      isSurveyDone: true,
      survey_image: images,
      isSurvey: true,
    };

    const result = await dispatch(submitStreetlightTasks(data));
    if (result === 200) {
      handleInputChange('loading', false);
      navigation.navigate("successScreen", {
        message: "Your task uploaded successfully",
        nextScreen: "streetLightPendingTask",
      });
    }
  }, [formData, formattedPole, dispatch, itemId, navigation]);

  const handleTakePhoto = useCallback(() => {
    if (isSurvey && (!formData.selectedWard || !formData.poleNumber)) {
      handleInputChange('snackbarVisible', true);
      return;
    }
    handleInputChange('isCameraVisible', true);
  }, [isSurvey, formData.selectedWard, formData.poleNumber]);

  if (formData.loading) return <ActivityIndicator size="large" />;

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
          value={formData.selectedWard}
          onChange={(value) => handleInputChange('selectedWard', value)}
          options={options.wardOptions}
          style={spacing.mv2}
          placeholder="Select Ward"
        />

        <MyPickerInput
          title="Pole Number"
          value={formData.poleNumber}
          onChange={(value) => handleInputChange('poleNumber', value)}
          style={spacing.mv2}
          options={options.poleOptions.map(opt => ({
            label: opt.label,
            value: opt.value,
            style: { color: opt.color }
          }))}
        />

        <MyTextInput
          title="Beneficiary Name"
          value={formData.beneficiaryName}
          onChangeText={(text) => handleInputChange('beneficiaryName', text)}
          placeholder="Beneficiary Name"
        />

        <MyTextInput
          title="Contact Number"
          value={formData.contactNumber}
          onChangeText={(text) => handleInputChange('contactNumber', text.replace(/[^0-9]/g, "").slice(0, 10))}
          placeholder="Contact Number"
          keyboardType="numeric"
        />

        <MyTextInput
          title="Location"
          multiline
          numberOfLines={4}
          value={formData.locationRemarks}
          onChangeText={(text) => handleInputChange('locationRemarks', text)}
          placeholder="Enter Location Remarks"
        />

        {isSurvey && (
          <View style={[spacing.mv3, { flexDirection: "row", alignItems: "center" }]}>
            <Checkbox
              status={formData.networkAvailable ? "checked" : "unchecked"}
              onPress={() => handleInputChange('networkAvailable', !formData.networkAvailable)}
              color="#76885B"
            />
            <TouchableOpacity onPress={() => handleInputChange('networkAvailable', !formData.networkAvailable)}>
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
          { width: SCREEN_WIDTH - 16, alignItems: "center" }
        ]}
        onPress={handleTakePhoto}
      >
        <P style={[typography.font18, typography.textBold, typography.textLight]}>
          Take Photo
        </P>
      </TouchableOpacity>

      <CameraInput
        isCameraOpen={formData.isCameraVisible}
        setIsCameraOpen={(val) => handleInputChange('isCameraVisible', val)}
        handleSubmission={handleSubmission}
        complete_pole_number={formattedPole}
      />

      <Snackbar
        visible={formData.snackbarVisible}
        onDismiss={() => handleInputChange('snackbarVisible', false)}
        duration={3000}
      >
        Please select both Ward and Pole Number before taking a photo.
      </Snackbar>
    </ContainerComponent>
  );
}
