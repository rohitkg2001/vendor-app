import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import DashboardHeader from "../components/header/DashboardHeader";
import DashboardFilter from "../components/filters/DashboardFilter";
//import CardsArray from "../components/dashboard/CardsArray";
import ProgressReportCard from "../components/dashboard/ProgressReportCard";

import { fetchSites } from "../redux/actions/siteActions";
import {
  getAllInstallationCount,
  getAllTasks,
  tasksCounts,
} from "../redux/actions/taskActions";
import { greet } from "../redux/actions/vendorActions";
import { spacing } from "../styles";
import OverViewCard from "../components/dashboard/OverviewCard";

export default function DashboardScreen() {
  const [dueTasks, setDueTasks] = useState(0);
  const [greeting, setGreeting] = useState("Good morning");

  const navigation = useNavigation();

  const { id, name } = useSelector((state) => state.vendor);
  const { tasks } = useSelector((state) => state.tasks);
  const vendor = useSelector((state) => state.vendor);

  const [installation, setInstallation] = useState(0);
  const [rmsStatus, setRmsStatus] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getCounts = async () => {
    const installationCount = await getAllInstallationCount(id, "installation");
    setInstallation(installationCount);
    const RMSCount = await getAllInstallationCount(id, "rms");
    setRmsStatus(RMSCount);
  };
  useEffect(() => {
    setGreeting(greet());
    dispatch(getAllTasks(id));
    dispatch(fetchSites(id));
  }, []);

  useEffect(() => {
    getCounts();
  }, [installation]);

  useEffect(() => {
    setDueTasks(Array.isArray(tasks) ? tasks.length : 0);
  }, [tasks, dispatch]);

  return (
    <ContainerComponent>
      <DashboardHeader
        dueTasks={dueTasks}
        greeting={greeting}
        firstName={name}
        navigation={navigation}
        notificationCount={dueTasks}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[spacing.mh1]}
      >
        <DashboardFilter />

        <OverViewCard totalSites={dueTasks} />

        <ProgressReportCard />

        {/* <CardsArray
          tasksCounts={tasksCounts}
          installationCount={installation}
          navigation={navigation}
        /> */}
      </ScrollView>
    </ContainerComponent>
  );
}
