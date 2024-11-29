<<<<<<< HEAD
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
=======
import { useState } from "react";
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
<<<<<<< HEAD
import { viewProject } from "../redux/actions/projectActions";
import { LIGHT, SCREEN_WIDTH, spacing, styles } from "../styles";

export default function CurrentProjectsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  
  const projects = useSelector((state) => state.projectReducer.projects);
  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, projects]);

 
  const handleViewDetails = async (projectId) => {
    const success = await dispatch(viewProject(projectId));
      navigation.navigate("taskScreen", { projectId });}
    

  return (
    <ContainerComponent>
=======
import { projects } from "../utils/faker";
import { LIGHT, SCREEN_WIDTH, spacing, styles } from "../styles";
import { useTranslation } from "react-i18next";
import MyHeader from "../components/header/MyHeader";
import { ICON_MEDIUM } from "../styles/constant";

export default function CurrentProjectsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title="Current Project" isBack={true} hasIcon={true} />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
      <MyFlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isCureentProject={true}
            handleViewDetails={() => handleViewDetails(item.id)}
          />
        )}
<<<<<<< HEAD
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No Projects available. Create the new one." />
        )}
=======
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
        ListHeaderComponent={() => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[spacing.mh2]}
          >
            <View style={[spacing.mv4, styles.row, { alignItems: "center" }]}>
<<<<<<< HEAD
              <SearchBar
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
                style={{ width: SCREEN_WIDTH - 70 }}
              />
=======
              <SearchBar style={{ width: SCREEN_WIDTH - 70 }} />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
              >
<<<<<<< HEAD
                <Icon name="options-outline" size={28} color={LIGHT} />
=======
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
>>>>>>> a85e4be1654a673a6c01d9c3c97de764acfbdfdc
              </Button>
            </View>
          </ScrollView>
        )}
      />
    </ContainerComponent>
  );
}
