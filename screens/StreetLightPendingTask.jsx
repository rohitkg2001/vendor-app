import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import ClickableCard2 from "../components/card/ClickableCard2";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";
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
  SET_CONTACT_NUMBER,
} from "../redux/constant";
import { download } from "../redux/actions/taskActions";

import * as XLSX from "xlsx";
// import { writeFile, DocumentDirectoryPath } from "react-native-fs";

const StreetLightPendingTask = ({ navigation }) => {
  const { t } = useTranslation();
  const [streetLightSites, setStreetLightSites] = useState([]);
  const { pendingStreetLights, surveyedStreetLights, installedStreetLights } =
    useSelector((state) => state.tasks);

  const { id } = useSelector((state) => state.vendor);

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

  const handleSurveyData = async (item, isSurvey) => {
    console.log(`Pole Id is ${item.pole_id}`);

    try {
      const response = await axios.post("https://slldm.com/api/pole-details", {
        pole_id: item.pole_id,
      });

      if (response.status === 200) {
        const { data } = response;
        navigation.navigate("submitInstallation", { data, isSurvey });
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
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

  const [snackbar, setShowSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleExport = async () => {
    console.log(id);
    const status = await download(id);
    console.log(status);
    // if (status) {
    //   setShowSnackbar("File downloaded successfully");
    // } else {
    //   setShowSnackbar("There was a problem");
    // }
  };

  return (
    <ContainerComponent>
      <MyHeader
        title={t("Total Installation")}
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
        menuItems={[
          {
            title: "Export to Excel",
            onPress: handleExport,
          },
        ]}
      />

      <MyFlatList
        data={filteredData}
        renderItem={({ item, index }) => {
          if (["Survey", "Installed"].includes(activeTab)) {
            return (
              <ClickableCard2
                key={index}
                title={`${item.panchayat} ${item.block}`}
                subtitle={`${item.district} - ${item.state}`}
                onView={() => handleSurveyData(item, true)}
                item={item}
                isPositiveButtonVisible={true}
                positiveAction={() => handleSurveyData(item, false)}
                positiveText="Submit"
              />
            );
          } else {
            return (
              <ClickableCard1
                key={index}
                title={`${item.site?.panchayat} ${item.site?.block} (Panchayat)`}
                subtitle={`${item.site?.district} - ${item.site?.state}`}
                // isPositiveButtonVisible={true}
                // positiveAction={() => handleSurveyData(item, false)}
                // positiveText="Submit"
                isNegativeButtonVisible={true}
                negativeText="Survey"
                negativeAction={() => handleSurveyData(item, true)}
              >
                <View>
                  <View style={[spacing.mt1, styles.row]}>
                    {/* Left side for other content (if needed) */}
                    <View style={{ flex: 1 }}></View>

                    {/* Right side for both Surveyed and Installed poles */}
                    <View style={{ alignItems: "flex-end", marginTop: -70 }}>
                      {/* Surveyed Pole */}
                      <View style={{ marginBottom: 5 }}>
                        <Span style={[typography.font12, typography.fontLato]}>
                          Surveyed pole
                        </Span>
                        <P
                          style={[
                            typography.font12,
                            typography.fontLato,
                            { marginLeft: 30 },
                          ]}
                        >
                          {`${item.site?.number_of_surveyed_poles}`} /
                          {`${item.site?.total_poles}`}
                        </P>
                      </View>

                      {/* Installed Pole */}
                      <View>
                        <Span style={[typography.font12, typography.fontLato]}>
                          Installed pole
                        </Span>
                        <P
                          style={[
                            typography.font12,
                            typography.fontLato,
                            { marginLeft: 30 },
                          ]}
                        >
                          {`${item.site?.number_of_installed_poles}`}/
                          {`${item.site?.total_poles}`}
                        </P>
                      </View>
                    </View>
                  </View>

                  <View style={[spacing.mt1, styles.row]}>
                    <View style={[{ position: "absolute", top: -15 }]}>
                      <Span style={[typography.font12, typography.fontLato]}>
                        Start Date
                      </Span>
                      <P style={[typography.font12, typography.fontLato]}>
                        {item.start_date}
                      </P>
                    </View>
                    <View
                      style={[{ position: "absolute", left: 80, top: -15 }]}
                    >
                      {" "}
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
                let normalizedTab = tabLabel.startsWith("Surveyed")
                  ? "Survey"
                  : tabLabel.split(" ")[0];
                setActiveTab(normalizedTab);
              }}
              activeTab={
                activeTab === "Survey"
                  ? `Surveyed poles ${tabCounts.Survey}`
                  : activeTab
              }
            />
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
      {/* Snackbar Component */}
      <Snackbar
        visible={snackbar.open}
        duration={8000}
        onDismiss={() => setShowSnackbar({ ...snackbar, open: false })}
        action={{
          label: "Close",
          onPress: () => setShowSnackbar({ ...snackbar, open: false }),
        }}
      >
        {snackbar.message}
      </Snackbar>
    </ContainerComponent>
  );
};

export default StreetLightPendingTask;
