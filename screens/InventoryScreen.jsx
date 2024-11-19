import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";
import MyFlatList from "../components/utility/MyFlatList";
import { inventory } from "../utils/faker";

const InventoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    { label: "Sort", onPress: () => console.log("Sort clicked") },
    { label: "Filter", onPress: () => console.log("Filter clicked") },
  ];

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
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: item.url }}
              loadingIndicatorSource={require("../assets/img15.png")}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginRight: 16,
              }}
            />
            <View style={{ flex: 1 }}>
              <H5>{item.name}</H5>
              <P>{item.description}</P>
              <View style={styles.quantityContainer}>
                <P style={styles.productQuantity}>Qty: {item.qty_stock} {item.unit}</P>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ContainerComponent>
  );
};

export default InventoryScreen;
