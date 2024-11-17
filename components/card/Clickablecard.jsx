import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { H6, P } from "../text";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";

export default function ClickableCard({
  item,
  handleViewDetails,
  isProject = false, 
  isRequisition = false, 
}) {
  return (
    <TouchableOpacity onPress={() => handleViewDetails(item)}>
      <Card
        style={[
          spacing.mv1,
          {
            width: SCREEN_WIDTH - 16,
            backgroundColor: LIGHT,
            marginHorizontal: 8,
          },
        ]}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            {/* Render project data if isProject is true */}
            {isProject ? (
              <>
                <H6 style={[typography.textBold]}>{item.projectName}</H6>
                <P style={{ fontSize: 14 }}>Duration: {item.duration}</P>
                <P style={{ fontSize: 14 }}>Status: {item.status}</P>
                <P style={{ fontSize: 14 }}>Budget: {item.budget}</P>{" "}
                {/* Project Budget */}
              </>
            ) : isRequisition ? (
              // Render requisition data if isRequisition is true
              <>
                <H6 style={[typography.textBold]}>{item.requisitionName}</H6>
                <P style={{ fontSize: 14 }}>Requestor: {item.requestor}</P>
                <P style={{ fontSize: 14 }}>Amount: {item.amount}</P>
                <P style={{ fontSize: 14 }}>Date: {item.date}</P>{" "}
                {/* Requisition date */}
                <P style={{ fontSize: 14 }}>Status: {item.status}</P>
              </>
            ) : (
              // Render requirement data by default if neither isProject nor isRequisition is true
              <>
                <H6 style={[typography.textBold]}>{item.siteName}</H6>
                <P style={{ fontSize: 14 }}>Location: {item.location}</P>
                <P style={{ fontSize: 14 }}>Dist: {item.dist}</P>
              </>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
