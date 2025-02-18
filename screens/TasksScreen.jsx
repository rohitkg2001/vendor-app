// import react native
import { useEffect, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

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
import { getAllTasks } from "../redux/actions/taskActions";

// import styles
import { H5, P, Span } from "../components/text";
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
    tasks: state.tasks.tasks, // Use Redux state directly
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor?.id) {
      console.log(vendor.id);
      dispatch(getAllTasks(vendor.id));
    }
  }, [vendor?.id, dispatch]);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const applyFilterFromRedux = () => {};

  const handleTabChange = (selectedTab) => {
    console.log("Selected Tab:", selectedTab);
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("task_list")} isBack={true} hasIcon={true} />
      <DashboardFilter />

      <MyFlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            title={item.site?.site_name}
            subtitle={item.site?.location}
            isPositiveButtonVisible={true}
            positiveAction={() =>
              navigation.navigate("surveyScreen", {
                itemId: item.id,
                isSurvey: false,
              })
            }
            positiveText="Submit"
            isNegativeButtonVisible={true}
            negativeText="Survey"
            negativeAction={() =>
              navigation.navigate("surveyScreen", {
                itemId: item.id,
                isSurvey: true,
              })
            }
          >
            <View>
              <H5 style={[typography.font16, typography.fontLato]}>
                {item.activity}
              </H5>
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
              tabs={["All", "Pending", "In approval", "Completed", "Rejected"]}
              onTabPress={handleTabChange}
              initialActiveTab="All"
            />
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
      {showBottomSheet && (
        <Filter
          onClose={() => setShowBottomSheet(false)}
          onApply={applyFilterFromRedux}
        />
      )}
    </ContainerComponent>
  );
}
