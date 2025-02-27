// Updated DashboardScreen.js
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import DashboardHeader from "../components/header/DashboardHeader";
import DashboardFilter from "../components/filters/DashboardFilter";
import ProgressReportCard from "../components/dashboard/ProgressReportCard";
import { fetchSites } from "../redux/actions/siteActions";
import { getAllTasks } from "../redux/actions/taskActions";
import { greet } from "../redux/actions/vendorActions";
import { spacing } from "../styles";
import OverViewCard from "../components/dashboard/OverviewCard";

export default function DashboardScreen() {
  const [dueTasks, setDueTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [greeting, setGreeting] = useState("Good morning");

  const navigation = useNavigation();

  const { id, name } = useSelector((state) => state.vendor);
  const { tasks } = useSelector((state) => state.tasks);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setGreeting(greet());
    dispatch(getAllTasks(id));
    dispatch(fetchSites(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      setTotalTasks(tasks.length);
      const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
      ).length;
      setDueTasks(pendingTasks);
    } else {
      setTotalTasks(0);
      setDueTasks(0);
    }
  }, [tasks]);

  return (
    <ContainerComponent>
      <DashboardHeader
        dueTasks={dueTasks}
        greeting={greeting}
        firstName={name}
        navigation={navigation}
        notificationCount={totalTasks}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[spacing.mh1]}
      >
        <DashboardFilter />

        <OverViewCard totalSites={dueTasks} />

        <ProgressReportCard />
      </ScrollView>
    </ContainerComponent>
  );
}
