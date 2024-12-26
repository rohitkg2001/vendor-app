import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-native-paper";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard from "../components/card/Clickablecard";
import MyHeader from "../components/header/MyHeader";
import { H6, H4, H5, P } from "../components/text";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import NoRecord from "./NoRecord";
import { Task } from "../utils/faker";
import {
  SCREEN_WIDTH,
  spacing,
  typography,
  ICON_SMALL,
  DARK,
  styles,
  LIGHT,
} from "../styles";
import { useTranslation } from "react-i18next";
import { getAllTasks } from "../redux/actions/taskActions";

const TasksScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [today, setToday] = useState(moment().format("DD MMM YYYY"));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { vendor } = useSelector((state) => state);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(vendor);
    dispatch(getAllTasks(vendor.id));
    setTasks(state.tasks.tasks);
  }, [vendor, state]);

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      if (date) {
        setSelectedDate(date);
        setToday(moment(date).format("DD MMM YYYY"));
      }
    } else {
      setShowDatePicker(false);
    }
  };

  const handleViewDetails = (itemId) => {
    navigation.navigate("fileUploadScreen", { itemId: itemId });
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("task_list")} isBack={true} hasIcon={true} />
      <View
        style={[
          styles.row,
          spacing.m2,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <H4>Today</H4>
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

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <MyFlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isTask={true}
            showView={true}
            handleViewDetails={(item) => handleViewDetails(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        // contentContainerStyle={styles.list}
        contentContainerStyle={[{ flexGrow: 1 }]}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
};

export default TasksScreen;
