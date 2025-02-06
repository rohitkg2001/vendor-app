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
  ICON_SMALL,
} from "../../styles";
import { H5, H6, P } from "../../components/text";
import { useNavigation } from "@react-navigation/native";

export default function OverViewCard({ totalSites }) {
  const navigation = useNavigation();

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="person-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <H5 style={[typography.font16, { marginRight: 210 }]}>Overview</H5>
      </View>
      <View style={[spacing.bbw05, spacing.mv2]} />
      <View
        style={[styles.row, spacing.pv2, { justifyContent: "space-between" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("siteScreen")}
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <H6 style={[typography.font14]}>Total Sites</H6>
          <H6 style={[typography.font16, spacing.m2]}>{totalSites}</H6>
          {/* <H6 style={[typography.font16, spacing.m2]}>0</H6> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("inventoryScreen")}
          style={{ alignItems: "center" }}
        >
          <H6 style={[typography.font14]}>Inventory</H6>
          <H6 style={[typography.font16, spacing.m2]}>0</H6>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <H6 style={[typography.font14]}>Total Earning</H6>
          <H6 style={[typography.font16, spacing.m2]}>₹</H6>
        </View>
      </View>
    </CardFullWidth>
  );
}
