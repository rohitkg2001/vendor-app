import { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import { H3, H5, P } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";
import StatCard from "../components/card/Statcard";

import {
  layouts,
  LIGHT,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { staff, tasks } from "../utils/faker";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const today = useState(moment().format("DD MMM YYYY"));

  const navigateToTaskList = () => {
    navigation.navigate("taskList");
  };

  const navigateToTaskCardScreen = () => {
    navigation.navigate("TaskCardScreen");
  };

  const navigateToToDoTaskCardScreen = () => {
    navigation.navigate("ToDoTaskCardScreen");
  };

  const navigateToNoRecord = () => {
    navigation.navigate("NoRecord");
  };

  const firstFourTasks = tasks.slice(0, 4);
  const lastTwoTasks = tasks.slice(4, 6);

  // Categories for CategoryCard
  const categories = [
    {
      id: "1",
      label: "Installation",
      icon: "layers-outline",
    },
    {
      id: "2",
      label: "Fixing Slip",
      icon: "grid-outline",
    },
    {
      id: "3",
      label: "RMS Status",
      icon: "cart-outline",
    },
    {
      id: "4",
      label: "Final Inspection",
      icon: "document-text-outline",
    },
    {
      id: "5",
      label: "Report",
      icon: "pie-chart-outline",
    },
  ];
  return (
    <ContainerComponent>
      <View
        style={[
          styles.row,
          spacing.mh2,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <View>
          <H3 style={typography.textBold}>Good Morning, {staff.first_name}</H3>
          <P style={spacing.ml1}>{today}</P>
        </View>
        <Image
          source={{ uri: staff.image }}
          style={[layouts.circle12, spacing.mv3, layouts.center]}
        />
      </View>

      <ScrollView>
        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        >
          <CardFullWidth backgroundColor={LIGHT}>
            <View style={[styles.row, spacing.mr5, { alignItems: "center" }]}>
              <Icon name="calendar-clear" size={34} color={PRIMARY_COLOR} />
              <H5 style={[typography.textBold, { marginRight: 130 }]}>
                Project Overview
              </H5>
            </View>
            <View style={[spacing.bbw05, spacing.mv1]} />
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", paddingVertical: 10 },
              ]}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Open</P>
                <P>0</P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Completed</P>
                <P>0</P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={navigateToNoRecord}
              >
                <P style={typography.textBold}>Hold</P>
                <P>0</P>
              </TouchableOpacity>
            </View>
          </CardFullWidth>
        </View>

        <MyFlatList
          data={firstFourTasks}
          renderItem={({ item, index }) => {
            const isRightColumn = index % 2 !== 0;
            const marginTop = isRightColumn ? 20 : 0;

            return (
              <StatCard
                key={item.id}
                backgroundColor={item.backgroundColor}
                tasks={item.count}
                status={item.status}
                onPress={item.id === 1 ? navigateToTaskList : null}
                style={{ marginTop }}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        >
          <CardFullWidth backgroundColor={LIGHT}>
            <View style={[styles.row, spacing.mr5, { alignItems: "center" }]}>
              <Icon name="filter" size={34} color={PRIMARY_COLOR} />
              <H5 style={[typography.textBold, { marginRight: 130 }]}>
                All Task Overview
              </H5>
            </View>
            <View style={[spacing.bbw05, spacing.mv1]} />
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", paddingVertical: 10 },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={navigateToToDoTaskCardScreen}>
                  <P style={typography.textBold}>To Do</P>
                  <P style={spacing.ml2}>2</P>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", marginRight: 140 }}>
                <TouchableOpacity onPress={navigateToTaskCardScreen}>
                  <P style={typography.textBold}>Done</P>
                  <P style={spacing.ml2}>3</P>
                </TouchableOpacity>
              </View>
            </View>
          </CardFullWidth>
        </View>

        <MyFlatList
          data={lastTwoTasks}
          renderItem={({ item }) => (
            <StatCard
              key={item.id}
              backgroundColor={item.backgroundColor}
              tasks={item.count}
              status={item.status}
              onPress={item.id === 1 ? navigateToTaskList : null}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        <View
          style={[
            spacing.mt2,
            { width: SCREEN_WIDTH - 18, alignSelf: "center" },
            spacing.pv3,
          ]}
        ></View>

        <View style={categoryStyles.card}>
          {/* Header inside the card */}
          <View style={categoryStyles.headerContainer}>
            <H3 style={categoryStyles.headerText}>Task Management</H3>
          </View>

          {/* Category Grid */}
          <View style={categoryStyles.grid}>
            {categories.map((item) => (
              <View key={item.id} style={categoryStyles.gridItem}>
                <Icon name={item.icon} size={20} color="#333" />
                <P style={categoryStyles.label}>{item.label}</P>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
}

// Styles for CategoryCard
const categoryStyles = StyleSheet.create({
  card: {
    backgroundColor: "#F0FFF0",
    borderRadius: 10,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContainer: {
    marginBottom: 10, // Space between header and grid
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center", // Center-align text
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridItem: {
    alignItems: "center",
    width: "30%",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});
