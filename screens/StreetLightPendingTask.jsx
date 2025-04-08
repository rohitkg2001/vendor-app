// import react native
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import ClickableCard2 from "../components/card/ClickableCard2";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";
import { spacing, styles, typography } from "../styles";
import { P, Span } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Tabs from "../components/Tabs";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { download, getInstalledPoles } from "../redux/actions/taskActions";

const StreetLightPendingTask = ({ navigation }) => {
  const { t } = useTranslation();
  const [streetLightSites, setStreetLightSites] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search input
  const { pendingStreetLights, surveyedStreetLights, installedStreetLights } =
    useSelector((state) => state.tasks);
  const { id } = useSelector((state) => state.vendor);
  const { setApprovedCount } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    Array.isArray(pendingStreetLights) &&
      setStreetLightSites(pendingStreetLights);
    updateTabCounts(pendingStreetLights);
  }, [pendingStreetLights]);

  const handleSurveyData = async (item, isSurvey) => {
    try {
      const response = await axios.post("https://slldm.com/api/pole-details", {
        pole_id: item.pole_id,
      });
      if (response.status === 200) {
        const { data } = response;
        navigation.navigate("submitInstallation", {
          data: {
            ...data,
            complete_pole_number: item.complete_pole_number,
            beneficiaryName: item.beneficiary,
            locationRemarks: item.remarks,
            panchayat: item.panchayat,
            block: item.block,
            pole_number: item.pole_number,
            ward: item.ward,
          },
          isSurvey,
        });
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
    InApproval: 0,
    Approved: 0,
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

  useEffect(() => {
    dispatch(getInstalledPoles(id));
  }, [dispatch, id]);

const updateTabCounts = () => {
  setTabCounts({
    All: pendingStreetLights?.length || 0,
    Survey: surveyedStreetLights?.length || 0,
    InApproval:
      installedStreetLights?.filter((task) => task.status === "Pending")
        .length || 0, 
    Approved:
      installedStreetLights?.filter((task) => task.status === "Approved")
        .length || 0,
    Rejected:
      pendingStreetLights?.filter((task) => task.status === "Rejected")
        .length || 0,
  });
};


const filterData = (tab) => {
  if (tab === "Survey") {
    setFilteredData(surveyedStreetLights || []);
  } else if (tab === "InApproval") {
    setFilteredData(
      installedStreetLights?.filter((task) => task.status === "Pending") || []
    ); // Filter based on Pending status for InApproval tab
  } else if (tab === "Approved") {
    setFilteredData(
      installedStreetLights?.filter((task) => task.status === "Approved") || []
    ); // Filter based on Approved status for Approved tab
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
  };

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

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

      <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        style={{ marginHorizontal: 10 }}
      />

      <MyFlatList
        data={filteredData}
        renderItem={({ item, index }) => {
          if (["Survey", "InApproval", "Approved"].includes(activeTab)) {
            return (
              <ClickableCard2
                key={index}
                title={`${item.panchayat} ${item.block}`}
                subtitle={`${item.district} - ${item.state}`}
                item={item}
                // isPositiveButtonVisible={true}
                isPositiveButtonVisible={activeTab !== "InApproval"}
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
            ></View>

            <Tabs
              tabs={[
                `All ${tabCounts.All}`,
                `Surveyed poles ${tabCounts.Survey}`,
                `InApproval ${tabCounts.InApproval}`,
                `Approved ${tabCounts.Approved}`,
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
        showSearchBar={false}
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
