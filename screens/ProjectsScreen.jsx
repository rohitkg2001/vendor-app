import { useEffect, useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "../screens/NoRecord";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { LIGHT, SCREEN_WIDTH, spacing, styles, ICON_MEDIUM } from "../styles";
import { useTranslation } from "react-i18next";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";

export default function ProjectsScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const { projects } = useSelector(state => state.project)

  const { title } = route.params;

     const closeFilter = () => {
       setShowBottomSheet(!showBottomSheet);
     };
     const applyFilterFromRedux = (...args) => {};

  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "project",
    });
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title={t(title)} hasIcon />

      <MyFlatList
        data={projects}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            handleViewDetails={handleViewDetails}
            isProject={true}
          />
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[spacing.mh2]}
          >
            <View style={[spacing.mv4, styles.row, { alignItems: "center" }]}>
              <SearchBar style={{ width: SCREEN_WIDTH - 70 }} />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
                onPress={() => setShowBottomSheet(!showBottomSheet)}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>
          </ScrollView>
        )}
      />
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
