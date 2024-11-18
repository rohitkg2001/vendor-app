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
import { orders } from "../utils/faker";

const InventoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="Orders"
          hasIcon={true}
          isBack={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />
        <SearchBar
          placeholder="Search orders..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <MyFlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id.toString()}
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
                  <P style={styles.productQuantity}>Qty: {item.quantity}</P>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions}
        />
      </View>
    </ContainerComponent>
  );
};

export default InventoryScreen;