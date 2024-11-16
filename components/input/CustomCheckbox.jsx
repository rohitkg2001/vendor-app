import React, { useState } from "react";
import { View } from "react-native";
import { Checkbox as PaperCheckbox } from "react-native-paper";
import { styles } from "../../styles/components.styles";
import { H5 } from "../text";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../styles/constant";

export default function CustomCheckbox({
  label,
  initialChecked = false, 
  onPress,
  ...textStyle
}) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handlePress = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onPress) {
      onPress(newCheckedState); 
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <PaperCheckbox
        status={isChecked ? "checked" : "unchecked"}
        color={isChecked ? PRIMARY_COLOR : SECONDARY_COLOR}
        onPress={handlePress}
        rippleColor={PRIMARY_COLOR}
      />
      {label && <H5 style={{ fontWeight: "bold", ...textStyle }}>{label}</H5>}
    </View>
  );
}
