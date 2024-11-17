import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { requirementsData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import { SCREEN_WIDTH, spacing, styles } from "../styles";

const RequirementsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const filteredRequirements = requirementsData.filter((item) =>
    item.siteName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewDetails = (item) => {
    navigation.navigate("SiteDetailScreen", { item });
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - (-32) }]}>
        <MyHeader
          isBack
          title="Total Sites"
          hasIcon
          icon="ellipsis-vertical"
          onIconPress={() => console.log("Menu clicked")}
        />

        <SearchBar
          placeholder="Search sites..."
          value={searchText}
          onChangeText={setSearchText}
          style={{ marginVertical: 8, marginHorizontal: 20 }}
        />

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
          {filteredRequirements.map((item) => (
            <ClickableCard
              key={item.id}
              item={item}
              handleViewDetails={handleViewDetails}
            />
          ))}
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default RequirementsScreen;
