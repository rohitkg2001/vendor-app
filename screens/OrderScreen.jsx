import React, { useState } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { orders } from "../utils/faker"; // Your orders data
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar"; 

const OrderScreen = () => {
  const [searchText, setSearchText] = useState("");

  // Filter orders based on search text
  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader title="Orders" hasIcon={true} icon={"ellipsis-vertical"} />

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
                source={{ uri: item.image }}
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
      </View>
    </ContainerComponent>
  );
};

export default OrderScreen;
