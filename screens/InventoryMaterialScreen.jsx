import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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

  const [tabCounts, setTabCounts] = useState({
    "Total Received": totalReceived,
    "In Stock": inStock,
    Consumed: consumed,
  });

  const [dummyList, setDummyList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Total Received");
  const [searchText, setSearchText] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which card is expanded

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
        serial_number: materialItem.serial_number?.[i] || SN - `${i + 1}`,
        store_name: materialItem.store_name,
        store_incharge: materialItem.store_incharge,
      });
    }

    setDummyList(list);
    setFilteredTasks(list);
  }, [materialItem, totalReceived]);

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
