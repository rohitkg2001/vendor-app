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

  const filteredinventory = inventory.filter((item) =>
    (item.name || " ").toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => {} },
    { label: "Sort", onPress: () => {} },
    { label: "Filter", onPress: () => {} },
  ];

  return (
    <ContainerComponent>
      <View>
        <MyHeader
          title="inventory"
          hasIcon={true}
          isBack={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />

        <MyFlatList
          data={filteredinventory}
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
          ListEmptyComponent={() => (
            <NoRecordScreen msg="Oops! No Projects available. Create the new one." />
          )}
          ListHeaderComponent={() => (
            <SearchBar
              placeholder="Search inventory..."
              value={searchText}
              onChangeText={setSearchText}
              style={{ marginVertical: 8, marginHorizontal: 4 }}
            />
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
