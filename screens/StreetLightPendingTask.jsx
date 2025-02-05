import React, { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import { View } from "react-native";
import { spacing, styles, typography } from "../styles";
import { P, Span, H5 } from "../components/text";

import { useTranslation } from "react-i18next";
import { fakeStreetLights } from "../utils/faker";

const StreetLightPendingTask = ({ navigation }) => {
  const { t } = useTranslation();
  const [streetLightSites, setStreetLightSites] = useState(fakeStreetLights);

  return (
    <ContainerComponent>
      <MyHeader title={t("Total Installation")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={streetLightSites}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            title={`${item.panchayat} ${item.block}`}
            subtitle={`${item.district} - ${item.state}`}
            isPositiveButtonVisible={true}
            positiveAction={() =>
              navigation.navigate("startInatallationScreen", {
                itemId: item.id,
                isSurvey: false,
                panchayat: item.panchayat,
              })
            }
            positiveText="Submit"
            isNegativeButtonVisible={true}
            negativeText="Survey"
            negativeAction={() =>
              navigation.navigate("startInatallationScreen", {
                itemId: item.id,
                isSurvey: true,
                panchayat: item.panchayat,
              })
            }
          >
            <View>
              <View style={[spacing.mt1, styles.row]}>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    start date
                  </Span>
                  <P style={[typography.font12]}>{item.start_date}</P>
                </View>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    end date
                  </Span>
                  <P style={[typography.font12]}>{item.start_date}</P>
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
