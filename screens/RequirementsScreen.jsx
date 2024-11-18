import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { sites } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import { SCREEN_WIDTH, spacing, styles } from "../styles";

const RequirementsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const filteredRequirements = sites.filter((item) =>
    item.siteName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewDetails = (item) => {
    navigation.navigate("SiteDetailScreen", { item });
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 4 }]}>
        <MyHeader
          isBack
          title="Total Sites"
          hasIcon
          icon="ellipsis-vertical"
          onIconPress={() => console.log("Menu clicked")}
        />

        <SearchBar
          placeholder="Search by city, state or project code"
          value={searchText}
          onChangeText={setSearchText}
          style={{ marginVertical: 8, marginHorizontal: 4 }}
        />

        <ScrollView>
          {filteredRequirements.map((item) => (
            <ClickableCard
              key={item.id}
              item={item}
              handleViewDetails={handleViewDetails}
              isSite={true}
            />
          ))}
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};
export default RequirementsScreen;
