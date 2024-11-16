import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { H6, P } from "../text";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";

export default function ClickableCard({
  item,
  handleViewDetails,
  isProject = false,
}) {
  return (
    <TouchableOpacity>
      <Card
        style={[
          spacing.mv1,
          {
            width: SCREEN_WIDTH - 16,
            backgroundColor: LIGHT,
            marginHorizontal: 8,
          },
        ]}
        onPress={() => handleViewDetails(item)}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            <H6 style={[typography.textBold]}>{item.siteName || item.id}</H6>
            <P style={{ fontSize: 14 }}>{item.location}</P>
            <P style={{ fontSize: 14 }}>{item.date}</P>
            <P style={{ fontSize: 14 }}>{item.amount}</P>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
