// import react native
import { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import SearchBar from "../components/input/SearchBar";

import { typography, spacing, SCREEN_WIDTH, styles } from "../styles";
import { Span, P } from "../components/text";

export default function InventoryScreen({ navigation }) {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const { today_inventory, total_received_inventory, in_stock, consumed } =
    useSelector((state) => state.inventory);

  useEffect(() => {}, [today_inventory]);

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  // Grouping function
  const groupInventoryItems = (items = []) => {
    const grouped = {};

    items.forEach((item) => {
      const key = `${item.model}-${item.manufacturer}-${item.rate}`;

      if (!grouped[key]) {
        grouped[key] = {
          ...item,
          quantity: 0,
          total_value: 0,
          dispatch_dates: new Set(),
        };
      }

      grouped[key].quantity += item.quantity;
      grouped[key].total_value += item.total_value;

      if (item.dispatch_date) {
        grouped[key].dispatch_dates.add(item.dispatch_date);
      }
    });

    return Object.values(grouped).map((item) => ({
      ...item,
      dispatch_dates: Array.from(item.dispatch_dates).join(", "),
    }));
  };

  const openDetailsScreen = (item) => {
    const itemCode = item.item_code;

    const totalReceived = total_received_inventory?.find(
      (inv) => inv.item_code?.toLowerCase() === itemCode?.toLowerCase()
    );

    const inStockData = in_stock?.find(
      (inv) => inv.item_code?.toLowerCase() === itemCode?.toLowerCase()
    );

    const consumedData = consumed?.find(
      (inv) => inv.item_code?.toLowerCase() === itemCode?.toLowerCase()
    );

    navigation.navigate("inventoryMaterialScreen", {
      materialItem: totalReceived || item,
      totalReceived: totalReceived?.total_quantity || item.quantity,
      inStock: inStockData,
      consumed: consumedData,
    });
  };

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
          },
        ]}
      />

      <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        style={{ marginHorizontal: 16 }}
      />

      <View style={[spacing.mv2, { alignItems: "center" }]}>
        <View
          style={[
            styles.row,
            spacing.p2,
            spacing.br2,
            {
              width: SCREEN_WIDTH - 8,
              flexWrap: "wrap",
              justifyContent: "center",
            },
          ]}
        >
          {["Battery", "Luminary", "Module", "Structure"].map((itemName) => {
            const itemData = total_received_inventory?.find(
              (inv) => inv.item.toLowerCase() === itemName.toLowerCase()
            );

            const inStockData = in_stock?.find(
              (inv) =>
                inv.item_code?.toLowerCase() ===
                itemData?.item_code?.toLowerCase()
            );

            const consumedData = consumed?.find(
              (inv) =>
                inv.item_code?.toLowerCase() ===
                itemData?.item_code?.toLowerCase()
            );

            let bgColor = "#fff";
            let icon = "cube-outline";

            switch (itemName) {
              case "Battery":
                bgColor = "#E0E0E0";
                icon = "battery-charging-outline";
                break;
              case "Luminary":
                bgColor = "#F8F8F8";
                icon = "bulb-outline";
                break;
              case "Module":
                bgColor = "#FFFFFF";
                icon = "sunny-outline";
                break;
              case "Structure":
                bgColor = "#F0F0F0";
                icon = "cube-outline";
                break;
            }

            return itemData ? (
              <TouchableOpacity
                key={itemName}
                style={[
                  spacing.m1,
                  spacing.br2,
                  {
                    width: "47%",
                    height: 100,
                    backgroundColor: bgColor,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 2,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("inventoryMaterialScreen", {
                    materialItem: itemData,
                    totalReceived: itemData.total_quantity,
                    inStock: inStockData,
                    consumed: consumedData,
                  })
                }
              >
                <Icon name={icon} size={32} color="#000000" />
                <P
                  style={[spacing.mt1, typography.font16, typography.fontLato]}
                >
                  {itemData.item}
                </P>
                <Span style={[typography.font12, typography.fontLato]}>
                  Quantity: {itemData.total_quantity}
                </Span>
                <Span
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                    { color: "#27ae60" },
                  ]}
                >
                  ₹{itemData.total_value}
                </Span>
              </TouchableOpacity>
            ) : null;
          })}
        </View>
      </View>

      <MyFlatList
        data={groupInventoryItems(today_inventory)}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        ListEmptyComponent={() => <NoRecord msg={t("no_inventory")} />}
        showSearchBar={false}
        renderItem={({ item }) => (
          <InventoryCard
            key={item.id}
            item={item}
            model={item.model}
            manufacturer={item.manufacturer}
            rate={item.rate}
            quantity={item.quantity}
            total_value={item.total_value}
            dispatch_date={item.dispatch_dates}
            item_code={item.item_code}
            onPress={() => openDetailsScreen(item)}
          />
        )}
      />
    </ContainerComponent>
  );
}
