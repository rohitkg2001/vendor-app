import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import MyFlatList from "../components/utility/MyFlatList";
import { H3, H4, H5, P, Span } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";
import StatCard from "../components/card/Statcard";
import {
  layouts,
  LIGHT,
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  DARK,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  ICON_SMALL,
  ICON_MEDIUM,
  ICON_LARGE,
} from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { greet } from "../redux/actions/vendorActions";
import {
  getAllProjects,
  projectCounts,
  statCards,
} from "../redux/actions/projectActions";
import { tasksCounts } from "../redux/actions/taskActions";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import Filter from "../components/Filter";
import NotificationScreen from "./NotificationScreen";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const today = useState(moment().format("DD MMM YYYY"));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dueTasks, setDueTasks] = useState(4);
  const [greeting, setGreeting] = useState("Good morning");
  const { firstName } = useSelector((state) => state.vendor);
  const { t } = useTranslation();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const dispatch = useDispatch();

  const { projectCount } = useSelector((state) => state.project);

  useEffect(() => {
    setGreeting(greet());
    dispatch(getAllProjects());
    // dispatch(getAllSites())
    // dispatch(getAllItems())
  }, []);



  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      setSelectedDate(date);
      setToday(moment(date).format("DD MMM YYYY"));
    } else {
      setShowDatePicker(false);
    }
  };

  const showCalendar = () => {
    setShowDatePicker(true);
  };

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  const applyFilterFromRedux = (...args) => { };


  return (
    <ContainerComponent>
      <View
        style={[
          styles.row,
          spacing.m2,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <View>
          <H4 style={typography.textBold}>
            {greeting},{firstName}
          </H4>
          <P style={spacing.ml1}>You have {dueTasks} due tasks Today</P>
        </View>
        <TouchableOpacity
          style={[
            layouts.circle12,
            layouts.center,
            spacing.bw05,
            spacing.br5,
            { position: "relative" },
          ]}
          onPress={() => navigation.navigate("notificationScreen")}
        >
          <Icon name="notifications-outline" size={ICON_MEDIUM} color={DARK} />
          <View
            style={[
              styles.bgDanger,
              layouts.center,
              {
                position: "absolute",
                top: 0,
                right: 0,
                height: 24,
                width: 24,
                borderRadius: 12,
              },
            ]}
          >
            <Span
              style={[
                typography.textLight,
                typography.font16,
                { textAlign: "center" },
              ]}
            >
              6
            </Span>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[spacing.mh1]}
      >
        {/* <View
          style={[
            spacing.mv4,
            styles.row,
            spacing.mh1,
            { alignItems: "center" },
          ]}
        >
          <SearchBar
            placeholder="Search"
            style={{ width: SCREEN_WIDTH - 70 }}
          />
          <Button
            style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
            onPress={() => setShowBottomSheet(!showBottomSheet)}
          >
            <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
          </Button>
        </View> */}

        <View
          style={[
            styles.row,
            spacing.mh1,
            { alignItems: "center", width: SCREEN_WIDTH - 16 },
          ]}
        >
          <H4>{t("today")}</H4>
          <Button
            style={[styles.btn, styles.bgPrimary, spacing.ph3]}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar-outline" size={ICON_SMALL} color={LIGHT} />
            <H5 style={[spacing.ml1, { color: "#fff", fontWeight: "600" }]}>
              {today}
            </H5>
          </Button>
        </View>

        {/* Project Overview Card */}
        {/* <CardFullWidth backgroundColor={LIGHT}>
          <View
            style={[
              styles.row,
              spacing.bbw05,
              spacing.mv1,
              spacing.pv1,
              { alignItems: "center", justifyContent: "flex-start" },
            ]}
          >
            <Icon
              name="calendar-clear"
              size={ICON_LARGE}
              color={PRIMARY_COLOR}
            />
            <H5 style={[typography.textBold, spacing.ml]}>
              {t("project_overview")}
            </H5>
          </View>

          <View
            style={[
              styles.row,
              { justifyContent: "space-between", paddingVertical: 10 },
            ]}
          >
            {projectCounts.map((item, index) => (
              <TouchableOpacity
                style={{ alignItems: "center", width: "25%" }}
                onPress={() =>
                  navigation.navigate(item.page, {
                    title: `${item.title}_projects`.toLowerCase(),
                  })
                }
              >
                <P
                  style={[
                    typography.textBold,
                    { textTransform: "capitalize", flexWrap: "wrap" },
                  ]}
                >
                  {t(item.title)}
                </P>
                <P>{item.count || 0}</P>
              </TouchableOpacity>
            ))}
          </View>
        </CardFullWidth> */}

        {/* Flatlist cards */}
        <MyFlatList
          data={statCards}
          renderItem={({ item }) => (
            <StatCard
              key={item.id}
              backgroundColor={item.backgroundColor}
              tasks={item.count}
              status={t(item.title)}
              onPress={() =>
                navigation.navigate(item.page, {
                  title: t(`${item.title}`),
                })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={spacing.mv4}
        />

        {/* Task management cards */}
        <View
          style={[
            spacing.mb5,
            spacing.p3,
            spacing.br2,
            { elevation: 2, backgroundColor: PRIMARY_COLOR_TRANSPARENT },
          ]}
        >
          <H3 style={[spacing.mb3, typography.textBold]}>
            {t("task_management")}
          </H3>
          <View style={styles.attendanceContainer}>
            {tasksCounts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  spacing.mv4,
                  styles.gridItem,
                  spacing.bw1,
                  spacing.br2,
                  spacing.p4,
                ]}
                onPress={() => {
                  if (item.label === "Installation") {
                    navigation.navigate("taskScreen");
                  }
                }}
              >
                <Icon name={item.icon} size={ICON_LARGE} color={DARK} />
                <P>{item.label}</P>
                <View
                  style={[
                    styles.bgPrimary,
                    layouts.circle625,
                    layouts.center,
                    {
                      position: "absolute",
                      right: 20,
                      top: 2,
                    },
                  ]}
                >
                  <P style={{ color: "white", fontWeight: "bold" }}>
                    {item.count}
                  </P>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
