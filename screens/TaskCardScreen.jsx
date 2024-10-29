import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContainerComponent from "../components/ContainerComponent";
import { taskslist } from "../utils/faker";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import { H3, H4, H5 } from "../components/text";

const TaskCardScreen = ({
  id,
  title,
  status,
  deadline,
  start,
  project,
  assignedTo,
}) => {
  return (
    <ContainerComponent>
      <Card>
        <View style={[spacing.mh1, { width: SCREEN_WIDTH - 32 }]}>
          <View style={styles.statusIcon}>
            {status === "done" && (
              <Icon name="check-circle" size={20} color="#2b87b0" />
            )}
            {status === "critical" && (
              <Icon name="check-circle" size={20} color="#2b87b0" />
            )}
            {status === "blocker" && (
              <Icon name="check-circle" size={20} color="#2b87b0" />
            )}
          </View>
          <View style={styles.cardInfo}>
            <H4 style={typography.textDark}>{title}</H4>
            <H5 style={typography.textDark}>ID: {id}</H5>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Start Date:</Text>
            <Text style={styles.detailsValue}>{start}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Deadline:</Text>
            <Text style={styles.detailsValue}>{deadline}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Project:</Text>
            <Text style={styles.detailsValue}>{project}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Assigned To:</Text>
            <Text style={styles.detailsValue}>{assignedTo}</Text>
          </View>
        </View>
      </Card>
    </ContainerComponent>
  );
};

// Main component to render a list of tasks
const TaskListScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {taskslist.map((task) => (
        <TaskCardScreen
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
          deadline={task.deadline}
          start={task.start}
          project={task.project}
          assignedTo={task.assignedTo}
        />
      ))}
    </ScrollView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingHorizontal: 0,
  // },
  // card: {
  //   borderRadius: 10,
  //   padding: 15,
  //   margin: 0,
  //   marginBottom: 12,
  //   width: Dimensions.get("window").width - 20,
  //   alignSelf: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  // cardHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  statusIcon: {
    marginRight: 10,
  },
  // cardInfo: {
  //   flex: 1,
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
  // id: {
  //   fontSize: 14,
  //   color: "gray",
  // },
  cardDetails: {
    paddingVertical: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 14,
    color: "gray",
  },
  detailsValue: {
    fontSize: 14,
    textAlign: "right",
  },
});

export default TaskListScreen;
