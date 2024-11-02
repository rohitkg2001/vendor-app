import React, { useState } from "react";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";
import { orders } from "../utils/faker"; // Your orders data
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";

const OrderScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Filter orders based on search text
  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to toggle the popup menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Define the options for the PopupMenu
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
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu} // Open menu on icon press
        />

        {/* Place SearchBar directly in the OrderScreen */}
        <SearchBar
          placeholder="Search orders..."
          value={searchText}
          onChangeText={setSearchText} // Update the search text
        />

        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id.toString()} // Ensure ID is a string
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image
                source={{ uri: item.url }}
                loadingIndicatorSource={require('../assets/img15.png')}
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

        {/* Popup Menu */}
        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions} // Pass menu options to PopupMenu
        />
      </View>
    </ContainerComponent>
  );
};

export default OrderScreen;
