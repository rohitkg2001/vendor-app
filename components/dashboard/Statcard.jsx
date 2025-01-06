import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Span, H1 } from "../text";
import { styles, LIGHT, spacing, ICON_LARGE } from "../../styles";

export default function StatCard({
  backgroundColor,
  tasks,
  status,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        spacing.mr2,
        spacing.mv2,
        spacing.p3,
        spacing.br2,
        { ...styles.cardHalfWidth, backgroundColor },
        style,
      ]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <View>
          <H1 style={styles.titleText}>{tasks}</H1>
          <Span>{status}</Span>
        </View>
        <Icon name="add-circle-outline" color={LIGHT} size={ICON_LARGE} />
      </View>
    </TouchableOpacity>
  );
}
