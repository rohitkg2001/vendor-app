import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ClickableCard from "../components/card/Clickablecard";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from '../screens/NoRecord'

export default function ProjectsScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState("");

  const { DATA, title } = route.params;

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
          <NoRecord msg="Oops! No Projects available right now..." />
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
