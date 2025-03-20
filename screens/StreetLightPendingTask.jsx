import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import ClickableCard2 from "../components/card/ClickableCard2";
import { View, Text } from "react-native";
import {
  spacing,
  styles,
  typography,
  SCREEN_WIDTH,
  ICON_MEDIUM,
  LIGHT,
} from "../styles";
import { P, Span } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Tabs from "../components/Tabs";
import Button from "../components/buttons/Button";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_POLE_NUMBER,
  SET_BENEFICIARY_NAME,
  SET_LOCATION_REMARKS,
} from "../redux/constant";

const StreetLightPendingTask = ({ navigation }) => {
  const { t } = useTranslation();
  const [streetLightSites, setStreetLightSites] = useState([]);
  const [surveyCounts, setSurveyCounts] = useState({});
  // const [completedSurveys, setCompletedSurveys] = useState({});
  const { pendingStreetLights, surveyedStreetLights, installedStreetLights } =
    useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    Array.isArray(pendingStreetLights) &&
      setStreetLightSites(pendingStreetLights);
    updateTabCounts(pendingStreetLights);
  }, [pendingStreetLights]);

  function formatString(input) {
    return input
      .split(" ") // Split by space
      .map((word) => word.substring(0, 3).toUpperCase()) // Get first 3 characters & uppercase
      .join("/"); // Join by '/'
  }

  // Load survey count from AsyncStorage
  // useEffect(() => {
  //   const loadSurveyCounts = async () => {
  //     try {
  //       const storedCounts = await AsyncStorage.getItem("surveyCounts");
  //       if (storedCounts) {
  //         setSurveyCounts(JSON.parse(storedCounts));
  //       }
  //     } catch (error) {
  //       console.error("Failed to load survey counts:", error);
  //     }
  //   };
  //   loadSurveyCounts();
  // }, []);

  const handleSurveyData = (
    data,
    isSurvey,
    beneficiaryName,
    locationRemarks
  ) => {
    if (!data?.site) {
      console.error("Error: site data is missing", data);
      return;
    }

    const { district, block, panchayat, state } = data?.site;
    const pole_number = formatString(
      [state, district, block, panchayat].join(" ")
    );
    dispatch({ type: SET_POLE_NUMBER, payload: pole_number });
    dispatch({ type: SET_BENEFICIARY_NAME, payload: beneficiaryName });
    dispatch({ type: SET_LOCATION_REMARKS, payload: locationRemarks });

    // Update survey count for this pole
    // setSurveyCounts((prevCounts) => {
    //   const updatedCounts = {
    //     ...prevCounts,
    //     [data.pole_id]: (prevCounts[data.pole_id] || 0) + 1,
    //   };

    //   // Save updated counts in AsyncStorage
    //   AsyncStorage.setItem("surveyCounts", JSON.stringify(updatedCounts)).catch(
    //     (error) => console.error("Failed to save survey counts:", error)
    //   );

    //   return updatedCounts;
    // });

    navigation.navigate("startInstallation", {
      itemId: data.id,
      isSurvey,
    });
  };

  const [activeTab, setActiveTab] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [tabCounts, setTabCounts] = useState({
    All: 0,
    Survey: 0,
    Installed: 0,
    Approved: 0,
    InApproved: 0,
    Rejected: 0,
  });

  useEffect(() => {
    updateTabCounts();
    filterData(activeTab);
  }, [
    pendingStreetLights,
    surveyedStreetLights,
    installedStreetLights,
    activeTab,
  ]);

  const updateTabCounts = () => {
    setTabCounts({
      All: pendingStreetLights?.length || 0,
      Survey: surveyedStreetLights?.length || 0,
      Installed: installedStreetLights?.length || 0,
      Approved:
        pendingStreetLights?.filter((task) => task.status === "Approved")
          .length || 0,
      InApproved:
        pendingStreetLights?.filter((task) => task.status === "InApproved")
          .length || 0,
      Rejected:
        pendingStreetLights?.filter((task) => task.status === "Rejected")
          .length || 0,
    });
  };

  const filterData = (tab) => {
    if (tab === "Survey") {
      // Both "Survey" and "Surveyed poles" should show surveyed data
      setFilteredData(surveyedStreetLights || []);
    } else if (tab === "Installed") {
      setFilteredData(installedStreetLights || []);
    } else if (tab === "Approved") {
      setFilteredData(
        pendingStreetLights?.filter((task) => task.status === "Approved") || []
      );
    } else if (tab === "InApproved") {
      setFilteredData(
        pendingStreetLights?.filter((task) => task.status === "InApproved") ||
          []
      );
    } else if (tab === "Rejected") {
      setFilteredData(
        pendingStreetLights?.filter((task) => task.status === "Rejected") || []
      );
    } else {
      setFilteredData(pendingStreetLights || []);
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("Total Installation")} isBack={true} hasIcon={true} />

      <MyFlatList
        data={filteredData}
        renderItem={({ item, index }) => {
          if (["Survey", "Installed"].includes(activeTab)) {
            return (
              <ClickableCard2
                key={index}
                title={`${item.panchayat} ${item.block}`}
                subtitle={`${item.district} - ${item.state}`}
                submissionDate={item.updated_at}
                endDate={item.end_date}
                onView={() => handleSurveyData(item, true)}
                isSurvey={activeTab === "Survey"}
                item={item}
              />
            );
          } else {
            return (
              <ClickableCard1
                key={index}
                title={`${item.site?.panchayat} ${item.site?.block} (Panchayat)`}
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
                      <Span style={[typography.font12, typography.fontLato]}>
                        Surveyed pole
                      </Span>
                      <P style={[typography.font12, typography.fontLato]}>
                        {`${item.site?.number_of_surveyed_poles}`}
                      </P>
                    </View>
                    <View>
                      <Span style={[typography.font12, typography.fontLato]}>
                        Installed pole
                      </Span>
                      <P style={[typography.font12, typography.fontLato]}>
                        {item.site.number_of_installed_poles}
                      </P>
                    </View>
                  </View>
                  <View style={[spacing.mt1, styles.row]}>
                    <View>
                      <Span style={[typography.font12, typography.fontLato]}>
                        Start Date
                      </Span>
                      <P style={[typography.font12, typography.fontLato]}>
                        {item.start_date}
                      </P>
                    </View>
                    <View>
                      <Span style={[typography.font12, typography.fontLato]}>
                        End Date
                      </Span>
                      <P style={[typography.font12, typography.fontLato]}>
                        {item.end_date}
                      </P>
                    </View>
                  </View>
                </View>
              </ClickableCard1>
            );
          }
        }}
        keyExtractor={(item) => item.pole_id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={() => (
          <View>
            <View
              style={[
                spacing.mv4,
                styles.row,
                spacing.mh1,
                { alignItems: "center" },
              ]}
            >
              <SearchBar
                placeholder="Search"
                style={{ width: SCREEN_WIDTH - 80 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
                onPress={() => setShowBottomSheet(true)}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>

            <Tabs
              tabs={[
                `All ${tabCounts.All}`,
                `Surveyed poles ${tabCounts.Survey}`,
                `Installed ${tabCounts.Installed}`,
                `Approved ${tabCounts.Approved}`,
                `InApproved ${tabCounts.InApproved}`,
                `Rejected ${tabCounts.Rejected}`,
              ]}
              onTabPress={(tabLabel) => {
                // Map "Surveyed poles" to "Survey" for internal state
                if (tabLabel.startsWith("Surveyed")) {
                  setActiveTab("Survey"); // Set activeTab to "Survey" for filtering
                } else {
                  setActiveTab(tabLabel.split(" ")[0]); // Set activeTab to the actual tab name
                }
              }}
              activeTab={activeTab}
            />
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
};

export default StreetLightPendingTask;
