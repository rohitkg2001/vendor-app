import { View, TextInput } from "react-native";
import { P } from "../text";
import { spacing, styles, SCREEN_WIDTH, typography, PRIMARY_COLOR } from "../../styles";

export default function MyTextInput({ title, onChangeText, height = 54, type, multiline = false, ...props }) {
  return (
    <View style={spacing.mb2}>
      <P style={typography.fontLato}>{title}</P>
      <TextInput
        onChangeText={onChangeText}
        keyboardType={type}
        style={[styles.textInputField, spacing.mv1, spacing.pl3, typography.fontLato, {
          width: SCREEN_WIDTH - 16, height: height, textAlignVertical: multiline ? 'top' : 'center',
        }]} // Align text based on multiline }]}
        cursorColor={PRIMARY_COLOR}
        title
        value
        icon
        {...props}
      />
    </View>
  );
}
