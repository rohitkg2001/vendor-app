import React, { useState } from "react";
import { ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { requisitions } from "../utils/faker";
import SearchBar from "../components/input/SearchBar";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/Clickablecard";
import { styles } from "../styles/components.styles";
import { H2 } from "../components/text";
import { typography } from "../styles";

const RequisitionScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const handleViewDetails = (item) => {
    navigation.navigate("DetailScreen", { item });
  };

  return (
    <ContainerComponent>
      <MyHeader
        isBack
        title="Requisitions For Release"
        hasIcon
        icon="pencil"
        onIconPress={() => navigation.navigate("purchaseOrderScreen")}
      />

      <SearchBar
        placeholder="Search requisitions"
        value={searchText}
        onChangeText={setSearchText}
        style={{ marginLeft: -2 }}
      />
      <ScrollView>
        {requisitions.map((item, index) => (
          <ClickableCard
            key={index}
            item={item}
            handleViewDetails={handleViewDetails}
          />
        ))}
      </ScrollView>
      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          {
            justifyContent: "center",
            width: "90%",
          },
        ]}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          Create Receipt
        </H2>
      </Button>
    </ContainerComponent>
  );
};

export default RequisitionScreen;
