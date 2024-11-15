import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/components.styles";
import { SCREEN_WIDTH } from "../../styles/constant";

export default function SearchBar({
  placeholder,
  value,
  onChangeText,
  style,
}) {
  return (
    <View
      style={[
        styles.row,
        styles.border,
        styles.round,
        styles.ph5,
        styles.mv2,
        styles.bgPrimaryTransParent,
        {
          alignItems: "center",
          justifyContent: "flex-start",
          height: 48,
          width: SCREEN_WIDTH - 8,
          marginHorizontal: -4,
          borderRadius: 12,
        },
        style,
      ]}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color="#333"
        style={{ marginLeft: 4 }}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          { marginHorizontal: 4, height: 48, paddingLeft: 12, fontSize: 18 },
          style, 
        ]}
      />
    </View>
  );
}
