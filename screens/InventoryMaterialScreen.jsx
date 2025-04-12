import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import Tabs from "../components/Tabs";
import { P } from "../components/text";
import NoRecord from "./NoRecord";
import Icon from "react-native-vector-icons/Ionicons";

export default function InventoryMaterialScreen({ route }) {
  const { t } = useTranslation();
  const { materialItem, totalReceived, inStock, consumed } = route.params;
  const { item } = materialItem;

  // Tab counts
  const [tabCounts, setTabCounts] = useState({
    "Total Received": totalReceived,
    "In Stock": inStock?.total_quantity || 0,
    Consumed: consumed?.total_quantity || 0,
  });

  const [dummyList, setDummyList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Total Received");
  const [searchText, setSearchText] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Generate list based on the active tab
  const generateList = (tabName) => {
    let count = 0;
    if (tabName === "Total Received") count = totalReceived;
    if (tabName === "In Stock") count = inStock?.total_quantity || 0;
    if (tabName === "Consumed") count = consumed?.total_quantity || 0;

    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: `${tabName}-${i + 1}`,
        site: { site_name: `${item} -  ${i + 1}` },
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
    return list;
  };

  // Update list and filtered tasks whenever the active tab changes
  useEffect(() => {
    console.log("Tab changed to:", activeTab); // Log current tab
    const list = generateList(activeTab);
    console.log("Generated list for tab:", list); // Log generated list
    setDummyList(list); // Set the new dummy list
    setFilteredTasks(list); // Reset filtered tasks to full list
  }, [activeTab, materialItem, totalReceived, inStock, consumed]);

  useEffect(() => {
    console.log("materialItem received in detail screen:", materialItem);
  }, []);

  // Filter tasks based on search text
  // useEffect(() => {
  //   const filtered = dummyList.filter((item) =>
  //     item.site?.site_name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setFilteredTasks(filtered);
  // }, [searchText, dummyList]);

  useEffect(() => {
    const search = searchText.toLowerCase();

    const filtered = dummyList.filter((item) => {
      const stringToSearch = `
      ${item.serial_number}
      ${item.item_code}
      ${item.model}
    `.toLowerCase();

      return stringToSearch.includes(search);
    });

    setFilteredTasks(filtered);
  }, [searchText, dummyList]);

  // Handle search text change
  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  // Handle tab switch and ensure active tab is updated correctly
  const handleTabChange = (selectedTab) => {
    const tabName = selectedTab.split(" (")[0]; // Extract tab name
    console.log("Tab switched to:", tabName); // Log tab switch
    setActiveTab(tabName); // Update active tab state
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expand/collapse
  };

  return (
    <ContainerComponent>
      <MyHeader
        title={`${item} Details`}
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
      />
      <SearchBar value={searchText} onChangeText={handleSearchChange} />

      {/* Set key to force re-render when the tab changes */}
      <MyFlatList
        key={activeTab} // Force re-render on tab change
        data={filteredTasks}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        renderItem={({ item, index }) => (
          <ClickableCard1 key={index} title={item.site?.site_name}>
            <P>Item Code: {item.item_code}</P>

            {/* Toggle button with icon */}
            <TouchableOpacity
              onPress={() => toggleExpand(index)}
              style={{ position: "absolute", right: 10, bottom: 12 }}
            >
              <Icon
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={38}
                color="#76885B"
              />
            </TouchableOpacity>

            {/* Show details when expanded */}
            {expandedIndex === index && (
              <>
                <P>Model: {item.model}</P>
                <P>Manufacturer: {item.manufacturer}</P>
                <P>Dispatch Date: {item.dispatch_date}</P>
                <P>Serial Number: {item.serial_number}</P>
                <P>Make: {item.make}</P>
                <P>Store Name: {item.store_name}</P>
                <P>Store Incharge: {item.store_incharge}</P>
              </>
            )}
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
