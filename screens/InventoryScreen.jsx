import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import { inventory } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";

export default function InventoryScreen() {
  const [searchText, setSearchText] = useState("");

  return (
    <ContainerComponent>
      <MyHeader title="Inventory" hasIcon={true} isBack={true} />
      <MyFlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() =>
          <SearchBar
            placeholder="Search by name or code"
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginVertical: 8, marginHorizontal: 4 }}
          />}
        ListEmptyComponent={() => <NoRecord msg="No items found in inventory. Please contact admin. " />}
        renderItem={({ item }) => <InventoryCard item={item} />}
      />
    </ContainerComponent>
  );
};
