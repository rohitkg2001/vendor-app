import React, { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";


import { useTranslation } from "react-i18next";

const StreetLightPendingTask = ({ route }) => {
  const { t } = useTranslation();
  const [streetLightSites, setStreetLightSites] = useState([])

  return (
    <ContainerComponent>
      <MyHeader title={t("Total Installation")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={streetLightSites}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            title={item.site?.site_name}
            subtitle={item.site?.location}
            isPositiveButtonVisible={true}
            positiveAction={() =>
              navigation.navigate("surveyScreen", { itemId: item.id, isSurvey: false })
            }
            positiveText="Submit"
            isNegativeButtonVisible={true}
            negativeText="Survey"
            negativeAction={() =>
              navigation.navigate("surveyScreen", { itemId: item.id, isSurvey: true })
            }
          >
            <View>
              <H5 style={[typography.font20]}>{item.activity}</H5>
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
