import { useEffect, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
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
import Button from "../components/buttons/Button";
import Filter from "../components/Filter";
// import Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, getTaskById } from "../redux/actions/taskActions";

// import styles
import { H5, H6, P, Span } from "../components/text";
import {
  ICON_MEDIUM,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  LIGHT,
} from "../styles";

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

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    filterTasks(activeTab);
  }, [tasks]);

  const filterTasks = (tab) => {
    if (tab === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === tab));
    }
  };

  const handleTabChange = (selectedTab) => {
    const tabName = selectedTab.split(" (")[0];
    setActiveTab(tabName);
    filterTasks(tabName);
  };

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const setIDAndDispatch = async (id) => {
    await dispatch(getTaskById(id));
    navigation.navigate("taskDetail");
  };
  const applyFilterFromRedux = () => {};

  return (
    <ContainerComponent>
      <MyHeader title={t("task_list")} isBack={true} hasIcon={true} />
      <DashboardFilter />

      <MyFlatList
        data={filteredTasks}
        renderItem={({ item, index }) => {
          // const isPastDue = moment(item.end_date).isBefore(moment());
          // const borderColor = isPastDue ? "red" : "green"; // Red if past due, green otherwise

          const isCompleted = item.status === "Completed"; // Assuming "status" is the field that indicates completion

          // Ensure end_date is parsed correctly and compare dates only (ignore the time part)
          const endDate = moment(item.end_date).startOf("day"); // Ignore time part

          // If the task is not completed, check if it's past due
          const isPastDue =
            !isCompleted && endDate.isBefore(moment().startOf("day"), "day");

          // Set border color
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
      {/* {showBottomSheet && (
        <Filter
          onClose={() => setShowBottomSheet(false)}
          onApply={applyFilterFromRedux}
        />
      )} */}
    </ContainerComponent>
  );
}