import React, { useState, useEffect } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import { View } from "react-native";
import { spacing, styles, typography } from "../styles";
import { P, Span, H5 } from "../components/text";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const StreetLightPendingTask = ({ navigation }) => {
  const { t } = useTranslation();
  const [streetLightSites, setStreetLightSites] = useState([]);
  const { pendingStreetLights } = useSelector((state) => state.tasks);

  useEffect(() => {
    Array.isArray(pendingStreetLights) &&
      setStreetLightSites(pendingStreetLights);
  }, [pendingStreetLights]);

  return (
    <ContainerComponent>
      <MyHeader title={t("Total Installation")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={streetLightSites}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            title={`${item.site?.panchayat} ${item.site?.block}`}
            subtitle={`${item.site?.district} - ${item.site?.state}`}
            isPositiveButtonVisible={true}
            positiveAction={() =>
              navigation.navigate("startInstallation", {
                itemId: item.id,
                isSurvey: false,
              })
            }
            positiveText="Submit"
            isNegativeButtonVisible={true}
            negativeText="Survey"
            negativeAction={() =>
              navigation.navigate("startInstallation", {
                itemId: item.id,
                isSurvey: true,
              })
            }
          >
            <View>
              <View style={[spacing.mt1, styles.row]}>
                <View>
                  <Span
                    style={[
                      typography.font12,
                      typography.fontLato,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    start date
                  </Span>
                  <P style={[typography.font12, typography.fontLato]}>
                    {item.start_date}
                  </P>
                </View>
                <View>
                  <Span
                    style={[
                      typography.font12,
                      typography.fontLato,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    end date
                  </Span>
                  <P style={[typography.font12, typography.fontLato]}>
                    {item.start_date}
                  </P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[{ flexGrow: 1 }]}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
};

export default StreetLightPendingTask;
