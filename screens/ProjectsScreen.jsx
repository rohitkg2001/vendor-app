import React, { useState, useEffect } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import MyFlatList from "../components/utility/MyFlatList";
import { useNavigation } from "@react-navigation/native";

export default function ProjectsScreen({ route }) {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const { DATA, title } = route.params;
  useEffect(() => {
    console.log(title)
  }, [])


  const handleViewDetails = (item) => {
    navigation.navigate("viewDetailScreen", {
      site: item,
      formType: "project",
    });
  };

  return (
    <ContainerComponent>
      <MyHeader isBack title={title} hasIcon />

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
        ListEmptyComponent={() => (
          <NoRecordScreen msg="Oops! No Projects available. Create the new one." />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search projects..."
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginVertical: 8, marginHorizontal: 4 }}
          />
        )}
      />
    </ContainerComponent>
  );
}
