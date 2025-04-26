import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";

import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import { P } from "../components/text";
import NoRecord from "./NoRecord";

import { styles, spacing, typography } from "../styles";

const InventoryMaterialScreen = ({ route }) => {
  const { t } = useTranslation();
  const { materialItem, totalReceived, inStock, consumed } = route.params;
  const { item } = materialItem;

  const [activeTab, setActiveTab] = useState("Total Received");
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const tabCounts = {
    "Total Received": totalReceived,
    "In Stock": inStock?.total_quantity || 0,
    Consumed: consumed?.total_quantity || 0,
  };

  const generateList = (tabName) => {
    const count = tabCounts[tabName];
    return Array.from({ length: count }, (_, i) => ({
      id: `${tabName}-${i + 1}`,
      site: { site_name: `${item} - ${i + 1}` },
      model: materialItem.model,
      item_code: materialItem.item_code,
      make: materialItem.make,
      manufacturer: materialItem.manufacturer,
      dispatch_date: materialItem.dispatch_dates?.[i] || "N/A",
      serial_number: materialItem.serial_number?.[i] || `SN-${i + 1}`,
      store_name: materialItem.store_name,
      store_incharge: materialItem.store_incharge,
    }));
  };

  const updateFilteredTasks = useCallback(() => {
    const list = generateList(activeTab);
    const filtered = list.filter(({ serial_number, item_code, model }) =>
      `${serial_number} ${item_code} ${model}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [activeTab, searchText, materialItem]);

  useEffect(() => {
    updateFilteredTasks();
  }, [updateFilteredTasks]);

  const toggleExpand = (index) =>
    setExpandedIndex(index === expandedIndex ? null : index);

  const TabButton = ({ tab }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      style={[
        spacing.pv2,
        spacing.ph3,
        spacing.br2,
        spacing.m1,
        {
          backgroundColor: activeTab === tab ? "#76885B" : "#C8E6C9",
          position: "relative",
        },
      ]}
    >
      <Text
        style={{
          color: activeTab === tab ? "#FFF" : "#333",
          fontWeight: activeTab === tab ? "bold" : "normal",
        }}
      >
        {tab}
      </Text>
      <View
        style={{
          position: "absolute",
          top: -2,
          right: -7,
          backgroundColor: "white",
          minWidth: 20,
          height: 20,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <P
          style={[
            typography.font12,
            typography.fontLato,
            typography.textBold,
            { color: "red" },
          ]}
        >
          {tabCounts[tab]}
        </P>
      </View>
    </TouchableOpacity>
  );

  const CustomTabBar = () => (
    <View style={[styles.row, spacing.mv1, { flexWrap: "wrap" }]}>
      {Object.keys(tabCounts).map((tab) => (
        <TabButton key={tab} tab={tab} />
      ))}
    </View>
  );

  const InfoFields = ({ item }) =>
    [
      { label: "Model", value: item.model },
      { label: "Manufacturer", value: item.manufacturer },
      { label: "Dispatch Date", value: item.dispatch_date },
      { label: "Serial Number", value: item.serial_number },
      { label: "Make", value: item.make },
      { label: "Store Name", value: item.store_name },
      { label: "Store Incharge", value: item.store_incharge },
    ].map(({ label, value }, i) => (
      <View key={i} style={[styles.row, spacing.mb1]}>
        <P style={typography.textBold}>{label}:</P>
        <P style={{ flex: 1, textAlign: "right" }}>{value}</P>
      </View>
    ));

  const renderItem = ({ item, index }) => (
    <ClickableCard1 key={index} title={item.site?.site_name}>
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", alignItems: "center" },
        ]}
      >
        <P style={[typography.font12, typography.fontLato]}>
          Item Code: {item.item_code}
        </P>
        <TouchableOpacity onPress={() => toggleExpand(index)}>
          <Icon
            name={expandedIndex === index ? "chevron-up" : "chevron-down"}
            size={26}
            color="#76885B"
          />
        </TouchableOpacity>
      </View>
      {expandedIndex === index && (
        <View
          style={[
            spacing.mt1,
            spacing.p2,
            spacing.br1,
            {
              backgroundColor: "#f0f4f3",
              borderWidth: 1,
              borderColor: "#cddcbd",
            },
          ]}
        >
          <InfoFields item={item} />
        </View>
      )}
    </ClickableCard1>
  );

  return (
    <ContainerComponent>
      <MyHeader
        title={`${item} Details`}
        isBack
        hasIcon
        icon="ellipsis-vertical"
      />
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <MyFlatList
        key={activeTab}
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={<CustomTabBar />}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
      />
    </ContainerComponent>
  );
};

export default InventoryMaterialScreen;
