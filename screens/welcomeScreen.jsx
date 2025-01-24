import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import {
  ICON_LARGE,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { P } from "../components/text";

const WelcomeScreen = () => {
  return (
    <ContainerComponent>
      <MyHeader isBack title="Welcome" hasIcon />

      <View
        style={[
          spacing.p3,
          {
            width: SCREEN_WIDTH,
            backgroundColor: "#f4f4f4",
          },
        ]}
      >
        <P style={[typography.font16, typography.textBold, spacing.mb1]}>
          Site Info:
        </P>
        <P style={[typography.font12]}></P>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={[
            spacing.br3,
            spacing.p4,
            {
              width: SCREEN_WIDTH / 1.2,
              alignItems: "center",
              backgroundColor: "#FFD700",
            },
          ]}
        >
          <Icon name="star" size={ICON_LARGE} />
          <P
            style={[
              typography.font16,
              spacing.mt1,
              typography.textBold,
              {
                textAlign: "center",
              },
            ]}
          >
            Start Light Installation
          </P>
        </TouchableOpacity>

        <View style={[styles.row]}>
          <TouchableOpacity
            style={[
              spacing.p5,
              spacing.br2,
              spacing.mt1,
              spacing.mh3,
              {
                alignItems: "center",
                backgroundColor: "#98FB98",
              },
            ]}
          >
            <Icon name="location-sharp" size={ICON_LARGE} />
            <P style={[typography.font16, spacing.mt3]}>Change Site Info</P>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              spacing.p5,
              spacing.br2,
              spacing.mt1,
              spacing.mh3,
              {
                alignItems: "center",
                backgroundColor: "#C8E6C9",
              },
            ]}
          >
            <Icon name="reader-sharp" size={ICON_LARGE} />
            <P style={[typography.font16, spacing.mt3]}>Pending Records</P>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default WelcomeScreen;
