import React, { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/Clickablecard";

import { earnings } from "../utils/faker";

const TotalEarningScreen = () => {
  const [searchText, setSearchText] = useState("");


  return (
    <ContainerComponent>
      <MyHeader title="Total Earnings" hasIcon={true} isBack={true} />

      <MyFlatList
        data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ClickableCard
            key={index}
            item={item}
            isEarning={true}
            onPress={() => handleViewDetails(item)}
          />
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
    </ContainerComponent>
  );
};
export default TotalEarningScreen;
