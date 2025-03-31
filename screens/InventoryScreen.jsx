import { useEffect, useState, useCallback } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import Button from "../components/buttons/Button";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import { inventoryData } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../redux/actions/inventoryActions";
import SearchBar from "../components/input/SearchBar";
import {
  typography,
  spacing,
  SCREEN_WIDTH,
  styles,
  LIGHT,
  SCREEN_HEIGHT,
  SECONDARY_COLOR,
  ICON_MEDIUM,
} from "../styles";
import { H5, H6 } from "../components/text";
import { P } from "../components/text";

export default function InventoryScreen() {
  const { t } = useTranslation();
  const vendorId = "vendor_id";
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // const inventoryData = useSelector((state) => state.inventory.items);

  // useEffect(() => {
  //   dispatch(getAllItems(vendorId));
  // }, [dispatch, vendorId]);

  // useEffect(() => {
  //   console.log("Fetched Inventory Data:", inventoryData);
  // }, [inventoryData]);

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const stockData = {
    Battery: { consumed: 50, inStock: 200, receivedToday: 10 },
    Luminary: { consumed: 30, inStock: 150, receivedToday: 5 },
    Panel: { consumed: 20, inStock: 120, receivedToday: 8 },
    SIM: { consumed: 40, inStock: 100, receivedToday: 12 },
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedItem(null);
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
        style={{ marginHorizontal: 10 }}
      />

      <View style={[spacing.mv2, { alignItems: "center" }]}>
        <View
          style={[
            styles.row,
            spacing.p2,
            spacing.br2,
            {
              width: SCREEN_WIDTH - 32,
              flexWrap: "wrap",
              borderWidth: 1,
              borderColor: "#ddd",
            },
          ]}
        >
          {["Battery", "Luminary", "Panel", "SIM"].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                spacing.m1,
                spacing.br2,
                {
                  width: "47%",
                  height: 65,
                  borderWidth: 0.5,
                  borderColor: "#ddd",
                  backgroundColor: LIGHT,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 1,
                },
              ]}
              onPress={() => openModal(item)}
            >
              <P style={[typography.font14, typography.fontLato]}>{item}</P>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <MyFlatList
        data={inventoryData}
        keyExtractor={(item) => item.id.toString()}
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
          />
        )}
      />

      {/* Modal Popup */}
      <Portal>
        <Modal visible={visible} onDismiss={closeModal}>
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
              onPress={closeModal}
            >
              <Icon name="close" color="white" size={ICON_MEDIUM} />
            </TouchableOpacity>

            {selectedItem && (
              <>
                <H5
                  style={[
                    typography.font16,
                    typography.fontLato,
                    typography.textBold,
                    spacing.mb2,
                  ]}
                >
                  {selectedItem} Stock Details
                </H5>
                {/* <P
                  style={[typography.font14, typography.fontLato, spacing.mb1]}
                >
                  🔹 Total Consumed: {stockData[selectedItem].consumed}
                </P> */}
                <P
                  style={[typography.font14, typography.fontLato, spacing.mb1]}
                >
                  🔹 Total Consumed:
                  <P style={[typography.textBold]}>
                    {stockData[selectedItem].consumed}
                  </P>
                </P>

                <P
                  style={[typography.font14, typography.fontLato, spacing.mb1]}
                >
                  🔹 Total In Stock Till Date:
                  <P style={[typography.textBold]}>
                    {stockData[selectedItem].inStock}
                  </P>
                </P>
                <P style={[typography.font14, typography.fontLato]}>
                  🔹Today Received Material:{" "}
                  <P style={[typography.textBold]}>
                    {stockData[selectedItem].receivedToday}
                  </P>
                </P>
              </>
            )}

            <View style={[spacing.mt3]}>
              <Button style={[spacing.ph4]} onPress={closeModal}>
                <P
                  style={[
                    typography.font16,
                    typography.textBold,
                    typography.fontLato,
                    { color: "red" },
                  ]}
                >
                  Close
                </P>
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </ContainerComponent>
  );
}
