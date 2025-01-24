import { View, TouchableOpacity } from "react-native";
import { H3, H5, P } from "../text";
import {
  ICON_LARGE,
  PRIMARY_COLOR_TRANSPARENT,
  DARK,
  spacing,
  typography,
  LIGHT,
  styles,
  layouts,
  ICON_MEDIUM,
} from "../../styles";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardsArray({
  tasksCounts = [],
  installationCount,
  navigation,
}) {
  const { t } = useTranslation();
  return (
    <View
      style={[
        spacing.mt5,
        spacing.p3,
        spacing.br2,
        { elevation: 2, backgroundColor: PRIMARY_COLOR_TRANSPARENT },
      ]}
    >
      <H5 style={[spacing.mb3, typography.font20]}>{t("task_management")}</H5>
      <View style={styles.attendanceContainer}>
        {tasksCounts.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              spacing.mv4,
              styles.gridItem,
              spacing.bw1,
              spacing.br2,
              spacing.p4,
            ]}
            onPress={() => {
              if (item.label === "Installation") {
                navigation.navigate("taskScreen");
              }
            }}
          >
            <Icon name={item.icon} size={ICON_MEDIUM} color={DARK} />
            <P>{item.label}</P>
            <View
              style={[
                styles.bgPrimary,
                layouts.circle625,
                layouts.center,
                styles.notificationBadgeContainer,
                { right: 39, top: 4 },
              ]}
            >
              <P style={{ color: LIGHT, fontWeight: "bold" }}>
                {index !== 1 ? installationCount : 0}
              </P>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
