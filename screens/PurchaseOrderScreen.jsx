import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import Button from "../components/buttons/Button";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyImageBackground from "../components/MyImageBackground";
import { styles } from "../styles/components.styles";
import { itemsData } from "../utils/faker";
import { H2, H3, H4 } from "../components/text";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
import { typography } from "../styles";

const PurchaseOrderScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(itemsData);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredItems(itemsData);
    } else {
      const filtered = itemsData.filter(
        (item) =>
          item.id.toLowerCase().includes(text.toLowerCase()) ||
          item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const navigateToFormScreen = () => {
    navigation.navigate("formScreen");
  };

  const handleViewDetails = (item) => {
    console.log("Clicked Item: ", item);
  };

  return (
    <ContainerComponent>
      <MyHeader title="Select Project Code" isBack={true} hasIcon={true} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <View style={{ paddingHorizontal: 8, marginBottom: 12 }}>
          <SearchBar
            placeholder="Search projects or project code"
            value={searchQuery}
            onChangeText={handleSearch}
            style={{ marginVertical: 8 }}
          />
          <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              { justifyContent: "center", marginTop: 8 },
            ]}
            onPress={navigateToFormScreen}
          >
            <H2
              style={[styles.btnText, styles.textLarge, typography.textLight]}
            >
              Add New Line Item
            </H2>
            <TouchableOpacity
              onPress={navigateToFormScreen}
              style={[styles.addIconContainer, { marginLeft: 15 }]}
            >
              <Icon name="add" size={20} color="#020409" />
            </TouchableOpacity>
          </Button>
        </View>

        {filteredItems.length > 0 ? (
          <MyFlatList
            data={filteredItems}
            renderItem={({ item, index }) => (
              <ClickableCard
                key={index}
                item={item}
                isPurchaseOrder={true}
                onPress={() => handleViewDetails(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View>
            <MyImageBackground imageSource={require("../assets/norecode.png")}>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <H4>No records found</H4>
              </View>
            </MyImageBackground>
          </View>
        )}
      </ScrollView>

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          { justifyContent: "center", marginHorizontal: 12 },
        ]}
        onPress={() => console.log("Create Purchase Order")}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          Create Purchase Order
        </H2>
      </Button>
    </ContainerComponent>
  );
};

export default PurchaseOrderScreen;
