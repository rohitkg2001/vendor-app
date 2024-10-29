import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContainerComponent from "../components/ContainerComponent";
import { taskslist } from "../utils/faker";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import { H4, H5, H6, P } from "../components/text";

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
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <View style={styles.detailsRow}>
            <H6 style={styles.detailsLabel}>Start Date:</H6>
            <P style={styles.detailsValue}>{start}</P>
          </View>
          <View style={styles.detailsRow}>
            <H6 style={styles.detailsLabel}>Deadline:</H6>
            <P style={styles.detailsValue}>{deadline}</P>
          </View>
          <View style={styles.detailsRow}>
            <H6 style={styles.detailsLabel}>Project:</H6>
            <P style={styles.detailsValue}>{project}</P>
          </View>
          <View style={styles.detailsRow}>
            <H6 style={styles.detailsLabel}>Assigned To:</H6>
            <P style={styles.detailsValue}>{assignedTo}</P>
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

const styles = StyleSheet.create({
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default TaskListScreen;
