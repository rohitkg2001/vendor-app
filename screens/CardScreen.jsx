import React from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, typography } from "../styles";
import { P } from "../components/text";

const CardScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const handleRooftopClick = () => {
    navigation.navigate("loginScreen");
  };
  const handleStreetClick = () => {
    navigation.navigate("welcomeScreen");
  };

  return (
    <ContainerComponent>
      <View style={{ marginTop: 40 }}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={[
            spacing.mb2,
            {
              width: screenWidth * 0.7,
              height: 100,
              alignSelf: "center",
            },
          ]}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={handleRooftopClick}>
          <Card
            style={[
              spacing.mt5,
              {
                width: screenWidth * 0.9,
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
              <P style={[typography.font16, { textAlign: "center" }]}>
                Rooftop Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={handleStreetClick}>
          <Card
            style={[
              spacing.mt5,
              {
                width: screenWidth * 0.9,
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
              <P style={[typography.font16, { textAlign: "center" }]}>
                Streetlight Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 250 }}>
        <P style={[typography.font16, { color: "black" }]}>
          Powered by Dashandots Technology
        </P>
      </View>
    </ContainerComponent>
  );
};

export default CardScreen;
