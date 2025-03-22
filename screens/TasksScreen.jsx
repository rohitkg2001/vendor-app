import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";

import { useTranslation } from "react-i18next";
import moment from "moment"; // Import moment.js for date comparison

// import components
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import DashboardFilter from "../components/filters/DashboardFilter";
import ClickableCard1 from "../components/card/ClickableCard1";
import Tabs from "../components/Tabs";
import SearchBar from "../components/input/SearchBar";
import useExcelExport from "../hooks/useExcelExport";

// import Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, getTaskById } from "../redux/actions/taskActions";

// import styles
import { H5, H6, P, Span } from "../components/text";
import { spacing, styles, typography } from "../styles";

export default function TasksScreen({ navigation }) {
  const { t } = useTranslation();
  const { vendor, tasks } = useSelector((state) => ({
    vendor: state.vendor,
    tasks: state.tasks.tasks,
  }));
  const dispatch = useDispatch();

  const [tabCounts, setTabCounts] = useState({
    All: 0,
    Pending: 0,
    "In Progress": 0,
    Completed: 0,
    Rejected: 0,
  });

  const [filteredTasks, setFilteredTasks] = useState([]); // State to store filtered tasks
  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState(""); // State for search input

  const [dateFilter, setDateFilter] = useState({
    type: "All",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (vendor?.id) {
      dispatch(getAllTasks(vendor.id));
    }
  }, [vendor?.id, dispatch]);

  useEffect(() => {
    const counts = {
      All: tasks.length,
      Pending: tasks.filter((task) => task.status === "Pending").length,
      "In Progress": tasks.filter((task) => task.status === "In Progress")
        .length,
      Completed: tasks.filter((task) => task.status === "Completed").length,
      Rejected: tasks.filter((task) => task.status === "Rejected").length,
    };
    setTabCounts(counts);
    filterTasks(activeTab, searchText, dateFilter); // Re-filter tasks when tasks or search text or date filter changes
  }, [tasks, activeTab, searchText, dateFilter]); // Added dateFilter as a dependency

  const filterTasks = (tab, query = "", dateFilter) => {
    let filtered = tasks.filter((task) => task.status === tab || tab === "All");

    // Apply date filter
    if (dateFilter.type !== "All") {
      const startDate = dateFilter.startDate
        ? moment(dateFilter.startDate)
        : null;
      const endDate = dateFilter.endDate ? moment(dateFilter.endDate) : null;

      filtered = filtered.filter((task) => {
        const taskStartDate = moment(task.start_date);
        const taskEndDate = moment(task.end_date);

        if (dateFilter.type === "Today") {
          return taskStartDate.isSame(moment(), "day");
        } else if (dateFilter.type === "This Month") {
          return (
            taskStartDate.isSameOrAfter(moment().startOf("month")) &&
            taskStartDate.isBefore(moment().endOf("month"))
          );
        } else if (dateFilter.type === "Custom" && startDate && endDate) {
          return taskStartDate.isBetween(startDate, endDate, null, "[]");
        }
        return true;
      });
    }

    // Apply search filter based on the query
    if (query) {
      filtered = filtered.filter(
        (task) =>
          task.site?.site_name.toLowerCase().includes(query.toLowerCase()) ||
          task.site?.breda_sl_no.includes(query) // Search by name or code
      );
    }
    filtered.sort((a, b) => {
      const priority = {
        Pending: 1,
        "In Progress": 2,
        Completed: 3,
        Rejected: 4,
      };
      return priority[a.status] - priority[b.status];
    });

    setFilteredTasks(filtered);
  };
  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const handleTabChange = (selectedTab) => {
    const tabName = selectedTab.split(" (")[0];
    setActiveTab(tabName);
    filterTasks(tabName, searchText, dateFilter); // Re-filter when the tab changes
  };

  const setIDAndDispatch = async (id) => {
    await dispatch(getTaskById(id));
    navigation.navigate("taskDetail");
  };

  const { handleExport } = useExcelExport();

  return (
    <ContainerComponent>
      <MyHeader
        title={t("task_list")}
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
        menuItems={[
          {
            title: "Export to Excel",
            // onPress: () => console.log("Export to Excel"),
            onPress: () => handleExport(filteredTasks),
          },
        ]}
      />
      <DashboardFilter updateDateFilter={setDateFilter} />

      <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        style={{ marginHorizontal: 10 }}
      />

      <MyFlatList
        data={filteredTasks}
        keyboardShouldPersistTaps="always" // Ensures taps don't close search
        keyboardDismissMode="none"
        renderItem={({ item, index }) => {
          const isCompleted = item.status === "Completed"; // Assuming "status" is the field that indicates completion
          const endDate = moment(item.end_date).startOf("day"); // Ignore time part
          const isPastDue =
            !isCompleted && endDate.isBefore(moment().startOf("day"), "day");
          let borderColor = "transparent"; // Default to transparent if completed
          if (!isCompleted) {
            borderColor = isPastDue ? "red" : "green"; // Red if past due, green if ongoing
          }

          return (
            <ClickableCard1
              key={index}
              title={item.site?.site_name}
              subtitle={item.site?.location}
              isPositiveButtonVisible={
                item.status !== "Completed" && item.status !== "In Progress"
              }
              positiveAction={() =>
                navigation.navigate("surveyScreen", {
                  itemId: item.id,
                  isSurvey: false,
                })
              }
              positiveText="Submit"
              isNegativeButtonVisible={
                item.status !== "Completed" && item.status !== "In Progress"
              }
              negativeText="Survey"
              negativeAction={() =>
                navigation.navigate("surveyScreen", {
                  itemId: item.id,
                  isSurvey: true,
                })
              }
              isViewButtonVisible={
                item.status === "Completed" || item.status === "In Progress"
              }
              viewAction={() => setIDAndDispatch(item.id)}
              viewText="View"
              borderColor={borderColor}
            >
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    alignItems: "flex-end",
                    bottom: 70,
                  }}
                >
                  <Span
                    style={[
                      typography.font10,
                      typography.fontLato,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    breda sl no
                  </Span>

                  <H5
                    style={[
                      typography.font16,
                      typography.fontLato,
                      spacing.mr4,
                    ]}
                  >
                    {item.site?.breda_sl_no}
                  </H5>
                </View>

                <H6 style={[typography.font14, typography.fontLato]}>
                  {item.activity}
                </H6>

                <View style={[spacing.mt1, styles.row, spacing.mv2]}>
                  <View>
                    <Span
                      style={[
                        typography.font10,
                        typography.fontLato,
                        { textTransform: "uppercase", color: "gray" },
                      ]}
                    >
                      Start date
                    </Span>
                    <P style={[typography.font12, typography.fontLato]}>
                      {item.start_date}
                    </P>
                  </View>
                  <View>
                    <Span
                      style={[
                        typography.font10,
                        typography.fontLato,
                        { textTransform: "uppercase", color: "gray" },
                      ]}
                    >
                      End date
                    </Span>
                    <P style={[typography.font12, typography.fontLato]}>
                      {item.end_date}
                    </P>
                  </View>
                </View>
              </View>
            </ClickableCard1>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[{ flexGrow: 1 }]}
        ListHeaderComponent={() => (
          <View>
            <Tabs
              tabs={[
                `All (${tabCounts.All})`,
                `Pending (${tabCounts.Pending})`,
                `In Progress (${tabCounts["In Progress"]})`,
                `Completed (${tabCounts.Completed})`,
                `Rejected (${tabCounts.Rejected})`,
              ]}
              onTabPress={handleTabChange}
              activeTab={`${activeTab} (${tabCounts[activeTab]})`}
              tabStyles={{
                activeBackgroundColor: "#76885B",
                inactiveBackgroundColor: "#C8E6C9",
                activeTextColor: "#FFF",
                inactiveTextColor: "#333",
              }}
            />
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
}
