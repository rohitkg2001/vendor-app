import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { P, Span } from "../text";
import { PRIMARY_COLOR, spacing, styles, typography } from "../../styles";

const ClickableCard2 = ({
  // navigation,
  title,
  subtitle,
  submissionDate,
  endDate,
  onSubmit,
  isSurvey,
  item,
}) => {
  const navigation = useNavigation();
  useEffect(() => {
    console.log(item);
  }, []);
  return (
    <View style={[styles.card, spacing.mv2, spacing.p2]}>
      <Span style={[typography.font14, typography.bold]}>{title}</Span>
      <P style={[typography.font12, typography.fontLato]}>{subtitle}</P>

      {/* <View style={[spacing.mt1, styles.row]}>
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
      </View> */}

      {/* Display Complete Pole Number */}
      <P
        style={[
          typography.font12,
          typography.fontLato,
          spacing.mt1,
          spacing.p1,
          spacing.br1,
          {
            backgroundColor: "#ebf4fb",
          },
        ]}
      >
        Pole Number: {item.complete_pole_number}
      </P>

      <View style={[spacing.mt2, styles.row, { justifyContent: "flex-end" }]}>
        {isSurvey && (
          <TouchableOpacity
            style={{
              width: 80,
              padding: 8,
              borderRadius: 8,
              backgroundColor: PRIMARY_COLOR,
              marginRight: 10,
            }}
            onPress={onSubmit}
          >
            <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
              Submit
            </Span>
          </TouchableOpacity>
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
