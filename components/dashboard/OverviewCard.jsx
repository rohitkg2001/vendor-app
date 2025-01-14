import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CardFullWidth from "../card/CardFullWidth";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_LARGE,
} from "../../styles";
import { H5, P } from "../../components/text";
import { useNavigation } from "@react-navigation/native";

export default function OverViewCard() {
  const navigation = useNavigation();

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="person-circle" size={ICON_LARGE} color={PRIMARY_COLOR} />
        <H5 style={[typography.textBold, { marginRight: 200 }]}>Overview</H5>
      </View>
      <View style={[spacing.bbw05, spacing.mv2]} />
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", paddingVertical: 10 },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("siteScreen")}
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <P style={[typography.textBold]}>Total Sites</P>
          <P style={[typography.font20, typography.textBold, spacing.m2]}>0</P>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("inventoryScreen")}
          style={{ alignItems: "center" }}
        >
          <P style={[typography.textBold]}>Inventory</P>
          <P style={[typography.font20, typography.textBold, spacing.m2]}>0</P>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <P style={[typography.textBold]}>Total Earning</P>
          <P style={[typography.font20, typography.textBold, spacing.m2]}>₹</P>
        </View>
      </View>
    </CardFullWidth>
  );
}
