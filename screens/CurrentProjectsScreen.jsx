import { useState } from "react";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import { LIGHT, SCREEN_WIDTH, spacing, styles } from "../styles";
import { useTranslation } from "react-i18next";
import { ICON_MEDIUM } from "../styles/constant";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";

export default function CurrentProjectsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { projects } = useSelector(state => state.project)

   const closeFilter = () => {
     setShowBottomSheet(!showBottomSheet);
   };
   const applyFilterFromRedux = (...args) => {};

  return (
    <ContainerComponent>
      <MyFlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isCureentProject={true}
            showArrow={true}
            handleViewDetails={() =>
              navigation.navigate("taskScreen", { projectId: item.id })
            }
          />
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
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
