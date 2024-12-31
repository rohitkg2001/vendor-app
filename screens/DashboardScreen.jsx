import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import { H4, H5, P } from "../components/text";
import StatCard from "../components/card/Statcard";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_LARGE,
} from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { greet } from "../redux/actions/vendorActions";
import { statCards } from "../redux/actions/projectActions";
import { getAllTasks, tasksCounts } from "../redux/actions/taskActions";
import { useTranslation } from "react-i18next";
import Filter from "../components/Filter";
import DashboardHeader from "../components/header/DashboardHeader";
import DashboardFilter from "../components/filters/DashboardFilter";
import CardsArray from "../components/card/CardsArray";
import CardFullWidth from "../components/card/CardFullWidth";

export default function DashboardScreen() {
  const [dueTasks, setDueTasks] = useState(4);
  const [greeting, setGreeting] = useState("Good morning");
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const navigation = useNavigation();

  const { firstName, id } = useSelector((state) => state.vendor);
  const { tasks } = useSelector((state) => state.tasks);

  const [installation, setInstallation] = useState(0);
  const [doneInstallation, setDoneInstallation] = useState(0);
  const [rmsStatus, setRmsStatus] = useState(0);
  const [donRMS, setDoneRMS] = useState(0);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setGreeting(greet());
    dispatch(getAllTasks(id));
  }, []);

  useEffect(() => {
    setDueTasks(Array.isArray(tasks) ? tasks.length : 0);
  }, [tasks, dispatch]);

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  return (
    <ContainerComponent>
      <DashboardHeader
        dueTasks={dueTasks}
        greeting={greeting}
        firstName={firstName}
        navigation={navigation}
        notificationCount={dueTasks}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[spacing.mh1]}
      >
        <DashboardFilter />
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
        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon name="filter" size={ICON_LARGE} color={PRIMARY_COLOR} />
            <H4 style={[typography.textBold, { marginRight: 110 }]}>
              {t("Progress Report")}
            </H4>
          </View>
          <View style={[spacing.bbw05, spacing.mv1]} />
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", paddingVertical: 10 },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>{t("Installation")}</P>
              <H5 style={spacing.ml2}>
                {doneInstallation}/
                <H5 style={typography.textDanger}>{installation}</H5>
              </H5>
            </View>
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>{t("RMS")}</P>
              <H5 style={spacing.ml2}>
                {donRMS}/<H5 style={typography.textDanger}>{rmsStatus}</H5>
              </H5>
            </View>
          </View>
        </CardFullWidth>
        <CardsArray tasksCounts={tasksCounts} navigation={navigation} />
      </ScrollView>
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
