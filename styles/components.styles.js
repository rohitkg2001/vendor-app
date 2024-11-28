import { StyleSheet } from "react-native";
import {
  DANGER_COLOR,
  DARK,
  INFO_COLOR,
  LIGHT,
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  SCREEN_WIDTH,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "./constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT,
    alignItems: "center",
  },

  imageContainerImg: {
    width: 0.6 * SCREEN_WIDTH,
    height: 0.6 * SCREEN_WIDTH,
  },

  textInputField: {
    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
    borderRadius: 6,
    height: 54,
    fontSize: 18,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
  primaryButton: {
    marginVertical: 8,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  rightLink: {
    color: PRIMARY_COLOR,
    textAlign: "right",
    textDecorationLine: "underline",
    marginVertical: 12,
  },
  headerStyle: {
    width: SCREEN_WIDTH,
    borderBottomColor: "#6c6c6c",
    borderBottomWidth: 0.5,
    height: 54,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontWeight: "800",
    color: DARK,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardHalfWidth: {
    width: SCREEN_WIDTH / 2.15,
    height: SCREEN_WIDTH / 3,
    elevation: 2,
  },

  cardFullWidth: {
    width: SCREEN_WIDTH / 1.05,
    height: SCREEN_WIDTH / 3,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  picker: {
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 6,
  },
  chipButton: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
    margin: 4,
    width: SCREEN_WIDTH / 4,
  },
  btn: {
    marginVertical: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    flexDirection: "row",
  },
  bgDark: {
    backgroundColor: DARK,
  },
  bgLight: {
    backgroundColor: LIGHT,
  },
  bgInfo: {
    backgroundColor: INFO_COLOR,
  },
  bgDanger: {
    backgroundColor: DANGER_COLOR,
  },
  bgWarning: {
    backgroundColor: WARNING_COLOR,
  },
  bgSuccess: {
    backgroundColor: SUCCESS_COLOR,
  },
  bgPrimary: {
    backgroundColor: PRIMARY_COLOR,
  },
  bgPrimaryTransParent: {
    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
  },
  bgSecondary: {
    backgroundColor: SECONDARY_COLOR,
  },

  border: {
    borderWidth: 1,
  },

  fab: {
    elevation: 2,
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  bottom: {
    position: "absolute",
    bottom: 2,
  },
  fullWidth: {
    width: SCREEN_WIDTH,
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  radioInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "red",
    marginBottom: 20,
  },

  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 16,
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowBullet: {
    flexDirection: "row",
    alignItems: "center",
  },

  onlineDot: {
    position: "absolute",
    bottom: 14,
    right: 14,
    borderWidth: 4,
    borderColor: LIGHT,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    width: SCREEN_WIDTH - 40,
    margin: 4,
    marginVertical: 8,
    elevation: 2,
    backgroundColor: LIGHT,
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownText: {
    marginRight: 5,
    fontSize: 16,
  },
  iconCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    height: 100,
    minWidth: 120,
  },
  iconCardIcon: {
    marginBottom: 10,
  },
  iconCardText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: DARK,
  },
  // NotificationScreen,
  time: {
    fontSize: 12,
    color: "#020409",
    alignSelf: "center",
  },

  description: {
    fontSize: 14,
    color: "#666",
    fontWeight: "normal",
  },

  iconWrapper: {
    backgroundColor: PRIMARY_COLOR,
    padding: 6,
    borderRadius: 5,
    marginRight: 14,
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: PRIMARY_COLOR,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
  },
  documentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  documentName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    color: "#020409",
  },

  attendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  gridItem: {
    alignItems: "center",
    width: "30%",
  },

  label: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: LIGHT,
  },
  itemStyle: {
    padding: 4,
    marginTop: 4,
  },
  textInput: {
    width: 310,
    color: "#020409",
  },
  map: {
    height: SCREEN_WIDTH / 1.5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 55,
    height: 60,
  },
  removeImageButton: {
    position: "absolute",
    top: -5,
    right: -5,
  },
});
