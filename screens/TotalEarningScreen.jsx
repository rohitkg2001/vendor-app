import  { useState } from "react";
import { earnings } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";
const TotalEarningScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const filteredEarnings = earnings.filter((earning) =>
    earning.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    { label: "Sort", onPress: () => console.log("Sort clicked") },
    { label: "Filter", onPress: () => console.log("Filter clicked") },
  ];

  const handleCardClick = (item) => {
    console.log("Clicked item:", item);
  };

  return (
    <ContainerComponent>
      <MyHeader
        title="Total Earnings"
        hasIcon={true}
        isBack={true}
        icon={"ellipsis-vertical"}
        onIconPress={toggleMenu}
      />

      <MyFlatList
        data={filteredEarnings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isEarning={true}
            onPress={() => handleViewDetails(item)}
          />
        )}
        ListEmptyComponent={() => (
          <NoRecordScreen msg="Oops! No Projects available. Create the new one." />
        )}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search earnings..."
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginVertical: 8, marginHorizontal: 4 }}
          />
        )}
      />

      <Filter
        visible={isMenuVisible}
        onClose={toggleMenu}
        options={menuOptions}
      />
    </ContainerComponent>
  );
};
export default TotalEarningScreen;
