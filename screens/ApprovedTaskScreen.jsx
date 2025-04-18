import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import CardFullWidth from "../components/card/CardFullWidth";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { P } from "../components/text";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ApprovedTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();

  const type = route.params?.type || "Approved";

  const installedStreetLights = useSelector(
    (state) => state.tasks?.installedStreetLights || []
  );

  const filteredTasks =
    installedStreetLights?.filter((task) => task.status === type) || [];

  const headerTitle =
    type === "Approved" ? t("Approved Tasks") : t("Rejected Tasks");

  return (
    <ContainerComponent>
      <MyHeader isBack title={headerTitle} hasIcon />
      <ScrollView contentContainerStyle={[spacing.mh2]}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("streetlightDetails", { item: task })
              }
            >
              <CardFullWidth
                backgroundColor={type === "Approved" ? "#d5f5e3" : "#f5b7b1"}
              >
                <P style={[typography.font14, typography.fontLato]}>
                  Pole Number: {task.complete_pole_number || "N/A"}
                </P>

                <View style={[styles.row]}>
                  <P style={[typography.font12, typography.fontLato]}>
                    Project Manager
                  </P>
                  <P style={[typography.font12, typography.fontLato]}>
                    Site Engineer
                  </P>
                </View>

                <View style={[styles.row]}>
                  <P>{task.project_manager_name || "N/A"}</P>
                  <P>{task.site_engineer_name || "N/A"}</P>
                </View>

                <View style={[spacing.mt2]}>
                  <P style={[typography.font12, typography.fontLato]}>
                    Beneficiary
                  </P>
                </View>

                <View style={[styles.row]}>
                  <P>{task.beneficiary || "N/A"}</P>
                  <P
                    style={[
                      typography.font14,
                      typography.fontLato,
                      typography.textBold,
                      { color: type === "Approved" ? "green" : "red" },
                    ]}
                  >
                    {task.status}
                  </P>
                </View>
              </CardFullWidth>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image
              source={require("../assets/norecode.png")}
              style={{ height: SCREEN_WIDTH / 2, width: SCREEN_WIDTH / 2 }}
              resizeMode="contain"
            />
            <P style={[typography.font14, typography.fontLato, spacing.mt3]}>
              No {type.toLowerCase()} tasks found.
            </P>
          </View>
        )}
      </ScrollView>
    </ContainerComponent>
  );
}
