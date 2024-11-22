import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "../screens/NoRecord";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { LIGHT, SCREEN_WIDTH, spacing, styles } from "../styles";
import { useTranslation } from "react-i18next";

export default function ProjectsScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  const { DATA, title } = route.params;

  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "project",
    });
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title={title} hasIcon />

      <MyFlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            handleViewDetails={handleViewDetails}
            isProject={true}
          />
        )}
        ListEmptyComponent={() => <NoRecord msg={t("norecord_msg")} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[spacing.mh2]}
          >
            <View style={[spacing.mv4, styles.row, { alignItems: "center" }]}>
              <SearchBar
                placeholder={t("placeholder")}
                style={{ width: SCREEN_WIDTH - 70 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
              >
                <Icon name="options-outline" size={28} color={LIGHT} />
              </Button>
            </View>
          </ScrollView>
        )}
      />
    </ContainerComponent>
  );
}
