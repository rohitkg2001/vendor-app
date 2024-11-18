import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { H6, P } from "../text";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";

export default function ClickableCard({
  item,
  handleViewDetails,
  isProject = false,
  isRequisition = false,
  isSite = false,
  isPurchaseOrder = false,
}) {
  return (
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
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View style={{ flex: 1 }}>
          {isProject && (
            <>
              <H6 style={[typography.textBold]}>{item.projectName}</H6>
              <P style={{ fontSize: 14 }}>Duration: {item.duration}</P>
              <P style={{ fontSize: 14 }}>Status: {item.status}</P>
            </>
          )}
          {isSite && (
            <>
              <H6 style={[typography.textBold]}>{item.siteName || item.id}</H6>
              <P style={{ fontSize: 14 }}>
                {" "}
                {item.location},{item.dist}
              </P>
              {/* FIXME: */}
            </>
          )}
          {isPurchaseOrder && (
            <>
              <H6 style={[typography.textBold]}>{item.name}</H6>
              <H6 style={[typography.textBold]}>{item.id}</H6>
              <P style={{ fontSize: 14 }}>Price: {item.price}</P>
              <P style={{ fontSize: 14 }}>Quantity: {item.quantity}</P>
              <P style={{ fontSize: 14 }}>Total: {item.total}</P>
            </>
          )}
        </View>
      </View>
    </Card>
  );
}
