import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/components.styles";
import { SCREEN_WIDTH } from "../../styles/constant";
import ContainerComponent from "../ContainerComponent";

export default function SearchBar({ placeholder, value, onChangeText }) {
  return (
    <View
      style={[
        styles.row,
        styles.border,
        styles.round,
        styles.mh2,
        styles.ph5,
        styles.mv2,
        styles.bgPrimaryTransParent,
        {
          alignItems: "center",
          justifyContent: "flex-start",
          height: 48,
          width: SCREEN_WIDTH - 16,
        },
      ]}
    >
      <Ionicons name="search-outline" size={20} color="#333" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          { marginHorizontal: 4, height: 48, paddingLeft: 20, fontSize: 18 },
        ]}
      />
    </View>
  );
}
