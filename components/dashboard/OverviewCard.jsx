// import React native
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
// import components
import CardFullWidth from "../card/CardFullWidth";
// import styles
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
} from "../../styles";
import { H5, H6 } from "../../components/text";

export default function OverViewCard({ totalSites }) {
  const navigation = useNavigation();

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="person-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <H6
          style={[
            typography.fontLato,
            typography.textBold,
            { marginRight: 220 },
          ]}
        >
          Overview
        </H6>
      </View>
      <View style={[spacing.bbw05, spacing.mv2]} />
      <View
        style={[styles.row, spacing.pv2, { justifyContent: "space-between" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("siteScreen")}
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <H6 style={[typography.font14, typography.fontLato]}>Total Sites</H6>
          <H6 style={[typography.font14, spacing.m2, typography.fontLato]}>
            {totalSites}
          </H6>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("inventoryScreen")}
          style={{ alignItems: "center" }}
        >
          <H6 style={[typography.font14, typography.fontLato]}>Inventory</H6>
          <H6 style={[typography.font14, spacing.m2, typography.fontLato]}>
            0
          </H6>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <H6 style={[typography.font14, typography.fontLato]}>
            Total Earning
          </H6>
          <H6 style={[typography.font14, spacing.m2, typography.fontLato]}>
            ₹
          </H6>
        </View>
      </View>
    </CardFullWidth>
  );
}
