import React, { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import MyFlatList from "../components/utility/MyFlatList";
import { useNavigation } from '@react-navigation/native';

export default function ProjectsScreen({ route }) {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const { DATA } = route.params


  const handleViewDetails = (item) => {
    navigation.navigate("ProjectDetailScreen", { item });
  };

  return (
    <ContainerComponent>
      <MyHeader
        isBack
        title="Total Projects"
        hasIcon
        icon="ellipsis-vertical"
        onIconPress={() => console.log("Menu clicked")}
      />

      <MyFlatList
        data={DATA}
        renderItem={({ item, index }) => <ClickableCard key={index} item={item} isProject={true} />}
        keyExtractor={(item) => item.id.toString()}
        // ListEmptyComponent={()=>}
        // FIXME:Add no record component
        ListHeaderComponent={() => <SearchBar
          placeholder="Search projects..."
          value={searchText}
          onChangeText={setSearchText}
          style={{ marginVertical: 8, marginHorizontal: 4 }}

        />}
      />
    </ContainerComponent>
  );
};
