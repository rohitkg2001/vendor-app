import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { P, Span } from "./text";
import Avatar from "./Avatar";
import {
  styles,
  layouts,
  spacing,
  typography,
  SCREEN_WIDTH,
  ICON_SMALL,
} from "../styles";

export default function ProfileCard({ imageUri, name, contactNo, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.rowItem, spacing.p3, { height: 120, width: SCREEN_WIDTH }]}
      onPress={onPress}
    >
      <Avatar avatar={imageUri} name={name} />
      <View style={layouts.flex1}>
        <P style={typography.textBold}>{name}</P>
        <Span>{contactNo}</Span>
      </View>
      <Icon name="chevron-forward-outline" size={ICON_SMALL} color="#333" />
    </TouchableOpacity>
  );
}
