import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { Snackbar } from "react-native-paper";
import Button from "../components/buttons/Button";
import { H2, H4, P, Span } from "../components/text";
import { SCREEN_WIDTH, styles, spacing, layouts, typography } from "../styles";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { surveyTask, updateTask } from "../redux/actions/taskActions";
import ModalPopup from "../components/Modal";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import CameraComponent from "../components/servey/CameraComponent";
import UploadDocument from "../components/servey/UploadDocument";
import Description from "../components/servey/Description";
import MyTextInput from "../components/input/MyTextInput";

export default function SurveyScreen({ route, message = "" }) {
  const { itemId } = route.params || 0;
  const { isSurvey } = route.params || false;
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [modalMsg, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [loadType, setLoadType] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [meterConnectionType, setMeterConnectionType] = useState("");
  const [caNo, setCaNo] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [meterType, setMeterType] = useState("");
  const [sectionLoad, setSectionLoad] = useState("");
  const [loadKW, setLoadKW] = useState("");
  const [gridPowerAvailable, setGridPowerAvailable] = useState("");
  const [phaseMissing, setPhaseMissing] = useState("");
  const [ltdb, setLTDB] = useState("");
  const [dgCapacity, setDgCapacity] = useState("");
  const [dgMake, setDgMake] = useState("");
  const [dgModel, setDgModel] = useState("");
  const [roofCondition, setRoofCondition] = useState("");
  const [totalRoofArea, setTotalRoofArea] = useState("");
  const [freeSpaceSolar, setFreeSpaceSolar] = useState("");
  const [controlRoomAvailable, setControlRoomAvailable] = useState("");
  const [earthPitsAvailable, setEarthPitsAvailable] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [roofAccess, setRoofAccess] = useState("");
  const [rooftopHeight, setRooftopHeight] = useState("");
  const [parapetHeight, setParapetHeight] = useState("");
  const [noOfFloors, setNoOfFloors] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [accessRoadType, setAccessRoadType] = useState("");
  const [distanceFromMainRoad, setDistanceFromMainRoad] = useState("");
  const [siteFeasible, setSiteFeasible] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cameraRef = useRef(null);

  const { t } = useTranslation();

  // const handleTakePicture = async () => {
  //   if (cameraRef.current && photos.length < 5) {
  //     const photo = await cameraRef.current.takePictureAsync();
  //     setPhotos([...photos, photo.uri]);
  //   }
  // };

  const handleTakePhoto = () => {
    setIsCameraVisible(true);
  };

  const removePhoto = (uri) => {
    setPhotos(photos.filter((photoUri) => photoUri !== uri));
  };

  const handleCancel = () => {
    setPhotos([]);
    setDescription("");
    setFile(null);
  };

  const handleUpload = async () => {
    if (!description && photos.length === 0 && !file) {
      setSnackbarMessage("Please provide data before submitting.");
      setSnackbarVisible(true);
      return;
    }

    // Only check for minimum photos when it's NOT a survey and file is not uploaded
    if (!isSurvey && photos.length < 1 && !file) {
      setSnackbarMessage(
        "Please click at least one picture or upload a document."
      );
      setSnackbarVisible(true);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        date,
        description,
        image: photos,
        file,
        lat: latitude,
        long: longitude,
        contactNo,
        loadType,
        connectionType,
        meterConnectionType,
        caNo,
        meterNo,
        meterType,
        sectionLoad,
        loadKW,
        gridPowerAvailable,
        phaseMissing,
        ltdb,
        dgCapacity,
        dgMake,
        dgModel,
        roofCondition,
        totalRoofArea,
        freeSpaceSolar,
        controlRoomAvailable,
        earthPitsAvailable,
        buildingAge,
        roofAccess,
        rooftopHeight,
        parapetHeight,
        noOfFloors,
        waterSource,
        accessRoadType,
        distanceFromMainRoad,
        siteFeasible,
      };

      if (file) {
        console.log("Uploaded File Name:", file.name || "Unknown file");
      }

      const response = isSurvey
        ? await dispatch(surveyTask(itemId, payload))
        : await dispatch(updateTask(itemId, payload));

      if (response === 200) {
        setPhotos([]);
        setDescription("");
        setFile(null);
        navigation.navigate("successScreen", {
          message: "Task update has been successfully saved.",
          nextScreen: "streetLightPendingTask",
        });
      } else {
        setSnackbarMessage("Error submitting task");
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      setModalMessage("Error submitting task");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const getAndSetCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getAndSetCurrentLocation();
  }, []);

  return (
    <ContainerComponent>
      <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />

      <ScrollView
        style={[layouts.flex1, spacing.mh1]}
        showsVerticalScrollIndicator={false}
      >
        {/* <H4 style={[styles.titleText, spacing.m2, { marginVertical: 0 }]}>
          {t("upload_photo")}
        </H4>
        <P style={[spacing.mh2]}>{t("photo_description")}</P>
        <CameraComponent cameraRef={cameraRef} />
        <Span>Current Location</Span>
        <Span>Lat: {latitude}</Span>
        <Span>Long: {longitude}</Span> */}

        {/* <Button
          style={[styles.btn, styles.bgPrimary, layouts.center]}
          onPress={handleTakePicture}
        >
          <H2 style={[styles.btnText, typography.font20, typography.textLight]}>
            {t("take_photo")}
          </H2>
        </Button> */}

        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          {photos.map((photoUri, index) => (
            <View
              key={index}
              style={[spacing.mr2, spacing.mt2, { position: "relative" }]}
            >
              <Image
                source={{ uri: photoUri }}
                style={[styles.image, spacing.br1]}
              />
              <TouchableOpacity
                style={[
                  layouts.circle625,
                  layouts.center,
                  styles.bgDanger,
                  styles.removeImageButton,
                ]}
                onPress={() => removePhoto(photoUri)}
              >
                <P style={{ fontSize: 14, color: "white", marginLeft: 2 }}>X</P>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <MyTextInput
          value={contactNo}
          onChangeText={setContactNo}
          placeholder="Enter Contact No"
          keyboardType="phone-pad"
          title="Contact No"
        />

        {/* Type of Load (AC/DC) */}
        <H4
          style={[
            typography.font14,
            typography.textBold,
            // spacing.mt2,
            typography.fontLato,
          ]}
        >
          Type of Load
        </H4>
        <View>
          <RadioButton.Group onValueChange={setLoadType} value={loadType}>
            <View style={[styles.row]}>
              <RadioButton.Item
                label="AC"
                value="AC"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
              <RadioButton.Item
                label="DC"
                value="DC"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
            </View>
          </RadioButton.Group>
        </View>

        {/* Thin line between sections */}
        <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            // marginVertical: 4,
            opacity: 0.6,
          }}
        />

        <View
          style={[
            styles.row,
            { justifyContent: "space-between", alignItems: "flex-start" },
          ]}
        >
          {/* Connection Type */}
          <View style={{ flex: 1, marginRight: 8 }}>
            <H4
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { marginLeft: 44 },
              ]}
            >
              Connection Type
            </H4>
            <RadioButton.Group
              onValueChange={setConnectionType}
              value={connectionType}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton.Item
                  label="1 Phase"
                  value="1 Phase"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ marginRight: -12, paddingVertical: 0 }}
                  color="#007AFF"
                />
                <RadioButton.Item
                  label="3 Phase"
                  value="3 Phase"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ paddingVertical: 0 }}
                  color="#007AFF"
                />
              </View>
            </RadioButton.Group>
          </View>

          {/* Meter Connection Type */}
          <View style={{ flex: 1, marginLeft: 68 }}>
            <H4
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { marginLeft: 18 },
              ]}
            >
              Meter Conn. Type
            </H4>
            <RadioButton.Group
              onValueChange={setMeterConnectionType}
              value={meterConnectionType}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton.Item
                  label="HT"
                  value="HT"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ marginRight: -12, paddingVertical: 0 }}
                  color="#007AFF"
                />
                <RadioButton.Item
                  label="LT"
                  value="LT"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ paddingVertical: 0 }}
                  color="#007AFF"
                />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        {/* CA No. with Electricity Bill Upload */}
        <MyTextInput
          value={caNo}
          onChangeText={setCaNo}
          placeholder="Enter CA No."
          title="CA No."
        />

        <View
          style={[
            styles.row,
            { justifyContent: "space-between", alignItems: "flex-start" },
          ]}
        >
          {/* Meter Type */}
          <View style={{ flex: 1, marginRight: 4 }}>
            <H4
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { marginLeft: 54 },
              ]}
            >
              Meter Type
            </H4>
            <RadioButton.Group
              onValueChange={(value) => setMeterType(value)}
              value={meterType}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton.Item
                  label="Smart"
                  value="Smart"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ marginRight: -12, paddingVertical: 0 }}
                  color="#007AFF"
                />
                <RadioButton.Item
                  label="Normal"
                  value="Normal"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ paddingVertical: 0 }}
                  color="#007AFF"
                />
              </View>
            </RadioButton.Group>
          </View>

          {/* Vertical Divider */}
          <View
            style={{
              width: 1,
              backgroundColor: "#ccc",
              opacity: 0.5,
              marginHorizontal: 4,
              marginTop: 8,
            }}
          />

          {/* Section Load */}
          <View style={{ flex: 1, marginLeft: 4 }}>
            <H4
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { marginLeft: 44 },
              ]}
            >
              Section Load
            </H4>
            <RadioButton.Group
              onValueChange={(value) => setSectionLoad(value)}
              value={sectionLoad}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton.Item
                  label="KW"
                  value="KW"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ marginRight: -12, paddingVertical: 0 }}
                  color="#007AFF"
                />
                <RadioButton.Item
                  label="KVA"
                  value="KVA"
                  labelStyle={{ fontSize: 14, color: "#333" }}
                  style={{ paddingVertical: 0 }}
                  color="#007AFF"
                />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        {/* Instantaneous / Connected Load (KW) */}
        <MyTextInput
          value={loadKW}
          onChangeText={setLoadKW}
          placeholder="Enter Instantaneous / Connected Load (KW)"
          title="Load (KW)"
        />

        {/* Grid Power Available in LTDB (Yes/No) */}
        <H4
          style={[typography.font14, typography.textBold, typography.fontLato]}
        >
          Grid Power Available in LTDB
        </H4>
        <View>
          <RadioButton.Group
            onValueChange={(value) => setGridPowerAvailable(value)}
            value={gridPowerAvailable}
          >
            <View style={styles.row}>
              <RadioButton.Item
                label="Yes"
                value="Yes"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
              <RadioButton.Item
                label="No"
                value="No"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
            </View>
          </RadioButton.Group>
        </View>

        {/* If phase is missing, Name i.e., R, T, B, N with Yes/No */}
        <H4
          style={[typography.font14, typography.textBold, typography.fontLato]}
        >
          If Phase Missing (R/T/B/N)
        </H4>
        <View>
          <RadioButton.Group
            onValueChange={(value) => setPhaseMissing(value)}
            value={phaseMissing}
          >
            <View style={styles.row}>
              <RadioButton.Item
                label="Yes"
                value="Yes"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
              <RadioButton.Item
                label="No"
                value="No"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
            </View>
          </RadioButton.Group>
        </View>

        {/* LTDB (Present/Not Present) */}
        <H4
          style={[typography.font14, typography.textBold, typography.fontLato]}
        >
          LTDB
        </H4>
        <View>
          <RadioButton.Group
            onValueChange={(value) => setLTDB(value)}
            value={ltdb}
          >
            <View style={styles.row}>
              <RadioButton.Item
                label="Present"
                value="Present"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
              <RadioButton.Item
                label="Not Present"
                value="Not Present"
                labelStyle={{ fontSize: 15, color: "#333" }}
                color="#007AFF"
              />
            </View>
          </RadioButton.Group>
        </View>

        {/* Existing DG Set Details */}
        <MyTextInput
          title="Existing DG Set Capacity (in KVA)"
          placeholder="Enter DG Set Capacity"
          value={dgCapacity}
          onChangeText={setDgCapacity}
        />
        <MyTextInput
          title="DG Set Make"
          placeholder="Enter DG Set Make"
          value={dgMake}
          onChangeText={setDgMake}
        />
        <MyTextInput
          title="DG Set Model No"
          placeholder="Enter DG Set Model No"
          value={dgModel}
          onChangeText={setDgModel}
        />

        {/* Roof Condition */}
        <MyTextInput
          title="Roof Condition"
          placeholder="Enter Roof Condition"
          value={roofCondition}
          onChangeText={setRoofCondition}
        />

        {/* Total Area of Roof */}
        <MyTextInput
          title="Total Area of Roof (in Sq. m)"
          placeholder="Enter Total Roof Area"
          value={totalRoofArea}
          onChangeText={setTotalRoofArea}
          keyboardType="numeric"
        />

        {/* Free Space for Solar Installation */}
        <MyTextInput
          title="Free Space for Solar Installation (in Sq. m)"
          placeholder="Enter Free Space"
          value={freeSpaceSolar}
          onChangeText={setFreeSpaceSolar}
          keyboardType="numeric"
        />

        {/* Availability for Control Room/Inverter */}
        <H4
          style={[typography.font14, typography.textBold, typography.fontLato]}
        >
          Control Room/Inverter Free Space Available?
        </H4>
        <RadioButton.Group
          onValueChange={setControlRoomAvailable}
          value={controlRoomAvailable}
        >
          <View style={styles.row}>
            <RadioButton.Item label="Yes" value="Yes" color="#007AFF" />
            <RadioButton.Item label="No" value="No" color="#007AFF" />
          </View>
        </RadioButton.Group>

        {/* Earth Pits Space Availability */}
        <H4
          style={[typography.font14, typography.textBold, typography.fontLato]}
        >
          Earth Pits Space Availability
        </H4>
        <RadioButton.Group
          onValueChange={setEarthPitsAvailable}
          value={earthPitsAvailable}
        >
          <View style={styles.row}>
            <RadioButton.Item label="Yes" value="Yes" color="#007AFF" />
            <RadioButton.Item label="No" value="No" color="#007AFF" />
          </View>
        </RadioButton.Group>

        {/* Age of Building */}
        <MyTextInput
          title="Age of Building (Years)"
          placeholder="Enter Building Age"
          value={buildingAge}
          onChangeText={setBuildingAge}
          keyboardType="numeric"
        />

        {/* Roof Access (Staircase Availability) */}
        <MyTextInput
          title="Access to Roof (Staircase Available)"
          placeholder="Yes/No"
          value={roofAccess}
          onChangeText={setRoofAccess}
        />

        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ flex: 2, marginRight: 5 }}>
            <MyTextInput
              title="Rooftop Height (m)"
              placeholder="Height"
              value={rooftopHeight}
              onChangeText={setRooftopHeight}
              keyboardType="numeric"
              containerStyle={{ height: 60 }}
            />
          </View>
          <View style={{ flex: 2, marginLeft: -5 }}>
            <MyTextInput
              title="Parapet Height (m)"
              placeholder="Height"
              value={parapetHeight}
              onChangeText={setParapetHeight}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* No. of Floors */}
        <MyTextInput
          title="Number of Floors (e.g., G+2)"
          placeholder="Enter Floors"
          value={noOfFloors}
          onChangeText={setNoOfFloors}
        />

        {/* Water Source for Cleaning */}
        <MyTextInput
          title="Water Source for Cleaning"
          placeholder="Specify Water Source"
          value={waterSource}
          onChangeText={setWaterSource}
        />

        {/* Access to Site */}

        <MyTextInput
          title=" Access to Site (Road Type)"
          placeholder="Access to Site"
          onValueChange={setAccessRoadType}
          value={accessRoadType}
          keyboardType="numeric"
        />

        {/* Distance from Main Road */}
        <MyTextInput
          title="Distance from Main Road (Km)"
          placeholder="Enter Distance"
          value={distanceFromMainRoad}
          onChangeText={setDistanceFromMainRoad}
          keyboardType="numeric"
        />

        {/* Site Feasibility */}
        <H4
          style={[typography.font14, typography.textBold, typography.fontLato]}
        >
          Is Site Feasible?
        </H4>
        <RadioButton.Group onValueChange={setSiteFeasible} value={siteFeasible}>
          <View style={styles.row}>
            <RadioButton.Item label="Yes" value="Yes" color="#007AFF" />
            <RadioButton.Item label="No" value="No" color="#007AFF" />
          </View>
        </RadioButton.Group>

        <UploadDocument file={file} setFile={setFile} />
        <Description
          description={description}
          setDescription={setDescription}
        />

        {/* <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Button
            onPress={handleCancel}
            style={[
              styles.btn,
              styles.bgLight,
              spacing.bw05,
              layouts.center,
              { width: SCREEN_WIDTH / 2 - 20 },
            ]}
          >
            <H2
              style={[styles.btnText, typography.font20, typography.textDark]}
            >
              Cancel
            </H2>
          </Button>
          <Button
            onPress={handleUpload}
            style={[
              styles.btn,
              styles.bgPrimary,
              layouts.center,
              { width: SCREEN_WIDTH / 2 - 20 },
            ]}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                style={[
                  styles.btnText,
                  typography.font20,
                  typography.textLight,
                ]}
                animating
                color="#fff"
              />
            ) : (
              <H2
                style={[
                  styles.btnText,
                  typography.font20,
                  typography.textLight,
                ]}
              >
                Submit
              </H2>
            )}
          </Button>
        </View> */}
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
            style={[
              typography.font18,
              typography.textBold,
              typography.textLight,
            ]}
          >
            Take Photo
          </P>
        </TouchableOpacity>
      </ScrollView>

      <CameraComponent
        isCameraOpen={isCameraVisible}
        setIsCameraOpen={setIsCameraVisible}
        handleImageCapture={(val) => console.log(val)}
        handleUpload={handleUpload}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{
          backgroundColor: "#DC4C64",
          borderRadius: 20,
          bottom: 55,
        }}
      >
        <P style={{ color: "#ffffff", fontWeight: "bold" }}>
          {snackbarMessage}
        </P>
      </Snackbar>

      <ModalPopup
        visible={showModal}
        close={() => setShowModal(false)}
        negativeButton={t("close")}
        positiveButton={t("ok")}
        action={() => {
          setShowModal(false);
          navigation.goBack();
        }}
      >
        <H4>{modalMsg}</H4>
      </ModalPopup>
    </ContainerComponent>
  );
}
