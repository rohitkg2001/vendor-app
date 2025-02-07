import { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import { P } from "../components/text";
import { useDispatch, useSelector } from "react-redux";
import QRScanner from "../components/input/QRScanner";
import CameraInput from "../components/input/CameraInput";
import { startInstallation } from "../redux/actions/siteActions";
import { Checkbox } from "react-native-paper";
import MyPickerInput from "../components/input/MyPickerInput";

export default function StartInstallation({ navigation, route }) {
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
  const [networkAvailable, setNetworkAvailable] = useState(false);
  const { isSurvey, itemId } = route.params;
  const [wardOptions, setWardOptions] = useState([])
  const [poleOptions, setPoleOptions] = useState([])

  const [selectedWard, setSelectedWard] = useState("");

  const dispatch = useDispatch();
  const { pendingStreetLights } = useSelector(state => state.tasks)

  const handleLuminaryQR = (val) => {
    const values = val.split(';')
    setLuminarySerialNumber(values[0].toString())
    setSimNumber(values[1].toString())
  }

  useEffect(() => {
    if (Array.isArray(pendingStreetLights)) {
      const currentSite = pendingStreetLights.find(task => task.id === itemId)
      const wards = currentSite.site?.ward
      setWardOptions(wards.split(',').map(num => ({ label: `Ward ${num}`, value: `${num}` })))
      setPoleOptions([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(num => ({ label: `${num}`, value: `${num}` })))
    }
  }, [pendingStreetLights])

  const handleSubmission = async (images) => {
    if (isSurvey) {
      const data = { selectedWard, poleNumber, beneficiaryName, locationRemarks, networkAvailable, images: images }
      console.log(data, itemId)
    } else {
      const data = { luminarySerialNumber, simNumber, batterySerialNumber, panelSerialNumber }
      console.log(data)
    }
    // navigation.navigate("successScreen", {
    //   message: "Your task uploaded successfully",
    //   nextScreen: "welcomeScreen",
    // });
  }

  return (
    <ContainerComponent>
      <MyHeader isBack title="Start Installation" hasIcon />
      <ScrollView
        contentContainerStyle={[spacing.mh2, { width: SCREEN_WIDTH - 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* <P
          style={[
            typography.font16,
            typography.textBold,
            styles.bgPrimaryTransParent,
            spacing.p2,
            { width: SCREEN_WIDTH - 16 },
          ]}
        >
          Location Info:
        </P> */}
        {isSurvey && (
          <MyPickerInput
            title="Ward"
            value={selectedWard}
            onChange={(value) => setSelectedWard(value)}
            options={wardOptions}
            style={spacing.mv2}
          />
        )}
        {
          isSurvey && (
            <MyPickerInput
              title="Pole Number"
              value={poleNumber}
              onChange={(value) => setPoleNumber(value)}
              options={poleOptions}
              style={spacing.mv2}
            />
          )
        }


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
          multiline={true}
          numberOfLines={4}
          value={locationRemarks}
          onChangeText={setLocationRemarks}
          placeholder="Enter Location Remarks"
        />

        {
          isSurvey && (
            <View
              style={[spacing.mv3, { flexDirection: "row", alignItems: "center" }]}
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
          )
        }
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
        onPress={() => {
          setIsCameraVisible(true);
        }}
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
      />
    </ContainerComponent>
  );
}
