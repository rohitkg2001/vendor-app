import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard1 from "../components/card/ClickableCard1";
import { P } from "../components/text";
import NoRecord from "./NoRecord";
import Icon from "react-native-vector-icons/Ionicons";
import { styles, spacing, typography, PRIMARY_COLOR } from "../styles";

export default function InventoryMaterialScreen({ route }) {
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
    const count =
      tabName === "Total Received"
        ? totalReceived
        : tabName === "In Stock"
        ? inStock?.total_quantity || 0
        : consumed?.total_quantity || 0;

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
    const filtered = list.filter((item) => {
      const str =
        `${item.serial_number} ${item.item_code} ${item.model}`.toLowerCase();
      return str.includes(searchText.toLowerCase());
    });
    setFilteredTasks(filtered);
  }, [activeTab, searchText, materialItem]);

  useEffect(() => {
    updateFilteredTasks();
  }, [activeTab, searchText, updateFilteredTasks]);

  const toggleExpand = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index);

  const CustomTabBar = () => (
    <View style={[styles.row, spacing.mv1, { flexWrap: "wrap" }]}>
      {Object.keys(tabCounts).map((tab) => (
        <TouchableOpacity
          key={tab}
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

          {/* Badge Count like Notification */}
          <View
            style={[
              spacing.br5,
              {
                position: "absolute",
                top: -2,
                right: -7,
                backgroundColor: "white",
                minWidth: 20,
                height: 20,
                borderRadius: 9,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <P
              style={[
                typography.font12,
                typography.fontLato,
                typography.textBold,
                {
                  color:"red",
                  textAlign: "center",
                },
              ]}
            >
              {tabCounts[tab]}
            </P>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ContainerComponent>
      <MyHeader
        title={`${item} Details`}
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
      />

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <MyFlatList
        key={activeTab}
        data={filteredTasks}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        renderItem={({ item, index }) => (
          <ClickableCard1 key={index} title={item.site?.site_name}>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
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
                {[
                  { label: "Model", value: item.model },
                  { label: "Manufacturer", value: item.manufacturer },
                  { label: "Dispatch Date", value: item.dispatch_date },
                  { label: "Serial Number", value: item.serial_number },
                  { label: "Make", value: item.make },
                  { label: "Store Name", value: item.store_name },
                  { label: "Store Incharge", value: item.store_incharge },
                ].map((field, i) => (
                  <View key={i} style={[styles.row, spacing.mb1]}>
                    <P style={[typography.textBold]}>{field.label}:</P>
                    <P style={[{ flex: 1, textAlign: "right" }]}>
                      {field.value}
                    </P>
                  </View>
                ))}
              </View>
            )}
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={<CustomTabBar />}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
}
