// import react native
import { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import { inventoryData } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllItems } from "../redux/actions/inventoryActions";
import SearchBar from "../components/input/SearchBar";

import {
  typography,
  spacing,
  SCREEN_WIDTH,
  styles,
  LIGHT,
  SCREEN_HEIGHT,
  ICON_MEDIUM,
} from "../styles";
import { H5, H6, Span } from "../components/text";
import { P } from "../components/text";

export default function InventoryScreen({ navigation }) {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const { inventory } = useSelector((state) => state.inventory);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);

  useEffect(() => {
    console.log("Fetched Inventory Data:", { inventory });
  }, [inventory]);

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const openDetailsModal = (item) => {
    setDetailsItem(item);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsItem(null);
  };

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
          dispatch_dates: new Set(), // Unique dispatch dates
        };
      }

      grouped[key].quantity += item.quantity;
      grouped[key].total_value += item.total_value;

      // Add dispatch date
      if (item.dispatch_date) {
        grouped[key].dispatch_dates.add(item.dispatch_date);
      }
    });

    // Convert Set to comma-separated string
    return Object.values(grouped).map((item) => ({
      ...item,
      dispatch_dates: Array.from(item.dispatch_dates).join(", "),
    }));
  };

  const iconMap = {
    Luminary: "bulb-outline",
    "Panel Module": "sunny-outline",
    Battery: "battery-charging-outline",
    Structure: "cube-outline",
  };

  const bgColorMap = {
    Luminary: { bg: "#F8F8F8", icon: "#060606" },
    "Panel Module": { bg: "#FFFFFF", icon: "#060606" },
    Battery: { bg: "#E0E0E0", icon: "#060606" },
    Structure: { bg: "#F0F0F0", icon: "#060606" },
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
            //onPress: handleExport,
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
          {Object.keys(iconMap).map((itemName) => {
            const { bg, text, icon } = bgColorMap[itemName];
            const itemData = inventory?.find(
              (inv) => inv.item.toLowerCase() === itemName.toLowerCase()
            );

            return (
              <TouchableOpacity
                key={itemName}
                style={[
                  spacing.m1,
                  spacing.br2,
                  {
                    width: "47%",
                    height: 100,
                    backgroundColor: bg,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 2,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("inventoryMaterialScreen", {
                    // material: itemName,
                    // totalReceived: itemData ? itemData.total_quantity : 0,
                    materialItem: itemData,
                  })
                }
              >
                <Icon name={iconMap[itemName]} size={32} color={icon} />
                <P
                  style={[spacing.mt1, typography.font16, typography.fontLato]}
                >
                  {itemName}
                </P>
                <Span style={[typography.font12, typography.fontLato]}>
                  Quantity: {itemData ? itemData.total_quantity : 0}
                </Span>
                <Span
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                    { color: "#27ae60" },
                  ]}
                >
                  ₹{itemData ? itemData.total_value : 0}
                </Span>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      ;
      <MyFlatList
        data={groupInventoryItems(inventory)}
        // keyExtractor={(item) => item.id.toString()}
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
            quantity={item.total_quantity}
            total_value={item.total_value}
            dispatch_date={item.dispatch_dates}
            item_code={item.item_code}
            onPress={() => openDetailsModal(item)}
          />
        )}
      />
      {/* inventory */}
      <Portal>
        <Modal visible={showDetailsModal} onDismiss={closeDetailsModal}>
          <View
            style={[
              spacing.br3,
              spacing.p3,
              {
                backgroundColor: LIGHT,
                width: SCREEN_WIDTH - 32,
                marginHorizontal: 8,
                minHeight: SCREEN_HEIGHT / 6,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                spacing.br3,
                {
                  position: "absolute",
                  right: -10,
                  top: -10,
                  backgroundColor: "red",
                },
              ]}
              onPress={closeDetailsModal}
            >
              <Icon name="close" color="white" size={ICON_MEDIUM} />
            </TouchableOpacity>

            {detailsItem && (
              <>
                <P
                  style={[typography.font14, typography.fontLato, spacing.mb1]}
                >
                  🔹 Model:{" "}
                  <P style={[typography.textBold]}>{detailsItem.model}</P>
                </P>

                <P
                  style={[typography.font14, typography.fontLato, spacing.mb1]}
                >
                  🔹 Make:{" "}
                  <P style={[typography.textBold]}>{detailsItem.make}</P>
                </P>

                <View
                  style={[typography.font14, typography.fontLato, spacing.mb1]}
                >
                  <P>🔹 Serial Number:</P>
                  {detailsItem.serial_number?.map((serial, index) => (
                    <P key={index} style={[typography.textBold]}>
                      • {serial}
                    </P>
                  ))}
                </View>
              </>
            )}
          </View>
        </Modal>
      </Portal>
    </ContainerComponent>
  );
}