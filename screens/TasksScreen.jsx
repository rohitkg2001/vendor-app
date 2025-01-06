import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import DashboardFilter from "../components/filters/DashboardFilter";
import ClickableCard1 from "../components/card/ClickableCard1";
import { H5, P, Span } from "../components/text";
import { spacing, styles, typography } from "../styles";
import { getAllTasks } from "../redux/actions/taskActions";

export default function TasksScreen({ navigation }) {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const { vendor } = useSelector((state) => state);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks(vendor.id));
    setTasks(state.tasks.tasks);
  }, [vendor, state]);

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
              navigation.navigate("surveyScreen", { itemId: item.id })
            }
            positiveText="Submit"
            isNegativeButtonVisible={true}
            negativeText="Survey"
            negativeAction={() =>
              navigation.navigate("surveyScreen", { itemId: item.id })
            }
          >
            <View>
              <H5 style={[typography.font20]}>{item.activity}</H5>
              <View style={[spacing.mt1, styles.row]}>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    start date
                  </Span>
                  <P style={[typography.font12]}>{item.start_date}</P>
                </View>
                <View>
                  <Span
                    style={[typography.font12, { textTransform: "capitalize" }]}
                  >
                    end date
                  </Span>
                  <P style={[typography.font12]}>{item.start_date}</P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[{ flexGrow: 1 }]}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
}
