import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  SECONDARY_COLOR,
  WARNING_COLOR,
  INFO_COLOR,
  DANGER_COLOR,
  SUCCESS_COLOR,
  LIGHT,
  DARK
} from "./constant";
import * as Font from 'expo-font'

import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
  fontLato: {
    fontFamily: 'lato_regular'
  },
  // Font family

  textPrimary: {
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    color: SECONDARY_COLOR,
  },
  textLight: {
    color: LIGHT,
  },
  textDark: {
    color: DARK,
  },
  textDanger: {
    color: DANGER_COLOR,
  },
  textInfo: {
    color: INFO_COLOR,
  },
  textWarning: {
    color: WARNING_COLOR,
  },
  textSuccess: {
    color: SUCCESS_COLOR,
  },
  textPrimaryTransparent: {
    color: PRIMARY_COLOR_TRANSPARENT,
  },
  // Typography colors

  textBold: {
    fontWeight: "bold",
  },
  text600: {
    fontWeight: "600",
  },
  text400: {
    fontWeight: '400'
  },
  textNormal: {
    fontWeight: 'normal'
  },
  // Font weights

  font10: {
    fontSize: 10,
  },
  font12: {
    fontSize: 12,
  },
  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font20: {
    fontSize: 20,
  },
  // Sizes of fonts

  textCapitalize: {
    textTransform: "capitalize",
  },
  textLower: {
    textTransform: 'lowercase'
  },
  textUpper: {
    textTransform: 'uppercase'
  },
  // Text transforms

  textLeft: {
    textAlign: 'left'
  },
  textJustify: {
    textAlign: 'justify'
  },
  textCenter: {
    textAlign: 'center'
  },
  textRight: {
    textAlign: 'right'
  }
  // Alignment
});