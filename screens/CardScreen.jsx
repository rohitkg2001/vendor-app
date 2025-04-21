import { View, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import Constants from "expo-constants";

import ContainerComponent from "../components/ContainerComponent";
import { spacing, typography, SCREEN_WIDTH } from "../styles";

import { P } from "../components/text";

export default function ({ navigation }) {
  //const version = Constants.manifest.version;
  const handlePress = (nextScreen) => {
    navigation.navigate("loginScreen", { nextScreen });
  };
  const appVersion =
    Constants?.manifest?.version || Constants?.expoConfig?.version || "1.0.0";

  return (
    <ContainerComponent justifyContent="space-between" paddingVertical={20}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{ height: 100, resizeMode: "contain" }}
      />
      <View>
        <TouchableOpacity onPress={() => handlePress("homeScreen")}>
          <Card
            style={[
              spacing.mt5,
              {
                width: SCREEN_WIDTH * 0.9,
                backgroundColor: "#f8f9fa",
              },
            ]}
          >
            <Image
              source={require("../assets/rooft.png")}
              style={[
                spacing.mt2,
                {
                  width: "70%",
                  height: 70,
                  alignSelf: "center",
                },
              ]}
            />
            <View style={[spacing.p3]}>
              <P
                style={[
                  typography.font16,
                  typography.fontLato,
                  typography.textCenter,
                ]}
              >
                Rooftop Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress("welcomeScreen")}>
          <Card
            style={[
              spacing.mt5,
              {
                width: SCREEN_WIDTH * 0.9,
                backgroundColor: "#e0f7fa",
                alignSelf: "center",
              },
            ]}
          >
            <Image
              source={require("../assets/solar.png")}
              style={[
                spacing.mt3,
                {
                  width: "80%",
                  height: 80,
                  alignSelf: "center",
                },
              ]}
            />
            <View style={[spacing.p3]}>
              <P
                style={[
                  typography.font16,
                  typography.fontLato,
                  typography.textCenter,
                ]}
              >
                Streetlight Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      <P
        style={[typography.font12, typography.fontLato, typography.textCenter]}
      >
        Powered by Dashandots Technology{"\n"}(Version {appVersion})
      </P>
    </ContainerComponent>
  );
}
