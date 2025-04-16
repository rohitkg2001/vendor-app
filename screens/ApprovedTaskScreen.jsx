import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import CardFullWidth from "../components/card/CardFullWidth";
import { spacing, styles, typography } from "../styles";
import { P } from "../components/text";
import { useNavigation } from "@react-navigation/native";

export default function ApprovedTaskScreen() {
  const navigation = useNavigation();

  const installedStreetLights = useSelector(
    (state) => state.tasks?.installedStreetLights || []
  );

  const approvedTasks =
    installedStreetLights?.filter((task) => task.status === "Approved") || [];

  return (
    <ContainerComponent>
      <MyHeader isBack title="Approved Tasks" hasIcon />
      <ScrollView contentContainerStyle={[spacing.mh2]}>
        {approvedTasks.length > 0 ? (
          approvedTasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("streetlightDetails", { item: task })
              }
            >
              <CardFullWidth backgroundColor={"#d5f5e3"}>
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

                {/* Labels for Beneficiary and Status */}
                <View style={[spacing.mt2]}>
                  <P style={[typography.font12, typography.fontLato]}>
                    Beneficiary
                  </P>
                </View>

                {/* Values for Beneficiary and Status */}
                <View style={[styles.row]}>
                  <P>{task.beneficiary || "N/A"}</P>
                  <P
                    style={[
                      typography.font14,
                      typography.fontLato,
                      typography.textBold,
                      { color: "green" },
                    ]}
                  >
                    {task.status}
                  </P>
                </View>
              </CardFullWidth>
            </TouchableOpacity>
          ))
        ) : (
          <P style={[typography.font14, typography.fontLato]}>
            No approved tasks found.
          </P>
        )}
      </ScrollView>
    </ContainerComponent>
  );
}
