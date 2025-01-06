import { useState, useEffect } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InventoryDetailsModal from "../components/InventoryDetailsModal";

export default function InventoryScreen() {
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  const { t } = useTranslation();
  const { inventory } = useSelector((state) => state.inventory);

  const viewItem = (id) => {
    setVisible(true);
    const thisItem = inventory.find((item) => item.id === id);
    const itemDetails = { ...thisItem };
    setSelectedItem(itemDetails);
  };

  useEffect(() => {}, [inventory]);

  return (
    <ContainerComponent>
      <MyHeader title={t("inventory_title")} hasIcon={true} isBack={true} />
      <MyFlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <NoRecord msg={t("no_inventory")} />}
        renderItem={({ item }) => (
          <InventoryCard item={item} onPress={() => viewItem(item.id)} />
        )}
      />
      <InventoryDetailsModal
        visible={isVisible}
        onClose={() => setVisible(false)}
        selectedItem={selectedItem}
      />
    </ContainerComponent>
  );
}
