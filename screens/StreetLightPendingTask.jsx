import React, { useState, useEffect } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import { View } from "react-native";
import { spacing, styles, typography } from "../styles";
import { P, Span } from "../components/text";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { SET_POLE_NUMBER } from "../redux/constant";

const StreetLightPendingTask = ({ navigation }) => {
  const { t } = useTranslation();
  const [streetLightSites, setStreetLightSites] = useState([]);
  const { pendingStreetLights } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    Array.isArray(pendingStreetLights) &&
      setStreetLightSites(pendingStreetLights);
  }, [pendingStreetLights]);

  function formatString(input) {
    return input
      .split(" ") // Split by space
      .map((word) => word.substring(0, 3).toUpperCase()) // Get first 3 characters & uppercase
      .join("/"); // Join by '/'
  }

  const handleSurveyData = (data, isSurvey) => {
    const { district, block, panchayat, state } = data?.site;
    const pole_number = formatString(
      [state, district, block, panchayat].join(" ")
    );
    dispatch({ type: SET_POLE_NUMBER, payload: pole_number });
    navigation.navigate("startInstallation", {
      itemId: data.id,
      isSurvey,
    });
  };

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
            positiveAction={() => handleSurveyData(item, false)}
            positiveText="Submit"
            isNegativeButtonVisible={true}
            negativeText="Survey"
            negativeAction={() => handleSurveyData(item, true)}
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
