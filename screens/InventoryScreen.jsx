import { useEffect } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import { inventoryData } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../redux/actions/inventoryActions";

export default function InventoryScreen() {
  const { t } = useTranslation();
  const vendorId = "vendor_id";
  const dispatch = useDispatch();

  const inventoryData = useSelector((state) => state.inventory.items);

  useEffect(() => {
    dispatch(getAllItems(vendorId));
  }, [dispatch, vendorId]);

  useEffect(() => {
    console.log("Fetched Inventory Data:", inventoryData);
  }, [inventoryData]);

  return (
    <ContainerComponent>
      <MyHeader
        title={t("inventory_title")}
        hasIcon={true}
        isBack={true}
        icon="ellipsis-vertical"
        menuItems={[
          {
            title: "Export to Excel",
            //onPress: handleExport,
          },
        ]}
      />

      <MyFlatList
        data={inventoryData}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <NoRecord msg={t("no_inventory")} />}
        renderItem={({ item }) => (
          <InventoryCard
            key={item.id}
            item={item}
            model={item.model}
            manufacturer={item.manufacturer}
            rate={item.rate}
            quantity={item.quantity}
            total_value={item.total_value}
          />
        )}
      />
    </ContainerComponent>
  );
}
