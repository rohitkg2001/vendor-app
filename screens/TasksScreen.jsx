import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-native-paper";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H6, H4, H5, P } from "../components/text";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import { tasks } from "../utils/faker";
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

const TasksScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const [today, setToday] = useState(moment().format("DD MMM YYYY"));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

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

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("fileUploadScreen")}>
      <Card
        style={[
          spacing.mv1,
          { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
        ]}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1, marginLeft: 16 }}>
            <H6 style={[typography.textBold]}>{item.title}</H6>
            <P style={{ fontSize: 14, color: "#020409" }}>{item.description}</P>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

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
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </ContainerComponent>
  );
};

export default TasksScreen;
