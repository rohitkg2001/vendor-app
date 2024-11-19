import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
import { projects } from "../utils/faker";

export default function CurrentProjectsScreen() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation(); // <-- Use useNavigation hook here

  return (
    <ContainerComponent>

      <MyFlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isCureentProject={true}
            handleViewDetails={() =>
              navigation.navigate("taskScreen", { projectId: item.id })
            }
          />
        )}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No Projects available. Create the new one." />
        )}
        // FIXME:Add Norecord at each and every place
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search current projects..."
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginVertical: 8, marginHorizontal: 4 }}
          />
        )}
      />
    </ContainerComponent>
  );
};
