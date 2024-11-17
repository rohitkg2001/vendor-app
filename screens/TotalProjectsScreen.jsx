import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { project } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import { SCREEN_WIDTH, spacing, styles } from "../styles";

const TotalProjectsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const filteredProjects = project.filter((item) =>
    item.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewDetails = (item) => {
    navigation.navigate("ProjectDetailScreen", { item });
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          isBack
          title="Total Projects"
          hasIcon
          icon="ellipsis-vertical"
          onIconPress={() => console.log("Menu clicked")}
        />

        <SearchBar
          placeholder="Search projects..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            // paddingVertical: 8,
          }}
        >
          {filteredProjects.map((item) => (
            <ClickableCard
              key={item.id}
              item={item}
              handleViewDetails={handleViewDetails}
              isProject={true}
            />
          ))}
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default TotalProjectsScreen;
