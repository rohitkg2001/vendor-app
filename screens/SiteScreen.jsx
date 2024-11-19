import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import { SCREEN_WIDTH, spacing } from "../styles";
import { sites } from "../utils/faker";
import MyFlatList from "../components/utility/MyFlatList";

export default function SiteScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "site",
    });
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title="Total Sites" hasIcon />
      <MyFlatList
        data={sites}
        renderItem={({ item }) =>
          <ClickableCard
            key={item.id}
            item={item}
            handleViewDetails={handleViewDetails}
            isSite={true} />
        }
        ListHeaderComponent={() =>
          <SearchBar
            placeholder="Search by city, state or project code"
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginVertical: 8, marginHorizontal: 4 }}
          />

        }
      />
    </ContainerComponent>
  );
};

