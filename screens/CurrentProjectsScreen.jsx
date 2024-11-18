import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { projecttask } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";

const CurrentProjectsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation();

  const filteredProjects = projecttask.filter((item) =>
    item.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    { label: "Sort", onPress: () => console.log("Sort clicked") },
    { label: "Filter", onPress: () => console.log("Filter clicked") },
  ];

  return (
    <ContainerComponent>
      <MyHeader
        title="Current Projects"
        hasIcon={true}
        icon={"ellipsis-vertical"}
        onIconPress={toggleMenu}
        isBack={true}
      />

      <MyFlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            item={item}
            isCureentProject={true}
            onPress={() =>
              navigation.navigate("taskScreen", { projectId: item.id })
            }
          >
            <View style={{ flex: 1 }}>
              <H5>{item.projectName}</H5>
              <P>{` ${item.siteName}`}</P>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search current projects..."
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginVertical: 8, marginHorizontal: 4 }}
          />
        )}
      />

      <Filter
        visible={isMenuVisible}
        onClose={toggleMenu}
        options={menuOptions}
      />
    </ContainerComponent>
  );
};

export default CurrentProjectsScreen;
