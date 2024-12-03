import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {
  viewProject,
  searchProjects,
  updateProject,
} from "../redux/actions/projectActions";

export default function ProjectsScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  const { DATA, title } = route.params;

 useEffect(() => {
   if (loading && Array.isArray(projects) && projects.length > 0) {
     setFilteredProjects(projects);
     setLoading(false);
   }
   setTimeout(() => {
     setLoading(false);
   }, 2000);
 }, [loading, projects]);

 useEffect(() => {
   dispatch(fetchProjects());
 }, [dispatch]);

 const handleViewDetails = (item) => {
   dispatch(viewProject(item));
   navigation.navigate("ViewDetailScreen", { formType: "project" });
 };

 const handleSearch = (text) => {
   setSearchText(text);
   dispatch(searchProjects(text));
 };

  return (
    <ContainerComponent>
      <MyHeader isBack title={t(title)} hasIcon />

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
       {showBottomSheet && <Filter />}
    </ContainerComponent>
  );
}
