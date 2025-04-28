import { useState, useCallback } from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import NoRecord from "./NoRecord";
import SearchBar from "../components/input/SearchBar";
import { rooftopInventory } from "../utils/faker";
import ModalPopup from "../components/Modal";
import { P } from "../components/text";
import { styles, typography, spacing } from "../styles";

export default function RooftopInventoryScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const filteredInventory = rooftopInventory.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.productName.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.sub_category.toLowerCase().includes(search)
    );
  });

  return (
    <ContainerComponent>
      <MyHeader
        title="Rooftop Inventory"
        hasIcon={true}
        isBack={true}
        icon="ellipsis-vertical"
      />

      <SearchBar value={searchText} onChangeText={handleSearchChange} />

      <MyFlatList
        data={filteredInventory}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <NoRecord msg="No rooftop inventory found" />}
        showSearchBar={false}
        renderItem={({ item }) => (
          <ClickableCard1
            key={item.id}
            title={item.productName}
            subtitle={`Total Quantity: ${item.totalQuantity}`}
            onPress={() => openModal(item)}
          >
            <View style={[styles.row]}>
              <View>
                <P style={[typography.font12, { color: "gray" }]}>Rate</P>
                <P
                  style={[
                    typography.font12,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  ₹{item.rate}
                </P>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <P style={[typography.font12, { color: "gray" }]}>
                  Received Date
                </P>
                <P
                  style={[
                    typography.font12,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  {item.receivedDate}
                </P>
              </View>
            </View>
          </ClickableCard1>
        )}
      />

      {/*  ModalPopup */}
      <ModalPopup
        visible={modalVisible}
        close={closeModal}
        negativeButton="Close"
        positiveButton="Ok"
        action={closeModal}
      >
        {selectedItem && (
          <View>
            <P
              style={[
                typography.font16,
                typography.fontLato,
                typography.textBold,
                spacing.mb2,
              ]}
            >
              {selectedItem.productName}
            </P>
            <P>Initial Quantity: {selectedItem.initialQuantity}</P>
            <P>Quantity In Stock: {selectedItem.quantityStock}</P>
            <P>Total Quantity: {selectedItem.totalQuantity}</P>
            <P>Consumed Quantity: {selectedItem.consumedQuantity}</P>
            <P>Rate: ₹{selectedItem.rate}</P>
            <P>Received Date: {selectedItem.receivedDate}</P>
            <P>Category: {selectedItem.category}</P>
            <P>Sub-Category: {selectedItem.sub_category}</P>
          </View>
        )}
      </ModalPopup>
    </ContainerComponent>
  );
}
