import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../buttons/Button";

import { P, Span } from "../text";
import { PRIMARY_COLOR, spacing, styles, typography } from "../../styles";

const ClickableCard2 = ({
  title,
  subtitle,
  isPositiveButtonVisible = false,
  positiveText,
  positiveAction,
  item,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.card, spacing.mv2, spacing.p2]}>
      <Span style={[typography.font14, typography.bold]}>{title}</Span>
      <P style={[typography.font12, typography.fontLato]}>{subtitle}</P>

      <P
        style={[
          typography.font12,
          typography.fontLato,
          spacing.mt1,
          spacing.p1,
          spacing.br1,
          { backgroundColor: "#ebf4fb" },
        ]}
      >
        Pole Number: {item.complete_pole_number}
      </P>

      <View style={[spacing.mt2, styles.row, { justifyContent: "flex-end" }]}>
        {isPositiveButtonVisible && (
          <Button
            style={{
              width: 80,
              padding: 8,
              borderRadius: 8,
              backgroundColor: PRIMARY_COLOR,
              marginRight: 10,
            }}
            onPress={positiveAction}
          >
            <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
              {positiveText}
            </Span>
          </Button>
        )}

        <TouchableOpacity
          style={{
            width: 80,
            padding: 8,
            borderRadius: 8,
            backgroundColor: PRIMARY_COLOR,
          }}
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
