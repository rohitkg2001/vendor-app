import { View } from "react-native";
import { spacing, styles } from "../../styles";

export default function CardFullWidth({ backgroundColor, children, style }) {
  return (
    <View
      style={[
        spacing.mv2,
        spacing.p3,
        spacing.bw05,
        { ...styles.cardFullWidth, backgroundColor },
        spacing.br2,
        style, // Merge the passed style here
      ]}
    >
      {children}
    </View>
  );
}
