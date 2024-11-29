import { View, TextInput } from "react-native";
import { H5 } from "../text";
import { spacing, styles, SCREEN_WIDTH } from "../../styles";
import { PRIMARY_COLOR } from "../../styles/constant";

export default function MyTextInput({ title, onChangeText, height = 54, type, ...props }) {
  return (
    <View style={spacing.mb2}>
      <H5>{title}</H5>
      <TextInput
        onChangeText={onChangeText}
        keyboardType={type}
        style={[styles.textInputField, spacing.mv1, spacing.pl3, { width: SCREEN_WIDTH - 28, height: height }]}
        cursorColor={PRIMARY_COLOR}
        title
        value
        icon
        {...props}
      />
    </View>
  );
}
