import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import { H3, H4, H5, P, Span } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";
import StatCard from "../components/card/Statcard";
import { layouts, LIGHT, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, DARK, SCREEN_WIDTH, spacing, styles, typography, ICON_SMALL, ICON_MEDIUM, ICON_LARGE } from "../styles";
import { vendor, projects } from "../utils/faker";
import { useSelector } from "react-redux";
import { greet } from "../redux/actions/vendorActions";
import { projectCounts, statCards } from "../redux/actions/projectActions";
import { tasksCounts } from "../redux/actions/taskActions";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc

export default function DashboardScreen() {
  const navigation = useNavigation();
  const today = useState(moment().format("DD MMM YYYY"));
<<<<<<< HEAD
  const [dueTasks, setDueTasks] = useState(4)
  const [greeting, setGreeting] = useState("Good morning")
  const { first_name } = useSelector(state => state);
=======
  const [dueTasks, setDueTasks] = useState(4);
  const [greeting, setGreeting] = useState("Good morning");
  const { first_name } = useSelector((state) => state);
  const { t } = useTranslation();
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc

  useEffect(() => {
    setGreeting(greet());
  }, []);

  return (
    <ContainerComponent>
      <View
<<<<<<< HEAD
        style={[styles.row, spacing.m2, { alignItems: "center", width: SCREEN_WIDTH - 16 }]}
      >
        <View>
          <H4 style={typography.textBold}>{greeting}, {first_name} </H4>
          <P style={spacing.ml1}>You have {dueTasks} due Today</P>
        </View>
        <TouchableOpacity style={[layouts.circle12, layouts.center, spacing.bw05, spacing.br5, { position: 'relative' }]}>
          <Icon name='notifications-outline' size={28} color={DARK} />
          <View style={[styles.bgDanger, layouts.center,
          { position: 'absolute', top: 0, right: 0, height: 24, width: 24, borderRadius: 12 }]}>
            <Span style={[typography.textLight, typography.font16, { textAlign: 'center' }]}>6</Span>
=======
        style={[
          styles.row,
          spacing.m2,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <View>
          <H4 style={typography.textBold}>
            {greeting}, {first_name}{" "}
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
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
          </View>
        </TouchableOpacity>
      </View>

<<<<<<< HEAD
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[spacing.mh2]}>
        <View style={[spacing.mv4, styles.row, { alignItems: 'center' }]}>
          <SearchBar placeholder="Search" style={{ width: SCREEN_WIDTH - 70 }} />
          <Button style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}>
            <Icon name="options-outline" size={28} color={LIGHT} />
          </Button>
        </View>

        <View style={[spacing.mv2, styles.row, { alignItems: 'center' }]}>
          <H4>Today</H4>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="calendar-outline" size={24} color={DARK} />
            <H5 style={spacing.ml1}>{today}</H5>
          </View>

=======
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[spacing.mh2]}
      >
        <View style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}>
          <SearchBar
            placeholder="Search"
            style={{ width: SCREEN_WIDTH - 70 }}
          />
          <Button
            style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
          >
            <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
          </Button>
        </View>

        <View style={[spacing.mv2,spacing.mr3, styles.row, { alignItems: "center" }]}>
          <H4>Today</H4>
          <View style={{ flexDirection: "row" }}>
            <Icon name="calendar-outline" size={ICON_SMALL} color={DARK} />
            <H5 style={spacing.ml1}>{today}</H5>
          </View>
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
        </View>

        {/* Project Overview Card */}
        <CardFullWidth backgroundColor={LIGHT}>
<<<<<<< HEAD
          <View style={[styles.row, spacing.bbw05, spacing.mv1, spacing.pv1, { alignItems: "center", justifyContent: 'flex-start' }]}>
            <Icon name="calendar-clear" size={34} color={PRIMARY_COLOR} />
            <H5 style={[typography.textBold, spacing.ml2]}>
              Project Overview
=======
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
            <H5 style={[typography.textBold, spacing.ml2]}>
              {t("project_overview")}
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
            </H5>
          </View>

          <View
            style={[
              styles.row,
              { justifyContent: "space-between", paddingVertical: 10 },
            ]}
          >
<<<<<<< HEAD
            {
              projectCounts.map((item, index) =>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => navigation.navigate(item.page, { DATA: item.data, title: `${item.title} Projects` })}
                >
                  <P style={typography.textBold}>{item.title}</P>
                  <P>{item.count || 0}</P>
                </TouchableOpacity>
              )
            }
=======
            {projectCounts.map((item, index) => (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() =>
                  navigation.navigate(item.page, {
                    DATA: item.data,
                    title: `${item.title}_projects`.toLowerCase(),
                  })
                }
              >
                <P style={typography.textBold}>{item.title}</P>
                <P>{item.count || 0}</P>
              </TouchableOpacity>
            ))}
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
          </View>
        </CardFullWidth>

        {/* Flatlist cards */}
        <MyFlatList
          data={statCards}
<<<<<<< HEAD
          renderItem={({ item, index }) => <StatCard
            key={item.id}
            backgroundColor={item.backgroundColor}
            tasks={item.count}
            status={item.title}
            onPress={() => navigation.navigate(item.page, { DATA: projects, title: `${item.title}` })
            }
          />
          }
=======
          renderItem={({ item, index }) => (
            <StatCard
              key={item.id}
              backgroundColor={item.backgroundColor}
              tasks={item.count}
              status={item.title}
              onPress={() =>
                navigation.navigate(item.page, {
                  DATA: projects,
                  title: t(`${item.title}`),
                })
              }
            />
          )}
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={spacing.mv4}
        />

        {/* Task management cards */}
        <View
<<<<<<< HEAD
          style={[spacing.mb5, spacing.p3, spacing.br2, { elevation: 2, backgroundColor: PRIMARY_COLOR_TRANSPARENT, }]}
        >
          <H3 style={[spacing.mb3, typography.textBold]}>Task Management</H3>
=======
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
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
          <View style={styles.attendanceContainer}>
            {tasksCounts.map((item) => (
              <TouchableOpacity
                key={item.id}
<<<<<<< HEAD
                style={[spacing.mv4, styles.gridItem, spacing.bw1, spacing.br2, spacing.p4]}
                onPress={() => navigation.navigate('taskScreen')}
              >
                <Icon name={item.icon} size={32} color={DARK} />
                <P>{item.label}</P>
                <View
                  style={[styles.bgPrimary, layouts.circle625, layouts.center, {
                    position: "absolute",
                    right: 20,
                    top: 2
                  }]}
=======
                style={[
                  spacing.mv4,
                  styles.gridItem,
                  spacing.bw1,
                  spacing.br2,
                  spacing.p4,
                ]}
                onPress={() => navigation.navigate("taskScreen")}
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
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
                >
                  <P style={{ color: "white", fontWeight: "bold" }}>
                    {item.count}
                  </P>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView >
    </ContainerComponent >
  );
}
