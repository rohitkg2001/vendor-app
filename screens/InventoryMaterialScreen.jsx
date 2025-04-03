import React, { useState, useCallback } from "react";
import { Text, View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyTabView from "../components/customtab/MyTabView";
import { SceneMap } from "react-native-tab-view";

export default function InventoryMaterialScreen({ route, navigation }) {
  const { material } = route.params;
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  // Define the tabs (routes) for the inventory
  const inventoryTabs = [
    {
      key: 0,
      title: "Total Received",
    },
    {
      key: 1,
      title: "In Stock",
    },
    {
      key: 2,
      title: "Consumed",
    },
  ];

  // Define the render scenes (the content for each tab)
  const renderScene = SceneMap({
    totalReceived: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Total Received Content</Text>
      </View>
    ),
    inStock: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>In Stock Content</Text>
      </View>
    ),
    consumed: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Consumed Content</Text>
      </View>
    ),
  });

  return (
    <ContainerComponent>
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
        <SearchBar
          value={searchText}
          onChangeText={handleSearchChange}
          style={{ marginHorizontal: 16 }}
        />

        {/* MyTabView will now handle rendering of the tabs and their scenes */}
        <MyTabView
          tabs={inventoryTabs} // Pass tabs to MyTabView
          renderScene={renderScene} // Pass the render scenes
          style={{ backgroundColor: "white", flex: 1 }} // Optional style customizations
        />
      </View>
    </ContainerComponent>
  );
}
