// import React, { useState, useCallback } from "react";
// import { Text, View } from "react-native";
// import { TabView, SceneMap } from "react-native-tab-view";
// import ContainerComponent from "../components/ContainerComponent";
// import MyHeader from "../components/header/MyHeader";

// export default function InventoryMaterialScreen({ route }) {
//   const { material } = route.params;
//   const [searchText, setSearchText] = useState("");
//   const handleSearchChange = useCallback((text) => {
//     setSearchText(text);
//   }, []);

//   const inventoryTabs = [
//     { key: "totalReceived", title: "Total Received" },
//     { key: "inStock", title: "In Stock" },
//     { key: "consumed", title: "Consumed" },
//   ];

//   const [index, setIndex] = useState(0);

//   const renderScene = SceneMap({
//     totalReceived: () => (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Total Received</Text>
//       </View>
//     ),
//     inStock: () => (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>In Stock</Text>
//       </View>
//     ),
//     consumed: () => (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Consumed</Text>
//       </View>
//     ),
//   });

//   return (
//     <ContainerComponent>
//       <MyHeader
//         title={`${material} Details`}
//         isBack={true}
//         hasIcon={true}
//         icon="ellipsis-vertical"
//         menuItems={[
//           {
//             title: "Export to Excel",
//             onPress: () => console.log("Export to Excel"),
//           },
//         ]}
//       />
//       {/* Uncomment SearchBar if required */}
//       {/* <SearchBar
//         value={searchText}
//         onChangeText={handleSearchChange}
//         style={{ marginHorizontal: 16 }}
//       /> */}

//       <TabView
//         navigationState={{ index, routes: inventoryTabs }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width: 1000 }}
//       />
//     </ContainerComponent>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
//import MyHeader from "../components/MyHeader";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import Tabs from "../components/Tabs";

import { P } from "../components/text";
import NoRecord from "./NoRecord";

export default function InventoryMaterialScreen({ route }) {
  const { t } = useTranslation();
  const { materialItem } = route.params;
  const { item, total_quantity: totalReceived } = materialItem;

  const [tabCounts, setTabCounts] = useState({
    "Total Received": totalReceived,
    "In Stock": 0,
    Consumed: 0,
  });

  const [dummyList, setDummyList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Total Received");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const list = [];

    for (let i = 0; i < totalReceived; i++) {
      list.push({
        id: i + 1,
        site: {
          site_name: `${materialItem.item} - ${i + 1}`,
        },
        model: materialItem.model,
        item_code: materialItem.item_code,
        make: materialItem.make,
        manufacturer: materialItem.manufacturer,
        dispatch_date: materialItem.dispatch_dates?.[i] || "N/A",
        serial_number: materialItem.serial_number?.[i] || `SN-${i + 1}`,
        store_name: materialItem.store_name,
        store_incharge: materialItem.store_incharge,
      });
    }

    setDummyList(list);
    setFilteredTasks(list);
  }, [materialItem, totalReceived]);

  // Filter tasks based on search input
  useEffect(() => {
    const filtered = dummyList.filter((item) =>
      item.site?.site_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchText, dummyList]);

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const handleTabChange = (selectedTab) => {
    const tabName = selectedTab.split(" (")[0];
    setActiveTab(tabName);
  };

  return (
    <ContainerComponent>
      <MyHeader
        title={`${item} Details`}
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
      />
      <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        style={{ marginHorizontal: 10 }}
      />

      <MyFlatList
        data={filteredTasks}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        renderItem={({ item, index }) => (
          <ClickableCard1 key={index} title={item.site?.site_name}>
            <P>Model: {item.model}</P>
            <P>Manufacturer: {item.manufacturer}</P>
            <P>Dispatch Date: {item.dispatch_date}</P>
            <P>Serial Number: {item.serial_number}</P>
            <P>Item Code: {item.item_code}</P>
            <P>Make: {item.make}</P>
            <P>Store Name: {item.store_name}</P>
            <P>Store Incharge: {item.store_incharge}</P>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[{ flexGrow: 1 }]}
        ListHeaderComponent={() => (
          <View>
            <Tabs
              tabs={[
                `Total Received (${tabCounts["Total Received"]})`,
                `In Stock (${tabCounts["In Stock"]})`,
                `Consumed (${tabCounts["Consumed"]})`,
              ]}
              onTabPress={handleTabChange}
              activeTab={`${activeTab} (${tabCounts[activeTab]})`}
              tabStyles={{
                activeBackgroundColor: "#76885B",
                inactiveBackgroundColor: "#C8E6C9",
                activeTextColor: "#FFF",
                inactiveTextColor: "#333",
              }}
            />
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
}
