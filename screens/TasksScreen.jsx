import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H6, P } from "../components/text";
import MyFlatList from "../components/utility/MyFlatList";
import { tasks } from "../utils/faker";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { useTranslation } from "react-i18next";

const TasksScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("fileUploadScreen")}
    >
      <Card
        style={[spacing.mv1, { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" }]}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1, marginLeft: 16 }}>

            <H6 style={[typography.textBold]}>{item.title}</H6>
            <P style={{ fontSize: 14, color: "#020409" }}>
              {item.description}
            </P>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ContainerComponent>
      <MyHeader title={t("task_list")} hasIcon={true} />
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
