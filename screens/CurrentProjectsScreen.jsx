import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import NoRecord from "./NoRecord";
import { projects } from "../utils/faker";


export default function CurrentProjectsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

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
}
