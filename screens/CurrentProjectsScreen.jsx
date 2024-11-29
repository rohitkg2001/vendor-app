import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
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
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No Projects available. Create the new one." />
        )}
        ListHeaderComponent={() => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[spacing.mh2]}
          >
            <View style={[spacing.mv4, styles.row, { alignItems: "center" }]}>
              <SearchBar
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
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
