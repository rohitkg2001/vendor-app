import React from "react";
import { View } from "react-native";

import { P, Span } from "../text";
import { spacing, styles, typography } from "../../styles";
import Button from "../buttons/Button";

const ClickableCard2 = ({ title, subtitle, startDate, endDate, onView }) => {
  return (
    <View style={[styles.card, spacing.mv2, spacing.p2]}>
      <Span style={[typography.font14, typography.bold]}>{title}</Span>
      <P style={[typography.font12, typography.fontLato]}>{subtitle}</P>

      <View style={[spacing.mt1, styles.row]}>
        <View>
          <Span style={[typography.font12, typography.fontLato]}>
            Start Date
          </Span>
          <P style={[typography.font12, typography.fontLato]}>{startDate}</P>
        </View>
        <View>
          <Span style={[typography.font12, typography.fontLato]}>End Date</Span>
          <P style={[typography.font12, typography.fontLato]}>{endDate}</P>
        </View>
      </View>

      <Button
        style={[styles.btn, styles.bgPrimary, spacing.mt2]}
        onPress={onView}
      >
        View Details
      </Button>
    </View>
  );
};

export default ClickableCard2;
