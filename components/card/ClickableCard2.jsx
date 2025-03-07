import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { P, Span } from "../text";
import { spacing, styles, typography } from "../../styles";

const ClickableCard2 = ({
  // navigation,
  title,
  subtitle,
  submissionDate,
  endDate,
  onView,
  onSubmit,
  isSurvey,
  item,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.card, spacing.mv2, spacing.p2]}>
      <Span style={[typography.font14, typography.bold]}>{title}</Span>
      <P style={[typography.font12, typography.fontLato]}>{subtitle}</P>

      <View style={[spacing.mt1, styles.row]}>
        <View style={[spacing.mr4]}>
          <Span style={[typography.font12, typography.fontLato]}>
            Start Date
          </Span>
          <P style={[typography.font12, typography.fontLato]}>
            {submissionDate}
          </P>
        </View>
        <View>
          <Span style={[typography.font12, typography.fontLato]}>End Date</Span>
          <P style={[typography.font12, typography.fontLato]}>{endDate}</P>
        </View>
      </View>

      <View style={[spacing.mt2, styles.row, { justifyContent: "flex-end" }]}>
        {isSurvey && (
          <TouchableOpacity
            style={[styles.btn, styles.bgPrimary, spacing.mr2]}
            onPress={onSubmit}
          >
            <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
              Submit
            </Span>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.btn, styles.bgPrimary]}
          onPress={() => navigation.navigate("streetlightDetails", { item })}
        >
          <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
            View
          </Span>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClickableCard2;
