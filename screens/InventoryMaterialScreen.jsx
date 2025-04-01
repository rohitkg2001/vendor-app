import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// Import components
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import Tabs from "../components/Tabs";
import SearchBar from "../components/input/SearchBar";

export default function InventoryMaterialScreen() {
  const { t } = useTranslation();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState("");

  const tabCounts = {
    Total: tasks.length,
    Stock: tasks.filter((task) => task.status === "Pending").length,
    Consumed: tasks.filter((task) => task.status === "In Progress").length,
  };

  const filteredTasks = tasks.filter(
    (task) => activeTab === "All" || task.status === activeTab
  );

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
  }, []);

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab.split(" (")[0]);
  };

  return (
    <ContainerComponent>
      <MyHeader
        title={"Material Detail"}
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
        style={{ marginHorizontal: 10 }}
      />

      <MyFlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <ClickableCard1
            title={item.site?.site_name}
            subtitle={item.site?.location}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Tabs
            tabs={[
              `Total (${tabCounts.Total})`,
              `Stock (${tabCounts.Stock})`,
              `Consumed (${tabCounts.Consumed})`,
            ]}
            onTabPress={handleTabChange}
            activeTab={`${activeTab} (${tabCounts[activeTab]})`}
          />
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
      />
    </ContainerComponent>
  );
}
