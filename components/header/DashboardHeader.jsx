// All import React native
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// import styles
import { H5, P, Span, H6 } from "../text";
import {
  ICON_MEDIUM,
  DARK,
  SCREEN_WIDTH,
  spacing,
  styles,
  layouts,
  typography,
} from "../../styles";

export default function DashboardHeader({
  dueTasks,
  greeting,
  firstName,
  navigation,
  notificationCount = 0,
}) {
  return (
    <View
      style={[
        styles.row,
        spacing.m2,
        { alignItems: "center", width: SCREEN_WIDTH - 16 },
      ]}
    >
      <View>
        <H6
          style={[typography.fontLato, typography.textBold, { maxWidth: 300 }]}
        >
          {greeting}, {firstName}
        </H6>

        <P style={[spacing.ml1, typography.fontLato]}>
          You have {dueTasks} due tasks Today
        </P>
      </View>
      <TouchableOpacity
        style={[
          layouts.circle12,
          layouts.center,
          spacing.bw05,
          spacing.br5,
          { position: "relative", top: 8 },
        ]}
        onPress={() => navigation.navigate("notificationScreen")}
      >
        <Icon name="notifications-outline" size={ICON_MEDIUM} color={DARK} />
        {notificationCount && (
          <View
            style={[
              styles.bgDanger,
              layouts.center,
              styles.notificationBadgeContainer,
            ]}
          >
            <Span
              style={[
                typography.textLight,
                typography.font16,
                { textAlign: "center" },
              ]}
            >
              {notificationCount}
            </Span>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
