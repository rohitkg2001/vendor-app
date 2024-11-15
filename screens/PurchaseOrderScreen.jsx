import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { Card } from "react-native-paper";
import { Icon } from "react-native-elements";
import Button from "../components/buttons/Button";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { styles } from "../styles/components.styles";
import { itemsData, amountDetailsData } from "../utils/faker";
import { H2, H3, H5, H6, P } from "../components/text";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/input/SearchBar";
import { SCREEN_WIDTH, typography } from "../styles";

const PurchaseOrderScreen = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [items, setItems] = useState(itemsData);
  const [filteredItems, setFilteredItems] = useState(itemsData);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const toggleCheck = (itemId) => {
    setCheckedItems({
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    });
  };

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

  return (
    <ContainerComponent>
      <ScrollView>
        <MyHeader title="Select Project Code" isBack={true} hasIcon={true} />
        <View style={{ marginVertical: 4 }}></View>

        <SearchBar
          placeholder="Search Project Code or Name"
          value={searchQuery}
          onChangeText={handleSearch}
          style={{ marginLeft: 4 }}
        />

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", marginHorizontal: 12 },
          ]}
          onPress={navigateToFormScreen}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            Add New Line Item
          </H2>
          <TouchableOpacity
            onPress={navigateToFormScreen}
            style={[styles.addIconContainer, { marginLeft: 15 }]}
          >
            <Icon name="add" size={20} color="#020409" />
          </TouchableOpacity>
        </Button>

        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <View key={item.id}>
              <Card
                style={[
                  styles.card,
                  {
                    backgroundColor: "#ffffff",
                    marginHorizontal: 4,
                  },
                ]}
              >
                <View
                  style={[
                    {
                      width: SCREEN_WIDTH - 48,
                      flexDirection: "row",
                      backgroundColor: "#ffffff",
                    },
                  ]}
                >
                  <CheckBox
                    checked={checkedItems[item.id] || false}
                    onPress={() => toggleCheck(item.id)}
                  />
                  <View style={styles.itemInfo}>
                    <H5>{item.id}</H5>
                    <P>{item.name}</P>
                  </View>
                  <View style={styles.itemDetails}>
                    <H6>₹{item.price.toFixed(2)}</H6>
                    <P>{item.quantity} Ea</P>
                    <H5>₹{item.total.toFixed(2)}</H5>
                  </View>
                </View>
              </Card>
            </View>
          ))
        ) : (
          <H3>No products found</H3>
        )}

        <Card
          style={[
            {
              backgroundColor: "#ffffff",
              marginHorizontal: 4,
              padding: 10,
            },
          ]}
        >
          {amountDetailsData.map((detail, index) => (
            <View
              key={index}
              style={[styles.amountDetails, { paddingRight: 10 }]}
            >
              <H6 style={styles.label}>{detail.label}</H6>
              <P>
                {typeof detail.value === "number"
                  ? detail.value.toFixed(2)
                  : detail.value}
              </P>
            </View>
          ))}
        </Card>

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", marginHorizontal: 12 },
          ]}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            Create Purchase Order
          </H2>
        </Button>
      </ScrollView>
    </ContainerComponent>
  );
};

export default PurchaseOrderScreen;
