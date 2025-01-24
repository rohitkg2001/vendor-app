import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import CameraComponent from "../components/servey/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, styles, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import { P } from "../components/text";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

const StartInstallationScreen = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  const [poleNumber, setPoleNumber] = useState("");
  const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [batterySerialNumber, setBatterySerialNumber] = useState("");
  const [panelSerialNumber, setPanelSerialNumber] = useState("");
  const [locationRemarks, setLocationRemarks] = useState("");

  const handleTakePhoto = () => {
    setIsCameraVisible(true);
  };

  const handleCloseCamera = () => {
    setIsCameraVisible(false);
  };

  return (
    <ContainerComponent>
      <View>
        <MyHeader isBack title="Start Installation" hasIcon />

        <ScrollView
          contentContainerStyle={[spacing.p4, {}]}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[
              spacing.p3,
              spacing.br2,
              spacing.mt4,
              {
                backgroundColor: "#76885B",
                alignItems: "center",
              },
            ]}
            onPress={handleTakePhoto}
          >
            <P
              style={[
                typography.font16,
                typography.textBold,
                {
                  color: "#ffffff",
                },
              ]}
            >
              Take Photo
            </P>
          </TouchableOpacity>

          {isCameraVisible && (
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                onPress={handleCloseCamera}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 0,
                  zIndex: 1,
                }}
              >
                <Ionicons name="close-circle" size={40} color="white" />
              </TouchableOpacity>

              <CameraComponent photoUri={photoUri} cameraRef={cameraRef} />
            </View>
          )}

          <View
            style={[
              spacing.p2,
              spacing.br2,
              spacing.mb2,
              {
                backgroundColor: "#f9f9f9",
              },
            ]}
          >
            <P style={[typography.font14, spacing.mb1, typography.textBold]}>
              Location Info:
            </P>
            <P style={[typography.font14]}>WARD:</P>
            <P style={[typography.font14]}>City:</P>
            <P style={[typography.font14]}>BIHAR:</P>
          </View>

          <MyTextInput
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb1,
              spacing.bw1,
              {
                backgroundColor: "#ffffff",
              },
            ]}
            placeholder="Enter Pole Number"
            value={poleNumber}
            onChangeText={setPoleNumber}
          />

          <View
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb4,
              {
                backgroundColor: "#ffffff",
                elevation: 2,
              },
            ]}
          >
            <View
              style={[
                styles.row,
                {
                  alignItems: "center",
                },
              ]}
            >
              <P style={[typography.font16, typography.textBold]}>
                Scan Luminary QR
              </P>
              <TouchableOpacity onPress={() => setIsCameraVisible(true)}>
                <Image
                  source={require("../assets/image.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 16,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <MyTextInput
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb1,
              spacing.bw1,
              {
                backgroundColor: "#ffffff",
              },
            ]}
            placeholder="Enter Luminary Serial Number"
            value={luminarySerialNumber}
            onChangeText={setLuminarySerialNumber}
          />

          <MyTextInput
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb1,
              spacing.bw1,
              {
                backgroundColor: "#ffffff",
              },
            ]}
            placeholder="Enter SIM Number"
            value={simNumber}
            onChangeText={setSimNumber}
          />

          <View
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb4,
              {
                backgroundColor: "#ffffff",
                elevation: 2,
              },
            ]}
          >
            <View
              style={[
                styles.row,
                {
                  alignItems: "center",
                },
              ]}
            >
              <P style={[typography.font16, typography.textBold]}>
                Scan Battery QR
              </P>
              <TouchableOpacity onPress={() => setIsCameraVisible(true)}>
                <Image
                  source={require("../assets/image.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 16,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <MyTextInput
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb1,
              spacing.bw1,
              {
                backgroundColor: "#ffffff",
              },
            ]}
            placeholder="Enter Battery Serial Number"
            value={batterySerialNumber}
            onChangeText={setBatterySerialNumber}
          />

          <View
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb4,
              {
                backgroundColor: "#ffffff",
                elevation: 2,
              },
            ]}
          >
            <View
              style={[
                styles.row,
                {
                  alignItems: "center",
                },
              ]}
            >
              <P style={[typography.font16, typography.textBold]}>
                Scan Panel QR
              </P>
              <TouchableOpacity onPress={() => setIsCameraVisible(true)}>
                <Image
                  source={require("../assets/image.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 16,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <MyTextInput
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb1,
              spacing.bw1,
              {
                backgroundColor: "#ffffff",
              },
            ]}
            placeholder="Enter Panel Serial Number"
            value={panelSerialNumber}
            onChangeText={setPanelSerialNumber}
          />

          <MyTextInput
            style={[
              spacing.br2,
              spacing.p3,
              spacing.mb1,
              spacing.bw1,
              {
                backgroundColor: "#ffffff",
              },
            ]}
            placeholder="Enter Location Remarks"
            multiline={true}
            numberOfLines={4}
            value={locationRemarks}
            onChangeText={setLocationRemarks}
          />
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default StartInstallationScreen;
