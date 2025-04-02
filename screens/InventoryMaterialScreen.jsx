import React, { useState, useCallback } from "react";
import { Text, View } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";

export default function InventoryMaterialScreen({ route }) {
  const { material } = route.params;
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const inventoryTabs = [
    { key: "totalReceived", title: "Total Received" },
    { key: "inStock", title: "In Stock" },
    { key: "consumed", title: "Consumed" },
  ];

  const [index, setIndex] = useState(0);

  const renderScene = SceneMap({
    totalReceived: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Total Received</Text>
      </View>
    ),
    inStock: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>In Stock</Text>
      </View>
    ),
    consumed: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Consumed</Text>
      </View>
    ),
  });

  return (
    <ContainerComponent>
      <MyHeader
        title={`${material} Details`}
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
        menuItems={[
          {
            title: "Export to Excel",
            onPress: () => console.log("Export to Excel"),
          },
        ]}
      />
      {/* Uncomment SearchBar if required */}
      {/* <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        style={{ marginHorizontal: 16 }}
      /> */}

      <TabView
        navigationState={{ index, routes: inventoryTabs }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 1000 }}
      />
    </ContainerComponent>
  );
}
