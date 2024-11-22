import { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import { inventory } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTransition } from "react";

export default function InventoryScreen() {
  const [searchText, setSearchText] = useState("");
  const { t } = useTransition()

  return (
    <ContainerComponent>
      <MyHeader title={t('inventory_title')} hasIcon={true} isBack={true} />

      <MyFlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginVertical: 8, marginHorizontal: 4 }}
          />
        )}
        ListEmptyComponent={() => (
          <NoRecord msg={t('no_inventory')} />
        )}
        renderItem={({ item }) => <InventoryCard item={item} />}
      />
    </ContainerComponent>
  );
}
